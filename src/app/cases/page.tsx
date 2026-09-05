import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { CaseCard } from "@/components/case-card";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cases | Studio Case Studies in Web, Brand, and Product Design",
  description:
    "Selected projects by The Tangison Studio, an independent practice in Windhoek, Namibia. Websites, applications, and brand systems for organizations across Africa.",
  alternates: { canonical: "/cases" },
  openGraph: {
    title: "Cases | The Tangison Studio",
    description:
      "Websites, applications, and brand systems by The Tangison Studio for organizations across Africa.",
    images: [{ url: "/images/og/cases.png", width: 1200, height: 630 }],
  },
};

export default function CasesPage() {
  const [featured, ...rest] = projects;

  return (
    <div className="bg-paper text-ink min-h-screen">
      {/* ============ Gallery header — one painting, one line ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-36 md:pt-44">
        <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-end">
          <Reveal>
            <h1 className="h1">The work.</h1>
            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-muted">
              {projects.length} cases · 2015–{new Date().getFullYear()}
            </p>
          </Reveal>
          <Reveal variant="zoom" delay={100}>
            <div className="relative art-tile art-shadow aspect-[4/3] w-[240px] sm:w-[320px] lg:w-[380px] bg-paper-raise">
              <Image
                src="/images/paintings/heroes/hero-cases.webp"
                alt="A single small framed painting leaning against a warm wall, a minimal oil painting."
                fill
                priority
                fetchPriority="high"
                sizes="380px"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ Gallery ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-12 md:pt-16 pb-8">
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
        <div className="art-tile bg-teal-mist px-6 py-16 md:p-20 text-center">
          <h2 className="h2">Have something worth building?</h2>
          <p className="mt-4 text-ink-muted max-w-xl mx-auto">
            Every case above started as a conversation.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn btn-primary">
              Start a project
            </Link>
            <a href={site.whatsapp} className="btn btn-outline">
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
