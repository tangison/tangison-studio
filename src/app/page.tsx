import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/lib/case-studies";
import { capabilities } from "@/lib/capabilities";
import { SiteShell } from "@/components/tangison/site-shell";
import { StudioButton } from "@/components/studio/button";
import { ScrollReveal, StaggerReveal, StaggerItem, FadeIn, ScaleReveal, HoverLift, TextReveal, ParentBadge } from "@/components/studio/scroll-reveal";
import { WebPageJsonLd } from "@/components/tangison/json-ld";

export const metadata: Metadata = {
  title: "Studio | Digital Product Design and Development in Namibia",
  description:
    "Studio builds brand, digital product, and applied intelligence for organizations across Africa. One studio instead of three vendors.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Studio | Digital Product Design and Development in Namibia",
    description:
      "Studio builds brand, digital product, and applied intelligence for organizations across Africa. One studio instead of three vendors.",
    url: "/",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Studio: Digital products built with clarity, character and purpose." }],
  },
};

const featuredSlugs = ["proavia", "nalago", "clusterleaf"];
const featuredWork = featuredSlugs
  .map((slug) => caseStudies.find((c) => c.slug === slug))
  .filter((c): c is NonNullable<typeof c> => Boolean(c));

const projectPaintings: Record<string, string> = {
  proavia: "/images/paintings/projects/homepage-proavia.webp",
  nalago: "/images/paintings/projects/homepage-nalago.webp",
  clusterleaf: "/images/paintings/projects/homepage-clusterleaf.webp",
};

const capabilityPaintings: Record<string, string> = {
  studio: "/images/paintings/capability-brand-v2.webp",
  intelligence: "/images/paintings/capability-intelligence-v2.webp",
};

const principles = [
  { num: "01", title: "Clarity before decoration", body: "Every element earns its place. No ornament without purpose." },
  { num: "02", title: "Systems over one-offs", body: "We build frameworks that scale, not just pages that ship." },
  { num: "03", title: "Intelligence with purpose", body: "AI applied where it solves a real problem, not where it looks impressive." },
  { num: "04", title: "Local context, wider ambition", body: "Windhoek-rooted, built for organizations across Africa and beyond." },
];

const processSteps = [
  { num: "01", name: "Discover", desc: "Listen first. Understand the problem before proposing a solution." },
  { num: "02", name: "Define", desc: "Frame the scope, audience, and the outcome that matters most." },
  { num: "03", name: "Design", desc: "Build the system: identity, structure, interaction." },
  { num: "04", name: "Build", desc: "Ship with modern, maintainable technology. Fast and accessible." },
  { num: "05", name: "Launch", desc: "Deploy, measure, hand over. Launch is a checkpoint, not an ending." },
];

