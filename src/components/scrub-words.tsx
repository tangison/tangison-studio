"use client";

import { useEffect, useRef } from "react";
import { reducedMotion, scrub } from "@/lib/scroll-motion";

/**
 * ScrubWords: the sentence types itself in as you scroll.
 *
 * Words start faint and fill to full ink in reading order, driven by
 * the studio's smoothed scrub() helper (rAF, lerp, parked off-screen),
 * so the reveal reads at scroll tempo instead of firing like a toggle.
 *
 * Progressive enhancement both ways, matching the Reveal contract:
 *  - the words are visible in the delivered HTML; JS only dials their
 *    opacity, so crawlers and no-JS readers always get the sentence.
 *  - prefers-reduced-motion never arms the effect (reducedMotion()).
 */

const FAINT = 0.14;

export function ScrubWords({
  text,
  className,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  as?: "span" | "p" | "h2" | "h3";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;

    const spans = Array.from(
      el.querySelectorAll<HTMLSpanElement>("span[data-w]"),
    );
    if (!spans.length) return;

    const paint = (p: number) => {
      const n = spans.length;
      for (let i = 0; i < n; i++) {
        const t = Math.min(1, Math.max(0, p * n - i));
        spans[i].style.opacity = String(FAINT + (1 - FAINT) * t);
      }
    };

    // Arm lazily: the words keep their SSR full opacity until the
    // block actually approaches the viewport, so the static page (and
    // any audit snapshot taken at load) always shows full-contrast
    // text. Once armed, scrub() parks the correct edge state and
    // smooths the fill; the 40% band arms it before the 90% start
    // line, so the faint state only exists off-screen.
    let stop: (() => void) | undefined;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          stop = scrub(el, 90, 55, paint);
        }
      },
      { rootMargin: "40% 0px 40% 0px" },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      stop?.();
    };
  }, []);

  return (
    <Tag ref={ref as never} className={className}>
      {text
        .split(/\s+/)
        .filter(Boolean)
        .map((word, i, arr) => (
          <span key={`${word}-${i}`} data-w="" style={{ opacity: 1 }}>
            {word}
            {i < arr.length - 1 ? " " : ""}
          </span>
        ))}
    </Tag>
  );
}
