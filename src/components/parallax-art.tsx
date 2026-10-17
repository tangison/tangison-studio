"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { scrub, reducedMotion } from "@/lib/scroll-motion";

/**
 * Scroll-scrubbed parallax for the studio's painting tiles (native rAF
 * edition of the ScrollTrigger original, scrub 1). Place INSIDE an art-tile
 * (which clips via overflow hidden) and wrap the <Image>:
 *
 *   <div className="relative art-tile art-shadow aspect-[4/3]">
 *     <ParallaxArt>
 *       <Image fill className="object-cover" ... />
 *     </ParallaxArt>
 *   </div>
 *
 * The inner layer scales up just enough (distance*2%) that the ±distance/2
 * y-drift never exposes an edge, then the drift follows the tile crossing
 * the viewport (start "top bottom", end "bottom top"). Reduced motion or
 * no JS: no scale, no drift, the image sits at its natural framing. The
 * case-card gallery keeps its zoom interaction untouched: parallax lives
 * on the wrapper, hover-zoom on the image itself.
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

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reducedMotion()) return;

    const scale = 1 + (distance * 2) / 100;
    return scrub(
      el.parentElement ?? el,
      100,
      0,
      (p) => {
        const y = -distance / 2 + distance * p;
        el.style.transform = `translate3d(0, ${y.toFixed(3)}%, 0) scale(${scale})`;
      },
      true
    );
  }, []);

  return (
    <div ref={ref} className={`absolute inset-0 ${className}`}>
      {children}
    </div>
  );
}