export default function Page() {
  return (
    <>
      <WebPageJsonLd
        title="Studio | Digital Product Design and Development in Namibia"
        description="Studio builds brand, digital product, and applied intelligence for organizations across Africa."
        url="/"
      />
      <SiteShell>
        {/* 1. HERO — asymmetric editorial tension */}
        <section className="pt-12 md:pt-20 pb-8">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid md:grid-cols-[1.4fr_1fr] gap-8 md:gap-12 items-end">
              <div>
                <h1
                  className="font-display font-bold text-ink"
                  style={{ fontSize: "clamp(2.2rem, 6vw, 4rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
                >
                  <TextReveal text="We build the brand, the product and the intelligence behind it." />
                </h1>
                <ScrollReveal delay={0.6}>
                  <p className="mt-5 text-lg md:text-xl font-display font-medium text-ink-muted">
                    One studio instead of three vendors.
                  </p>
                </ScrollReveal>
                <ScrollReveal delay={0.8}>
                  <div className="mt-7 flex flex-wrap items-center gap-3">
                  <StudioButton href="/work" variant="primary" hasArrow arrowType="right">
                    View selected work
                  </StudioButton>
                  <StudioButton href="/contact" variant="secondary">
                    Start a project
                  </StudioButton>
                  </div>
                </ScrollReveal>
                <ParentBadge className="mt-6" />
              </div>
              <ScrollReveal delay={0.3}>
                <div className="hidden md:block text-right">
                  <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em]">
                    Windhoek, Namibia
                  </p>
                  <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mt-1">
                    Independent digital product studio
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* 2. HERO PAINTING — no frame, edge-to-edge editorial */}
        <section className="pb-12 md:pb-20">
          <div className="mx-auto max-w-6xl px-6">
            <ScaleReveal>
              <figure className="overflow-hidden rounded-[25px]">
                <Image
                  src="/images/paintings/hero-skeleton-coast-v2.webp"
                  alt="An oil painting of a solitary weathered signal mast on the Skeleton Coast shoreline at first light, with heavy impasto waves, dark volcanic rocks, and a tiny teal circular beacon at the mast top."
                  width={1344}
                  height={768}
                  className="w-full h-auto block"
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 768px) 100vw, 1080px"
                />
              </figure>
            </ScaleReveal>
          </div>
        </section>

        {/* 3. SELECTED WORK — alternating editorial compositions with oil paintings */}
        <section className="py-16 md:py-24" aria-labelledby="work-heading">
          <div className="mx-auto max-w-6xl px-6">
            <ScrollReveal>
              <div className="mb-10 flex items-end justify-between gap-4">
                <div>
                  <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-2">Selected work</p>
                  <h2 id="work-heading" className="font-display font-bold text-ink text-3xl md:text-4xl">
                    Recent projects
                  </h2>
                </div>
                <StudioButton href="/work" variant="secondary" size="sm" hasArrow arrowType="right">
                  All work
                </StudioButton>
              </div>
            </ScrollReveal>

            <StaggerReveal className="space-y-12 md:space-y-20">
              {featuredWork.map((project, i) => {
                const isReversed = i % 2 === 1;
                return (
                  <StaggerItem key={project.slug}>
                    <HoverLift>
                    <article className={`grid md:grid-cols-2 gap-6 md:gap-10 items-center ${isReversed ? "md:[direction:rtl]" : ""}`}>
                      {/* Oil painting */}
                      <div className="[direction:ltr]">
                        <div className="aspect-[4/3] overflow-hidden rounded-[25px] bg-ocean-mist">
                          <Image
                            src={projectPaintings[project.slug]}
                            alt={`An oil painting representing ${project.name}: ${project.industry.toLowerCase()}.`}
                            width={800}
                            height={600}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            sizes="(max-width: 768px) 100vw, 540px"
                          />
                        </div>
                      </div>
                      {/* Content */}
                      <div className="[direction:ltr]">
                        <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-2">{project.industry}</p>
                        <h3 className="font-display font-bold text-ink text-2xl md:text-3xl mb-3">
                          <Link href={`/work/${project.slug}`} className="hover:text-signal-teal-text transition-colors">
                            {project.name}
                          </Link>
                        </h3>
                        <p className="font-satoshi text-base leading-relaxed text-ink-muted mb-4">
                          {project.descriptor}
                        </p>
                        <p className="font-satoshi text-sm leading-relaxed text-ink font-medium mb-4">
                          {project.outcomeH2}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {project.services.map((s) => (
                            <span key={s} className="inline-flex items-center px-2.5 py-1 rounded-[25px] text-xs font-medium bg-ocean-mist text-ink">
                              {s}
                            </span>
                          ))}
                        </div>
                        <div className="flex flex-wrap items-center gap-4">
                          <StudioButton href={`/work/${project.slug}`} variant="secondary" size="sm" hasArrow arrowType="right">
                            Read {project.name} case study
                          </StudioButton>
                          {project.url && (
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-signal-teal-text transition-colors"
                            >
                              {project.name} live site <ArrowUpRight className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>
                    </article>
                    </HoverLift>
                  </StaggerItem>
                );
              })}
            </StaggerReveal>
          </div>
        </section>

        {/* 4. CAPABILITIES — two columns, studio and intelligence */}
        <section className="py-16 md:py-24 bg-ocean-mist/30" aria-labelledby="capabilities-heading">
          <div className="mx-auto max-w-6xl px-6">
            <ScrollReveal>
              <div className="mb-10">
                <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-2">What we do</p>
                <h2 id="capabilities-heading" className="font-display font-bold text-ink text-3xl md:text-4xl">
                  Studio and Intelligence. One practice.
                </h2>
              </div>
            </ScrollReveal>
            <StaggerReveal className="grid md:grid-cols-2 gap-6">
              {capabilities.map((cap) => (
                <StaggerItem key={cap.id}>
                  <div className="flex flex-col">
                    <div className="aspect-[3/2] overflow-hidden rounded-[25px] bg-ocean-mist mb-5">
                      <Image
                        src={capabilityPaintings[cap.id]}
                        alt={`An oil painting representing the ${cap.name} capability.`}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 360px"
                      />
                    </div>
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="font-jetbrains text-xs text-signal-teal-text">{cap.number}</span>
                      <h3 className="font-display font-bold text-ink text-xl">{cap.name}</h3>
                    </div>
                    <p className="font-satoshi text-sm leading-relaxed text-ink-muted mb-4 flex-1">
                      {cap.shortDescription}
                    </p>
                    <Link
                      href={`/services#${cap.id}`}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-signal-teal-text transition-colors"
                    >
                      Explore {cap.name} <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </StaggerItem>
              ))}
            </StaggerReveal>
          </div>
        </section>

        {/* 5. PRINCIPLES — editorial composition with texture */}
        <section className="py-16 md:py-24" aria-labelledby="principles-heading">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid md:grid-cols-[1fr_1.5fr] gap-8 md:gap-16 items-start">
              {/* Left — painting + heading */}
              <ScrollReveal>
                <div>
                  <div className="aspect-[4/3] overflow-hidden rounded-[25px] bg-ocean-mist mb-6">
                    <Image
                      src="/images/paintings/capability-brand-v2.webp"
                      alt="An oil painting of a studio work surface with linen, charcoal, teal pigment, and a circular signal dot."
                      width={600}
                      height={450}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                  </div>
                  <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-2">Principles</p>
                  <h2 id="principles-heading" className="font-display font-bold text-ink text-3xl md:text-4xl">
                    How we work
                  </h2>
                </div>
              </ScrollReveal>
              {/* Right — numbered principles */}
              <StaggerReveal className="space-y-0">
                {principles.map((p, i) => (
                  <StaggerItem key={p.num}>
                    <div
                      className={`flex gap-6 py-6 ${i !== principles.length - 1 ? "border-b border-card-border" : ""}`}
                    >
                      <span className="font-jetbrains text-2xl font-bold text-signal-teal-text shrink-0">{p.num}</span>
                      <div>
                        <h3 className="font-display font-bold text-ink text-lg md:text-xl mb-1">{p.title}</h3>
                        <p className="font-satoshi text-sm text-ink-muted">{p.body}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerReveal>
            </div>
          </div>
        </section>

        {/* 6. PROCESS — compact progressive line */}
        <section className="py-16 md:py-24 bg-atlantic-black text-skeleton-bone" aria-labelledby="process-heading">
          <div className="mx-auto max-w-6xl px-6">
            <ScrollReveal>
              <div className="mb-10">
                <p className="font-jetbrains text-[10px] text-signal-teal-text uppercase tracking-[0.2em] mb-2">Process</p>
                <h2 id="process-heading" className="font-display font-bold text-skeleton-bone text-3xl md:text-4xl">
                  Five steps, one connecting line
                </h2>
              </div>
            </ScrollReveal>
            <StaggerReveal className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4">
              {processSteps.map((step, i) => (
                <StaggerItem key={step.num}>
                  <div className="relative">
                    {i < processSteps.length - 1 && (
                      <div
                        className="hidden md:block absolute top-6 left-[calc(50%+24px)] right-[-50%] h-px"
                        style={{ background: "linear-gradient(to right, var(--color-signal-teal), transparent)" }}
                        aria-hidden="true"
                      />
                    )}
                    <div className="w-12 h-12 rounded-full flex items-center justify-center font-jetbrains text-sm font-medium mb-4 bg-atlantic-black border border-signal-teal-text text-signal-teal-text relative z-10">
                      {step.num}
                    </div>
                    <h3 className="font-display font-bold text-skeleton-bone text-base mb-2">{step.name}</h3>
                    <p className="font-satoshi text-xs leading-relaxed text-skeleton-bone/70">{step.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerReveal>
          </div>
        </section>

        {/* 7. COLLABORATION — studio approach */}
        <section className="py-16 md:py-24" aria-labelledby="collab-heading">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <ScrollReveal>
                <div>
                  <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-2">Collaboration</p>
                  <h2 id="collab-heading" className="font-display font-bold text-ink text-3xl md:text-4xl mb-5">
                    Senior craft, direct collaboration.
                  </h2>
                  <p className="font-satoshi text-base leading-relaxed text-ink-muted mb-6">
                    The people who scope the work are the same people who design and build it. No account layer, no handoff to juniors. Direct collaboration from discovery to launch.
                  </p>
                  <StudioButton href="/about" variant="secondary" size="sm" hasArrow arrowType="right">
                    About the studio
                  </StudioButton>
                </div>
              </ScrollReveal>
              <FadeIn delay={0.2}>
                <div className="aspect-[4/3] overflow-hidden rounded-[25px] bg-ocean-mist">
                  <Image
                    src="/images/paintings/collaboration-studio-v2.webp"
                    alt="An oil painting of two pairs of hands collaborating over interface sketches, color swatches, and a laptop on a worn wooden studio table."
                    width={600}
                    height={450}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 540px"
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* 8. FINAL INVITATION */}
        <section className="py-16 md:py-24 bg-atlantic-black" aria-labelledby="cta-heading">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <ScrollReveal>
              <h2 id="cta-heading" className="font-display font-bold text-skeleton-bone text-3xl md:text-4xl mb-4">
                Have something worth building?
              </h2>
              <p className="font-satoshi text-lg text-skeleton-bone/70 mb-8">
                Tell us what you are working on.
              </p>
              <StudioButton href="mailto:studio@tangison.com" variant="inverse" hasArrow arrowType="up-right">
                studio@tangison.com
              </StudioButton>
            </ScrollReveal>
          </div>
        </section>
      </SiteShell>
    </>
  );
}
