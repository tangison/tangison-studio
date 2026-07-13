import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/lib/case-studies";
import { capabilities } from "@/lib/capabilities";
import { StudioLogo } from "@/components/studio/studio-logo";
import { SiteShell } from "@/components/tangison/site-shell";
import { WebPageJsonLd } from "@/components/tangison/json-ld";

export const metadata: Metadata = {
  title: "Studio | Digital Product Design and Development in Namibia",
  description:
    "Studio brings brand, digital product design and applied intelligence together for ambitious organizations across Africa. One studio instead of three vendors.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Studio | Digital Product Design and Development in Namibia",
    description:
      "Studio brings brand, digital product design and applied intelligence together for ambitious organizations across Africa.",
    url: "/",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Studio — Digital products built with clarity, character and purpose." }],
  },
};

const featuredSlugs = ["proavia", "nalago", "clusterleaf"];
const featuredWork = featuredSlugs
  .map((slug) => caseStudies.find((c) => c.slug === slug))
  .filter((c): c is NonNullable<typeof c> => Boolean(c));

const processSteps = [
  { num: "01", name: "Discover", desc: "Listen first. Interviews, existing material, and a clear picture of success." },
  { num: "02", name: "Define", desc: "Frame the problem. Scope, audience, constraints, and the outcome that matters." },
  { num: "03", name: "Design", desc: "Design the system, not just the screens. Identity, structure, interaction." },
  { num: "04", name: "Build", desc: "Build with modern, maintainable technology. Fast, accessible, structured." },
  { num: "05", name: "Launch", desc: "Ship, measure, hand over. Launch is a checkpoint, not an ending." },
];

