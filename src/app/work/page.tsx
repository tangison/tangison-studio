import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/lib/case-studies";
import { SiteShell } from "@/components/tangison/site-shell";
import { StudioButton } from "@/components/studio/button";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/tangison/json-ld";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects by Studio. Websites, applications and brand systems designed and built for organizations across Africa.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Work | Studio",
    description: "Selected projects by Studio for organizations across Africa.",
    url: "/work",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Studio" }],
  },
};

const projectPaintings: Record<string, string> = {
  proavia: "/images/paintings/projects/proavia-v3.webp",
  nalago: "/images/paintings/projects/nalago-v2.webp",
  clusterleaf: "/images/paintings/projects/clusterleaf-v2.webp",
  smefrog: "/images/paintings/projects/smefrog.webp",
  petrocor: "/images/paintings/projects/petrocor.webp",
  "tangison-systems": "/images/paintings/projects/tangison-systems.webp",
  crescendo: "/images/paintings/projects/crescendo.webp",
  feorm: "/images/paintings/projects/feorm.webp",
  lrclearing: "/images/paintings/projects/lrclearing.webp",
  reviveautoworks: "/images/paintings/projects/reviveautoworks.webp",
  miway: "/images/paintings/projects/miway.webp",
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "/" },
        { name: "Work", url: "/work" },
      ]} />
      <WebPageJsonLd
        title="Work"
        description="Selected projects by Studio for organizations across Africa."
        url="/work"
      />
      <SiteShell>
        {/* Header */}
        <section className="pt-12 md:pt-20 pb-8">
          <div className="mx-auto max-w-6xl px-6">
            <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-3">Selected work</p>
            <h1 className="font-display font-bold text-ink text-4xl md:text-5xl mb-4">
              Projects built with focus.
            </h1>
            <p className="font-satoshi text-lg text-ink-muted max-w-2xl">
              Websites, applications and brand systems designed and built by Studio. Each project is grounded in real client needs and shipped to production.
            </p>
          </div>
        </section>

        {/* Work grid — alternating editorial layout */}
        <section className="pb-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="space-y-12 md:space-y-20">
              {caseStudies.map((project, i) => {
                const isReversed = i % 2 === 1;
                const painting = projectPaintings[project.slug] || "/images/paintings/work-intro.webp";
                return (
                  <article key={project.slug} className={`grid md:grid-cols-2 gap-6 md:gap-10 items-center ${isReversed ? "md:[direction:rtl]" : ""}`}>
                    <div className="[direction:ltr]">
                      <div className="aspect-[4/3] overflow-hidden rounded-3xl bg-ocean-mist">
                        <Image
                          src={painting}
                          alt={`An oil painting representing ${project.name}.`}
                          width={800}
                          height={600}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          sizes="(max-width: 768px) 100vw, 540px"
                        />
                      </div>
                    </div>
                    <div className="[direction:ltr]">
                      <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-2">{project.industry}</p>
                      <h2 className="font-display font-bold text-ink text-2xl md:text-3xl mb-3">
                        <Link href={`/work/${project.slug}`} className="hover:text-signal-teal-text transition-colors">
                          {project.name}
                        </Link>
                      </h2>
                      <p className="font-satoshi text-base leading-relaxed text-ink-muted mb-4">
                        {project.descriptor}
                      </p>
                      <p className="font-satoshi text-sm leading-relaxed text-ink font-medium mb-4">
                        {project.outcomeH2}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {project.services.map((s) => (
                          <span key={s} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-ocean-mist text-ink">
                            {s}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap items-center gap-4">
                        <StudioButton href={`/work/${project.slug}`} variant="secondary" size="sm" hasArrow arrowType="right">
                          Case study
                        </StudioButton>
                        {project.url && (
                          <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-signal-teal-text transition-colors">
                            Live site <ArrowUpRight className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-atlantic-black">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="font-display font-bold text-skeleton-bone text-3xl md:text-4xl mb-4">
              Have something worth building?
            </h2>
            <p className="font-satoshi text-lg text-skeleton-bone/70 mb-8">
              Tell us what you are working on.
            </p>
            <StudioButton href="/contact" variant="inverse" hasArrow arrowType="up-right">
              Start a project
            </StudioButton>
          </div>
        </section>
      </SiteShell>
    </>
  );
}
