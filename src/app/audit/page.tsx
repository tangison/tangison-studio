import type { Metadata } from "next";
import Image from "next/image";
import { SiteShell } from "@/components/tangison/site-shell";
import { StudioButton } from "@/components/studio/button";
import { AuditRequestForm } from "@/components/studio/audit-request-form";
import {
  ScrollReveal,
  StaggerReveal,
  StaggerItem,
  ScaleReveal,
  ParentBadge,
} from "@/components/studio/scroll-reveal";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/tangison/json-ld";

export const metadata: Metadata = {
  title: {
    absolute: "Free Website Audit in Namibia | Studio Windhoek",
  },
  description:
    "Free audit of your website, search visibility and social presence. A Windhoek studio checks speed, mobile, SEO and trust signals, then sends a written report.",
  alternates: { canonical: "/audit" },
  openGraph: {
    title: "Free Website Audit in Namibia | Studio Windhoek",
    description:
      "We audit your digital presence for free: speed, mobile, search visibility, and the trust signals Namibian customers look for. Written report in five working days.",
    url: "/audit",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Free digital presence audit from Studio in Windhoek",
      },
    ],
  },
};

/* ──────────────────────────────────────────────
   What we check. Grouped so the visitor can see
   the audit is structured, not a sales call.
   ────────────────────────────────────────────── */
const checkAreas = [
  {
    num: "01",
    title: "Findability",
    body: "Whether you appear when someone in Namibia searches for what you sell. We check how Google currently sees your pages, which search phrases you rank for, and whether your Google Business Profile is complete and consistent with your website.",
  },
  {
    num: "02",
    title: "Speed and data cost",
    body: "How fast your site loads on a mobile connection, and how many megabytes a visitor has to pay for to reach your contact details. Oversized images are the most common problem we find, and the easiest to fix.",
  },
  {
    num: "03",
    title: "Mobile experience",
    body: "Most Namibian traffic is mobile. We walk your site on a phone and note anything that is unreadable, untappable, or that pushes the enquiry button below three screens of scrolling.",
  },
  {
    num: "04",
    title: "Trust signals",
    body: "Whether a first-time visitor can find a real phone number, a physical location, and evidence that you are a going concern. Missing trust signals cost more enquiries than bad design does.",
  },
  {
    num: "05",
    title: "Accessibility",
    body: "Colour contrast, keyboard navigation, alternative text on images, and form labels. This affects real users, and search engines read many of the same signals.",
  },
  {
    num: "06",
    title: "Content and clarity",
    body: "Whether your homepage states what you do, who it is for, and what to do next, without jargon. We flag pages where a visitor has to guess.",
  },
];

/* ──────────────────────────────────────────────
   What happens after the request. Explicit, with
   who acts at each step and how long it takes.
   ────────────────────────────────────────────── */
const whatHappens = [
  {
    num: "01",
    name: "You send the request",
    who: "You",
    when: "Two minutes",
    detail:
      "Fill in the form on this page with your website address. The only required details are your name, your email, and the address you want us to look at. No phone call is needed to get started.",
  },
  {
    num: "02",
    name: "We confirm we received it",
    who: "Studio",
    when: "Within two working days",
    detail:
      "You get a short reply from a person confirming we have your request, with the date your report will land. If your site falls outside what we can usefully audit, we tell you at this point rather than sending a thin report.",
  },
  {
    num: "03",
    name: "We run the audit",
    who: "Studio",
    when: "Three to five working days",
    detail:
      "We test your site on a real phone and a desktop browser, run automated checks for speed, accessibility and search visibility, and review your content the way a first-time customer reads it. We do not need access to your hosting, your accounts, or your passwords.",
  },
  {
    num: "04",
    name: "You receive the written report",
    who: "Studio",
    when: "Five working days from confirmation",
    detail:
      "A plain-language document, not a raw tool export. Every finding says what is wrong, why it matters to your customers, and what fixing it involves. Findings are ordered by impact, so the first item is the one worth doing first.",
  },
  {
    num: "05",
    name: "We walk you through it",
    who: "Both",
    when: "Thirty minutes, optional",
    detail:
      "If you want it, we book a half-hour call to go through the report and answer questions. Decline it and you still keep the report. This call is not a pitch, and the report is yours whether or not you ever hire us.",
  },
];

/* ──────────────────────────────────────────────
   Honest boundaries. Stated up front because a
   free offer with no stated limits reads as bait.
   ────────────────────────────────────────────── */
