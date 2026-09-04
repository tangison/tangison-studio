import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { auditAreas, auditSteps, auditTerms, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free Website Audit in Namibia | Studio Windhoek",
  description:
    "Free audit of your website, search visibility and social presence. A Windhoek studio checks speed, mobile, SEO and trust signals, then sends a written report.",
  alternates: { canonical: "/audit" },
};

export default function AuditPage() {
  return (
    <>
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-36 md:pt-44">
        <Reveal>
          <p className="eyebrow text-teal">Free audit</p>
          <h1 className="h1 mt-5 max-w-4xl">We audit your digital presence for free.</h1>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-6 max-w-2xl text-lg text-ink-muted leading-relaxed">
            Send us your website address and we will tell you exactly where you
            are losing customers: load speed, mobile experience, search
            visibility, and the trust signals Namibian buyers look for. You get a
            written report in five working days. No cost, and no obligation to
            hire us afterwards.
          </p>
        </Reveal>
        <Reveal delay={160}>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#request"
              className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-ink text-paper text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Request your free audit
              <ArrowRight aria-hidden="true" className="w-4 h-4" />
            </a>
            <a
              href="#what-happens"
              className="inline-flex items-center gap-2 h-12 px-7 rounded-full border border-line-strong text-sm font-medium hover:bg-teal-mist transition-colors"
            >
              See what happens next
            </a>
          </div>
        </Reveal>
      </section>

      {/* ============ Image ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-14 md:pt-20">
        <Reveal>
          <div className="relative aspect-[16/10] md:aspect-[21/9] rounded-[24px] overflow-hidden border border-line">
            <Image
              src="/images/paintings/process-progressive.webp"
              alt="A winding desert road forking gently across soft dunes and resolving into one clear path."
              fill
              priority
              sizes="(max-width: 1400px) 100vw, 1360px"
              className="object-cover"
            />
          </div>
        </Reveal>
      </section>

      {/* ============ Six areas ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-20 md:pt-28">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.6fr]">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow text-teal">What we check</p>
              <h2 className="h3 mt-4">Six areas, every time.</h2>
              <p className="mt-4 text-ink-muted text-[15px] leading-relaxed max-w-sm">
                The same structure for every audit, so nothing depends on what we
                happen to notice on the day.
              </p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="grid gap-px bg-line rounded-[20px] overflow-hidden border border-line">
              {auditAreas.map((area, i) => (
                <div
                  key={area.name}
                  className="bg-paper-raise p-6 md:p-8 grid gap-3 sm:grid-cols-[200px_1fr] sm:gap-8"
                >
                  <div>
                    <p className="font-mono text-[11px] text-teal">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 font-display font-bold text-lg tracking-[-0.01em]">
                      {area.name}
                    </h3>
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
          <p className="eyebrow text-teal">What happens next</p>
          <h2 className="h2 mt-3 max-w-2xl">
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
                  <h3 className="font-display font-bold text-xl tracking-[-0.02em]">
                    {step.name}
                  </h3>
                  <p className="mt-2 eyebrow !tracking-[0.1em]">{step.meta}</p>
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
          <p className="eyebrow text-teal">The terms</p>
          <h2 className="h2 mt-3 max-w-2xl">What free actually means here.</h2>
          <p className="mt-5 max-w-xl text-ink-muted leading-relaxed">
            A free offer with no stated limits usually has unstated ones. Here
            are ours.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4 rounded-[20px] overflow-hidden border border-line">
          {auditTerms.map((term) => (
            <div key={term.name} className="bg-paper-raise p-6 md:p-8">
              <span
                aria-hidden="true"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-teal-mist text-teal"
              >
                <Check className="w-4 h-4" />
              </span>
              <h3 className="h3 mt-5 !text-lg">{term.name}</h3>
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
          <div className="rounded-[24px] border border-line bg-teal-mist px-6 py-14 md:p-16">
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
                  "Hello Studio,\n\nPlease audit this website:\n\nName:\nEmail:\nOrganization (optional):\nAnything specific you want us to look at (optional):\n"
                )}`}
                className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-ink text-paper text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Request my free audit
                <ArrowUpRight aria-hidden="true" className="w-4 h-4" />
              </a>
              <a
                href={site.phoneHref}
                className="inline-flex items-center gap-2 h-12 px-7 rounded-full border border-line-strong text-sm font-medium hover:bg-paper-raise transition-colors"
              >
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
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-24 md:pt-32">
        <Reveal>
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <p className="eyebrow">Rather see the work first?</p>
              <h2 className="h2 mt-3">Every project we have shipped</h2>
              <p className="mt-4 max-w-xl text-ink-muted">
                Every project we have shipped is on one page, with the outcome
                each one was built to deliver.
              </p>
            </div>
            <Link
              href="/cases"
              className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-ink text-paper text-sm font-medium hover:opacity-90 transition-opacity"
            >
              See every case
              <ArrowRight aria-hidden="true" className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
