import type { Metadata } from "next";
import Image from "next/image";
import { capabilities } from "@/lib/capabilities";
import { SiteShell } from "@/components/tangison/site-shell";
import { StudioButton } from "@/components/studio/button";
import { ScrollReveal, HoverLift, ParentBadge } from "@/components/studio/scroll-reveal";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/tangison/json-ld";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Studio and Intelligence: seven outcome-led programs from a single independent practice in Windhoek, Namibia. Brand systems, website design and development, application design, product design, design systems, creative direction, and applied AI. One studio instead of three vendors, working across the African continent and beyond.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services | Studio and Intelligence, One Practice in Windhoek",
    description:
      "Brand, product, and the systems behind it. Seven outcome-led programs from a single independent practice in Windhoek, Namibia.",
    url: "/services",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Studio Services" }],
  },
};

const capabilityPaintings: Record<string, string> = {
  studio: "/images/paintings/services-brand.webp",
  intelligence: "/images/paintings/services-intelligence.webp",
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Services", url: "/services" }]} />
      <WebPageJsonLd title="Services" description="Studio and Intelligence. Seven programs, one practice." url="/services" />
      <SiteShell>
        {/* Header */}
        <section className="pt-12 md:pt-20 pb-8">
          <div className="mx-auto max-w-4xl px-6">
            <ScrollReveal slow>
              <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-3">What we do</p>
              <h1 className="font-display font-bold text-ink text-4xl md:text-5xl mb-4">
                Studio and Intelligence. One practice.
              </h1>
              <p className="font-satoshi text-lg text-ink-muted max-w-2xl">
                Brand, product, and the systems behind it. One studio instead of three vendors.
              </p>
              <ParentBadge className="mt-6" />
            </ScrollReveal>
          </div>
        </section>

        {/* Intro */}
        <section className="pb-8">
          <div className="mx-auto max-w-4xl px-6 space-y-4">
            <p className="font-satoshi text-base leading-relaxed text-ink-muted">
              Studio is organized around two capabilities, Studio and Intelligence, with seven outcome-led programs underneath. The Studio capability covers everything you can see and interact with: brand systems, websites, applications, design systems, and creative direction. The Intelligence capability covers applied AI work that has to behave predictably in production: research, model integration, agent design, and the infrastructure that makes sovereign intelligence possible.
            </p>
            <p className="font-satoshi text-base leading-relaxed text-ink-muted">
              The split is structural, not cosmetic. Some clients need only Studio. Some need only Intelligence. Most need both, but at different intensities across the project lifecycle. Pricing each program separately means you pay for what you actually use. There is no minimum retainer, no bundled service you have to opt out of.
            </p>
            <p className="font-satoshi text-base leading-relaxed text-ink-muted">
              Each program is described below by the situation it fits, the outputs it produces, and the kind of organization it tends to suit. If you are not sure which one applies, send us a message and we will tell you. The first conversation is free, and we will not push a program that does not fit your problem.
            </p>
          </div>
        </section>

        {/* Capabilities + Programs */}
        <section className="pb-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="space-y-16">
              {capabilities.map((cap) => (
                <article key={cap.id} id={cap.id} className="scroll-mt-24">
                  <div className="grid md:grid-cols-[1fr_1.5fr] gap-8 mb-10">
                    <div>
                      <div className="flex items-baseline gap-3 mb-3">
                        <span className="font-jetbrains text-sm text-signal-teal-text">{cap.number}</span>
                        <h2 className="font-display font-bold text-ink text-3xl">{cap.name}</h2>
                      </div>
                      <p className="font-satoshi text-base leading-relaxed text-ink-muted">{cap.shortDescription}</p>
                    </div>
                    <div className="aspect-[3/2] overflow-hidden rounded-[25px] bg-ocean-mist">
                      <Image
                        src={capabilityPaintings[cap.id]}
                        alt={`An oil painting representing the ${cap.name} capability.`}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 540px"
                      />
                    </div>
                  </div>

                  {/* Programs */}
                  <div className={`grid ${cap.programs.length <= 2 ? "md:grid-cols-2" : "md:grid-cols-3"} gap-4`}>
                    {cap.programs.map((program) => (
                      <HoverLift key={program.id}>
                        <div className="p-6 rounded-[25px] border border-card-border bg-signal-white">
                        <h3 className="font-display font-bold text-ink text-lg mb-2">{program.name}</h3>
                        <p className="font-satoshi text-sm leading-relaxed text-ink-muted mb-4">{program.situation}</p>
                        <div className="space-y-1.5 mb-4">
                          {program.outputs.slice(0, 3).map((output) => (
                            <div key={output} className="flex items-start gap-2 text-xs text-ink-muted">
                              <span className="w-1.5 h-1.5 rounded-full bg-signal-teal mt-1.5 shrink-0" />
                              {output}
                            </div>
                          ))}
                        </div>
                        </div>
                      </HoverLift>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-atlantic-black">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="font-display font-bold text-skeleton-bone text-3xl md:text-4xl mb-4">
              Not sure where to start?
            </h2>
            <p className="font-satoshi text-lg text-skeleton-bone/70 mb-8">
              Tell us what you are working on. We will figure out the right starting point together.
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
