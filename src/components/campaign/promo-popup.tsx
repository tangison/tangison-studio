"use client";

/**
 * Black Friday promo pop-up — home page only.
 *
 * Implementation notes:
 *  - Native <dialog> (role=dialog, aria-modal, focus trap and Escape
 *    come free) with a two-column modal on desktop and a bottom sheet
 *    on mobile (92dvh, internal scroll, drag handle, safe areas).
 *  - Static-by-owner-instruction site: opening is instant apart from
 *    one 180ms opacity fade; collapses under prefers-reduced-motion.
 *  - Frequency: once per session (sessionStorage); after dismissal,
 *    suppressed 24h (localStorage timestamp); after submit, never
 *    auto-shown again; promo CTAs re-open it on click.
 *  - Zero render before the campaign window: the component returns
 *    nothing outside phase1/phase2, so go-live and expiry are
 *    automatic on the visitor's clock.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import {
  BF_KEYS,
  CAMPAIGN,
  POPUP_SUPPRESS_HOURS,
  buildMessage,
  effectivePhase,
  GENERIC_WA_URL,
  nowMs,
  trackCampaign,
  waUrl,
  fmtNAD,
} from "@/lib/campaign";

type FormState = {
  name: string;
  need: string;
  pkg: number;
  budget: string;
  business: string;
};

const INITIAL: FormState = {
  name: "",
  need: "",
  pkg: CAMPAIGN.form.defaultPackageIndex,
  budget: "",
  business: "",
};

type Errors = Partial<Record<"name" | "need" | "budget", string>>;

function validate(s: FormState): Errors {
  const e: Errors = {};
  if (!s.name.trim() || s.name.trim().length < 2) e.name = "Please tell us your name.";
  if (!s.need) e.need = "Pick what you need.";
  if (!s.budget) e.budget = "Pick a budget range.";
  return e;
}

export function PromoPopup() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const formStartedRef = useRef(false);
  const lockRef = useRef<{ overflow: string; position: string; top: string; y: number } | null>(null);
  const swipeRef = useRef<{ y: number; t: number } | null>(null);
  const phaseRef = useRef<string>("pre");

  const [phase, setPhase] = useState<string>("pre");
  const [values, setValues] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [submitState, setSubmitState] = useState<"idle" | "opening">("idle");
  const [manualUrl, setManualUrl] = useState<string | null>(null);

  const phaseKey = phase === "phase1" || phase === "phase2" ? phase : null;
  const phaseName = phaseKey ?? "";

  // -----------------------------------------------------------------
  // Body scroll lock (same contract as the site's mobile menu).
  // -----------------------------------------------------------------
  const lockBody = useCallback(() => {
    if (lockRef.current) return;
    const b = document.body;
    lockRef.current = {
      overflow: b.style.overflow,
      position: b.style.position,
      top: b.style.top,
      y: window.scrollY,
    };
    b.style.overflow = "hidden";
    b.style.position = "fixed";
    b.style.top = `-${window.scrollY}px`;
    b.style.width = "100%";
  }, []);

  const unlockBody = useCallback(() => {
    const prev = lockRef.current;
    if (!prev) return;
    lockRef.current = null;
    const b = document.body;
    b.style.overflow = prev.overflow;
    b.style.position = prev.position;
    b.style.top = prev.top;
    b.style.width = "";
    window.scrollTo(0, prev.y);
  }, []);

  // -----------------------------------------------------------------
  // Open / close (stable identities; phase read from ref)
  // -----------------------------------------------------------------
  const close = useCallback(
    (context: string) => {
      const dlg = dialogRef.current;
      if (!dlg || !dlg.open) return;
      dlg.close();
      unlockBody();
      // a user dismissal starts the 24h suppression window; the
      // campaign-expiry close does not (there is nothing left to suppress)
      if (context !== "expired") {
        try {
          localStorage.setItem(BF_KEYS.dismissedAt, String(nowMs()));
        } catch {
          /* best-effort */
        }
      }
      document.dispatchEvent(new CustomEvent("ts:promo-close"));
      trackCampaign("popup_closed", { phase: phaseRef.current, context });
      const opener = openerRef.current;
      openerRef.current = null;
      // Focus returns to the element that invoked the dialog (APG
      // contract); if it is gone, focus falls back to the heading's
      // container which the browser handles from body.
      if (opener && document.contains(opener)) opener.focus();
    },
    [unlockBody],
  );

  const open = useCallback(
    (opener?: HTMLElement | null) => {
      const dlg = dialogRef.current;
      if (!dlg || typeof dlg.showModal !== "function") return;
      if (!dlg.open) {
        if (!opener && document.activeElement instanceof HTMLElement) {
          opener = document.activeElement;
        }
        openerRef.current = opener ?? null;
        lockBody();
        dlg.showModal();
        document.dispatchEvent(new CustomEvent("ts:promo-open"));
        trackCampaign("popup_shown", { phase: phaseRef.current });
      }
      // Long structured content: initial focus on the heading
      // (tabindex=-1) so screen-reader users hear structure first.
      headingRef.current?.focus();
    },
    [lockBody],
  );

  // -----------------------------------------------------------------
  // Campaign window: auto-trigger (once, on mount) + frequency caps.
  // -----------------------------------------------------------------
  useEffect(() => {
    const p = effectivePhase();
    phaseRef.current = p;
    setPhase(p);
    if (p !== "phase1" && p !== "phase2") return;

    let storageOK = true;
    try {
      if (localStorage.getItem(BF_KEYS.submitted)) return; // submitted → never again
      if (sessionStorage.getItem(BF_KEYS.shownThisSession)) return; // once per session
      const dismissedAt = Number(localStorage.getItem(BF_KEYS.dismissedAt) || 0);
      if (dismissedAt && nowMs() - dismissedAt < POPUP_SUPPRESS_HOURS * 3600 * 1000) return; // 24h suppression
    } catch {
      storageOK = false; // private mode: show anyway, caps best-effort
    }

    const timer = window.setTimeout(
      () => {
        if (storageOK) {
          try {
            sessionStorage.setItem(BF_KEYS.shownThisSession, "1");
          } catch {
            /* best-effort */
          }
        }
        open();
      },
      CAMPAIGN.popup.delayMs,
    );
    return () => window.clearTimeout(timer);
  }, [open]);

  // -----------------------------------------------------------------
  // Live phase watch: updates the phase, closes the pop-up at expiry
  // (visitor clock) and swaps/restores the home-page meta in-window.
  // -----------------------------------------------------------------
  useEffect(() => {
    const watch = () => {
      const p = effectivePhase();
      if (p !== phaseRef.current) {
        phaseRef.current = p;
        setPhase(p);
      }
      const active = p === "phase1" || p === "phase2";
      if (!active) {
        if (dialogRef.current?.open) close("expired");
        restoreMeta();
      } else {
        applyMeta(p);
      }
    };
    watch();
    const iv = window.setInterval(watch, 1000);
    return () => {
      window.clearInterval(iv);
      restoreMeta();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [close]);

  // -----------------------------------------------------------------
  // External open triggers (announcement bar / offer band CTAs).
  // -----------------------------------------------------------------
  useEffect(() => {
    const onOpen = (e: Event) => {
      try {
        if (localStorage.getItem(BF_KEYS.submitted)) return; // never re-open after submit
      } catch {
        /* proceed */
      }
      const detail = (e as CustomEvent).detail as
        | { opener?: HTMLElement | null; dynamic?: boolean }
        | undefined;
      // "Get a quote" (Dynamic / custom package) preselects that option
      if (detail?.dynamic) setValues((v) => ({ ...v, pkg: 1 }));
      open(detail?.opener ?? null);
    };
    document.addEventListener("ts:open-promo", onOpen);
    return () => document.removeEventListener("ts:open-promo", onOpen);
  }, [open]);

  // -----------------------------------------------------------------
  // Dialog-native close paths: Escape (cancel) + backdrop click.
  // Re-runs when phaseKey flips so the listeners bind to the <dialog>
  // element itself — it enters the DOM only once the campaign window
  // opens, so a mount-time effect alone would bind to nothing.
  // -----------------------------------------------------------------
  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg || !phaseKey) return;
    const onCancel = (e: Event) => {
      e.preventDefault(); // route every close through close() for bookkeeping
      close("esc");
    };
    const onClick = (e: MouseEvent) => {
      if (e.target === dlg) close("backdrop"); // click landed on the dialog area, not the sheet
    };
    dlg.addEventListener("cancel", onCancel);
    dlg.addEventListener("click", onClick);
    return () => {
      dlg.removeEventListener("cancel", onCancel);
      dlg.removeEventListener("click", onClick);
    };
  }, [close, phaseKey]);

  // -----------------------------------------------------------------
  // Mobile: swipe down to dismiss (the X button is the always-present
  // single-pointer path; swipe is a convenience).
  // -----------------------------------------------------------------
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    swipeRef.current = { y: t.clientY, t: Date.now() };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = swipeRef.current;
    swipeRef.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dy = t.clientY - start.y;
    const dt = Date.now() - start.t;
    const scroller = (e.currentTarget as HTMLElement).closest("[data-bf-scroll]") as HTMLElement | null;
    if (dy > 60 && dt < 600 && (!scroller || scroller.scrollTop <= 0)) close("swipe");
  };

  // -----------------------------------------------------------------
  // Form
  // -----------------------------------------------------------------
  const setField = (field: keyof FormState, value: string | number) => {
    setValues((v) => ({ ...v, [field]: value }));
  };

  const onFieldBlur = (field: "name" | "need" | "budget") => {
    const errs = validate(values);
    setErrors((prev) => ({ ...prev, [field]: errs[field] }));
  };

  const onFormFocusIn = () => {
    if (formStartedRef.current) return;
    formStartedRef.current = true;
    trackCampaign("form_started", { phase: phaseRef.current });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    const first = (["name", "need", "budget"] as const).find((f) => errs[f]);
    if (first) {
      const el = document.getElementById(`bf-f-${first}`) as HTMLElement | null;
      el?.focus();
      return;
    }
    const url = waUrl(
      buildMessage({
        name: values.name.trim(),
        need: values.need,
        pkgMessage: CAMPAIGN.form.packageOptions[values.pkg]?.message ?? "",
        budget: values.budget,
        business: values.business.trim(),
      }),
    );
    // privacy: analytics carries package / budget / need / phase only —
    // never the name or the business text.
    trackCampaign("form_submitted", {
      package: CAMPAIGN.form.packageOptions[values.pkg]?.message ?? "",
      budget: values.budget,
      need: values.need,
      phase: phaseRef.current,
    });
    trackCampaign("whatsapp_clicked", { context: "popup_form", phase: phaseRef.current });
    try {
      localStorage.setItem(BF_KEYS.submitted, "1");
    } catch {
      /* best-effort */
    }
    setManualUrl(url);
    setSubmitState("opening");
    const w = window.open(url, "_blank", "noopener");
    if (!w) {
      window.location.assign(url); // pop-up blocked → same-tab fallback
    }
  };

  // -----------------------------------------------------------------
  // Render (nothing outside the campaign window; ?promo=force bypasses)
  // -----------------------------------------------------------------
  if (!phaseKey) return null;

  const { popup, form } = CAMPAIGN;

  return (
    <dialog ref={dialogRef} className="bf-dialog" aria-labelledby="bf-popup-heading">
      <div className="bf-sheet">
        <button type="button" className="bf-close" aria-label="Close the offer" onClick={() => close("button")}>
          <X aria-hidden="true" className="bf-close-x" />
        </button>

        <div className="bf-cols">
          <figure className="bf-hero">
            <picture>
              <source
                media="(max-width: 767px)"
                srcSet="/images/campaign/bf-banner-640.webp 640w"
                sizes="100vw"
              />
              <img
                src="/images/campaign/bf-hero-880.webp"
                alt="Dark studio table with interface sketches and a single teal status light: the Black Friday offer from The Tangison Studio."
                width={880}
                height={880}
                sizes="(min-width: 768px) 396px, 100vw"
                loading="lazy"
                decoding="async"
              />
            </picture>
          </figure>

          <div className="bf-body" data-bf-scroll onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <div className="bf-handle" aria-hidden="true" />

            <p className="bf-eyebrow">{popup.eyebrow}</p>
            <h2 id="bf-popup-heading" ref={headingRef} className="bf-heading" tabIndex={-1}>
              {popup.headline}
            </h2>
            <p className="bf-subline">
              Starter site: <strong>{fmtNAD(CAMPAIGN.salePrice)}</strong> instead of{" "}
              <s>{fmtNAD(CAMPAIGN.originalPrice)}</s>. Answer 5 quick questions and we continue on
              WhatsApp.
            </p>

            <form className="bf-form" noValidate onSubmit={onSubmit} onFocus={onFormFocusIn}>
              <div className="bf-field">
                <label htmlFor="bf-f-name">{form.fields.name}</label>
                <input
                  id="bf-f-name"
                  className="bf-input"
                  type="text"
                  name="name"
                  autoComplete="name"
                  inputMode="text"
                  enterKeyHint="next"
                  required
                  maxLength={80}
                  value={values.name}
                  onChange={(e) => setField("name", e.target.value)}
                  onBlur={() => onFieldBlur("name")}
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={errors.name ? "bf-err-name" : undefined}
                />
                {errors.name && (
                  <p id="bf-err-name" className="bf-error">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="bf-field">
                <label htmlFor="bf-f-need">{form.fields.need}</label>
                <div className="bf-selectwrap">
                  <select
                    id="bf-f-need"
                    className="bf-input bf-select"
                    name="need"
                    required
                    value={values.need}
                    onChange={(e) => setField("need", e.target.value)}
                    onBlur={() => onFieldBlur("need")}
                    aria-invalid={errors.need ? true : undefined}
                    aria-describedby={errors.need ? "bf-err-need" : undefined}
                  >
                    <option value="">Select…</option>
                    {form.needOptions.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                  <svg className="bf-chev" aria-hidden="true" viewBox="0 0 12 8" width="12" height="8">
                    <path
                      d="M1 1.5 6 6.5 11 1.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                {errors.need && (
                  <p id="bf-err-need" className="bf-error">
                    {errors.need}
                  </p>
                )}
              </div>

              <fieldset className="bf-field">
                <legend>{form.fields.package}</legend>
                <div className="bf-radios">
                  {form.packageOptions.map((o, i) => (
                    <label key={o.label} className="bf-radio">
                      <input
                        type="radio"
                        name="package"
                        value={i}
                        checked={values.pkg === i}
                        onChange={() => setField("pkg", i)}
                      />
                      <span>{o.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="bf-field">
                <label htmlFor="bf-f-budget">{form.fields.budget}</label>
                <div className="bf-selectwrap">
                  <select
                    id="bf-f-budget"
                    className="bf-input bf-select"
                    name="budget"
                    required
                    value={values.budget}
                    onChange={(e) => setField("budget", e.target.value)}
                    onBlur={() => onFieldBlur("budget")}
                    aria-invalid={errors.budget ? true : undefined}
                    aria-describedby={errors.budget ? "bf-err-budget" : undefined}
                  >
                    <option value="">Select…</option>
                    {form.budgetOptions.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                  <svg className="bf-chev" aria-hidden="true" viewBox="0 0 12 8" width="12" height="8">
                    <path
                      d="M1 1.5 6 6.5 11 1.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                {errors.budget && (
                  <p id="bf-err-budget" className="bf-error">
                    {errors.budget}
                  </p>
                )}
              </div>

              <div className="bf-field">
                <label htmlFor="bf-f-business">{form.fields.business}</label>
                <input
                  id="bf-f-business"
                  className="bf-input"
                  type="text"
                  name="business"
                  autoComplete="organization"
                  inputMode="url"
                  enterKeyHint="done"
                  maxLength={120}
                  value={values.business}
                  onChange={(e) => setField("business", e.target.value)}
                />
              </div>

              <button type="submit" className="bf-submit" disabled={submitState === "opening"}>
                {submitState === "opening" ? (
                  <>
                    <span className="bf-spinner" aria-hidden="true" />
                    {popup.opening}
                  </>
                ) : (
                  popup.button
                )}
              </button>

              {submitState === "opening" && manualUrl && (
                <p className="bf-fallback">
                  {popup.openingFallback}{" "}
                  <a href={manualUrl} target="_blank" rel="noopener noreferrer">
                    Open WhatsApp
                  </a>
                </p>
              )}
            </form>

            <a
              className="bf-secondary"
              href={GENERIC_WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCampaign("whatsapp_clicked", { context: "popup_secondary", phase: phaseRef.current })}
            >
              {popup.secondaryLink}
            </a>
            <p className="bf-micro">{popup.microcopy}</p>
          </div>
        </div>
      </div>
    </dialog>
  );
}

// ---------------------------------------------------------------------------
// Campaign-window home-page meta swap (title / description / OG), with
// originals captured once and restored at expiry. The static HTML keeps
// its normal meta for non-JS crawlers; JS-rendering crawlers see the
// campaign meta during the window only.
// ---------------------------------------------------------------------------

function setMeta(selector: string, value: string) {
  const el = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!el) return;
  if (!el.dataset.bfOrig) el.dataset.bfOrig = el.getAttribute("content") ?? "";
  el.setAttribute("content", value);
}

function applyMeta(phase: "phase1" | "phase2") {
  const seo = CAMPAIGN.seo[phase];
  if (!document.documentElement.dataset.bfTitle) {
    document.documentElement.dataset.bfTitle = document.title;
  }
  document.title = seo.title;
  setMeta('meta[name="description"]', seo.description);
  setMeta('meta[property="og:title"]', seo.ogTitle);
  setMeta('meta[property="og:description"]', seo.ogDescription);
}

function restoreMeta() {
  const title = document.documentElement.dataset.bfTitle;
  if (typeof title === "string" && title) {
    document.title = title;
    delete document.documentElement.dataset.bfTitle;
  }
  document.head.querySelectorAll("meta[data-bf-orig]").forEach((el) => {
    const orig = el.dataset.bfOrig;
    if (typeof orig === "string") el.setAttribute("content", orig);
    delete el.dataset.bfOrig;
  });
}
