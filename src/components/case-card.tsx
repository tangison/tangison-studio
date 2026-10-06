import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";

/**
 * Gallery card used on the home page and the Cases gallery.
 *
 * Image-led: the artwork fills the card and slowly zooms IN while you
 * hover or focus it, then eases back OUT when you leave (see
 * `.case-card-image` in globals.css: 1.1s expo-out both ways).
 *
 * Two caption placements, both minimal (title + category · year):
 *  - variant="below" : tight caption row under the image (home + grid)
 *  - variant="overlay": caption inside the image over a gradient, for
 *    the featured slot (the Collins "Learning to see." pattern)
 *
 * Every card carries an explicit action row under the artwork:
 *  - "Preview case" opens the case study on this site
 *  - "Live site" (where the client site is live) opens it in a new tab
 * The image itself stays a full-card link to the case study, so the
 * actions are additive, never a replacement for the existing path.
 *
 * The live-site link is rendered as a SIBLING of the case-study link
 * (never nested inside it): the case-study link is stretched over the
 * artwork, and the action chips sit below it in their own row.
 */

/** Small pill chip used for the per-case actions. */
function chip(base: string) {
  return (
    "inline-flex items-center gap-1.5 rounded-full border border-line " +
    "px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] " +
    "text-ink-muted transition-colors duration-300 " +
    "hover:border-teal hover:text-teal focus-visible:outline-2 " +
    "focus-visible:outline-offset-4 focus-visible:outline-teal " +
    base
  );
}

export function CaseCard({
  project,
  featured = false,
  priority = false,
  sizes,
  variant = "below",
}: {
  project: Project;
  featured?: boolean;
  priority?: boolean;
  sizes: string;
  variant?: "below" | "overlay";
}) {
  const year = project.eyebrow.split(" · ").pop() ?? "";
  const aspect = featured
    ? variant === "overlay"
      ? "aspect-[16/10] md:aspect-[21/9]"
      : "aspect-[16/10] md:aspect-[21/9]"
    : "aspect-[4/3]";

  return (
    <article className="case-card group flex flex-col">
      <div
        className={`relative overflow-hidden art-tile art-shadow ${aspect} bg-paper-raise rounded-[20px]`}
      >
        <Image
          src={`/images/paintings/projects/${project.slug}.webp`}
          alt={`Soft artwork representing ${project.name}: ${project.eyebrow}`}
          fill
          priority={priority}
          sizes={sizes}
          className="case-card-image object-cover"
        />

        {variant === "overlay" && (
          <>
            {/* scrim keeps the overlaid caption readable */}
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(8,10,12,0.78) 0%, rgba(8,10,12,0.30) 45%, rgba(8,10,12,0) 68%)",
              }}
            />
            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 md:p-10">
              <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-white/70">
                {project.category}
                <span className="text-white/45"> · {year}</span>
              </p>
              <h2 className="mt-2 font-display font-bold text-white tracking-[-0.02em] text-2xl sm:text-3xl md:text-5xl max-w-3xl">
                {project.title}
              </h2>
              <span className="mt-3 md:mt-5 inline-flex items-center gap-2 text-sm font-medium text-white">
                Preview case
                <ArrowUpRight
                  aria-hidden="true"
                  className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-focus-visible:translate-x-0.5 group-focus-visible:-translate-y-0.5"
                  style={{ transitionTimingFunction: "var(--ease-primary)" }}
                />
              </span>
            </div>
          </>
        )}

        {/* Stretched link: the whole artwork previews the case study.
            Sits under the overlay caption (z-1); action chips live
            outside this element, so links never nest. */}
        <Link
          href={`/cases/${project.slug}`}
          className="absolute inset-0 z-[1] rounded-[20px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"
          aria-label={`${project.name}: preview the case study`}
        />
      </div>

      {/* variant="below": tight caption row: title left, category · year right */}
      {variant === "below" && (
        <div className="mt-4 flex items-baseline justify-between gap-4">
          <h2
            className={`font-display font-bold tracking-[-0.02em] truncate ${
              featured ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"
            }`}
          >
            <Link
              href={`/cases/${project.slug}`}
              className="hover:text-teal transition-colors duration-300"
            >
              {project.title}
            </Link>
          </h2>
          <p className="flex shrink-0 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
            {project.category}
            <span aria-hidden="true" className="text-ink-faint">
              {year}
            </span>
            <ArrowUpRight
              aria-hidden="true"
              className="w-4 h-4 -translate-x-1 opacity-0 transition-transform duration-500 group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100"
              style={{ transitionTimingFunction: "var(--ease-primary)" }}
            />
          </p>
        </div>
      )}

      {/* Action row: preview the case, and where the client site is
          live, go straight to it. Every case carries at least the
          preview action; live proof is one tap away when it exists. */}
      <div
        className={`flex flex-wrap items-center gap-2 ${
          variant === "overlay" ? "mt-4 md:mt-5 justify-end" : "mt-3"
        }`}
      >
        {variant === "below" && (
          <Link href={`/cases/${project.slug}`} className={chip("")}>
            Preview case
            <ArrowRight aria-hidden="true" className="w-3.5 h-3.5" />
          </Link>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className={chip("border-line-strong text-ink")}
          >
            Live site
            <ArrowUpRight aria-hidden="true" className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </article>
  );
}
