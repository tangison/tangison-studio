import type { Metadata } from "next";
import Image from "next/image";
import { SiteShell } from "@/components/tangison/site-shell";
import { StudioButton } from "@/components/studio/button";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/tangison/json-ld";

export const metadata: Metadata = {
  title: "Studio",
  description: "An independent digital product practice within Tangison Technologies, based in Windhoek, Namibia.",
  alternates: { canonical: "/studio" },
  openGraph: { title: "Studio | Studio", description: "Independent practice within Tangison Technologies.", url: "/studio", images: [{ url: "/og.png", width: 1200, height: 630, alt: "Studio" }] },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Studio", url: "/studio" }]} />
      <WebPageJsonLd title="Studio" description="Independent practice within Tangison Technologies." url="/studio" />
      <SiteShell>
        <section className="pt-12 md:pt-20 pb-8">
          <div className="mx-auto max-w-4xl px-6">
            <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-3">The studio</p>
            <h1 className="font-display font-bold text-ink text-4xl md:text-5xl mb-5">An independent practice within Tangison Technologies.</h1>
            <p className="font-satoshi text-lg leading-relaxed text-ink-muted max-w-2xl">
              Studio is the digital product arm of Tangison Technologies. We operate independently, with our own working culture, but draw on the broader group's technical and strategic capacity when a project requires it.
            </p>
          </div>
        </section>
        <section className="pb-12">
          <div className="mx-auto max-w-5xl px-6">
            <div className="aspect-[16/9] overflow-hidden rounded-[24px] bg-ocean-mist">
              <Image src="/images/paintings/built-at-the-edge.webp" alt="An oil painting of a Namibian Atlantic landscape where a hand-built signal structure remains visible through fog." width={1080} height={608} className="w-full h-full object-cover" priority sizes="(max-width: 768px) 100vw, 1080px" />
            </div>
          </div>
        </section>
        <section className="py-12">
          <div className="mx-auto max-w-4xl px-6 space-y-6">
            <p className="font-satoshi text-base leading-relaxed text-ink-muted">
              The relationship is straightforward: Studio leads on digital product design and development, while Tangison Technologies provides the wider engineering, infrastructure, and operational context. Clients work with Studio directly; the group connection is there when it is useful, not when it is not.
            </p>
            <p className="font-satoshi text-base leading-relaxed text-ink-muted">
              This structure lets us stay small and focused without being fragile. A two-person project team can pull in specialists from the wider group for a sprint, then return to its working rhythm without the overhead of a large agency.
            </p>
            <p className="font-satoshi text-base leading-relaxed text-ink-muted">
              We are based in Windhoek, Namibia. The location is not a footnote. It shapes how we work. We design for audiences that often access the web on constrained connections, and we treat performance and accessibility as baseline obligations, not optional polish.
            </p>
          </div>
        </section>
        <section className="py-16 md:py-24 bg-atlantic-black">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <p className="font-jetbrains text-[10px] text-signal-teal uppercase tracking-[0.2em] mb-3">A Tangison Technologies company</p>
            <StudioButton as="link" href="/contact" variant="inverse" hasArrow arrowType="up-right">Start a project</StudioButton>
          </div>
        </section>
      </SiteShell>
    </>
  );
}
