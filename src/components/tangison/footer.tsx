"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TangisonMark } from "@/components/shared/tangison-mark";

/**
 * Footer — hyper-minimal, per-page-category.
 *
 * Benchmarked against wearecollins.com, whose footer carries 26 words and six
 * destinations. The previous version of this footer carried nineteen links on
 * every page, which is a sitemap, not a footer. Each category below now shows
 * at most four links chosen for where that reader actually is.
 *
 * The logo is the real parent-company mark, shared byte-for-byte with
 * tangison.com. It inherits currentColor, so it renders in Studio's palette
 * here and in the parent's palette there. Shared shape, native colour.
 */

type Category = "work" | "labs" | "legal" | "default";

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

/** Resolve the page category from the route. */
export function categoryFor(pathname: string): Category {
  if (pathname.startsWith("/legal")) return "legal";
  if (pathname.startsWith("/work") || pathname.startsWith("/services")) return "work";
  if (
    pathname.startsWith("/resources") ||
    pathname.startsWith("/blog") ||
    pathname.startsWith("/studio")
  ) {
    return "labs";
  }
  return "default";
}

/** Footer content per category: a lead line, a CTA, and up to four links. */
const CONTENT: Record<
  Category,
  { line: string; cta: { label: string; href: string } | null; links: FooterLink[] }
> = {
  // On Work and Services the reader is evaluating us. Push the brief.
  work: {
    line: "Seen enough? Tell us what you are building.",
    cta: { label: "Start a project brief", href: "/contact" },
    links: [
      { label: "Work", href: "/work" },
      { label: "Services", href: "/services" },
      { label: "Free audit", href: "/audit" },
      { label: "Contact", href: "/contact" },
    ],
  },
  // On writing and studio pages the reader is browsing. Push the parent company.
  labs: {
    line: "Tangison Studio is the creative arm of Tangison Technologies.",
    cta: { label: "Visit Tangison Technologies", href: "https://tangison.com/?utm_source=studio.tangison.com&utm_medium=footer&utm_campaign=cross-site" },
    links: [
      { label: "Blog", href: "/blog" },
      { label: "The Studio", href: "/studio" },
      { label: "Resources", href: "/resources" },
      { label: "Contact", href: "/contact" },
    ],
  },
  // Legal pages get the stripped variant. No CTA, no selling.
  legal: {
    line: "",
    cta: null,
    links: [
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
      { label: "Cookies", href: "/legal/cookies" },
    ],
  },
  default: {
    line: "Brand, product, and the systems behind it.",
    cta: { label: "Start a project brief", href: "/contact" },
    links: [
      { label: "Work", href: "/work" },
      { label: "Services", href: "/services" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
};

const PARENT_HREF =
  "https://tangison.com/?utm_source=studio.tangison.com&utm_medium=footer&utm_campaign=cross-site";

export function Footer() {
  const pathname = usePathname() || "/";
  const category = categoryFor(pathname);
  const { line, cta, links } = CONTENT[category];
  const isLegal = category === "legal";

  return (
    <footer className="bg-atlantic-black text-skeleton-bone" role="contentinfo">
      <h2 className="sr-only">Site footer</h2>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-12">
        {/* Lead row: mark plus the one line that matters for this category. */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-4">
            <Link href="/" aria-label="Tangison Studio, home" className="inline-block text-skeleton-bone">
              <TangisonMark height={22} title={null} />
            </Link>
            {line ? (
              <p className="font-satoshi text-base sm:text-lg text-skeleton-bone/80 max-w-sm text-balance">
                {line}
              </p>
            ) : null}
          </div>

          {cta ? (
            cta.href.startsWith("http") ? (
              <a
                href={cta.href}
                className="group inline-flex items-center gap-2 self-start font-satoshi text-base text-skeleton-bone underline-offset-4 hover:text-signal-teal hover:underline transition-colors md:self-end"
              >
                {cta.label}
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                  &rarr;
                </span>
              </a>
            ) : (
              <Link
                href={cta.href}
                className="group inline-flex items-center gap-2 self-start font-satoshi text-base text-skeleton-bone underline-offset-4 hover:text-signal-teal hover:underline transition-colors md:self-end"
              >
                {cta.label}
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            )
          ) : null}
        </div>

        {/* Hairline, then the short link row. */}
        <div className="mt-8 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="font-satoshi text-sm text-skeleton-bone/60 hover:text-skeleton-bone transition-colors"
                >
                  {l.label}
                </Link>
              ))}
              {!isLegal && (
                <a
                  href="mailto:studio@tangison.com"
                  className="font-satoshi text-sm text-skeleton-bone/60 hover:text-skeleton-bone transition-colors"
                >
                  studio@tangison.com
                </a>
              )}
            </nav>

            {/* The relationship line. Present on every category, including legal. */}
            <a
              href={PARENT_HREF}
              className="font-jetbrains text-[10px] uppercase tracking-[0.18em] text-skeleton-bone/50 hover:text-signal-teal transition-colors"
            >
              Part of Tangison Technologies
            </a>
          </div>

          <p className="mt-5 font-jetbrains text-[9px] uppercase tracking-[0.18em] text-skeleton-bone/40">
            &copy; {new Date().getFullYear()} Tangison Studio &middot; Windhoek, Namibia
          </p>
        </div>
      </div>
    </footer>
  );
}
