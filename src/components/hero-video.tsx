"use client";

import { useEffect, useRef } from "react";

/**
 * The studio hero film: a short looping painting-style clip that follows
 * the hero tagline inline (never a full-bleed background). It never blocks
 * first paint: the browser draws the lean WebP poster immediately, and
 * playback (muted, inline, looped) starts only once the element is on
 * screen. With prefers-reduced-motion the poster simply stays, motionless.
 *
 * v3: re-cut from v2 with the bottom-right watermark zone delogo'd
 * (interpolated away), the corner precision-cropped (752x470, exact 16:10),
 * and re-encoded under a new filename so every cache layer (browser and
 * CDN edge) drops any previously cached copy.
 */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return; // poster only: no autoplay, no fetch
    }

    if (typeof IntersectionObserver === "undefined") {
      video.play().catch(() => {});
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
            io.disconnect();
          }
        }
      },
      { threshold: 0.25 }
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      poster="/videos/hero-poster-v3.webp"
      disablePictureInPicture
      aria-hidden="true"
      className="h-full w-full object-cover"
    >
      <source src="/videos/hero-v3.mp4" type="video/mp4" />
    </video>
  );
}
