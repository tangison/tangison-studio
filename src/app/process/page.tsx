import type { Metadata } from "next";
import Image from "next/image";
import { SiteShell } from "@/components/tangison/site-shell";
import { StudioButton } from "@/components/studio/button";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/tangison/json-ld";

export const metadata: Metadata = {
  title: "Process",
  description: "Studio's five-step process: discover, define, design, build, launch. A compact working method with a thin Signal Teal line connecting each step.",
  alternates: { canonical: "/process" },
  openGraph: { title: "Process | Studio", description: "Five-step process: discover, define, design, build, launch.", url: "/process", images: [{ url: "/og.png", width: 1200, height: 630, alt: "Studio" }] },
};

const steps = [
  { num: "01", name: "Discover", desc: "Listen first. Interviews, existing material, and a clear picture of success." },
  { num: "02", name: "Define", desc: "Frame the problem. Scope, audience, constraints, and the outcome that matters." },
  { num: "03", name: "Design", desc: "Design the system, not just the screens. Identity, structure, interaction." },
  { num: "04", name: "Build", desc: "Build with modern, maintainable technology. Fast, accessible, structured." },
  { num: "05", name: "Launch", desc: "Ship, measure, hand over. Launch is a checkpoint, not an ending." },
];

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Process", url: "/process" }]} />
      <WebPageJsonLd title="Process" description="Five-step process." url="/process" />
      <SiteShell>
        <section className="pt-12 md:pt-20 pb-8">
          <div className="mx-auto max-w-4xl px-6">
            <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-3">Process</p>
            <h1 className="font-display font-bold text-ink text-4xl md:text-5xl mb-4">Five steps, one connecting line.</h1>
            <p className="font-satoshi text-lg text-ink-muted max-w-2xl">We keep the process tight. Each step has a clear purpose, and we do not stretch engagements beyond what the work needs.</p>
          </div>
        </section>
        <section className="pb-12">
          <div className="mx-auto max-w-5xl px-6">
            <div className="aspect-[16/9] overflow-hidden rounded-[24px] bg-ocean-mist">
              <Image src="/images/paintings/process-progressive-v2.webp" alt="An oil painting of a winding Namibian desert road splitting and resolving into one clear route." width={1080} height={608} className="w-full h-full object-cover" priority sizes="(max-width: 768px) 100vw, 1080px" />
            </div>
          </div>
        </section>
        <section className="py-12">
          <div className="mx-auto max-w-4xl px-6">
            <div className="space-y-0">
              {steps.map((step, i) => (
                <div key={step.num} className={`flex gap-6 py-8 ${i !== steps.length - 1 ? "border-b border-card-border" : ""}`}>
                  <span className="font-jetbrains text-3xl font-bold text-signal-teal-text shrink-0">{step.num}</span>
                  <div>
                    <h2 className="font-display font-bold text-ink text-xl mb-2">{step.name}</h2>
                    <p className="font-satoshi text-base text-ink-muted">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
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
