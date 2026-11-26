import { track } from "@vercel/analytics";

/**
 * Black Friday 2026 campaign — the single source of truth.
 *
 * Every date, price, piece of copy, tracking event and the WhatsApp
 * number lives in this object. Any change to the campaign is one edit
 * here. Nothing else in the campaign layer hardcodes a value.
 *
 * Phases are computed on the VISITOR's clock against the absolute
 * instants below (the site is fully static; phases cannot be baked at
 * build time). Timezone: Africa/Windhoek (UTC+2, no DST since 2017) —
 * the studio's business timezone; written as +02:00 offsets so no
 * runtime timezone library is needed.
 */

export const CAMPAIGN = {
  id: "bf2026",
  tz: "Africa/Windhoek" as const,

  // ---- schedule (absolute instants, Windhoek time) ----
  phase1: {
    name: "Black Friday",
    from: "2026-11-27T00:00:00+02:00",
    to: "2026-11-30T23:59:59+02:00",
    headline: "Black Friday: 20% off your website.",
    barCopy: "Black Friday: 20% off Starter websites. Now N$1,760 (was N$2,200).",
    barCopyShort: "20% off Starter sites — N$1,760",
  },
  phase2: {
    name: "Last chance",
    from: "2026-12-01T00:00:00+02:00",
    to: "2026-12-07T23:59:59+02:00",
    headline: "Extended: 20% off ends 7 December.",
    barCopy: "Last chance: 20% off Starter websites — N$1,760, ends 7 December.",
    barCopyShort: "Last chance — ends 7 December",
  },

  // ---- offer economics ----
  product: "Starter website",
  originalPrice: 2200,
  discountPercent: 20,
  salePrice: 1760,
  saving: 440,
  currency: "N$",

  // ---- WhatsApp (the studio line already published on the site) ----
  whatsappDigits: "264853411522", // digits only, no plus/spaces/dashes
  whatsappDisplay: "085 341 1522",

  // ---- announcement bar ----
  bar: {
    ctaLabel: "Claim 20% off",
    dismissLabel: "Dismiss offer",
  },

  // ---- pop-up ----
  popup: {
    delayMs: 2000,
    eyebrow: "Black Friday",
    headline: "20% off your website.",
    subline: "Starter site: N$1,760 instead of N$2,200. Answer 5 quick questions and we continue on WhatsApp.",
    button: "Claim my 20% off on WhatsApp",
    secondaryLink: "Or just chat on WhatsApp",
    microcopy: "No email needed. No spam. We reply on WhatsApp.",
    opening: "Opening WhatsApp…",
    openingFallback: "If nothing opened, tap here.",
  },

  // ---- form ----
  form: {
    fields: {
      name: "Your name",
      need: "What do you need?",
      package: "Which package?",
      budget: "Budget range",
      business: "Business name or current website (optional)",
    },
    needOptions: [
      "Business website",
      "Online store",
      "Portfolio",
      "Landing page",
      "Something else",
    ],
    packageOptions: [
      { label: "Starter, N$1,760 (20% off, was N$2,200)", message: "Starter — N$1,760 (20% off, was N$2,200)" },
      { label: "Dynamic / custom website (let's quote it)", message: "Dynamic / custom website — quote on request" },
    ],
    defaultPackageIndex: 0,
    budgetOptions: [
      "Under N$2,000",
      "N$2,000 to N$5,000",
      "N$5,000 to N$10,000",
      "N$10,000+",
    ],
  },

  // ---- home offer band ----
  band: {
    finePrint:
      "Offer runs 27–30 November (Windhoek time), extended to 7 December, for new Starter projects started during the sale window.",
    dynamicNote:
      "Black Friday perks apply to custom builds on request.",
  },

  // ---- campaign-window SEO (home page, swapped in via JS only
  //      during the window; originals are restored at expiry) ----
  seo: {
    phase1: {
      title: "Black Friday: 20% off Starter websites | The Tangison Studio",
      description:
        "Black Friday at The Tangison Studio: 20% off the Starter website — N$1,760 instead of N$2,200. Ends 30 November. Claim on WhatsApp.",
      ogTitle: "Black Friday: 20% off your website | The Tangison Studio",
      ogDescription:
        "Starter website: N$1,760 instead of N$2,200, until 30 November. The Tangison Studio, Windhoek.",
    },
    phase2: {
      title: "Last chance: 20% off ends 7 December | The Tangison Studio",
      description:
        "Extended Black Friday at The Tangison Studio: the Starter website at N$1,760 instead of N$2,200, until 7 December.",
      ogTitle: "Extended: 20% off ends 7 December | The Tangison Studio",
      ogDescription:
        "Starter website: N$1,760 instead of N$2,200, until 7 December. The Tangison Studio, Windhoek.",
    },
  },
} as const;

// ---------------------------------------------------------------------------
// Phase logic (pure functions — testable)
// ---------------------------------------------------------------------------

export type CampaignPhase = "pre" | "phase1" | "phase2" | "after";

const at = (iso: string) => Date.parse(iso);

export const CAMPAIGN_START = at(CAMPAIGN.phase1.from);
export const CAMPAIGN_END = at(CAMPAIGN.phase2.to);

/** Visitor-clock phase computation. nowMs is epoch milliseconds. */
export function campaignPhase(nowMs: number = Date.now()): CampaignPhase {
  if (nowMs < at(CAMPAIGN.phase1.from)) return "pre";
  if (nowMs <= at(CAMPAIGN.phase1.to)) return "phase1";
  if (nowMs <= at(CAMPAIGN.phase2.to)) return "phase2";
  return "after";
}

