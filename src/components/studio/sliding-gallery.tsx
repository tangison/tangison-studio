"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";

/**
 * SlidingGallery — auto-advancing image slideshow.
 * Uses CSS transitions for smooth sliding.
 * No external dependencies.
 */

interface SlidingGalleryProps {
  images: { src: string; alt: string }[];
  interval?: number;
}

export function SlidingGallery({ images, interval = 4000 }: SlidingGalleryProps) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [next, interval]);

  return (
    <div className="relative w-full aspect-[16/9] overflow-hidden rounded-[25px] bg-ocean-mist">
      {/* Slides */}
      {images.map((img, i) => (
        <div
          key={i}
          id={`gallery-slide-${i}`}
          role="tabpanel"
          aria-labelledby={`gallery-tab-${i}`}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            width={1080}
            height={608}
            className="absolute inset-0 w-full h-full object-cover"
            priority={i === 0}
            loading={i === 0 ? "eager" : "lazy"}
            sizes="(max-width: 768px) 100vw, 1080px"
          />
        </div>
      ))}

      {/* Dots */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10"
        role="tablist"
        aria-label="Gallery slides"
      >
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current ? "bg-signal-teal w-6" : "bg-skeleton-bone/50"
            }`}
            aria-label={`Go to slide ${i + 1}`}
            aria-selected={i === current}
            role="tab"
            aria-controls={`gallery-slide-${i}`}
            id={`gallery-tab-${i}`}
          />
        ))}
      </div>

      {/* Arrow controls */}
      <button
        type="button"
        onClick={() => setCurrent((c) => (c - 1 + images.length) % images.length)}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-atlantic-black/40 text-skeleton-bone flex items-center justify-center hover:bg-atlantic-black/60 transition-colors z-10"
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        type="button"
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-atlantic-black/40 text-skeleton-bone flex items-center justify-center hover:bg-atlantic-black/60 transition-colors z-10"
        aria-label="Next slide"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
