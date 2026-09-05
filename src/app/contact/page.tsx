import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { ContactForm } from "@/components/contact-form";
import { contactPoints, site, whatToSend } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact | Start a Project in Windhoek, Namibia",
  description:
    "Start a project with The Tangison Studio in Windhoek West, Namibia. Tell us what you are working on, your timeline, and any budget constraints. We reply within two working days.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | The Tangison Studio",
    description:
      "Tell us what you are building. We reply to every serious enquiry within two working days.",
    images: [{ url: "/images/og/contact.png", width: 1200, height: 630 }],
  },
};

export default function ContactPage() {
  const gallery = [
    {
      src: "/images/paintings/contact-gallery-01.webp",
      alt: "A lone desert road at dawn with a distant signal mast, in soft pastel light.",
    },
    {
      src: "/images/paintings/contact-gallery-02.webp",
      alt: "The Atlantic coastline with dark rocks softened by haze and a single teal light glow.",
    },
    {
      src: "/images/paintings/contact-gallery-03.webp",
      alt: "A Windhoek cityscape at early morning, rooftops and hills in soft pastel light.",
    },
  ];

  return (
    <>
      {/* ============ Header — one painting, one line ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-36 md:pt-44">
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-16 items-end">
          <div>
            <Reveal>
              <h1 className="h1 max-w-3xl">Have something worth building?</h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-6 max-w-xl text-lg text-ink-muted leading-relaxed">
                Tell us what you are working on. We reply to every serious
                enquiry within two working days.
              </p>
            </Reveal>
          </div>
          <Reveal variant="zoom" delay={100}>
            <div className="relative art-tile art-shadow aspect-[4/3] max-w-[380px] w-full ml-auto bg-paper-raise">
              <Image
                src="/images/paintings/heroes/hero-contact.webp"
                alt="A single cream envelope resting on warm linen, a minimal oil painting."
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

      {/* ============ Contact points ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-14 md:pt-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contactPoints.map((cp, i) => (
            <Reveal key={cp.name} delay={i * 60} className="rounded-[20px] border border-line bg-paper-raise p-6 md:p-7">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
                {cp.name}
              </p>
              <p className="mt-3 h3 !text-lg">
                {cp.name === "Email" ? (
                  <a href={`mailto:${site.email}`} className="link-underline">
                    {cp.value}
                  </a>
                ) : cp.name === "Phone" ? (
                  <a href={site.phoneHref} className="link-underline">
                    {cp.value}
                  </a>
                ) : (
                  cp.value
                )}
              </p>
              <p className="mt-3 text-ink-muted text-[15px] leading-relaxed">{cp.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ Brief form + invitation ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-20 md:pt-28">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div className="rounded-[24px] border border-line bg-paper-raise p-6 md:p-10 h-full flex flex-col relative art-shadow">
              <h2 className="h3">Start a project brief</h2>
              <ul className="mt-6 flex flex-col gap-3">
                {whatToSend.map((item) => (
                  <li key={item} className="flex gap-3 text-ink-muted leading-relaxed text-[15px]">
                    <span
                      aria-hidden="true"
                      className="mt-[0.55em] h-[6px] w-[6px] shrink-0 rounded-full bg-teal opacity-70"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-8 border-t border-line">
                <ContactForm />
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="relative art-tile art-shadow h-full min-h-[380px] bg-paper-raise">
              <Image
                src="/images/paintings/contact-invitation.webp"
                alt="A narrow doorway of light between two soft weathered rock walls, with gentle fog passing through."
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(12,16,20,0.55) 0%, rgba(12,16,20,0) 55%)",
                }}
              />
              <p className="absolute bottom-6 left-6 right-6 text-white text-sm leading-relaxed max-w-xs">
                Working from the edge of the Atlantic. {site.address}.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ Gallery strip ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-20 md:pt-28">
        <div className="grid gap-6 md:gap-8 sm:grid-cols-3">
          {gallery.map((g, i) => (
            <Reveal key={g.src} delay={i * 80}>
              <div className="relative art-tile art-shadow aspect-[4/3] bg-paper-raise">
                <Image
                  src={g.src}
                  alt={g.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-cover"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ Before you write ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-20 md:pt-28">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.6fr]">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <h2 className="h3">
                A few notes that will make your first message easier to answer
                well.
              </h2>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="prose-body flex flex-col gap-5">
              <p>
                We work with organizations across Africa and beyond, but our
                working hours are Windhoek local time, Monday through Friday,
                08:00 to 17:00. If your project is time-sensitive, say so
                explicitly in the subject line. We treat urgency as a fact, not a
                complaint.
              </p>
              <p>
                Most engagements start with a 30-minute call after the first
                email exchange. That call is free. It is where we figure out
                whether we are the right studio for the work, and whether the
                work is the right shape for us. We do not chase volume and we do
                not take on every enquiry.
              </p>
              <p>
                If you have an existing site, brand, or product, links and
                screenshots are useful. If you have a brief, send it. If you do
                not have a brief, that is fine too; the first conversation is
                often where the brief gets written. The important thing is to
                start with what you know and let us ask the questions that fill
                in what you do not.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <a href={site.whatsapp} className="btn btn-outline">
                  WhatsApp
                </a>
                <Link href="/cases" className="btn btn-outline">
                  See the cases first
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
