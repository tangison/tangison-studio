"use client";

/**
 * Black Friday announcement bar — site-wide slim dock.
 *
 * Docked to the BOTTOM of the viewport: the site's nav is a floating
 * pill fixed to the top (a top bar would collide with it), and a slim
 * bottom dock keeps the top of this paper editorial site quiet.
 * Dismissible per session; countdown follows the active phase; hides
 * itself the second the campaign ends. Pure overlay — no layout
 * compensation, so zero CLS.
 */

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import {
  BF_KEYS,
  CAMPAIGN,
  countdownParts,
  effectivePhase,
  nowMs,
  promoCta,
  remainingMs,
  trackCampaign,
} from "@/lib/campaign";

function fmt(n: number): string {
  return String(n).padStart(2, "0");
}

export function PromoBar() {
  const [phase, setPhase] = useState<string>("pre");
  const [dismissed, setDismissed] = useState(false);
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    let iv: number | undefined;

    const watch = () => {
      const p = effectivePhase();
      setPhase(p);
      setRemaining(remainingMs(nowMs()));
      let barDismissed = false;
      try {
        barDismissed = sessionStorage.getItem(BF_KEYS.barDismissed) === "1";
      } catch {
        /* storage unavailable → show */
      }
      setDismissed(barDismissed);
      // the FAB offsets above the bar while the bar is on screen
      const active = (p === "phase1" || p === "phase2") && !barDismissed;
      if (active) document.documentElement.dataset.bfBar = "on";
      else delete document.documentElement.dataset.bfBar;
    };

    watch();
    iv = window.setInterval(watch, 1000);
    return () => {
      if (iv) window.clearInterval(iv);
      delete document.documentElement.dataset.bfBar;
    };
  }, []);

  const dismiss = () => {
    try {
      sessionStorage.setItem(BF_KEYS.barDismissed, "1");
    } catch {
      /* best-effort */
    }
    delete document.documentElement.dataset.bfBar;
    setDismissed(true);
  };

  if ((phase !== "phase1" && phase !== "phase2") || dismissed) return null;

  const ph = CAMPAIGN[phase as "phase1" | "phase2"];
  const { days, hours, minutes, seconds } = countdownParts(remaining);
  const label = days >= 1 ? `${days}d ${fmt(hours)}:${fmt(minutes)}:${fmt(seconds)}` : `${fmt(hours)}:${fmt(minutes)}:${fmt(seconds)}`;

  const onCta = () => {
    trackCampaign("announcement_bar_clicked", { phase });
    promoCta();
  };

  return (
    <aside className="bf-bar" role="region" aria-label="Black Friday offer">
      <span className="bf-count" aria-hidden="true">
        {label}
      </span>
      <p className="bf-bar-copy">
        <span className="bf-bar-copy-full">{ph.barCopy}</span>
        <span className="bf-bar-copy-short">{ph.barCopyShort}</span>
      </p>
      <div className="bf-bar-actions">
        <button type="button" className="bf-bar-cta" onClick={onCta}>
          {CAMPAIGN.bar.ctaLabel}
        </button>
        <button type="button" className="bf-bar-dismiss" aria-label={CAMPAIGN.bar.dismissLabel} onClick={dismiss}>
          <X aria-hidden="true" className="bf-bar-x" />
        </button>
      </div>
    </aside>
  );
}
