"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// One-time global: recalculate trigger positions once the full page (fonts,
// images) has loaded. Viewport resizes are handled by ScrollTrigger itself.
if (typeof window !== "undefined") {
  window.addEventListener(
    "load",
    () => {
      ScrollTrigger.refresh();
    },
    { once: true }
  );
}

/**
 * Scroll reveal wrapper, GSAP ScrollTrigger edition.
 *
 * Same contract and visual language as the original IntersectionObserver
 * version (design.md: fade-rise / zoom-settle, reveal once, no reverse):
 * the element is VISIBLE in the delivered HTML/CSS. At trigger time JS adds
 * .prepare (hidden, no transition), flushes layout, then adds .revealed in
 * the same tick, so the CSS transition plays exactly once. If JS never
 * loads, content simply stays visible. prefers-reduced-motion collapses to
 * visible immediately. useGSAP scopes the effect and reverts on unmount.
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

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches;
      if (reduce) {
        el.classList.add("revealed");
        return;
      }

      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: () => {
          el.classList.add("prepare");
          void el.offsetHeight; // flush layout: lock in the hidden start state
          el.classList.add("revealed");
        },
      });
      return () => st.kill();
    },
    { scope: ref }
  );

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
