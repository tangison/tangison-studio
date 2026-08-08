import type { Metadata } from "next";
import Image from "next/image";
import { SiteShell } from "@/components/tangison/site-shell";
import { StudioButton } from "@/components/studio/button";
import { ScrollReveal, StaggerReveal, StaggerItem, ScaleReveal, ParentBadge } from "@/components/studio/scroll-reveal";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/tangison/json-ld";

export const metadata: Metadata = {
  title: {
    absolute: "Process | Studio's Five-Step Working Method from Windhoek",
  },
  description:
    "Studio's five-step working method: discover, define, design, build, launch. Each step has a clear purpose. We do not stretch engagements beyond what the work needs.",
  alternates: { canonical: "/process" },
  openGraph: {
    title: "Process | Five-Step Working Method from Studio in Windhoek",
    description:
      "Five-step process: discover, define, design, build, launch. A compact working method with a thin Signal Teal line connecting each step.",
    url: "/process",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Studio Process" }],
  },
};

const steps = [
  {
    num: "01",
    name: "Discover",
    desc: "Listen first. Interviews, existing material, and a clear picture of success.",
    detail: "We start with conversation, not deliverables. Stakeholder interviews, a review of existing brand and product material, and a clear shared definition of what success looks like in three, six, and twelve months. Discovery typically takes one to two weeks depending on project size.",
  },
  {
    num: "02",
    name: "Define",
    desc: "Frame the problem. Scope, audience, constraints, and the outcome that matters.",
    detail: "We turn discovery into a brief: audience, scope, constraints, success metrics, and the specific outcome the project is built to deliver. The define phase produces a written proposal with timeline and pricing, signed off before any design work begins.",
  },
  {
    num: "03",
    name: "Design",
    desc: "Design the system, not just the screens. Identity, structure, interaction.",
    detail: "Identity, information architecture, component system, and key page templates. We design in the medium we will ship in, using real content where possible. You see designs in the browser, not in static mockups that drift from production.",
  },
  {
    num: "04",
    name: "Build",
    desc: "Build with modern, maintainable technology. Fast, accessible, structured.",
    detail: "We build with Next.js, TypeScript, and Tailwind CSS by default, choosing additional tools only when the project requires them. Every build is checked for accessibility, performance, and SEO. Code is committed to a repository you own, with deployment automated through Vercel.",
  },
  {
    num: "05",
    name: "Launch",
    desc: "Ship, measure, hand over. Launch is a checkpoint, not an ending.",
    detail: "We ship to production, verify in the real environment, and hand over documentation plus a recorded walkthrough so your team can operate the site. Post-launch monitoring catches regressions in the first two weeks. Then we agree whether to continue under one of the partnership models.",
  },
];

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Process", url: "/process" }]} />
      <WebPageJsonLd title="Process" description="Five-step process." url="/process" />
      <SiteShell>
        <section className="pt-12 md:pt-20 pb-8">
          <div className="mx-auto max-w-4xl px-6">
            <ScrollReveal slow>
              <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-3">Process</p>
              <h1 className="font-display font-bold text-ink text-4xl md:text-5xl mb-4">Five steps, one connecting line.</h1>
              <p className="font-satoshi text-lg text-ink-muted max-w-2xl">We keep the process tight. Each step has a clear purpose, and we do not stretch engagements beyond what the work needs.</p>
              <ParentBadge className="mt-6" />
            </ScrollReveal>
          </div>
        </section>
        <section className="pb-12">
          <div className="mx-auto max-w-5xl px-6">
            <ScaleReveal>
              <div className="aspect-[16/9] overflow-hidden rounded-[25px] bg-ocean-mist">
                <Image src="/images/paintings/process-progressive-v2.webp" alt="An oil painting of a winding Namibian desert road splitting and resolving into one clear route." width={1080} height={608} className="w-full h-full object-cover" priority fetchPriority="high" sizes="(max-width: 768px) 100vw, 1080px" />
              </div>
            </ScaleReveal>
          </div>
        </section>
        <section className="py-12">
          <div className="mx-auto max-w-4xl px-6">
            <StaggerReveal className="space-y-0">
              {steps.map((step, i) => (
                <StaggerItem key={step.num}>
                  <div className={`flex gap-6 py-8 ${i !== steps.length - 1 ? "border-b border-card-border" : ""}`}>
                    <span className="font-jetbrains text-3xl font-bold text-signal-teal-text shrink-0">{step.num}</span>
                    <div>
                      <h2 className="font-display font-bold text-ink text-xl mb-2">{step.name}</h2>
                      <p className="font-satoshi text-base text-ink-muted mb-3">{step.desc}</p>
                      <p className="font-satoshi text-sm text-ink-muted leading-relaxed max-w-xl">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerReveal>
          </div>
        </section>
        <section className="py-12 bg-ocean-mist/30">
          <div className="mx-auto max-w-4xl px-6 py-12">
            <ScrollReveal>
              <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-3">Why this shape</p>
              <h2 className="font-display font-bold text-ink text-2xl md:text-3xl mb-6 max-w-xl">A process is only useful if it survives contact with a real project.</h2>
              <div className="space-y-4">
                <p className="font-satoshi text-base leading-relaxed text-ink-muted">
                  Five steps is the smallest number that still covers the work. Fewer and you skip discovery, or design without defining. More and you start paying for ceremony instead of substance. Each step has a clear output: a brief, a scope, a system, a build, a launch. We do not move to the next step until the previous one is signed off.
                </p>
                <p className="font-satoshi text-base leading-relaxed text-ink-muted">
                  The connecting line is discipline. The same person who scopes the work designs it. The same person who designs it builds it. There is no account layer, no handoff to a separate production team. This is the structural advantage of being a small studio, and we protect it.
                </p>
                <p className="font-satoshi text-base leading-relaxed text-ink-muted">
                  Engagements are sized to the work. A focused marketing site might run four to six weeks. A complex application can take three to six months. We tell you the realistic range in the proposal phase, and we stick to it. If the scope changes mid-project, we say so and re-scope together.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>
        <section className="py-16 md:py-24 bg-atlantic-black">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="font-display font-bold text-skeleton-bone text-3xl md:text-4xl mb-4">Ready to start?</h2>
            <StudioButton href="/contact" variant="inverse" hasArrow arrowType="up-right">Start a project</StudioButton>
          </div>
        </section>
      </SiteShell>
    </>
  );
}
