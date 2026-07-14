import type { Metadata } from "next";
import { Check } from "lucide-react";
import { SiteShell } from "@/components/tangison/site-shell";
import { StudioButton } from "@/components/studio/button";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/tangison/json-ld";

export const metadata: Metadata = {
  title: "Partnership",
  description: "Ongoing partnership plans from Studio: Care, Partner, Studio Plus, and Studio Project. Maintenance, support, and continuous product design and development.",
  alternates: { canonical: "/partnership" },
  openGraph: { title: "Partnership | Studio", description: "Four partnership plans.", url: "/partnership", images: [{ url: "/og.png", width: 1200, height: 630, alt: "Studio" }] },
};

const plans = [
  { id: "care", name: "Care", price: "N$500", cadence: "per month", model: "Maintenance", summary: "Light maintenance and monitoring for live websites.", includes: ["Security updates and monitoring", "Small content changes", "Uptime oversight", "Email support"] },
  { id: "partner", name: "Partner", price: "N$1,000", cadence: "per month", model: "Support", summary: "Ongoing support for sites that change regularly.", includes: ["Everything in Care", "Priority response", "Regular content updates", "Performance oversight", "Monthly check-in"] },
  { id: "studio-plus", name: "Studio Plus", price: "N$2,000", cadence: "per month", model: "Ongoing", summary: "Continuous product design and development for evolving digital products.", includes: ["Everything in Partner", "Dedicated design and development time", "Roadmap planning", "Iterative releases", "Strategy sessions"], highlighted: true },
  { id: "studio-project", name: "Studio Project", price: "Custom", cadence: "per proposal", model: "New project", summary: "A scoped project engagement for new websites, products, or brand systems.", includes: ["Discovery and strategy", "Design and development", "Launch and handover", "Defined timeline and deliverables", "Fixed proposal"] },
];

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Partnership", url: "/partnership" }]} />
      <WebPageJsonLd title="Partnership" description="Four partnership plans." url="/partnership" />
      <SiteShell>
        <section className="pt-12 md:pt-20 pb-8">
          <div className="mx-auto max-w-4xl px-6">
            <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-3">Partnership</p>
            <h1 className="font-display font-bold text-ink text-4xl md:text-5xl mb-4">Four ways to work with Studio.</h1>
            <p className="font-satoshi text-lg text-ink-muted max-w-2xl">Partnership plans for live sites, evolving products, and new projects. Pick the model that matches the stage you are at.</p>
          </div>
        </section>
        <section className="pb-12">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {plans.map((plan) => (
                <div key={plan.id} className={`p-6 rounded-[20px] border ${plan.highlighted ? "border-signal-teal bg-ocean-mist/30" : "border-card-border bg-signal-white"}`}>
                  <h2 className="font-display font-bold text-ink text-xl mb-1">{plan.name}</h2>
                  <p className="font-jetbrains text-[9px] text-ink-muted uppercase tracking-[0.2em] mb-4">{plan.model}</p>
                  <div className="mb-4">
                    <span className="font-display font-bold text-ink text-2xl">{plan.price}</span>
                    {plan.cadence && <span className="text-sm text-ink-muted ml-1">{plan.cadence}</span>}
                  </div>
                  <p className="font-satoshi text-sm leading-relaxed text-ink-muted mb-5">{plan.summary}</p>
                  <ul className="space-y-2 mb-6">
                    {plan.includes.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-ink-muted">
                        <Check className="w-4 h-4 text-signal-teal-text shrink-0 mt-0.5" />{item}
                      </li>
                    ))}
                  </ul>
                  <StudioButton as="link" href="/contact" variant={plan.highlighted ? "primary" : "secondary"} size="sm" className="w-full">
                    {plan.model === "New project" ? "Request a proposal" : "Get started"}
                  </StudioButton>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-16 md:py-24 bg-atlantic-black">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="font-display font-bold text-skeleton-bone text-3xl mb-4">Not sure which model fits?</h2>
            <p className="font-satoshi text-lg text-skeleton-bone/70 mb-8">Tell us what you are working on.</p>
            <StudioButton as="link" href="/contact" variant="inverse" hasArrow arrowType="up-right">Talk to us</StudioButton>
          </div>
        </section>
      </SiteShell>
    </>
  );
}
