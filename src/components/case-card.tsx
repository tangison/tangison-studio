import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";

/**
 * Collins-style tight gallery card for the home page.
 *
 * Image-led: the artwork fills the card and slowly zooms IN while you
 * hover or focus it, then eases back OUT when you leave (see
 * `.case-card-image` in globals.css — 1.1s expo-out both ways).
 *
 * Very little copy: the caption is always visible but minimal —
 * short title + tight category · year, nothing else. The arrow
 * slides in on hover as the only affordance.
 */
export function CaseCard({
  project,
  featured = false,
  priority = false,
  sizes,
}: {
  project: Project;
  featured?: boolean;
  priority?: boolean;
  sizes: string;
}) {
  const year = project.eyebrow.split(" · ").pop() ?? "";

  return (
    <Link
      href={`/cases/${project.slug}`}
      className="case-card group block rounded-[20px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"
      aria-label={`${project.name} — view case study`}
    >
      <div
        className={`relative overflow-hidden rounded-[20px] border border-line bg-paper-raise ${
          featured ? "aspect-[16/10] md:aspect-[21/9]" : "aspect-[4/3]"
        }`}
      >
        <Image
          src={`/images/paintings/projects/${project.slug}.webp`}
          alt={`Soft artwork representing ${project.name}: ${project.eyebrow}`}
          fill
          priority={priority}
          sizes={sizes}
          className="case-card-image object-cover"
        />
      </div>

      {/* tight caption — title left, category · year right, arrow on hover */}
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
    </Link>
  );
}
