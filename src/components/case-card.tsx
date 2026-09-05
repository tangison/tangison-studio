import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";

/**
 * Gallery card used on the home page and the Cases gallery.
 *
 * Image-led: the artwork fills the card and slowly zooms IN while you
 * hover or focus it, then eases back OUT when you leave (see
 * `.case-card-image` in globals.css — 1.1s expo-out both ways).
 *
 * Two caption placements, both minimal (title + category · year):
 *  - variant="below"  — tight caption row under the image (home + grid)
 *  - variant="overlay" — caption inside the image over a gradient, for
 *    the featured slot (the Collins "Learning to see." pattern)
 */
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
    <Link
      href={`/cases/${project.slug}`}
      className={`case-card group block rounded-[20px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal`}
      aria-label={`${project.name} — view case study`}
    >
      <div className={`relative overflow-hidden art-tile art-shadow ${aspect} bg-paper-raise`}>
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
              <h3 className="mt-2 font-display font-bold text-white tracking-[-0.02em] text-2xl sm:text-3xl md:text-5xl max-w-3xl">
                {project.title}
              </h3>
              <span className="mt-3 md:mt-5 inline-flex items-center gap-2 text-sm font-medium text-white">
                Explore case
                <ArrowUpRight
                  aria-hidden="true"
                  className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-focus-visible:translate-x-0.5 group-focus-visible:-translate-y-0.5"
                  style={{ transitionTimingFunction: "var(--ease-primary)" }}
                />
              </span>
            </div>
          </>
        )}
      </div>

      {/* variant="below" — tight caption row: title left, category · year right */}
      {variant === "below" && (
        <div className="mt-4 flex items-baseline justify-between gap-4">
          <h3
            className={`font-display font-bold tracking-[-0.02em] truncate ${
              featured ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"
            }`}
          >
            {project.title}
          </h3>
          <p className="flex shrink-0 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
            {project.category}
            <span aria-hidden="true" className="text-ink-faint">
              {year}
            </span>
            <ArrowUpRight
              aria-hidden="true"
              className="w-4 h-4 -translate-x-1 opacity-0 transition-transform duration-500 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
              style={{ transitionTimingFunction: "var(--ease-primary)" }}
            />
          </p>
        </div>
      )}
    </Link>
  );
}
