import type { Metadata } from "next";
import { SiteShell } from "@/components/tangison/site-shell";
import { StudioButton } from "@/components/studio/button";
import { BreadcrumbJsonLd, WebPageJsonLd, FAQJsonLd } from "@/components/tangison/json-ld";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about working with Studio: process, pricing, timelines, and partnership.",
  alternates: { canonical: "/faq" },
  openGraph: { title: "FAQ | Studio", description: "Frequently asked questions.", url: "/faq", images: [{ url: "/og.png", width: 1200, height: 630, alt: "Studio" }] },
};

const faqs = [
  { q: "What does a typical project cost?", a: "We offer four partnership models. Care at N$500/month, Partner at N$1,000/month, Studio Plus at N$2,000/month, and Studio Project at a custom proposal. Most new websites and applications fall into the Studio Project model." },
  { q: "How long does a project take?", a: "A focused marketing website typically takes four to eight weeks from discovery to launch. More complex applications can take three to six months. We give you a realistic timeline in the proposal phase and stick to it." },
  { q: "Do you work with clients outside Namibia?", a: "Yes. We work with organizations across Africa and beyond. Our base in Windhoek informs how we design, particularly around performance on constrained connections, but the work travels." },
  { q: "What is your process?", a: "Five steps: discover, define, design, build, launch. Each step has a clear purpose and we do not stretch engagements beyond what the work needs." },
  { q: "Do you offer ongoing support after launch?", a: "Yes. After launch we hand over documentation and train your team, then continue through one of the partnership models depending on how much ongoing work the project needs." },
  { q: "What technologies do you use?", a: "We build with modern, maintainable web technology. Typically Next.js, TypeScript, and Tailwind CSS. We choose the stack based on what the project needs, not on fashion." },
  { q: "Can you work with our existing brand?", a: "Yes. We can extend an existing brand system or help you build a new one. If your current identity needs work, we will say so honestly in the discovery phase." },
  { q: "How do we get started?", a: "Send us a message through the contact page or email studio@tangison.com. Tell us what you are working on, your timeline, and any budget constraints. We reply to every serious enquiry within two working days." },
];

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "FAQ", url: "/faq" }]} />
      <WebPageJsonLd title="FAQ" description="Frequently asked questions." url="/faq" />
      <FAQJsonLd faqs={faqs} />
      <SiteShell>
        <section className="pt-12 md:pt-20 pb-8">
          <div className="mx-auto max-w-4xl px-6">
            <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-3">FAQ</p>
            <h1 className="font-display font-bold text-ink text-4xl md:text-5xl mb-4">Frequently asked questions.</h1>
            <p className="font-satoshi text-lg text-ink-muted max-w-2xl">Straight answers to the questions we hear most often.</p>
          </div>
        </section>
        <section className="py-12">
          <div className="mx-auto max-w-4xl px-6">
            <dl className="space-y-8">
              {faqs.map((faq) => (
                <div key={faq.q} className="pb-8 border-b border-card-border last:border-0">
                  <dt className="font-display font-bold text-ink text-lg mb-2">{faq.q}</dt>
                  <dd className="font-satoshi text-base leading-relaxed text-ink-muted">{faq.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
        <section className="py-16 md:py-24 bg-atlantic-black">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="font-display font-bold text-skeleton-bone text-3xl mb-4">Still have questions?</h2>
            <StudioButton href="/contact" variant="inverse" hasArrow arrowType="up-right">Contact us</StudioButton>
          </div>
        </section>
      </SiteShell>
    </>
  );
}
