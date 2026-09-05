import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { principles, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About | Independent Digital Product Practice in Windhoek",
  description:
    "The Tangison Studio is an independent digital product practice in Windhoek, Namibia. We design focused websites, applications, and brand systems for ambitious organizations.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | The Tangison Studio",
    description:
      "Independent digital product practice in Windhoek, Namibia. One studio instead of three vendors.",
    images: [{ url: "/images/og/about.png", width: 1200, height: 630 }],
  },
};

export default function AboutPage() {
  return (
    <div className="theme-ink bg-paper text-ink min-h-screen">
      {/* ============ Header: one painting, one line ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-36 md:pt-44">
        <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-end">
          <Reveal>
            <h1 className="h1 max-w-3xl">Built at the edge.</h1>
          </Reveal>
          <Reveal variant="zoom" delay={100}>
            <div className="relative art-tile art-shadow aspect-[4/3] w-[240px] sm:w-[320px] lg:w-[380px] bg-paper-raise">
              <Image
                src="/images/paintings/heroes/hero-about.webp"
                alt="A single wooden studio chair in soft window light, a minimal oil painting."
                fill
                priority
                fetchPriority="high"
                sizes="380px"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
        <Reveal delay={160}>
          <p className="mt-8 max-w-2xl text-lg text-ink-muted leading-relaxed">
            The Tangison Studio is an independent digital product practice in
            Windhoek West, Namibia. We design focused websites, applications
            and brand systems for ambitious organizations across Africa.
          </p>
        </Reveal>
      </section>

      {/* ============ The practice ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-20 md:pt-28">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.6fr]">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <h2 className="h3">Clear signals, useful work.</h2>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="prose-body flex flex-col gap-5">
              <p>
                The studio operates with a simple belief: clear signals, useful
                work. We turn ambiguous ambitions into focused digital
                experiences by staying small, staying direct, and refusing to
                separate strategy from craft.
              </p>
              <p>
                The studio is part of{" "}
                <a
                  href={site.group.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-ink"
                >
                  Tangison Technologies
                </a>
                , but its working culture is independent. We take on a limited
                number of projects at a time so that the people who scope the
                work are the same people who design and build it. There is no
                account layer between you and the work.
              </p>
              <p>
                We work across the African continent, with a particular focus on
                organizations that need a digital presence equal to their
                ambition. Tourism operators, skincare brands, financial services,
                and public-sector work where trust and clarity matter more than
                flashy features.
              </p>
              <p>
                When a project needs deeper technical capacity, research, or
                production muscle,{" "}
                <a
                  href="https://labs.tangison.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-ink"
                >
                  Tangison Labs
                </a>{" "}
                can provide it. But you work with the studio directly. The group
                connection is there when it is useful, not when it is not.
              </p>
              <p>
                The studio was founded by {site.founder} in {site.founded},
                originally under the name Gemsweb Digital. The rename to Tangison
                Studio in 2025 was a structural decision, not a rebrand. It
                clarified what the practice does (digital product work), who it
                serves (ambitious organizations across Africa), and how it
                relates to the broader Tangison group. The work itself did not
                change.
              </p>
              <p>
                Our clients include travel operators in Walvis Bay and
                Swakopmund, skincare brands sourcing from the Kalahari, safari
                companies running tours across Southern Africa, financial
                services firms in Windhoek, petroleum distributors moving fuel
                across borders, and music academies that have been part of
                Windhoek&rsquo;s commercial fabric for over a decade. The thread
                connecting them is not industry, geography, or size. It is the
                seriousness with which they take their own work.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ Principles ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-24 md:pt-32">
        <h2 className="h2">How we work.</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p) => (
            <div key={p.title} className="rounded-[20px] border border-line bg-paper-raise p-6 md:p-7">
              <h3 className="h3">{p.title}</h3>
              <p className="mt-3 text-ink-muted text-[15px] leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-24 md:pt-32">
        <div className="art-tile bg-teal-mist px-6 py-14 md:p-16 text-center">
          <h2 className="h2">Work with us.</h2>
          <p className="mt-4 text-ink-muted max-w-xl mx-auto">
            Tell us what you are building. We reply to every serious enquiry
            within two working days.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn btn-primary">
              Start a project
            </Link>
            <a href={site.whatsapp} className="btn btn-outline">
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
