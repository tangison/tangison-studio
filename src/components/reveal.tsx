"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Scroll reveal wrapper: fades content up as it enters the viewport.
 * variant="zoom" settles the block into place (slightly enlarged -> 1)
 * instead of rising, for the Collins-style gallery cards.
 *
 * Robustness contract (paired with globals.css): the element is VISIBLE
 * in the HTML/CSS as delivered. Only at observe time does JS add
 * .prepare (hidden, no transition) and then .revealed (animates in) in
 * the same tick — a forced reflow between them locks the start state.
 * If JS never loads, content simply stays visible: never a blank page.
 * prefers-reduced-motion collapses everything to visible; browsers
 * without IntersectionObserver stay visible too.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
  variant = "rise",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "li" | "figure";
  variant?: "rise" | "zoom";
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const enter = () => {
      // skip straight to visible when the user asks for less motion
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches;
      if (reduce) {
        el.classList.add("revealed");
        return;
      }
      el.classList.add("prepare");
      void el.offsetHeight; // flush layout: lock in the hidden start state
      el.classList.add("revealed");
    };

    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("revealed");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            enter();
            io.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${variant === "zoom" ? "reveal-zoom" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
