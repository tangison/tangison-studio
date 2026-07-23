import type { Metadata } from "next";
import Image from "next/image";
import { SiteShell } from "@/components/tangison/site-shell";
import { StudioButton } from "@/components/studio/button";
import { ScrollReveal, FadeIn, StaggerReveal, StaggerItem, ScaleReveal, HoverLift, ParentBadge } from "@/components/studio/scroll-reveal";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/tangison/json-ld";

export const metadata: Metadata = {
  title: "About",
  description: "Studio is an independent digital product practice in Windhoek, Namibia. We design websites, applications and brand systems for organizations across Africa.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About | Studio", description: "Independent digital product practice in Windhoek, Namibia.", url: "/about", images: [{ url: "/og.png", width: 1200, height: 630, alt: "Studio" }] },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "About", url: "/about" }]} />
      <WebPageJsonLd title="About" description="Independent digital product practice in Windhoek, Namibia." url="/about" />
      <SiteShell>
        <section className="pt-12 md:pt-20 pb-8">
          <div className="mx-auto max-w-4xl px-6">
            <ScrollReveal slow>
              <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-3">About</p>
              <h1 className="font-display font-bold text-ink text-4xl md:text-5xl mb-5">Built at the edge.</h1>
              <p className="font-satoshi text-lg leading-relaxed text-ink-muted max-w-2xl">
                Studio is an independent digital product practice in Windhoek, Namibia. We design focused websites, applications and brand systems for ambitious organizations across Africa.
              </p>
              <ParentBadge className="mt-6" />
            </ScrollReveal>
          </div>
        </section>

        <section className="pb-12">
          <div className="mx-auto max-w-5xl px-6">
            <ScaleReveal>
              <div className="aspect-[16/9] overflow-hidden rounded-[25px] bg-ocean-mist">
                <Image src="/images/paintings/about-windhoek-v2.webp" alt="An oil painting of an early-morning Windhoek street scene with soft human activity and restrained painterly light." width={1080} height={608} className="w-full h-full object-cover" priority sizes="(max-width: 768px) 100vw, 1080px" />
              </div>
            </ScaleReveal>
          </div>
        </section>

        <section className="py-12">
          <div className="mx-auto max-w-4xl px-6 space-y-6">
            <p className="font-satoshi text-base leading-relaxed text-ink-muted">
              Studio operates with a simple belief: clear signals, useful work. We turn ambiguous ambitions into focused digital experiences by staying small, staying direct, and refusing to separate strategy from craft.
            </p>
            <p className="font-satoshi text-base leading-relaxed text-ink-muted">
              The studio is part of <a href="https://tangison.com" target="_blank" rel="noopener noreferrer" className="text-ink hover:text-signal-teal-text transition-colors underline">Tangison Technologies</a>, but its working culture is independent. We take on a limited number of projects at a time so that the people who scope the work are the same people who design and build it. There is no account layer between you and the work.
            </p>
            <p className="font-satoshi text-base leading-relaxed text-ink-muted">
              We work across the African continent, with a particular focus on organizations that need a digital presence equal to their ambition. Tourism operators, skincare brands, financial services, and public-sector work where trust and clarity matter more than flashy features.
            </p>
            <p className="font-satoshi text-base leading-relaxed text-ink-muted">
              When a project needs deeper technical capacity, research, or <a href="https://labs.tangison.com" target="_blank" rel="noopener noreferrer" className="text-ink hover:text-signal-teal-text transition-colors underline">Tangison Labs</a> can provide it. But you work with Studio directly. The group connection is there when it is useful, not when it is not.
            </p>
          </div>
        </section>

        <section className="py-12 bg-ocean-mist/30">
          <div className="mx-auto max-w-4xl px-6 py-12">
            <ScrollReveal>
              <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-3">Principles</p>
            </ScrollReveal>
            <StaggerReveal className="space-y-0">
              {[
                { num: "01", title: "Clarity before decoration", body: "Every element earns its place. No ornament without purpose." },
                { num: "02", title: "Systems over one-offs", body: "We build frameworks that scale, not just pages that ship." },
                { num: "03", title: "Intelligence with purpose", body: "AI applied where it solves a real problem, not where it looks impressive." },
                { num: "04", title: "Local context, wider ambition", body: "Windhoek-rooted, built for organizations across Africa and beyond." },
              ].map((p, i) => (
                <StaggerItem key={p.num}>
                  <div className={`flex gap-6 py-6 ${i !== 3 ? "border-b border-card-border" : ""}`}>
                    <span className="font-jetbrains text-2xl font-bold text-signal-teal-text shrink-0">{p.num}</span>
                    <div>
                      <h3 className="font-display font-bold text-ink text-lg mb-1">{p.title}</h3>
                      <p className="font-satoshi text-sm text-ink-muted">{p.body}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="py-16 md:py-24 bg-atlantic-black">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="font-display font-bold text-skeleton-bone text-3xl md:text-4xl mb-4">Work with us.</h2>
            <StudioButton href="/contact" variant="inverse" hasArrow arrowType="up-right">Start a project</StudioButton>
          </div>
        </section>
      </SiteShell>
    </>
  );
}
