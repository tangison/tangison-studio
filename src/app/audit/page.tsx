import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { auditAreas, auditSteps, auditTerms, site } from "@/lib/site";
import { buildPageMetadata, JsonLdScript, pageJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Free Website Audit in Namibia",
  description:
    "Free audit of your website, search visibility and social presence. A Windhoek studio checks speed, mobile, SEO and trust signals, then sends a written report.",
  path: "/audit",
  ogTitle: "Free Website Audit | The Tangison Studio",
  ogImage: {
    url: "/images/og/audit.png",
    width: 1200,
    height: 630,
    alt: "Free website audit from The Tangison Studio, Windhoek.",
  },
});

export default function AuditPage() {
  return (
    <div className="theme-ink bg-paper text-ink min-h-screen">
      <JsonLdScript
        data={pageJsonLd(
          "Free Website Audit in Namibia | The Tangison Studio",
          "Free audit of your website, search visibility and social presence. A Windhoek studio checks speed, mobile, SEO and trust signals, then sends a written report.",
          "/audit",
        )}
      />
      {/* ============ Header: one painting, one line ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-36 md:pt-44">
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-16 items-end">
          <div>
            <Reveal>
              <h1 className="h1 max-w-3xl">We audit your digital presence for free.</h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-6 max-w-xl text-lg text-ink-muted leading-relaxed">
                Send us your website address and we will tell you exactly where you
                are losing customers: load speed, mobile experience, search
                visibility, and the trust signals Namibian buyers look for. You get a
                written report in five working days. No cost, and no obligation to
                hire us afterwards.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#request" className="btn btn-primary">
                  Request your free audit
                </a>
                <a href="#what-happens" className="btn btn-outline">
                  See what happens next
                </a>
              </div>
            </Reveal>
          </div>
          <Reveal variant="zoom" delay={100}>
            <div className="relative art-tile art-shadow aspect-[4/3] max-w-[380px] w-full ml-auto bg-paper-raise">
              <Image
                src="/images/paintings/heroes/hero-audit.webp"
                alt="A single brass magnifying glass on warm plain paper, a minimal oil painting."
                fill
                priority
                fetchPriority="high"
                sizes="380px"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ Six areas ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-20 md:pt-28">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.6fr]">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <h2 className="h3">Six areas, every time.</h2>
              <p className="mt-4 text-ink-muted text-[15px] leading-relaxed max-w-sm">
                The same structure for every audit, so nothing depends on what we
                happen to notice on the day.
              </p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="grid gap-6">
              {auditAreas.map((area) => (
                <div
                  key={area.name}
                  className="bg-paper-raise rounded-[20px] border border-line p-6 md:p-8 grid gap-3 sm:grid-cols-[200px_1fr] sm:gap-8"
                >
                  <div>
                    <h3 className="h3">{area.name}</h3>
                  </div>
                  <p className="text-ink-muted text-[15px] leading-relaxed">
                    {area.body}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ Timeline ============ */}
      <section id="what-happens" className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-24 md:pt-32 scroll-mt-28">
        <Reveal>
          <h2 className="h2 max-w-2xl">
            From request to report in five working days.
          </h2>
          <p className="mt-5 max-w-xl text-ink-muted leading-relaxed">
            Every step below says who is acting and how long it takes, so you are
            never waiting without knowing why.
          </p>
        </Reveal>
        <div className="mt-10 md:mt-14 flex flex-col gap-0">
          {auditSteps.map((step, i) => (
            <Reveal key={step.step} delay={i * 60}>
              <div className="grid gap-3 md:grid-cols-[90px_1fr_2fr] md:gap-10 py-8 border-t border-line">
                <p className="font-mono text-sm text-teal pt-1">{step.step}</p>
                <div>
                  <h3 className="h3">{step.name}</h3>
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">{step.meta}</p>
                </div>
                <p className="text-ink-muted text-[15px] leading-relaxed max-w-2xl">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ Terms ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-24 md:pt-32">
        <Reveal>
          <h2 className="h2 max-w-2xl">What free actually means here.</h2>
          <p className="mt-5 max-w-xl text-ink-muted leading-relaxed">
            A free offer with no stated limits usually has unstated ones. Here
            are ours.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {auditTerms.map((term) => (
            <div key={term.name} className="rounded-[20px] border border-line bg-paper-raise p-6 md:p-8">
              <h3 className="h3 !text-lg">{term.name}</h3>
              <p className="mt-3 text-ink-muted text-[15px] leading-relaxed">
                {term.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ Request ============ */}
      <section id="request" className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-24 md:pt-32 scroll-mt-28">
        <Reveal>
          <div className="art-tile bg-teal-mist px-6 py-14 md:p-16">
            <h2 className="h2">Send us the address. We will do the rest.</h2>
            <p className="mt-4 text-ink-muted max-w-xl">
              We reply within two working days to confirm, then send the written
              report inside five. If you would rather talk to a person first,
              call the studio line.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent(
                  "Free audit request"
                )}&body=${encodeURIComponent(
                  "Hello Tangison Studio,\n\nPlease audit this website:\n\nName:\nEmail:\nOrganization (optional):\nAnything specific you want us to look at (optional):\n"
                )}`}
                className="btn btn-primary"
              >
                Request my free audit
              </a>
              <a href={site.phoneHref} className="btn btn-outline">
                {site.phone}
              </a>
            </div>
            <p className="mt-6 text-sm text-ink-muted">
              Takes two minutes. No card, no account, no sales call required. No
              website yet? Enter your Facebook or Instagram page instead and we
              will audit that.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ============ Cases CTA ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-24 md:pt-32 pb-24">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <h2 className="h2">Every project we have shipped.</h2>
            <p className="mt-4 max-w-xl text-ink-muted">
              Every project we have shipped is on one page, with the outcome
              each one was built to deliver.
            </p>
          </div>
          <Link href="/cases" className="btn btn-primary">
            See every case
          </Link>
        </div>
      </section>
    </div>
  );
}