export function activePhase(nowMs: number = Date.now()): "phase1" | "phase2" | null {
  const p = campaignPhase(nowMs);
  return p === "phase1" || p === "phase2" ? p : null;
}

/** Milliseconds until the active phase ends (0 when none / past). */
export function remainingMs(nowMs: number = Date.now()): number {
  const p = activePhase(nowMs);
  if (!p) return 0;
  return Math.max(0, at(CAMPAIGN[p].to) + 1000 - nowMs);
}


/**
 * Force-aware countdown: under ?promo=force the countdown follows the
 * forced phase, so previewing before the real window still shows the
 * real time left in that phase (not 00:00:00).
 */
export function effectiveRemainingMs(): number {
  if (typeof window !== "undefined" && promoForced()) {
    const ph = new URLSearchParams(window.location.search).get("phase");
    const key = ph === "2" ? "phase2" : "phase1";
    return Math.max(0, at(CAMPAIGN[key].to) + 1000 - nowMs());
  }
  return remainingMs(nowMs());
}

// ---------------------------------------------------------------------------
// Visitor-time plumbing (client only; SSR renders nothing)
// ---------------------------------------------------------------------------

/** Test hook: __TS_TEST_NOW (epoch ms or () => ms) overrides "now". */
export function nowMs(): number {
  if (typeof window !== "undefined") {
    const t = (window as unknown as { __TS_TEST_NOW?: number | (() => number) }).__TS_TEST_NOW;
    if (typeof t === "function") return t();
    if (typeof t === "number") return t;
  }
  return Date.now();
}

/** ?promo=force bypasses the date window (production-safe test flag). */
export function promoForced(): boolean {
  if (typeof window === "undefined") return false;
  return new URLSearchParams(window.location.search).get("promo") === "force";
}

/** The phase the campaign layer should render right now. */
export function effectivePhase(): CampaignPhase {
  if (promoForced()) {
    const ph = new URLSearchParams(window.location.search).get("phase");
    return ph === "2" ? "phase2" : "phase1";
  }
  return campaignPhase(nowMs());
}

// ---------------------------------------------------------------------------
// Prices & countdown formatting
// ---------------------------------------------------------------------------

/** N$ with comma thousands: 2200 -> "N$2,200". Deterministic (en-US). */
export function fmtNAD(amount: number): string {
  return `N$${new Intl.NumberFormat("en-US").format(amount)}`;
}

export type CountdownParts = { days: number; hours: number; minutes: number; seconds: number };

export function countdownParts(ms: number): CountdownParts {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

// ---------------------------------------------------------------------------
// WhatsApp handoff
// ---------------------------------------------------------------------------

export type WaForm = {
  name: string;
  need: string;
  pkgMessage: string;
  budget: string;
  business: string;
};

/** Exact message template (per owner brief). */
export function buildMessage(d: WaForm): string {
  return [
    `Hi Tangison Studio 👋 I'm ${d.name}.`,
    `I saw the Black Friday offer.`,
    `Need: ${d.need}`,
    `Package: ${d.pkgMessage}`,
    `Budget: ${d.budget}`,
    `Business/site: ${d.business || "n/a"}`,
    `Please send me the next steps.`,
  ].join("\n");
}

/** wa.me URL: digits-only number, encodeURIComponent on the full message. */
export function waUrl(message: string): string {
  return `https://wa.me/${CAMPAIGN.whatsappDigits}?text=${encodeURIComponent(message)}`;
}

/** Generic greeting for the secondary chat link and the floating button. */
export const GENERIC_WA_MESSAGE =
  "Hi Tangison Studio 👋 I saw the Black Friday offer — 20% off the Starter website. Please send me the details.";

export const GENERIC_WA_URL = waUrl(GENERIC_WA_MESSAGE);

/**
 * Shared promo-CTA click: opens the pop-up, or goes straight to
 * WhatsApp for visitors who already submitted (pop-up never re-opens
 * after submit). Called from the announcement bar and the offer band.
 */
export function promoCta(): void {
  if (typeof window === "undefined") return;
  if (localStorage.getItem(BF_KEYS.submitted)) {
    trackCampaign("whatsapp_clicked", { context: "cta_direct" });
    window.open(GENERIC_WA_URL, "_blank", "noopener");
    return;
  }
  document.dispatchEvent(
    new CustomEvent("ts:open-promo", {
      detail: { opener: document.activeElement instanceof HTMLElement ? document.activeElement : null },
    }),
  );
}

// ---------------------------------------------------------------------------
// Frequency-cap storage keys (sessionStorage/localStorage)
// ---------------------------------------------------------------------------

export const BF_KEYS = {
  shownThisSession: "bf2026_popup_shown",
  dismissedAt: "bf2026_popup_dismissed_at",
  submitted: "bf2026_popup_submitted",
  barDismissed: "bf2026_bar_dismissed",
} as const;

export const POPUP_SUPPRESS_HOURS = 24;

// ---------------------------------------------------------------------------
// Tracking wrapper — reuses the site's existing Vercel Analytics.
// Never send name or business text here.
// ---------------------------------------------------------------------------

export type CampaignTrackProps = Partial<{
  package: string;
  budget: string;
  need: string;
  phase: string;
  context: string;
}>;

export function trackCampaign(event: string, props: CampaignTrackProps = {}): void {
  // Reuses the analytics already installed on the site; wrapped so a
  // failure inside analytics can never break the campaign UI.
  try {
    track(event, props as Record<string, unknown>);
  } catch {
    /* analytics is never load-bearing */
  }
}
