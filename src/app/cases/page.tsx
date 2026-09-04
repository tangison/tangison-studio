import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { CaseTile } from "@/components/case-tile";
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
  return (
    <div className="theme-ink bg-paper text-ink min-h-screen">
      {/* ============ Gallery hero ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-36 md:pt-44">
        <Reveal>
          <p className="eyebrow">Cases</p>
          <h1 className="h1 mt-5 max-w-3xl">Projects built with focus.</h1>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-6 max-w-2xl text-ink-muted text-lg leading-relaxed">
            Websites, applications and brand systems designed and built by Studio.
            Each project is grounded in real client needs and shipped to
            production. Hover or tap a tile to see what it is.
          </p>
        </Reveal>
        <Reveal delay={160}>
          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">
            {projects.length} projects · 2015–{new Date().getFullYear()}
          </p>
        </Reveal>
      </section>

      {/* ============ Gallery grid ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-12 md:pt-16 pb-8">
        <div className="grid gap-6 md:gap-8 sm:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 80}>
              <CaseTile project={p} priority={i < 2} />
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
              Tell us about your project. Every case above started as a
              conversation.
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
