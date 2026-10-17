"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { enterOnce, reducedMotion } from "@/lib/scroll-motion";

/**
 * Scroll reveal wrapper, native IntersectionObserver edition.
 *
 * Same contract and visual language as the ScrollTrigger version it
 * replaces (design.md: fade-rise / zoom-settle, reveal once, no reverse):
 * the element is VISIBLE in the delivered HTML/CSS. At trigger time JS adds
 * .prepare (hidden, no transition), flushes layout, then adds .revealed in
 * the same tick, so the CSS transition plays exactly once. If JS never
 * loads, content simply stays visible. prefers-reduced-motion collapses to
 * visible immediately.
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

    if (reducedMotion()) {
      el.classList.add("revealed");
      return;
    }

    return enterOnce(el, 88, () => {
      el.classList.add("prepare");
      void el.offsetHeight; // flush layout: lock in the hidden start state
      el.classList.add("revealed");
    });
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
