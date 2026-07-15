import type { Metadata } from "next";
import { SiteShell } from "@/components/tangison/site-shell";
import { StudioButton } from "@/components/studio/button";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/tangison/json-ld";

export const metadata: Metadata = {
  title: "Careers",
  description: "Careers at Studio. We are a small, focused practice and we hire when we have work that needs a specific person.",
  alternates: { canonical: "/careers" },
  openGraph: { title: "Careers | Studio", description: "Careers at Studio.", url: "/careers", images: [{ url: "/og.png", width: 1200, height: 630, alt: "Studio" }] },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Careers", url: "/careers" }]} />
      <WebPageJsonLd title="Careers" description="Careers at Studio." url="/careers" />
      <SiteShell>
        <section className="pt-12 md:pt-20 pb-20">
          <div className="mx-auto max-w-4xl px-6">
            <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-3">Careers</p>
            <h1 className="font-display font-bold text-ink text-4xl md:text-5xl mb-4">Work with us.</h1>
            <p className="font-satoshi text-lg text-ink-muted max-w-2xl mb-12">We are a small, focused practice. We do not run a rolling intake. When we have work that needs a specific person, we post the role here.</p>
            <div className="p-10 rounded-[25px] border border-card-border bg-signal-white text-center">
              <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-3">No open roles</p>
              <h2 className="font-display font-bold text-ink text-xl mb-3">No open positions right now.</h2>
              <p className="font-satoshi text-sm text-ink-muted max-w-md mx-auto mb-6">If you are a designer or developer with experience in the African digital product space, you can introduce yourself by email. We keep good people in mind for when the right project comes along.</p>
              <StudioButton href="/contact" variant="secondary" size="sm">Introduce yourself</StudioButton>
            </div>
          </div>
        </section>
      </SiteShell>
    </>
  );
}
