"use client";

import React from "react";
import { usePathname } from "next/navigation";

/**
 * ContactCluster — WhatsApp, email and scroll-to-top as ONE coordinated
 * floating stack, not three competing widgets scattered around the viewport.
 *
 * Structure is shared with tangison.com. Colour is not: every surface here
 * reads from CSS custom properties that each site defines natively, so the
 * Studio renders in Signal Teal and the parent renders in its own accent
 * without either palette bleeding across the domain boundary.
 *
 * Reveal behaviour: the whole cluster fades in together after one viewport of
 * scroll, so nothing pops in at a different moment from anything else.
 */

/** Page-context prefill for the WhatsApp message. */
function messageForPath(pathname: string): string {
  if (pathname.startsWith("/audit")) {
    return "Hello Tangison Studio. I would like the free audit of my website.";
  }
  if (pathname.startsWith("/work")) {
    return "Hello Tangison Studio. I saw your work and would like to discuss a project.";
  }
  if (pathname.startsWith("/services")) {
    return "Hello Tangison Studio. I would like to talk about your services.";
  }
  if (pathname.startsWith("/careers")) {
    return "Hello Tangison Studio. I am interested in working with you.";
  }
  if (pathname.startsWith("/partnership")) {
    return "Hello Tangison Studio. I would like to discuss a partnership.";
  }
  return "Hello Tangison Studio. I would like to start a project brief.";
}

/** Studio line, TN Mobile: 085 341 1522. wa.me wants digits only, no plus. */
const WHATSAPP_NUMBER = "264853411522";
const EMAIL = "studio@tangison.com";

export function ContactCluster() {
  const pathname = usePathname() || "/";
  const [revealed, setRevealed] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);

  React.useEffect(() => {
    // Reveal after one viewport of scroll. rAF-throttled so the listener
    // never runs layout work more than once a frame.
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setRevealed(window.scrollY > window.innerHeight * 0.9);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Collapse the expanded contact options when the route changes.
  React.useEffect(() => {
    setExpanded(false);
  }, [pathname]);

  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    messageForPath(pathname)
  )}`;
  const mailHref = `mailto:${EMAIL}?subject=${encodeURIComponent(
    "Project enquiry"
  )}`;

  const toTop = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <div
      className="cluster-root"
      data-revealed={revealed ? "true" : "false"}
    >
      {/* Secondary options, revealed from the primary button. */}
      <div className="cluster-options" data-open={expanded ? "true" : "false"}>
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="cluster-btn cluster-btn-wa"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
            <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.53.07-.8.38-.28.3-1.05 1.02-1.05 2.5 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z" />
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.02h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23a8.23 8.23 0 0 1 8.24 8.24c0 4.54-3.7 8.23-8.24 8.23z" />
          </svg>
          <span>WhatsApp</span>
        </a>

        <a
          href={mailHref}
          className="cluster-btn cluster-btn-mail"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
            <path d="m3 6 9 6.5L21 6" />
          </svg>
          <span>Email</span>
        </a>
      </div>

        <button
          type="button"
          className="cluster-btn cluster-btn-top"
          onClick={toTop}
          aria-label="Scroll back to top"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <button
          type="button"
          className="cluster-btn cluster-btn-primary"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-label={expanded ? "Close contact options" : "Talk to us, open contact options"}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            {expanded ? (
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            ) : (
              <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-2.9-.5L3 21l1.6-4.6A8.3 8.3 0 0 1 3.6 11.5 8.4 8.4 0 0 1 12 3.1a8.4 8.4 0 0 1 9 8.4z" strokeLinejoin="round" />
            )}
          </svg>
          <span className="cluster-label">{expanded ? "Close" : "Talk to us"}</span>
        </button>

      <style jsx>{`
        .cluster-root {
          position: fixed;
          right: 16px;
          bottom: 16px;
          z-index: 60;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          /* 14px sits inside the 12-16px gap the brief asks for. */
          gap: 14px;
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 260ms ease, transform 260ms ease;
          pointer-events: none;
          visibility: hidden;
        }
        .cluster-root[data-revealed="true"] {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
          visibility: visible;
        }
        .cluster-options {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 10px;
          opacity: 0;
          transform: translateY(8px) scale(0.96);
          transform-origin: bottom right;
          transition: opacity 200ms ease, transform 200ms ease;
          pointer-events: none;
          visibility: hidden;
        }
        .cluster-options[data-open="true"] {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: auto;
          visibility: visible;
        }
        .cluster-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border-radius: 999px;
          border: 1px solid var(--cluster-border, rgba(17, 19, 21, 0.12));
          background: var(--cluster-surface, #ffffff);
          color: var(--cluster-ink, #111315);
          padding: 10px 16px;
          font-family: inherit;
          font-size: 13px;
          font-weight: 500;
          line-height: 1;
          cursor: pointer;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.14);
          transition: transform 160ms ease, background-color 160ms ease,
            color 160ms ease, box-shadow 160ms ease;
          text-decoration: none;
          white-space: nowrap;
        }
        .cluster-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 26px rgba(0, 0, 0, 0.2);
        }
        .cluster-btn:focus-visible {
          outline: 2px solid var(--cluster-accent, #0f5c5b);
          outline-offset: 3px;
        }
        .cluster-btn-primary {
          background: var(--cluster-accent, #0f5c5b);
          color: var(--cluster-accent-ink, #ffffff);
          border-color: transparent;
          padding: 12px 18px;
        }
        .cluster-btn-top {
          padding: 12px;
          width: 44px;
          height: 44px;
          justify-content: center;
        }
        @media (max-width: 480px) {
          .cluster-root {
            right: 12px;
            bottom: 12px;
          }
          .cluster-label {
            display: none;
          }
          .cluster-btn-primary {
            width: 48px;
            height: 48px;
            padding: 0;
            justify-content: center;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .cluster-root,
          .cluster-options,
          .cluster-btn {
            transition-duration: 1ms;
          }
          .cluster-btn:hover {
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}
