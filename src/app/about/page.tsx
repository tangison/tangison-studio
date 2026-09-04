import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { principles, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Studio | Independent Digital Product Practice in Windhoek",
  description:
    "Independent digital product practice in Windhoek, Namibia. We design focused websites, applications, and brand systems for ambitious organizations.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-36 md:pt-44">
        <Reveal>
          <p className="eyebrow">About</p>
          <h1 className="h1 mt-5 max-w-4xl">Built at the edge.</h1>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-6 max-w-2xl text-lg text-ink-muted leading-relaxed">
            Studio is an independent digital product practice in Windhoek,
            Namibia. We design focused websites, applications and brand systems
            for ambitious organizations across Africa.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-14 md:pt-20">
        <Reveal>
          <div className="relative aspect-[16/10] md:aspect-[21/9] rounded-[24px] overflow-hidden border border-line">
            <Image
              src="/images/paintings/about-windhoek.webp"
              alt="A quiet Windhoek hillside street in soft early morning light, with acacia trees and low fences in pastel haze."
              fill
              priority
              sizes="(max-width: 1400px) 100vw, 1360px"
              className="object-cover"
            />
          </div>
        </Reveal>
      </section>

      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-20 md:pt-28">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.6fr]">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow text-teal">The practice</p>
              <h2 className="h3 mt-4">Clear signals, useful work.</h2>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="prose-body flex flex-col gap-5">
              <p>
                Studio operates with a simple belief: clear signals, useful work.
                We turn ambiguous ambitions into focused digital experiences by
                staying small, staying direct, and refusing to separate strategy
                from craft.
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
                can provide it. But you work with Studio directly. The group
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

      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-24 md:pt-32">
        <Reveal>
          <p className="eyebrow">Principles</p>
        </Reveal>
        <div className="mt-10 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4 rounded-[20px] overflow-hidden border border-line">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 70} className="bg-paper-raise p-6 md:p-8">
              <p className="font-mono text-[11px] text-teal">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="h3 mt-4">{p.title}</h3>
              <p className="mt-3 text-ink-muted text-[15px] leading-relaxed">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-24 md:pt-32">
        <Reveal>
          <div className="rounded-[24px] border border-line bg-teal-mist px-6 py-14 md:p-16 text-center">
            <h2 className="h2">Work with us.</h2>
            <p className="mt-4 text-ink-muted max-w-xl mx-auto">
              Tell us what you are building. We reply to every serious enquiry
              within two working days.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-ink text-paper text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Start a project
                <ArrowRight aria-hidden="true" className="w-4 h-4" />
              </Link>
              <a
                href={site.whatsapp}
                className="inline-flex items-center gap-2 h-12 px-7 rounded-full border border-line-strong text-sm font-medium hover:bg-paper-raise transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