const boundaries = [
  {
    title: "It is genuinely free",
    body: "No card, no deposit, no trial that converts into a subscription. We audit a fixed number of sites each month because a person does the work.",
  },
  {
    title: "You keep the report",
    body: "The findings are yours to act on, in house or with another provider. We do not withhold the detail to force a follow-up conversation.",
  },
  {
    title: "We audit one site per organisation",
    body: "One website or one social page per business. If you run several brands, tell us which one matters most and we will start there.",
  },
  {
    title: "We may say no",
    body: "If a site is mid-rebuild or the request is a competitor fishing for a teardown, we will decline politely rather than waste your time.",
  },
];

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Free Audit", url: "/audit" },
        ]}
      />
      <WebPageJsonLd
        title="Free Website Audit in Namibia"
        description="A free, structured audit of your website, search visibility and social presence, delivered as a written report."
        url="/audit"
      />

      <SiteShell>
        {/* 1. HERO */}
        <section className="pt-12 md:pt-20 pb-8">
          <div className="mx-auto max-w-4xl px-6">
            <ScrollReveal slow>
              <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-3">
                Free audit
              </p>
              <h1 className="font-display font-bold text-ink text-4xl md:text-5xl mb-4">
                We audit your digital presence for free.
              </h1>
              <p className="font-satoshi text-lg text-ink-muted max-w-2xl">
                Send us your website address and we will tell you exactly where
                you are losing customers: load speed, mobile experience, search
                visibility, and the trust signals Namibian buyers look for. You
                get a written report in five working days. No cost, and no
                obligation to hire us afterwards.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <StudioButton
                  href="#request"
                  variant="primary"
                  hasArrow
                  arrowType="right"
                >
                  Request your free audit
                </StudioButton>
                <StudioButton href="#what-happens" variant="secondary">
                  See what happens next
                </StudioButton>
              </div>
              <p className="mt-3 font-satoshi text-sm text-ink-muted">
                Takes two minutes. No card, no account, no sales call required.
              </p>
              <ParentBadge className="mt-6" />
            </ScrollReveal>
          </div>
        </section>

        {/* 2. PAINTING */}
        <section className="pb-12">
          <div className="mx-auto max-w-5xl px-6">
            <ScaleReveal>
              <div className="aspect-[16/9] overflow-hidden rounded-[25px] bg-ocean-mist">
                <Image
                  src="/images/paintings/process-progressive-v2.webp"
                  alt="An oil painting of a winding Namibian desert road splitting and resolving into one clear route."
                  width={1080}
                  height={608}
                  className="w-full h-full object-cover"
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 768px) 100vw, 1080px"
                />
              </div>
            </ScaleReveal>
          </div>
        </section>

        {/* 3. WHAT WE CHECK */}
        <section className="py-16 md:py-24" aria-labelledby="checks-heading">
          <div className="mx-auto max-w-6xl px-6">
            <ScrollReveal>
              <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-2">
                What we check
              </p>
              <h2
                id="checks-heading"
                className="font-display font-bold text-ink text-3xl md:text-4xl mb-4"
              >
                Six areas, every time.
              </h2>
              <p className="font-satoshi text-base text-ink-muted max-w-2xl mb-10">
                The same structure for every audit, so nothing depends on what
                we happen to notice on the day.
              </p>
            </ScrollReveal>

            <StaggerReveal>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {checkAreas.map((area) => (
                  <StaggerItem key={area.num}>
                    <div className="h-full p-6 rounded-[25px] bg-ocean-mist/40">
                      <p className="font-jetbrains text-[10px] text-signal-teal-text uppercase tracking-[0.2em] mb-3">
                        {area.num}
                      </p>
                      <h3 className="font-display font-bold text-ink text-xl mb-2">
                        {area.title}
                      </h3>
                      <p className="font-satoshi text-sm text-ink-muted leading-relaxed">
                        {area.body}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </StaggerReveal>
          </div>
        </section>

        {/* 4. WHAT HAPPENS NEXT */}
        <section
          id="what-happens"
          className="py-16 md:py-24 bg-ocean-mist/30 scroll-mt-24"
          aria-labelledby="happens-heading"
        >
          <div className="mx-auto max-w-4xl px-6">
            <ScrollReveal>
              <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-2">
                What happens next
              </p>
              <h2
                id="happens-heading"
                className="font-display font-bold text-ink text-3xl md:text-4xl mb-4"
              >
                From request to report in five working days.
              </h2>
              <p className="font-satoshi text-base text-ink-muted max-w-2xl mb-10">
                Every step below says who is acting and how long it takes, so
                you are never waiting without knowing why.
              </p>
            </ScrollReveal>

            <ol className="space-y-4">
              {whatHappens.map((step) => (
                <li key={step.num}>
                  <ScrollReveal>
                    <div className="p-6 md:p-8 rounded-[25px] bg-signal-white">
                      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 mb-3">
                        <span className="font-jetbrains text-[10px] text-signal-teal-text uppercase tracking-[0.2em]">
                          {step.num}
                        </span>
                        <h3 className="font-display font-bold text-ink text-xl">
                          {step.name}
                        </h3>
                        <span className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.15em]">
                          {step.who} &middot; {step.when}
                        </span>
                      </div>
                      <p className="font-satoshi text-sm md:text-base text-ink-muted leading-relaxed">
                        {step.detail}
                      </p>
                    </div>
                  </ScrollReveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 5. WHAT IT COSTS / BOUNDARIES */}
        <section className="py-16 md:py-24" aria-labelledby="terms-heading">
          <div className="mx-auto max-w-4xl px-6">
            <ScrollReveal>
              <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-2">
                The terms
              </p>
              <h2
                id="terms-heading"
                className="font-display font-bold text-ink text-3xl md:text-4xl mb-4"
              >
                What free actually means here.
              </h2>
              <p className="font-satoshi text-base text-ink-muted max-w-2xl mb-10">
                A free offer with no stated limits usually has unstated ones.
                Here are ours.
              </p>
            </ScrollReveal>

            <StaggerReveal>
              <div className="grid sm:grid-cols-2 gap-6">
                {boundaries.map((b) => (
                  <StaggerItem key={b.title}>
                    <div className="h-full p-6 rounded-[25px] bg-ocean-mist/40">
                      <h3 className="font-display font-bold text-ink text-lg mb-2">
                        {b.title}
                      </h3>
                      <p className="font-satoshi text-sm text-ink-muted leading-relaxed">
                        {b.body}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </StaggerReveal>
          </div>
        </section>

        {/* 6. REQUEST FORM */}
        <section
          id="request"
          className="py-16 md:py-24 bg-ocean-mist/30 scroll-mt-24"
          aria-labelledby="request-heading"
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-start">
              <ScrollReveal>
                <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-2">
                  Request the audit
                </p>
                <h2
                  id="request-heading"
                  className="font-display font-bold text-ink text-3xl md:text-4xl mb-4"
                >
                  Send us the address. We will do the rest.
                </h2>
                <p className="font-satoshi text-base text-ink-muted mb-6">
                  We reply within two working days to confirm, then send the
                  written report inside five. If you would rather talk to a
                  person first, call the studio line.
                </p>

                <div className="space-y-3">
                  <div>
                    <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-1">
                      Studio line
                    </p>
                    <a
                      href="tel:+264853411522"
                      className="font-satoshi text-base text-ink hover:text-signal-teal-text transition-colors"
                    >
                      +264 85 341 1522
                    </a>
                  </div>
                  <div>
                    <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-1">
                      Email
                    </p>
                    <a
                      href="mailto:studio@tangison.com"
                      className="font-satoshi text-base text-ink hover:text-signal-teal-text transition-colors"
                    >
                      studio@tangison.com
                    </a>
                  </div>
                  <div>
                    <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-1">
                      Studio
                    </p>
                    <p className="font-satoshi text-base text-ink-muted">
                      Windhoek, Namibia
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                <AuditRequestForm />
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* 7. CLOSING CTA */}
        <section className="py-16 md:py-24" aria-labelledby="closing-heading">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <ScrollReveal>
              <h2
                id="closing-heading"
                className="font-display font-bold text-ink text-3xl md:text-4xl mb-4"
              >
                Rather see the work first?
              </h2>
              <p className="font-satoshi text-base text-ink-muted max-w-xl mx-auto mb-7">
                Every project we have shipped is on one page, with the outcome
                each one was built to deliver.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <StudioButton
                  href="/work"
                  variant="primary"
                  hasArrow
                  arrowType="right"
                >
                  See every project we have shipped
                </StudioButton>
                <StudioButton href="/contact" variant="secondary">
                  Start a project brief
                </StudioButton>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </SiteShell>
    </>
  );
}
