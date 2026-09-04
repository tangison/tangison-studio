import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { contactPoints, site, whatToSend } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Studio | Start a Project in Windhoek, Namibia",
  description:
    "Start a project with Studio in Windhoek, Namibia. Tell us what you are working on, your timeline, and any budget constraints. We reply within two working days.",
  alternates: { canonical: "/contact" },
};

/** Builds a mailto: link with the enquiry prefilled, as on the production site. */
function mailtoEnquiry(body?: string) {
  const subject = "Project enquiry";
  const text =
    body ??
    "Hello Studio,%0D%0A%0D%0AHere is what I am working on:%0D%0A%0D%0A%0D%0ATimeline:%0D%0ABudget range:";
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${text}`;
}

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
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-36 md:pt-44">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h1 className="h1 mt-5 max-w-4xl">Have something worth building?</h1>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-6 max-w-2xl text-lg text-ink-muted leading-relaxed">
            Tell us what you are working on. We reply to every serious enquiry
            within two working days.
          </p>
        </Reveal>
      </section>

      {/* ============ Contact points ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-14 md:pt-20">
        <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4 rounded-[20px] overflow-hidden border border-line">
          {contactPoints.map((cp, i) => (
            <Reveal key={cp.name} delay={i * 60} className="bg-paper-raise p-6 md:p-8">
              <p className="eyebrow">{cp.name}</p>
              <p className="mt-3 font-display font-bold text-lg tracking-[-0.01em]">
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

      {/* ============ Compose + invitation ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-20 md:pt-28">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div className="rounded-[24px] border border-line bg-paper-raise p-6 md:p-10 h-full flex flex-col">
              <p className="eyebrow">What to send</p>
              <ul className="mt-6 flex flex-col gap-4">
                {whatToSend.map((item) => (
                  <li key={item} className="flex gap-3 text-ink-muted leading-relaxed">
                    <span
                      aria-hidden="true"
                      className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-mist text-teal"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <a
                  href={mailtoEnquiry()}
                  className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-ink text-paper text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Open my email client
                  <ArrowUpRight aria-hidden="true" className="w-4 h-4" />
                </a>
                <p className="mt-4 text-sm text-ink-faint">
                  Your email opens with the message prefilled. Nothing is stored
                  on our server.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="relative rounded-[24px] overflow-hidden border border-line h-full min-h-[380px]">
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
        <Reveal>
          <p className="eyebrow">Where we work</p>
        </Reveal>
        <div className="mt-8 grid gap-6 md:gap-8 sm:grid-cols-3">
          {gallery.map((g, i) => (
            <Reveal key={g.src} delay={i * 80}>
              <div className="relative aspect-[4/3] rounded-[20px] overflow-hidden border border-line">
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
              <p className="eyebrow text-teal">Before you write</p>
              <h2 className="h3 mt-4">
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
                <a
                  href={site.whatsapp}
                  className="inline-flex items-center gap-2 h-12 px-7 rounded-full border border-line-strong text-sm font-medium hover:bg-teal-mist transition-colors"
                >
                  WhatsApp
                </a>
                <Link
                  href="/cases"
                  className="inline-flex items-center gap-2 h-12 px-7 rounded-full border border-line-strong text-sm font-medium hover:bg-teal-mist transition-colors"
                >
                  See the cases first
                  <ArrowRight aria-hidden="true" className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
