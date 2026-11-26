"use client";

/**
 * Black Friday offer band — the dark campaign landing block on the
 * home page, between the hero and the selected-work gallery.
 *
 * The site's paper theme stays untouched around it: the band carries
 * the studio's own ink theme (#0c1014 ground, #14181d raise, #f6f4ef
 * off-white, signal teal accent). Renders nothing outside the campaign
 * window, so the home page returns to its paper state automatically on
 * 8 December.
 */

import { useEffect, useState } from "react";
import {
  BF_KEYS,
  CAMPAIGN,
  countdownParts,
  effectivePhase,
  fmtNAD,
  GENERIC_WA_URL,
  nowMs,
  promoCta,
  effectiveRemainingMs,
} from "@/lib/campaign";

function fmt(n: number): string {
  return String(n).padStart(2, "0");
}

export function CampaignOffer() {
  const [phase, setPhase] = useState<string>("pre");
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    const watch = () => {
      setPhase(effectivePhase());
      setRemaining(effectiveRemainingMs());
    };
    watch();
    const iv = window.setInterval(watch, 1000);
    return () => window.clearInterval(iv);
  }, []);

  if (phase !== "phase1" && phase !== "phase2") return null;

  const ph = CAMPAIGN[phase as "phase1" | "phase2"];
  const endsLabel = phase === "phase1" ? "30 November" : "7 December";
  const { days, hours, minutes, seconds } = countdownParts(remaining);

  const claim = () => {
    promoCta();
  };
  const quote = () => {
    // "Get a quote" opens the pop-up with the Dynamic package selected.
    if (typeof window === "undefined") return;
    try {
      if (localStorage.getItem(BF_KEYS.submitted)) {
        window.open(GENERIC_WA_URL, "_blank", "noopener");
        return;
      }
    } catch {
      /* proceed */
    }
    document.dispatchEvent(
      new CustomEvent("ts:open-promo", {
        detail: { opener: document.activeElement instanceof HTMLElement ? document.activeElement : null, dynamic: true },
      }),
    );
  };

  return (
    <section className="bf-band" aria-labelledby="bf-band-heading">
      <div className="bf-band-inner">
        <div className="bf-band-copy">
          <h2 id="bf-band-heading" className="bf-band-h2">
            {ph.headline}
          </h2>
          <p className="bf-band-sub">
            Starter website: <strong>{fmtNAD(CAMPAIGN.salePrice)}</strong> instead of{" "}
            <s>{fmtNAD(CAMPAIGN.originalPrice)}</s> — you save {fmtNAD(CAMPAIGN.saving)}. Until{" "}
            {endsLabel}, {CAMPAIGN.tz.split("/")[1]?.toLowerCase() ?? "Windhoek"} time.
          </p>

          <p className="bf-band-count" aria-hidden="true">
            <span className="bf-band-count-num">
              {days >= 1 ? `${days}d ${fmt(hours)}:${fmt(minutes)}:${fmt(seconds)}` : `${fmt(hours)}:${fmt(minutes)}:${fmt(seconds)}`}
            </span>
            <span className="bf-band-count-label">left in the offer</span>
          </p>
          <p className="bf-visually-hidden">Offer countdown: {days} days, {hours} hours, {minutes} minutes remaining.</p>

          <div className="bf-band-ctas">
            <button type="button" className="bf-btn-primary" onClick={claim}>
              Claim on WhatsApp
            </button>
            <button type="button" className="bf-btn-quiet" onClick={quote}>
              Get a quote
            </button>
          </div>

          <p className="bf-band-fine">{CAMPAIGN.band.finePrint}</p>
        </div>

        <div className="bf-price">
          <p className="bf-price-name">{CAMPAIGN.product}</p>
          <p className="bf-price-line">
            <s className="bf-price-was">{fmtNAD(CAMPAIGN.originalPrice)}</s>
            <span className="bf-price-now">{fmtNAD(CAMPAIGN.salePrice)}</span>
            <span className="bf-badge">{CAMPAIGN.discountPercent}% OFF</span>
          </p>
          <p className="bf-price-save">You save {fmtNAD(CAMPAIGN.saving)}</p>

          <hr className="bf-rule" />

          <p className="bf-price-dynamic">Dynamic / custom website</p>
          <p className="bf-price-dynamic-sub">
            Scoped and quoted to the brief.
            <br />
            {CAMPAIGN.band.dynamicNote}
          </p>
        </div>
      </div>
    </section>
  );
}
