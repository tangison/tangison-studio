"use client";

/**
 * Native scroll-motion helpers. These replace the GSAP ScrollTrigger
 * dependency (removed for the 500KB transfer budget and the house rule of
 * owning the critical path, same as the main site's framer-motion removal).
 * The four effects that used GSAP (Reveal, WipeReveal, ProcessLine,
 * ParallaxArt) map onto these two primitives with identical triggers:
 *
 *  - enterOnce: fires once when the element's top crosses `startVh` of the
 *    viewport height (ScrollTrigger "top N%"), IntersectionObserver based,
 *    zero work per scroll frame.
 *  - scrub: reports element scroll progress [0..1] between a start and end
 *    trigger, with the same one-second catch-up feel scrub:1 had, via a
 *    rAF lerp. One listener per scrubbed element, passive scroll + resize.
 */

export function enterOnce(
  el: Element,
  startVh: number,
  onEnter: () => void
): () => void {
  if (typeof IntersectionObserver === "undefined") {
    onEnter();
    return () => {};
  }
  // rootMargin bottom of -(100 - startVh)% shrinks the viewport line so the
  // entry fires exactly where ScrollTrigger's "top N%" fired.
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          io.disconnect();
          onEnter();
          return;
        }
      }
    },
    { rootMargin: `0px 0px -${Math.max(0, 100 - startVh)}% 0px`, threshold: 0 }
  );
  io.observe(el);
  return () => io.disconnect();
}

export function scrub(
  el: Element,
  startVh: number,
  endVh: number,
  onProgress: (p: number) => void,
  smooth = true
): () => void {
  let raf = 0;
  let current = 0;
  let running = true;
  let inView = false;

  const target = (): number => {
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    const startLine = (startVh / 100) * vh; // progress 0: rect.top === startLine
    const endLine = (endVh / 100) * vh; // progress 1: rect.bottom === endLine
    const span = startLine - endLine + rect.height;
    if (span <= 0) return rect.top <= startLine ? 1 : 0;
    const raw = (startLine - rect.top) / span;
    return Math.min(1, Math.max(0, raw));
  };

  const tick = () => {
    if (!running || !inView) {
      raf = 0;
      return;
    }
    const t = target();
    current = smooth ? current + (t - current) * 0.14 : t;
    if (Math.abs(t - current) < 0.004) current = t;
    onProgress(current);
    if (current !== t) {
      raf = requestAnimationFrame(tick);
    } else {
      raf = 0;
    }
  };

  const kick = () => {
    if (!running || !inView || raf) return;
    raf = requestAnimationFrame(tick);
  };

  const onScroll = () => kick();

  // Scroll + resize listeners only ever kick the loop; the loop itself
  // costs zero frames while the element is off-screen. The IO gate below
  // keeps idle pages (and the load window) free of rAF churn: before the
  // element approaches the viewport the edge value is written once and
  // the loop never runs.
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  let io: IntersectionObserver | undefined;
  if (typeof IntersectionObserver !== "undefined") {
    // One band around the trigger range so the loop is live slightly
    // before progress can leave its clamped edges.
    io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          inView = entry.isIntersecting;
          if (inView) {
            kick();
          } else if (!raf) {
            // Park at the correct edge the moment the element leaves.
            onProgress(target());
          }
        }
      },
      // generous band: run whenever the element is within ~1.5 viewports
      { rootMargin: "75% 0px 75% 0px", threshold: 0 }
    );
    io.observe(el);
  } else {
    inView = true;
    kick();
  }

  // Static edge value before any scroll: start state correct without churn.
  onProgress(target());

  return () => {
    running = false;
    inView = false;
    if (raf) cancelAnimationFrame(raf);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    io?.disconnect();
  };
}

/** ScrollTrigger.start "top N%": progress zero line for the element's top. */
export function reducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