export default function Page() {
  return (
    <>
      <WebPageJsonLd
        title="Studio | Digital Product Design and Development in Namibia"
        description="Studio brings brand, digital product design and applied intelligence together for ambitious organizations across Africa."
        url="/"
      />
      <SiteShell>
        {/* 1. HERO — sharp claim, no pricing, no service list */}
        <section className="py-20 md:py-28" aria-labelledby="hero-heading">
          <div className="shell-editorial">
            <div className="status-pill-studio mb-6" aria-label="Studio status">
              Independent digital product studio · Windhoek, Namibia
            </div>

            <h1
              id="hero-heading"
              className="font-display font-bold text-ink"
              style={{ fontSize: "clamp(2rem, 5.5vw, 3.5rem)", lineHeight: 1.08, letterSpacing: "-0.03em" }}
            >
              We build the brand, the product and the AI systems behind it.
            </h1>

            <p className="mt-5 text-xl font-display font-medium text-ink">
              One studio instead of three vendors.
            </p>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-muted">
              Studio brings brand, digital product design and applied
              intelligence together for ambitious organizations across Africa.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/work" className="btn-pill-studio btn-pill-primary">
                View selected work
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link href="/contact" className="btn-pill-studio btn-pill-outline">
                Start a project
              </Link>
            </div>
          </div>
        </section>

        {/* 2. HERO PAINTING — Atlantic Signal */}
        <section className="pb-20" aria-label="Atlantic Signal">
          <div className="shell-wide-editorial">
            <figure className="painting-frame">
              <Image
                src="/images/paintings/atlantic-signal-hero.webp"
                alt="An oil painting of the Skeleton Coast at first light: low cold fog over dark volcanic rocks, a solitary weathered navigational mast with a tiny teal signal beacon, and a narrow cable fading into the distance."
                width={1080}
                height={600}
                className="w-full h-auto block"
                priority
                sizes="(max-width: 768px) 100vw, 1080px"
              />
            </figure>
          </div>
        </section>

        {/* 3. SELECTED WORK — three verified case studies before services or pricing */}
        <section className="py-20" aria-labelledby="work-heading">
          <div className="shell-editorial">
            <div className="mb-10 flex items-end justify-between gap-4">
              <div>
                <p className="mono-label-studio mb-2">Selected work</p>
                <h2 id="work-heading" className="font-display font-bold text-ink text-3xl">
                  Recent projects
                </h2>
              </div>
              <Link href="/work" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-signal-teal transition-colors shrink-0">
                All work
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="space-y-6">
              {featuredWork.map((project) => (
                <article key={project.slug} className="card-quiet-studio">
                  <div className="grid md:grid-cols-[1.4fr_1fr] gap-0">
                    <div className="aspect-[4/3] md:aspect-auto bg-ocean-mist md:border-r border-fog-gray overflow-hidden">
                      <Image
                        src={`/images/work/screenshots/${project.screenshotSlug}-screenshot.webp`}
                        alt={`${project.name} — project screenshot`}
                        width={800}
                        height={600}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 600px"
                      />
                    </div>
                    <div className="p-6 md:p-8 flex flex-col justify-between gap-6">
                      <div className="space-y-3">
                        <p className="mono-label-studio">{project.industry}</p>
                        <h3 className="text-xl font-display font-bold text-ink">
                          <Link href={`/work/${project.slug}`} className="hover:text-signal-teal transition-colors">
                            {project.name}
                          </Link>
                        </h3>
                        <p className="text-sm leading-relaxed text-ink-muted">
                          {project.descriptor}
                        </p>
                        <p className="text-sm leading-relaxed text-ink">
                          {project.outcomeH2}
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {project.services.map((s) => (
                            <span
                              key={s}
                              className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-ocean-mist text-ink"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-4">
                        <Link href={`/work/${project.slug}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-signal-teal transition-colors">
                          Case study
                          <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        </Link>
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-signal-teal transition-colors"
                          >
                            Live site
                            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 4. CAPABILITIES — Brand, Product, Intelligence */}
        <section className="py-20 bg-ocean-mist/40" aria-labelledby="capabilities-heading">
          <div className="shell-editorial">
            <div className="mb-10">
              <p className="mono-label-studio mb-2">What we do</p>
              <h2 id="capabilities-heading" className="font-display font-bold text-ink text-3xl">
                Three capabilities, one studio
              </h2>
              <p className="mt-3 max-w-lg text-base text-ink-muted">
                We build the brand, the product and the AI systems behind it,
                one studio instead of three vendors.
              </p>
            </div>

            <div className="space-y-8">
              {capabilities.map((cap) => (
                <div
                  key={cap.id}
                  className="flex gap-5 items-start py-5 border-b border-fog-gray last:border-0"
                >
                  <span className="dot-teal-studio mt-2.5" aria-hidden="true" />
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="mono-label-studio">{cap.number}</span>
                      <h3 className="text-xl font-display font-bold text-ink">
                        <Link href={`/services#${cap.id}`} className="hover:text-signal-teal transition-colors">
                          {cap.name}
                        </Link>
                      </h3>
                    </div>
                    <p className="text-base leading-relaxed text-ink-muted max-w-lg">
                      {cap.shortDescription}
                    </p>
                    <Link
                      href={`/services#${cap.id}`}
                      className="inline-flex items-center gap-1.5 mt-3 text-sm font-medium text-ink hover:text-signal-teal transition-colors"
                    >
                      Learn more
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. INTELLIGENCE — prominent Tangison Labs section */}
        <section className="py-20" aria-labelledby="intelligence-heading">
          <div className="shell-editorial">
            <div className="panel-dark-studio p-8 md:p-12">
              <p
                className="mono-label-studio mb-3"
                style={{ color: "var(--color-signal-teal)" }}
              >
                Intelligence
              </p>
              <h2
                id="intelligence-heading"
                className="font-display font-bold mb-4"
                style={{ color: "var(--color-ocean-mist)", fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
              >
                The interface is only the visible part.
              </h2>
              <p
                className="text-base leading-relaxed mb-3 max-w-lg"
                style={{ color: "var(--color-ocean-mist)", opacity: 0.8 }}
              >
                Through Tangison Labs, Studio connects strong digital
                experiences to the agents, automations and infrastructure
                working behind them.
              </p>
              <p
                className="text-sm leading-relaxed mb-6 max-w-lg"
                style={{ color: "var(--color-signal-teal)" }}
              >
                Designing the interfaces where intelligence does actual work.
              </p>
              <a
                href="https://tangison.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill-studio inline-flex"
                style={{ background: "var(--color-signal-teal)", color: "#ffffff" }}
              >
                Explore Tangison Labs
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        {/* 6. PROCESS — compact five-step */}
        <section className="py-20 bg-atlantic-black text-ocean-mist" aria-labelledby="process-heading">
          <div className="shell-editorial">
            <div className="mb-10">
              <p
                className="mono-label-studio mb-2"
                style={{ color: "var(--color-signal-teal)" }}
              >
                How we work
              </p>
              <h2
                id="process-heading"
                className="font-display font-bold text-3xl"
                style={{ color: "var(--color-ocean-mist)" }}
              >
                A compact five-step process
              </h2>
            </div>

            <div className="relative">
              <div
                className="absolute left-0 right-0 top-6 h-px hidden md:block"
                style={{
                  background:
                    "linear-gradient(to right, var(--color-signal-teal), var(--color-signal-teal) 80%, transparent)",
                }}
                aria-hidden="true"
              />
              <ol className="grid gap-8 md:grid-cols-5 relative">
                {processSteps.map((step) => (
                  <li key={step.num} className="relative">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center font-mono text-sm font-medium mb-4 relative z-10"
                      style={{
                        background: "var(--color-atlantic-black)",
                        border: "1px solid var(--color-signal-teal)",
                        color: "var(--color-signal-teal)",
                      }}
                    >
                      {step.num}
                    </div>
                    <h3
                      className="text-base font-display font-bold mb-2"
                      style={{ color: "var(--color-ocean-mist)" }}
                    >
                      {step.name}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--color-ocean-mist)", opacity: 0.7 }}
                    >
                      {step.desc}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-10">
              <Link
                href="/process"
                className="inline-flex items-center gap-1.5 text-sm font-medium"
                style={{ color: "var(--color-signal-teal)" }}
              >
                More on process
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* 7. STUDIO STORY — short */}
        <section className="py-20" aria-labelledby="story-heading">
          <div className="shell-editorial">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <p className="mono-label-studio mb-2">The studio</p>
                <h2 id="story-heading" className="font-display font-bold text-ink text-3xl mb-4">
                  Built at the edge.
                </h2>
                <p className="text-base leading-relaxed text-ink-muted mb-6">
                  Clear signals. Useful work. Studio turns ambitious ideas into
                  focused digital experiences from Windhoek, Namibia.
                </p>
                <Link href="/about" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-signal-teal transition-colors">
                  About the studio
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
              <figure className="painting-frame aspect-[4/3]">
                <Image
                  src="/images/paintings/interface-sketch.webp"
                  alt="An oil painting of a dark-skinned African hand sketching a web interface with charcoal on worn cream paper, with a dark navy notebook edge and soft studio light."
                  width={600}
                  height={450}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 500px"
                />
              </figure>
            </div>
          </div>
        </section>

        {/* 8. CONTACT CTA */}
        <section className="py-20" aria-labelledby="contact-heading">
          <div className="shell-editorial">
            <div className="panel-dark-studio p-8 md:p-12 text-center">
              <h2
                id="contact-heading"
                className="font-display font-bold mb-4"
                style={{ color: "var(--color-ocean-mist)" }}
              >
                Have something worth building?
              </h2>
              <p
                className="text-lg mb-8 max-w-md mx-auto"
                style={{ color: "var(--color-ocean-mist)", opacity: 0.8 }}
              >
                Tell us what you are working on.
              </p>
              <a
                href="mailto:studio@tangison.com"
                className="btn-pill-studio inline-flex"
                style={{ background: "var(--color-signal-teal)", color: "#ffffff" }}
              >
                studio@tangison.com
              </a>
              <div className="mt-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-sm font-medium"
                  style={{ color: "var(--color-ocean-mist)", opacity: 0.7 }}
                >
                  Or use the project form
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </SiteShell>
    </>
  );
}
