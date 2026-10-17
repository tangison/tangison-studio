"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { enterOnce, reducedMotion } from "@/lib/scroll-motion";

/**
 * Clip-path wipe on first entry. A wipe reads as a change of state rather
 * than an arrival, so it is reserved for the page's one commitment beat:
 * the closing ask. The block is visible in the delivered HTML; after the
 * first paint JS arms it (wipe-armed class: hidden, no transition) and on
 * entry plays a single bottom-up wipe via the wipe-play class transition.
 * No JS or prefers-reduced-motion: the block simply sits there, fully
 * visible. The transition lives in globals.css (.wipe-armed/.wipe-play).
 */
export function WipeReveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reducedMotion()) return;

    let cleanup: () => void = () => {};

    // Arm one frame after hydration so the armed (hidden) state never
    // paints before the static, visible HTML has had its frame.
    const armId = requestAnimationFrame(() => {
      el.classList.add("wipe-armed");
      void el.offsetHeight; // flush: arm without transitioning
      cleanup = enterOnce(el, 84, () => {
        requestAnimationFrame(() => el.classList.add("wipe-play"));
      });
    });

    return () => {
      cancelAnimationFrame(armId);
      cleanup();
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
