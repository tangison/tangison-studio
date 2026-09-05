import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { navLinks, site } from "@/lib/site";
import { TangisonLogo } from "@/components/tangison-logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-line mt-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 py-16 md:py-24">
        <TangisonLogo
          href="/"
          className="h-9 md:h-11 w-auto text-ink select-none"
        />

        <div className="mt-10 md:mt-14 grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <h2 className="h3">Seen enough? Tell us what you are building.</h2>
            <p className="mt-3 text-ink-muted max-w-md">
              Brand, product, and the systems behind it.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-line-strong px-6 h-12 text-sm font-medium hover:bg-teal-mist transition-colors"
            >
              Start a project brief
              <ArrowRight aria-hidden="true" className="w-4 h-4" />
            </Link>
          </div>

          <nav aria-label="Footer navigation">
            <p className="eyebrow mb-5">Navigate</p>
            <ul className="flex flex-col gap-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-ink-muted hover:text-ink link-underline">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/audit" className="text-ink-muted hover:text-ink link-underline">
                  Free audit
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <p className="eyebrow mb-5">Contact</p>
            <a
              href={`mailto:${site.email}`}
              className="text-ink-muted hover:text-ink link-underline"
            >
              {site.email}
            </a>
            <p className="mt-4 text-sm text-ink-muted">{site.location}</p>
            <a
              href={site.group.utm}
              className="mt-6 inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink link-underline"
            >
              Part of {site.group.name}
              <ArrowRight aria-hidden="true" className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-line flex flex-col sm:flex-row justify-between gap-3">
          <p className="text-sm text-ink-faint">{site.copyright}</p>
          <p className="text-sm text-ink-faint">{site.hours}</p>
        </div>
      </div>
    </footer>
  );
}
