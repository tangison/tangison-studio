"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Clip-path wipe on first entry. A wipe reads as a change of state rather
 * than an arrival, so it is reserved for the page's one commitment beat:
 * the closing ask. The block is visible in the delivered HTML; at observe
 * time JS hides it and plays a single bottom-up wipe (inset clip), once.
 * No JS or prefers-reduced-motion: the block simply sits there, fully
 * visible. useGSAP reverts everything on unmount.
 */
export function WipeReveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches;
      if (reduce) return;

      gsap.set(el, { clipPath: "inset(0% 0% 100% 0%)" });
      gsap.to(el, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.1,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: el,
          start: "top 84%",
          once: true,
        },
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
