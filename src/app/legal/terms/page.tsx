import type { Metadata } from "next";
import { SiteShell } from "@/components/tangison/site-shell";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/tangison/json-ld";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for the Tangison Studio website and the engagement of Studio services.",
  alternates: { canonical: "/legal/terms" },
  openGraph: { title: "Terms of Service | Studio", description: "Terms of service for Tangison Studio.", url: "/legal/terms", images: [{ url: "/og.png", width: 1200, height: 630, alt: "Studio" }] },
};

const sections = [
  { heading: "Website use", body: ["By accessing this website you agree to use it for lawful purposes only. You agree not to misuse the site, including but not limited to attempting to gain unauthorized access to server-side systems, submitting malicious input through forms, or scraping content in violation of our robots.txt."] },
  { heading: "Intellectual property", body: ["The content of this website, including text, design, code, imagery, and the Studio identity, is the property of Tangison Studio unless otherwise stated. Project case studies reference client work and remain the property of the respective clients.", "You may share links to this site. You may not reproduce, redistribute, or repurpose substantial portions of the site without written permission."] },
  { heading: "Project engagements", body: ["Any project engagement with Tangison Studio is governed by a separate written agreement (proposal, statement of work, or contract). In the event of a conflict between these terms and a project agreement, the project agreement controls."] },
  { heading: "Partnership plans", body: ["Partnership plans (Care, Partner, Studio Plus, Studio Project) are described on the partnership page. Specific deliverables, response times, and terms for each engagement are confirmed in writing before work begins. Plan inclusions may change; existing clients are notified in advance of any changes."] },
  { heading: "Limitation of liability", body: ["This website is provided \"as is\". Tangison Studio is not liable for damages arising from the use of this website, except as required by applicable law."] },
  { heading: "Governing law", body: ["These terms are governed by the laws of the Republic of Namibia. Any disputes will be resolved in the courts of Namibia unless otherwise agreed in writing."] },
  { heading: "Contact", body: ["Questions about these terms can be sent to studio@tangison.com."] },
];

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Terms of Service", url: "/legal/terms" }]} />
      <WebPageJsonLd title="Terms of Service" description="Terms of service for Tangison Studio." url="/legal/terms" />
      <SiteShell>
        <section className="pt-12 md:pt-20 pb-20">
          <div className="mx-auto max-w-2xl px-6">
            <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-3">Legal</p>
            <h1 className="font-display font-bold text-ink text-4xl md:text-5xl mb-2">Terms of Service</h1>
            <p className="font-satoshi text-sm text-ink-muted mb-10">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
            <div className="space-y-8">
              {sections.map((s) => (
                <div key={s.heading}>
                  <h2 className="font-display font-bold text-ink text-lg mb-3">{s.heading}</h2>
                  <div className="space-y-3">
                    {s.body.map((p, i) => (
                      <p key={i} className="font-satoshi text-sm leading-relaxed text-ink-muted">{p}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </SiteShell>
    </>
  );
}
