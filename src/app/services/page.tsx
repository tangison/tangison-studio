import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { capabilities, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services | Studio and Intelligence, One Practice in Windhoek",
  description:
    "Seven outcome-led programs from a practice in Windhoek. Brand systems, website development, application design, product design, design systems, applied AI.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-36 md:pt-44">
        <Reveal>
          <p className="eyebrow">What we do</p>
          <h1 className="h1 mt-5 max-w-4xl">Studio and Intelligence. One practice.</h1>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-6 max-w-2xl text-lg text-ink-muted leading-relaxed">
            Brand, product, and the systems behind it. One studio instead of
            three vendors.
          </p>
        </Reveal>
        <Reveal delay={160}>
          <div className="mt-10 max-w-3xl prose-body flex flex-col gap-5">
            <p>
              Studio is organized around two capabilities, Studio and
              Intelligence, with seven outcome-led programs underneath. The
              Studio capability covers everything you can see and interact with:
              brand systems, websites, applications, design systems, and creative
              direction. The Intelligence capability covers applied AI work that
              has to behave predictably in production: research, model
              integration, agent design, and the infrastructure that makes
              sovereign intelligence possible.
            </p>
            <p>
              The split is structural, not cosmetic. Some clients need only
              Studio. Some need only Intelligence. Most need both, but at
              different intensities across the project lifecycle. Pricing each
              program separately means you pay for what you actually use. There
              is no minimum retainer, no bundled service you have to opt out of.
            </p>
            <p>
              Each program is described below by the situation it fits, the
              outputs it produces, and the kind of organization it tends to suit.
              If you are not sure which one applies, send us a message and we
              will tell you. The first conversation is free, and we will not
              push a program that does not fit your problem.
            </p>
          </div>
        </Reveal>
      </section>

      {capabilities.map((cap, idx) => (
        <section
          key={cap.key}
          id={cap.key}
          className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-24 md:pt-32 scroll-mt-28"
        >
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div className={idx % 2 === 1 ? "lg:order-2" : ""}>
                <p className="eyebrow text-teal">0{idx + 1}</p>
                <h2 className="h2 mt-3">{cap.title}</h2>
                <p className="mt-5 text-ink-muted text-lg leading-relaxed max-w-xl">
                  {cap.lead}
                </p>
              </div>
              <div
                className={`relative aspect-[4/3] rounded-[20px] overflow-hidden border border-line ${
                  idx % 2 === 1 ? "lg:order-1" : ""
                }`}
              >
                <Image
                  src={
                    cap.key === "studio"
                      ? "/images/paintings/services-brand.webp"
                      : "/images/paintings/services-intelligence.webp"
                  }
                  alt={cap.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 640px"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>

          <div className="mt-10 md:mt-14 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3 rounded-[20px] overflow-hidden border border-line">
            {cap.programs.map((program) => (
              <div key={program.name} className="bg-paper-raise p-6 md:p-8">
                <h3 className="font-display font-bold text-xl tracking-[-0.02em]">
                  {program.name}
                </h3>
                <p className="mt-3 text-ink-muted text-[15px] leading-relaxed">
                  {program.fit}
                </p>
              </div>
            ))}
          </div>
        </section>
      ))}

      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-24 md:pt-32">
        <Reveal>
          <div className="rounded-[24px] border border-line bg-teal-mist px-6 py-14 md:p-16 text-center">
            <h2 className="h2">Not sure where to start?</h2>
            <p className="mt-4 text-ink-muted max-w-xl mx-auto">
              Tell us what you are working on. We will figure out the right
              starting point together.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-ink text-paper text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Talk to us
                <ArrowRight aria-hidden="true" className="w-4 h-4" />
              </Link>
              <a
                href={site.whatsapp}
                className="inline-flex items-center gap-2 h-12 px-7 rounded-full border border-line-strong text-sm font-medium hover:bg-paper-raise transition-colors"
              >
                WhatsApp
              </a>
            </div>
            <p className="mt-6 text-sm text-ink-muted">
              Or start with{" "}
              <Link href="/audit" className="link-underline text-ink">
                a free audit of your current site
              </Link>
              .
            </p>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-24 md:pt-32">
        <Reveal>
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <p className="eyebrow">Rather read than talk?</p>
              <h2 className="h2 mt-3">The work speaks first</h2>
            </div>
            <Link
              href="/cases"
              className="inline-flex items-center gap-2 h-11 px-5 rounded-full border border-line-strong text-sm font-medium hover:bg-teal-mist transition-colors"
            >
              All cases
              <ArrowUpRight aria-hidden="true" className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
