"use client";

import { useEffect, useRef } from "react";

/**
 * The studio hero film: a short looping painting-style clip that follows
 * the hero slogan inline (never a full-bleed background). It never blocks
 * first paint: the WebP poster draws immediately, and the film's source
 * attaches at the window load event (not mid-download), so the poster,
 * the fonts and hydration never compete with it. Playback (muted, inline,
 * looped) starts as soon as a frame is ready. With prefers-reduced-motion
 * the poster simply stays, motionless.
 *
 * LCP note: Chromium makes the first decoded film frame this page's LCP
 * element (a poster display does not count). That is why the loop is so
 * small and why it loads the moment the critical path is done: a small,
 * early film keeps LCP under 2.5s while total transfer stays inside the
 * 500KB budget.
 *
 * v6: the v5 clip re-timed to 0.8x playback speed (setpts 1.25, 180 frames
 * over 9.3s) and re-encoded under hard bitrate ceilings (~75kbps webm,
 * ~99kbps mp4) at the same 640x400. The loop reads calmer and drops from
 * ~110KB to ~87KB webm (~115KB mp4). The browser downloads only the
 * source it can use.
 */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return; // poster only: no autoplay, no fetch
    }

    let cancelled = false;

    const arm = () => {
      if (cancelled || !video.isConnected) return;
      const sources = video.querySelectorAll("source");
      // data-src holds the real source until this moment; without JS the
      // poster stands in, exactly as reduced-motion does.
      sources.forEach((s) => {
        const real = s.getAttribute("data-src");
        if (real) {
          s.setAttribute("src", real);
          s.removeAttribute("data-src");
        }
      });
      video.load();
      // A poster-only element has nothing to play until now; request
      // playback once the film is loaded. Muted autoplay, so allowed.
      video.play().catch(() => {});
    };

    if (document.readyState === "complete") {
      arm();
    } else {
      window.addEventListener("load", arm, { once: true });
    }

    return () => {
      cancelled = true;
    };
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
      <source data-src="/videos/hero-v6.webm" type="video/webm" />
      <source data-src="/videos/hero-v6.mp4" type="video/mp4" />
    </video>
  );
}
