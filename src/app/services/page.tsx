import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { SiteShell } from "@/components/tangison/site-shell";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/tangison/json-ld";
import { capabilities } from "@/lib/capabilities";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Three capabilities — Brand, Product, Intelligence — and nine outcome-led programs. One studio instead of three vendors.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services | Studio",
    description:
      "Three capabilities — Brand, Product, Intelligence — and nine outcome-led programs.",
    url: "/services",
  },
};

const capabilityImages: Record<string, string> = {
  brand: "/images/paintings/identity-table.webp",
  product: "/images/paintings/product-workshop.webp",
  intelligence: "/images/intelligence/connected-systems.webp",
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "/" },
        { name: "Services", url: "/services" },
      ]} />
      <WebPageJsonLd
        title="Services"
        description="Three capabilities — Brand, Product, Intelligence — and nine outcome-led programs."
        url="/services"
      />
      <SiteShell>
        {/* Header */}
        <section className="py-20 md:py-28">
          <div className="shell-editorial">
            <p className="mono-label-studio mb-3">What we do</p>
            <h1 className="font-display font-bold text-ink text-4xl md:text-5xl mb-5">
              Three capabilities, one studio.
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-ink-muted">
              We collapsed the traditional seven-service menu into three
              outcome-led capabilities. Each one covers the full path from
              strategy to shipped work.
            </p>
            <p className="mt-4 text-base font-medium text-ink">
              We build the brand, the product and the AI systems behind it,
              one studio instead of three vendors.
            </p>
          </div>
        </section>

        {/* Capabilities + Programs */}
        <section className="pb-20">
          <div className="shell-editorial">
            <div className="space-y-16">
              {capabilities.map((cap) => (
                <article
                  key={cap.id}
                  id={cap.id}
                  className="scroll-mt-20"
                >
                  {/* Capability header */}
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="mono-label-studio">{cap.number}</span>
                    <h2 className="text-3xl font-display font-bold text-ink">
                      {cap.name}
                    </h2>
                  </div>

                  <div className="grid md:grid-cols-[1fr_1.2fr] gap-8 mb-8">
                    <p className="text-base leading-relaxed text-ink-muted">
                      {cap.shortDescription}
                    </p>
                    <div>
                      <p className="text-sm font-medium text-ink mb-3">Includes:</p>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                        {cap.includes.map((item) => (
                          <div key={item} className="flex items-center gap-2 text-sm text-ink-muted">
                            <Check className="w-3.5 h-3.5 text-signal-teal shrink-0" aria-hidden="true" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Capability image */}
                  <div className="painting-frame aspect-[16/9] mb-8 overflow-hidden">
                    <Image
                      src={capabilityImages[cap.id]}
                      alt={`${cap.name} capability — editorial illustration`}
                      width={1080}
                      height={608}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, 800px"
                    />
                  </div>

                  {/* Programs under this capability */}
                  <div className="grid md:grid-cols-3 gap-4">
                    {cap.programs.map((program) => (
                      <div
                        key={program.id}
                        className="card-quiet-studio p-6"
                      >
                        <h3 className="text-lg font-display font-bold text-ink mb-3">
                          {program.name}
                        </h3>
                        <p className="text-sm leading-relaxed text-ink-muted mb-4">
                          {program.situation}
                        </p>
                        <div className="space-y-1.5 mb-4">
                          {program.outputs.slice(0, 3).map((output) => (
                            <div key={output} className="flex items-start gap-2 text-xs text-ink-muted">
                              <span className="dot-teal-studio mt-1.5 shrink-0" aria-hidden="true" />
                              {output}
                            </div>
                          ))}
                        </div>
                        <Link
                          href="/contact"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink hover:text-signal-teal transition-colors"
                        >
                          Start a project
                          <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </Link>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="shell-editorial">
            <div className="panel-dark-studio p-8 md:p-12 text-center">
              <h2 className="font-display font-bold mb-4" style={{ color: "var(--color-ocean-mist)" }}>
                Not sure which capability fits?
              </h2>
              <p className="mb-6 max-w-md mx-auto" style={{ color: "var(--color-ocean-mist)", opacity: 0.8 }}>
                Tell us what you are working on. We will help you find the right
                starting point.
              </p>
              <Link
                href="/contact"
                className="btn-pill-studio btn-pill-primary inline-flex"
                style={{ background: "var(--color-signal-teal)", color: "#ffffff" }}
              >
                Start a project
              </Link>
            </div>
          </div>
        </section>
      </SiteShell>
    </>
  );
}
