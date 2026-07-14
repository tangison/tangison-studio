import type { Metadata } from "next";
import { SiteShell } from "@/components/tangison/site-shell";
import { StudioButton } from "@/components/studio/button";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/tangison/json-ld";

export const metadata: Metadata = {
  title: "Resources",
  description: "Resources from Studio: process guides, design references, and tools for digital product work.",
  alternates: { canonical: "/resources" },
  openGraph: { title: "Resources | Studio", description: "Resources from Studio.", url: "/resources", images: [{ url: "/og.png", width: 1200, height: 630, alt: "Studio" }] },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Resources", url: "/resources" }]} />
      <WebPageJsonLd title="Resources" description="Resources from Studio." url="/resources" />
      <SiteShell>
        <section className="pt-12 md:pt-20 pb-20">
          <div className="mx-auto max-w-4xl px-6">
            <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-3">Resources</p>
            <h1 className="font-display font-bold text-ink text-4xl md:text-5xl mb-4">Tools and references.</h1>
            <p className="font-satoshi text-lg text-ink-muted max-w-2xl mb-12">A small, curated set of resources for digital product work. We add to this when something proves genuinely useful.</p>
            <div className="p-10 rounded-[24px] border border-card-border bg-signal-white text-center">
              <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-3">Coming soon</p>
              <h2 className="font-display font-bold text-ink text-xl mb-3">Resources are being prepared.</h2>
              <p className="font-satoshi text-sm text-ink-muted max-w-md mx-auto mb-6">This section will hold process guides, design references, and practical tools for teams shipping digital products.</p>
              <StudioButton as="link" href="/contact" variant="secondary" size="sm">Ask us a question</StudioButton>
            </div>
          </div>
        </section>
      </SiteShell>
    </>
  );
}
