"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Info } from "lucide-react";
import type { Project } from "@/lib/projects";

/**
 * Gallery tile for the Cases page and home featured section.
 *
 * Behaviour requested: the image takes up the full space, the text is hidden,
 * and it reveals on a button.
 *  - Pointer devices: hover (or focus) reveals the caption overlay.
 *  - Keyboard: focus-visible reveals the overlay; the tile is a single link.
 *  - Touch: the info chip (48px) toggles the overlay; tapping the image
 *    navigates straight to the case.
 */
export function CaseTile({
  project,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 640px",
}: {
  project: Project;
  priority?: boolean;
  sizes?: string;
}) {
  const [pinned, setPinned] = useState(false);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const year = project.eyebrow.split(" · ").pop() ?? "";

  return (
    <article
      className={`case-tile group relative overflow-hidden rounded-[20px] border border-line bg-paper-raise ${pinned ? "reveal-on" : ""}`}
    >
      <Link
        ref={linkRef}
        href={`/cases/${project.slug}`}
        className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal rounded-[20px]"
        aria-label={`${project.name} — view case study`}
      >
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={`/images/paintings/projects/${project.slug}.webp`}
            alt={`Soft artwork representing ${project.name}: ${project.eyebrow}`}
            fill
            priority={priority}
            sizes={sizes}
            className="case-image object-cover"
          />

          {/* caption overlay — hidden until hover / focus / chip tap */}
          <div
            className="case-overlay absolute inset-0 flex flex-col justify-end pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(8,10,12,0.82) 0%, rgba(8,10,12,0.35) 45%, rgba(8,10,12,0) 70%)",
            }}
          >
            <div className="p-5 sm:p-7 flex items-end justify-between gap-4">
              <div className="min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/70">
                  {project.category}
                  {year && (
                    <span className="text-white/45"> · {year}</span>
                  )}
                </p>
                <h3 className="mt-1.5 font-display font-bold text-white text-xl sm:text-2xl tracking-[-0.02em] truncate">
                  {project.title}
                </h3>
                <p className="mt-1.5 hidden sm:block text-sm text-white/75 line-clamp-2 max-w-md">
                  {project.short}
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-white">
                  View case
                  <ArrowUpRight aria-hidden="true" className="w-4 h-4" />
                </span>
              </div>
              {project.live && (
                <span className="hidden md:inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/30 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/80">
                  Live
                  <ArrowUpRight aria-hidden="true" className="w-3 h-3" />
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>

      {/* touch reveal chip — always visible on touch devices */}
      <button
        type="button"
        aria-label={pinned ? `Hide details for ${project.name}` : `Show details for ${project.name}`}
        aria-pressed={pinned}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setPinned((v) => !v);
        }}
        className="lg:hidden absolute right-4 top-4 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full text-white"
        style={{
          background: "rgba(8,10,12,0.45)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.25)",
        }}
      >
        <Info aria-hidden="true" className="w-5 h-5" />
      </button>
    </article>
  );
}
