import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { CaseCard } from "@/components/case-card";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cases | Studio Case Studies in Web, Brand, and Product Design",
  description:
    "Selected projects by Studio, an independent practice in Windhoek, Namibia. Websites, applications, and brand systems for organizations across Africa.",
  alternates: { canonical: "/cases" },
  openGraph: {
    title: "Cases | Studio Case Studies",
    description:
      "Websites, applications, and brand systems by Studio for organizations across Africa.",
  },
};

export default function CasesPage() {
  const [featured, ...rest] = projects;

  return (
    <div className="theme-ink bg-paper text-ink min-h-screen">
      {/* ============ Gallery header — one line, like the reference ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-36 md:pt-44">
        <Reveal>
          <div className="flex items-end justify-between gap-6">
            <h1 className="h1 max-w-2xl">Projects built with focus.</h1>
            <p className="hidden sm:block shrink-0 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">
              {projects.length} · 2015–{new Date().getFullYear()}
            </p>
          </div>
        </Reveal>
      </section>

      {/* ============ Gallery ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-10 md:pt-14 pb-8">
        {/* featured case — full-bleed, caption inside the image */}
        <Reveal variant="zoom">
          <CaseCard
            project={featured}
            featured
            priority
            variant="overlay"
            sizes="(max-width: 1400px) 100vw, 1360px"
          />
        </Reveal>

        {/* the rest — tight 2-col grid, same zoom treatment as home */}
        <div className="mt-6 md:mt-8 grid gap-6 md:gap-8 sm:grid-cols-2">
          {rest.map((p, i) => (
            <Reveal
              key={p.slug}
              delay={(i % 2) * 90}
              variant={i < 2 ? "zoom" : "rise"}
            >
              <CaseCard
                project={p}
                priority={i < 2}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 660px"
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 py-24">
        <Reveal>
          <div className="rounded-[24px] border border-line bg-paper-raise px-6 py-16 md:p-20 text-center">
            <p className="eyebrow">Next</p>
            <h2 className="h2 mt-4">Have something worth building?</h2>
            <p className="mt-4 text-ink-muted max-w-xl mx-auto">
              Every case above started as a conversation.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-ink text-paper text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Start a project
                <ArrowRight aria-hidden="true" className="w-4 h-4" />
              </Link>
              <a
                href={site.whatsapp}
                className="inline-flex items-center gap-2 h-12 px-7 rounded-full border border-line-strong text-sm font-medium hover:bg-teal-mist transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
