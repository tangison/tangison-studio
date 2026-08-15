"use client";

/**
 * Homepage work rotator.
 *
 * Auto-rotates the featured entries sourced from the Work collection
 * (src/lib/case-studies.ts, the single source of truth for /work and
 * /work/[slug]). Content is passed in as plain data from the server
 * component so no case-study text is duplicated here.
 *
 * Behaviour:
 * - Advances every ROTATE_MS.
 * - Pauses on hover, on focus within, and when the tab is hidden.
 * - Respects prefers-reduced-motion by disabling auto-advance.
 * - Manual controls: previous, next, and direct slide selection.
 * - All slides stay in the DOM so the markup remains crawlable.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { StudioButton } from "@/components/studio/button";

const ROTATE_MS = 6500;

export interface WorkRotatorItem {
  slug: string;
  name: string;
  industry: string;
  descriptor: string;
  outcomeH2: string;
  services: string[];
  url: string;
  painting: string;
  year: string;
}

interface WorkRotatorProps {
  items: WorkRotatorItem[];
}

export function WorkRotator({ items }: WorkRotatorProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const regionRef = useRef<HTMLDivElement | null>(null);

  const count = items.length;

  const go = useCallback(
    (next: number) => {
      if (count === 0) return;
      setActive(((next % count) + count) % count);
    },
    [count],
  );

  const next = useCallback(() => go(active + 1), [active, go]);
  const prev = useCallback(() => go(active - 1), [active, go]);

  // Respect the reduced-motion preference.
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Pause rotation while the tab is hidden.
  useEffect(() => {
    if (typeof document === "undefined") return;
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // The rotation timer.
  useEffect(() => {
    if (paused || reduced || count <= 1) return;
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % count);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [paused, reduced, count]);

  // Keyboard support on the region itself.
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      prev();
    }
  };

  if (count === 0) return null;

  return (
    <div
      ref={regionRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Selected work, rotating"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          setPaused(false);
        }
      }}
      className="relative rounded-[25px] outline-none focus-visible:ring-2 focus-visible:ring-signal-teal"
    >
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {`Project ${active + 1} of ${count}: ${items[active].name}`}
      </div>

      <div className="relative">
        {items.map((project, index) => {
          const isActive = index === active;
          return (
            <div
              key={project.slug}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${count}: ${project.name}`}
              aria-hidden={!isActive}
              className={
                isActive
                  ? "opacity-100 transition-opacity duration-500 ease-out"
                  : "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-out"
              }
            >
              <article className="grid items-center gap-6 md:grid-cols-2 md:gap-10">
                <div>
                  <div className="aspect-[4/3] overflow-hidden rounded-[25px] bg-ocean-mist">
                    <Image
                      src={project.painting}
                      alt={`An oil painting representing ${project.name}: ${project.industry.toLowerCase()}.`}
                      width={800}
                      height={600}
                      className="h-full w-full object-cover"
                      priority={index === 0}
                      loading={index === 0 ? undefined : "lazy"}
                      sizes="(max-width: 768px) 100vw, 540px"
                    />
                  </div>
                </div>

                <div>
                  <p className="mb-2 font-jetbrains text-[10px] uppercase tracking-[0.2em] text-ink-muted">
                    {project.industry} <span aria-hidden="true">·</span> {project.year}
                  </p>
                  <h3 className="mb-3 font-display text-2xl font-bold text-ink md:text-3xl">
                    <Link
                      href={`/work/${project.slug}`}
                      className="transition-colors hover:text-signal-teal-text"
                      tabIndex={isActive ? 0 : -1}
                    >
                      {project.name}
                    </Link>
                  </h3>
                  <p className="mb-4 font-satoshi text-base leading-relaxed text-ink-muted">
                    {project.descriptor}
                  </p>
                  <p className="mb-4 font-satoshi text-sm font-medium leading-relaxed text-ink">
                    {project.outcomeH2}
                  </p>
                  <div className="mb-5 flex flex-wrap gap-1.5">
                    {project.services.map((service) => (
                      <span
                        key={service}
                        className="inline-flex items-center rounded-[25px] bg-ocean-mist px-2.5 py-1 text-xs font-medium text-ink"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <StudioButton
                      href={`/work/${project.slug}`}
                      variant="secondary"
                      size="sm"
                      hasArrow
                      arrowType="right"
                      tabIndex={isActive ? 0 : -1}
                    >
                      Read {project.name} case study
                    </StudioButton>
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        tabIndex={isActive ? 0 : -1}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-signal-teal-text"
                      >
                        {project.name} live site <ArrowUpRight className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous project"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-signal-teal hover:text-signal-teal-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-teal"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next project"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-signal-teal hover:text-signal-teal-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-teal"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          {items.map((project, index) => (
            <button
              key={project.slug}
              type="button"
              onClick={() => go(index)}
              aria-label={`Show ${project.name}`}
              aria-current={index === active}
              className={
                index === active
                  ? "h-2 w-8 rounded-full bg-signal-teal transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-teal"
                  : "h-2 w-2 rounded-full bg-ink/20 transition-all hover:bg-ink/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-teal"
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
