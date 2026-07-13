import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/lib/case-studies";
import { capabilities } from "@/lib/capabilities";
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

const principles = [
  { title: "Clarity before decoration", body: "Every element earns its place. No ornament without purpose." },
  { title: "Systems over one-offs", body: "We build frameworks that scale, not just pages that ship." },
  { title: "Intelligence with purpose", body: "AI applied where it solves a real problem, not where it looks impressive." },
  { title: "Local context, wider ambition", body: "Windhoek-rooted, built for organizations across Africa and beyond." },
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
        description="Studio brings brand, digital product design and applied intelligence together for ambitious organizations across Africa."
        url="/"
      />
      <SiteShell>
        {/* 2. HERO — focused, asymmetric */}
        <section className="section-editorial pt-8 md:pt-12">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid md:grid-cols-[1.3fr_1fr] gap-8 md:gap-12 items-end">
              <div>
                <h1
                  className="font-display font-bold text-ink"
                  style={{ fontSize: "clamp(2.2rem, 6vw, 4rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
                >
                  We build the brand, the product and the intelligence behind it.
                </h1>
                <p className="mt-5 text-lg md:text-xl font-display font-medium text-ink-muted">
                  One studio instead of three vendors.
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <Link href="/work" className="btn-pill btn-pill-primary">
                    View selected work
                    <span className="arrow-island"><ArrowRight className="w-3.5 h-3.5" /></span>
                  </Link>
                  <Link href="/contact" className="btn-pill btn-pill-outline">
                    Start a project
                  </Link>
                </div>
              </div>
              <div className="hidden md:block text-right">
                <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em]">
                  Windhoek · Namibia
                </p>
                <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mt-1">
 Independent digital product studio
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. HERO PAINTING */}
        <section className="pb-8 md:pb-12">
          <div className="mx-auto max-w-6xl px-6">
            <figure className="painting-frame">
              <Image
                src="/images/paintings/atlantic-signal-hero.webp"
                alt="An oil painting of the Skeleton Coast at first light: low cold fog over dark volcanic rocks, a solitary weathered navigational mast with a tiny teal signal beacon, and a narrow cable fading into the distance."
                width={1344}
                height={768}
                className="w-full h-auto block"
                priority
                sizes="(max-width: 768px) 100vw, 1080px"
              />
            </figure>
          </div>
        </section>

        {/* 4. SELECTED WORK */}
        <section className="section-editorial" aria-labelledby="work-heading">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10 flex items-end justify-between gap-4">
              <div>
                <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-2">Selected work</p>
                <h2 id="work-heading" className="font-display font-bold text-ink text-3xl md:text-4xl">
                  Recent projects
                </h2>
              </div>
              <Link href="/work" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-signal-teal-text transition-colors shrink-0">
                All work <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-6 md:space-y-8">
              {featuredWork.map((project, i) => (
                <article key={project.slug} className={`grid md:grid-cols-2 gap-0 painting-frame overflow-hidden ${i % 2 === 1 ? "md:[direction:rtl]" : ""}`}>
                  <div className="aspect-[4/3] md:aspect-auto bg-ocean-mist overflow-hidden [direction:ltr]">
                    <Image
                      src={`/images/work/screenshots/${project.screenshotSlug}-screenshot.webp`}
                      alt={`${project.name} — project screenshot`}
                      width={800}
                      height={600}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 540px"
                    />
                  </div>
                  <div className="p-8 md:p-10 flex flex-col justify-between gap-6 bg-signal-white [direction:ltr]">
                    <div>
                      <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-2">{project.industry}</p>
                      <h3 className="font-display font-bold text-ink text-2xl mb-3">
                        <Link href={`/work/${project.slug}`} className="hover:text-signal-teal-text transition-colors">
                          {project.name}
                        </Link>
                      </h3>
                      <p className="font-satoshi text-sm leading-relaxed text-ink-muted mb-4">
                        {project.descriptor}
                      </p>
                      <p className="font-satoshi text-sm leading-relaxed text-ink font-medium">
                        {project.outcomeH2}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {project.services.map((s) => (
                          <span key={s} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-ocean-mist text-ink">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-4">
                      <Link href={`/work/${project.slug}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-signal-teal-text transition-colors">
                        Case study <ArrowRight className="w-4 h-4" />
                      </Link>
                      {project.url && (
                        <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-signal-teal-text transition-colors">
                          Live site <ArrowUpRight className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 5. CAPABILITIES */}
        <section className="section-editorial bg-ocean-mist/30" aria-labelledby="capabilities-heading">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10">
              <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-2">What we do</p>
              <h2 id="capabilities-heading" className="font-display font-bold text-ink text-3xl md:text-4xl">
                Three capabilities, one studio
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {capabilities.map((cap) => (
                <div key={cap.id} className="p-6 md:p-8 bg-signal-white rounded-2xl border border-card-border">
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="font-jetbrains text-xs text-signal-teal-text">{cap.number}</span>
                    <h3 className="font-display font-bold text-ink text-xl">{cap.name}</h3>
                  </div>
                  <p className="font-satoshi text-sm leading-relaxed text-ink-muted mb-5">
                    {cap.shortDescription}
                  </p>
                  <Link href={`/services#${cap.id}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-signal-teal-text transition-colors">
                    Learn more about {cap.name.toLowerCase()} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. PRINCIPLES */}
        <section className="section-editorial" aria-labelledby="principles-heading">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10">
              <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-2">Principles</p>
              <h2 id="principles-heading" className="font-display font-bold text-ink text-3xl md:text-4xl">
                How we work
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {principles.map((p) => (
                <div key={p.title} className="flex gap-4 items-start py-4 border-b border-card-border">
                  <span className="w-2 h-2 rounded-full bg-signal-teal mt-2 shrink-0" />
                  <div>
                    <h3 className="font-display font-bold text-ink text-lg mb-1">{p.title}</h3>
                    <p className="font-satoshi text-sm text-ink-muted">{p.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. STUDIO × LABS */}
        <section className="section-editorial bg-atlantic-black text-skeleton-bone" aria-labelledby="labs-heading">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <p className="font-jetbrains text-[10px] text-signal-teal uppercase tracking-[0.2em] mb-3">Intelligence</p>
                <h2 id="labs-heading" className="font-display font-bold text-skeleton-bone text-3xl md:text-4xl mb-5">
                  The interface is only the visible part.
                </h2>
                <p className="font-satoshi text-base leading-relaxed text-skeleton-bone/70 mb-4">
                  Through Tangison Labs, Studio connects strong digital experiences to the agents, automations and infrastructure working behind them.
                </p>
                <p className="font-satoshi text-sm text-signal-teal mb-6">
                  Designing the interfaces where intelligence does actual work.
                </p>
                <a
                  href="https://tangison.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill btn-pill-teal"
                >
                  Explore Tangison Labs
                  <span className="arrow-island"><ArrowUpRight className="w-3.5 h-3.5" /></span>
                </a>
              </div>
              <figure className="painting-frame aspect-[4/3]">
                <Image
                  src="/images/intelligence/connected-systems.webp"
                  alt="A clean technical diagram showing connected nodes in a network, with Signal Teal circular nodes on a Deep Ocean Navy background."
                  width={600}
                  height={450}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 540px"
                />
              </figure>
            </div>
          </div>
        </section>

        {/* 8. PROCESS — compact */}
        <section className="section-editorial" aria-labelledby="process-heading">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10">
              <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-2">Process</p>
              <h2 id="process-heading" className="font-display font-bold text-ink text-3xl md:text-4xl">
                Five steps, one connecting line
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
              {processSteps.map((step) => (
                <div key={step.num} className="relative">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-jetbrains text-sm font-medium mb-4 bg-skeleton-bone border border-signal-teal text-signal-teal-text"
                  >
                    {step.num}
                  </div>
                  <h3 className="font-display font-bold text-ink text-base mb-2">{step.name}</h3>
                  <p className="font-satoshi text-xs leading-relaxed text-ink-muted">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. FINAL INVITATION */}
        <section className="section-editorial bg-atlantic-black" aria-labelledby="cta-heading">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 id="cta-heading" className="font-display font-bold text-skeleton-bone text-3xl md:text-4xl mb-4">
              Have something worth building?
            </h2>
            <p className="font-satoshi text-lg text-skeleton-bone/70 mb-8">
              Tell us what you are working on.
            </p>
            <a href="mailto:studio@tangison.com" className="btn-pill btn-pill-teal">
              studio@tangison.com
              <span className="arrow-island"><ArrowUpRight className="w-3.5 h-3.5" /></span>
            </a>
          </div>
        </section>
      </SiteShell>
    </>
  );
}
