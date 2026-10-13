"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Signature move: the process heading says "Five steps, one connecting
 * line." This draws that line for real. A Signal Teal hairline threads
 * through the five process cards behind them (visible in the gutters),
 * drawn left to right on desktop, top to bottom on mobile, as the
 * visitor scrolls the section. It replaces the old segmented connector
 * stubs with one continuous, scroll-drawn line.
 *
 * No JS or prefers-reduced-motion: the line sits fully drawn (the
 * stroke-dashoffset attribute is 0 in the markup); only with motion does
 * JS rewind it and scrub the draw across the section's travel.
 */
export function ProcessLine() {
  const ref = useRef<HTMLDivElement>(null);
  const hRef = useRef<SVGPathElement>(null);
  const vRef = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches;
      if (reduce) return;

      const targets = [hRef.current, vRef.current].filter(
        (p): p is SVGPathElement => Boolean(p)
      );
      if (targets.length === 0 || !ref.current) return;

      targets.forEach((p) => p.setAttribute("stroke-dashoffset", "1"));

      gsap.to(targets, {
        attr: { "stroke-dashoffset": 0 },
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          end: "bottom 60%",
          scrub: 1,
        },
      });
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0"
    >
      {/* desktop: one horizontal hairline through the card row */}
      <svg
        className="hidden lg:block absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          ref={hRef}
          d="M 0 50 H 100"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={0}
          fill="none"
          stroke="var(--teal)"
          strokeWidth={1}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {/* mobile: the same line, threading the stacked cards downward */}
      <svg
        className="lg:hidden absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          ref={vRef}
          d="M 50 0 V 100"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={0}
          fill="none"
          stroke="var(--teal)"
          strokeWidth={1}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
