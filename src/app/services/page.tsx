import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { capabilities, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services | Studio and Intelligence, One Practice in Windhoek",
  description:
    "Seven outcome-led programs from The Tangison Studio in Windhoek. Brand systems, website development, application design, product design, design systems, applied AI.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services | The Tangison Studio",
    description:
      "Brand, product, and the systems behind it. One studio instead of three vendors.",
    images: [{ url: "/images/og/services.png", width: 1200, height: 630 }],
  },
};

export default function ServicesPage() {
  return (
    <div className="theme-ink bg-paper text-ink min-h-screen">
      {/* ============ Header: one painting, one line ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-36 md:pt-44">
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-16 items-end">
          <div>
            <Reveal>
              <h1 className="h1 max-w-3xl">
                Studio and Intelligence.
                <span className="block text-ink-muted">One practice.</span>
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-6 max-w-xl text-lg text-ink-muted leading-relaxed">
                Brand, product, and the systems behind it. One studio instead
                of three vendors.
              </p>
            </Reveal>
          </div>
          <Reveal variant="zoom" delay={100}>
            <div className="relative art-tile art-shadow aspect-[4/3] max-w-[380px] w-full ml-auto bg-paper-raise">
              <Image
                src="/images/paintings/heroes/hero-services.webp"
                alt="A single fountain pen resting on plain warm paper, a minimal oil painting."
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
          <div className="mt-12 max-w-3xl prose-body flex flex-col gap-5">
            <p>
              The Tangison Studio is organized around two capabilities, Studio
              and Intelligence, with seven outcome-led programs underneath. The
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
                <h2 className="h2">{cap.title}</h2>
                <p className="mt-5 text-ink-muted text-lg leading-relaxed max-w-xl">
                  {cap.lead}
                </p>
              </div>
              <div
                className={`relative art-tile art-shadow aspect-[4/3] bg-paper-raise ${
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

          <div className="mt-10 md:mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cap.programs.map((program) => (
              <div key={program.name} className="rounded-[20px] border border-line bg-paper-raise p-6 md:p-8">
                <h3 className="h3">{program.name}</h3>
                <p className="mt-3 text-ink-muted text-[15px] leading-relaxed">
                  {program.fit}
                </p>
              </div>
            ))}
          </div>
        </section>
      ))}

      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-24 md:pt-32">
        <div className="art-tile bg-teal-mist px-6 py-14 md:p-16 text-center">
          <h2 className="h2">Not sure where to start?</h2>
          <p className="mt-4 text-ink-muted max-w-xl mx-auto">
            Tell us what you are working on. We will figure out the right
            starting point together.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn btn-primary">
              Talk to us
            </Link>
            <a href={site.whatsapp} className="btn btn-outline">
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
      </section>

      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-24 md:pt-32 pb-24">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <h2 className="h2">The work speaks first.</h2>
          <Link
            href="/cases"
            className="btn btn-outline btn-sm"
          >
            All cases
          </Link>
        </div>
      </section>
    </div>
  );
}
