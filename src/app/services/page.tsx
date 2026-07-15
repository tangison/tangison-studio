import type { Metadata } from "next";
import Image from "next/image";
import { capabilities } from "@/lib/capabilities";
import { SiteShell } from "@/components/tangison/site-shell";
import { StudioButton } from "@/components/studio/button";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/tangison/json-ld";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Three capabilities: Brand, Product, Intelligence. Nine outcome-led programs. One studio instead of three vendors.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services | Studio",
    description: "Three capabilities, nine programs, one studio.",
    url: "/services",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Studio" }],
  },
};

const capabilityPaintings: Record<string, string> = {
  brand: "/images/paintings/capability-brand-v2.webp",
  product: "/images/paintings/capability-product-v2.webp",
  intelligence: "/images/paintings/capability-intelligence-v2.webp",
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Services", url: "/services" }]} />
      <WebPageJsonLd title="Services" description="Three capabilities, nine programs, one studio." url="/services" />
      <SiteShell>
        {/* Header */}
        <section className="pt-12 md:pt-20 pb-8">
          <div className="mx-auto max-w-4xl px-6">
            <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-3">What we do</p>
            <h1 className="font-display font-bold text-ink text-4xl md:text-5xl mb-4">
              Three capabilities, one studio.
            </h1>
            <p className="font-satoshi text-lg text-ink-muted max-w-2xl">
              We build the brand, the product and the intelligence behind it, one studio instead of three vendors.
            </p>
          </div>
        </section>

        {/* Capabilities + Programs */}
        <section className="pb-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="space-y-16">
              {capabilities.map((cap) => (
                <article key={cap.id} id={cap.id} className="scroll-mt-24">
                  <div className="grid md:grid-cols-[1fr_1.5fr] gap-8 mb-8">
                    <div>
                      <div className="flex items-baseline gap-3 mb-3">
                        <span className="font-jetbrains text-sm text-signal-teal-text">{cap.number}</span>
                        <h2 className="font-display font-bold text-ink text-3xl">{cap.name}</h2>
                      </div>
                      <p className="font-satoshi text-base leading-relaxed text-ink-muted">{cap.shortDescription}</p>
                    </div>
                    <div className="aspect-[3/2] overflow-hidden rounded-[20px] bg-ocean-mist">
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
                  <div className="grid md:grid-cols-3 gap-4">
                    {cap.programs.map((program) => (
                      <div key={program.id} className="p-6 rounded-[20px] border border-card-border bg-signal-white">
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
              Not sure which capability fits?
            </h2>
            <p className="font-satoshi text-lg text-skeleton-bone/70 mb-8">
              Tell us what you are working on. We will help you find the right starting point.
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
