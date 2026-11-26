"use client";

/**
 * Floating WhatsApp button — campaign-scoped convenience handoff.
 *
 * Sits bottom-right, offset above the announcement dock while the dock
 * is on screen (html[data-bf-bar]), and hides completely while the
 * promo pop-up is open so nothing overlaps the form. Disappears with
 * the campaign; the site's own contact paths remain unchanged.
 */

import { useEffect, useState } from "react";
import { effectivePhase, GENERIC_WA_URL, trackCampaign } from "@/lib/campaign";

export function FloatingWhatsApp() {
  const [active, setActive] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const watch = () => {
      const p = effectivePhase();
      setActive(p === "phase1" || p === "phase2");
    };
    watch();
    const iv = window.setInterval(watch, 1000);
    const onOpen = () => setHidden(true);
    const onClose = () => setHidden(false);
    document.addEventListener("ts:promo-open", onOpen);
    document.addEventListener("ts:promo-close", onClose);
    return () => {
      window.clearInterval(iv);
      document.removeEventListener("ts:promo-open", onOpen);
      document.removeEventListener("ts:promo-close", onClose);
    };
  }, []);

  if (!active || hidden) return null;

  return (
    <a
      className="bf-fab"
      href={GENERIC_WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with the studio on WhatsApp about the Black Friday offer"
      onClick={() => trackCampaign("whatsapp_clicked", { context: "floating" })}
    >
      <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" fill="currentColor">
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.08.15-1.18-.06-.11-.22-.17-.47-.29Z" />
      </svg>
    </a>
  );
}
