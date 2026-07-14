import type { Metadata } from "next";
import { SiteShell } from "@/components/tangison/site-shell";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/tangison/json-ld";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Studio.",
  alternates: { canonical: "/legal/privacy" },
  openGraph: { title: "Privacy Policy | Studio", description: "Privacy Policy for Studio.", url: "/legal/privacy", images: [{ url: "/og.png", width: 1200, height: 630, alt: "Studio" }] },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Privacy Policy", url: "/legal/privacy" }]} />
      <WebPageJsonLd title="Privacy Policy" description="Privacy Policy for Studio." url="/legal/privacy" />
      <SiteShell>
        <section className="pt-12 md:pt-20 pb-20">
          <div className="mx-auto max-w-2xl px-6">
            <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-3">Legal</p>
            <h1 className="font-display font-bold text-ink text-4xl md:text-5xl mb-4">Privacy Policy</h1>
            <p className="font-satoshi text-sm text-ink-muted mb-8">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
            <div className="space-y-6 text-sm leading-relaxed text-ink-muted">
              <p>This is the Privacy Policy for Tangison Studio. This page is being prepared with verified legal content. Please contact studio@tangison.com for any questions about this policy.</p>
              <p>Tangison Studio is a digital product practice based in Windhoek, Namibia, operating as part of Tangison Technologies.</p>
              <p>For any legal inquiries, contact us at studio@tangison.com.</p>
            </div>
          </div>
        </section>
      </SiteShell>
    </>
  );
}
