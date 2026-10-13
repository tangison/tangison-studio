"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Scroll-scrubbed parallax for the studio's painting tiles (GSAP
 * ScrollTrigger, scrub 1). Place INSIDE an art-tile (which clips via
 * overflow hidden) and wrap the <Image>:
 *
 *   <div className="relative art-tile art-shadow aspect-[4/3]">
 *     <ParallaxArt>
 *       <Image fill className="object-cover" ... />
 *     </ParallaxArt>
 *   </div>
 *
 * The inner layer scales up just enough (distance*2%) that the ±distance/2
 * y-drift never exposes an edge, then the drift follows the tile crossing
 * the viewport. Reduced motion or no JS: no scale, no drift, the image sits
 * at its natural framing. The case-card gallery keeps its zoom interaction
 * untouched: parallax lives on the wrapper, hover-zoom on the image itself.
 */
export function ParallaxArt({
  children,
  distance = 6,
  className = "",
}: {
  children: ReactNode;
  distance?: number;
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

      gsap.fromTo(
        el,
        { yPercent: -distance / 2, scale: 1 + (distance * 2) / 100 },
        {
          yPercent: distance / 2,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement ?? el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={`absolute inset-0 ${className}`}>
      {children}
    </div>
  );
}
