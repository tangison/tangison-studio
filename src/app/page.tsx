import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { CaseCard } from "@/components/case-card";
import { projects } from "@/lib/projects";
import { capabilities, principles, processSteps, site } from "@/lib/site";
import { getArticles } from "@/lib/articles";
import { formatDate } from "@/lib/article-types";

/** Hero video: muted, looping, optimized (audio stripped, faststart). */
function HeroVideo() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <video
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/videos/hero-poster.jpg"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
      {/* scrim: keeps text readable without hiding the film */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(12,16,20,0.38) 0%, rgba(12,16,20,0.18) 40%, rgba(246,244,239,0.55) 100%)",
        }}
      />
    </div>
  );
}

export default function HomePage() {
  const featured = projects.slice(0, 5);
  const latest = getArticles().slice(0, 3);
  const total = getArticles().length;

  return (
    <>
      {/* ============ Hero (video) ============ */}
      <section className="relative min-h-[92vh] flex flex-col justify-end overflow-hidden">
        <HeroVideo />
        <div className="relative mx-auto w-full max-w-[1400px] px-6 md:px-12 pb-20 md:pb-28 pt-40">
          <Reveal>
            <p className="eyebrow !text-white/75">
              {site.location} · Independent digital product studio
            </p>
          </Reveal>
          <Reveal delay={90}>
            <h1 className="h1 mt-5 max-w-4xl text-white [text-shadow:0_2px_30px_rgba(8,10,12,0.35)]">
              We build the brand, the product and the intelligence behind it.
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-6 max-w-xl text-lg md:text-xl text-white/90 [text-shadow:0_1px_20px_rgba(8,10,12,0.4)]">
              One studio instead of three vendors.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="/cases"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-white text-[#111315] text-sm font-medium hover:bg-white/90 transition-colors"
              >
                See every project we have shipped
                <ArrowRight aria-hidden="true" className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-full border border-white/40 text-white text-sm font-medium hover:bg-white/10 transition-colors"
              >
                Start a project brief
              </Link>
            </div>
          </Reveal>
          <Reveal delay={340}>
            <p className="mt-6 text-sm text-white/70">
              No cost to scope it. Or{" "}
              <Link href="/audit" className="link-underline text-white/90">
                get a free audit of your current site
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ Selected work — tight gallery ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-24 md:pt-32">
        <Reveal>
          <div className="flex items-end justify-between gap-6">
            <p className="eyebrow">Selected work</p>
            <Link
              href="/cases"
              className="inline-flex items-center gap-2 text-sm font-medium link-underline"
            >
              All {projects.length} cases
              <ArrowUpRight aria-hidden="true" className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>

        <div className="mt-8 md:mt-12 grid gap-6 md:gap-8 sm:grid-cols-2">
          {featured.map((p, i) => (
            <Reveal
              key={p.slug}
              delay={i === 0 ? 0 : (i % 2) * 90}
              variant={i === 0 ? "zoom" : "rise"}
              className={i === 0 ? "sm:col-span-2" : ""}
            >
              <CaseCard
                project={p}
                featured={i === 0}
                priority={i < 2}
                sizes={
                  i === 0
                    ? "(max-width: 768px) 100vw, 1360px"
                    : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 660px"
                }
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ Capabilities ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-24 md:pt-32">
        <Reveal>
          <p className="eyebrow">What we do</p>
          <h2 className="h2 mt-3 max-w-3xl">Studio and Intelligence. One practice.</h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="mt-5 max-w-2xl text-ink-muted text-lg">
            Brand, product, and the systems behind it. One studio instead of three
            vendors.
          </p>
        </Reveal>

        <div className="mt-10 md:mt-14 grid gap-6 md:gap-8 md:grid-cols-2">
          {capabilities.map((cap, i) => (
            <Reveal key={cap.key} delay={i * 100}>
              <article className="group overflow-hidden rounded-[20px] border border-line bg-paper-raise">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={cap.image}
                    alt={cap.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 640px"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    style={{ transitionTimingFunction: "var(--ease-primary)" }}
                  />
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="h3">{cap.title}</h3>
                  <p className="mt-3 text-ink-muted">{cap.lead}</p>
                  <Link
                    href={`/services#${cap.key}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-medium link-underline"
                  >
                    Explore {cap.title}
                    <ArrowUpRight aria-hidden="true" className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ Principles ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-24 md:pt-32">
        <Reveal>
          <p className="eyebrow">Principles</p>
          <h2 className="h2 mt-3">How we work</h2>
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

      {/* ============ Process ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-24 md:pt-32">
        <Reveal>
          <p className="eyebrow">Process</p>
          <h2 className="h2 mt-3">Five steps, one connecting line</h2>
        </Reveal>
        <ol className="mt-10 md:mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((step, i) => (
            <Reveal as="li" key={step.name} delay={i * 70}>
              <div className="relative rounded-[20px] border border-line bg-paper-raise p-6 h-full">
                <p className="font-mono text-[11px] text-ink-faint">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-4 font-display font-bold text-xl tracking-[-0.02em]">
                  {step.name}
                </h3>
                <p className="mt-3 text-ink-muted text-[15px] leading-relaxed">{step.body}</p>
                {i < processSteps.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="hidden lg:block absolute top-1/2 -right-[calc(1.5rem+1px)] w-6 h-px bg-line-strong"
                  />
                )}
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* ============ Collaboration ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-24 md:pt-32">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div className="relative aspect-[4/3] rounded-[20px] overflow-hidden border border-line order-2 lg:order-1">
              <Image
                src="/images/paintings/collaboration-studio.webp"
                alt="Two pairs of hands collaborating over interface sketches, color swatches, and a laptop on a warm wooden studio table."
                fill
                sizes="(max-width: 1024px) 100vw, 640px"
                className="object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <p className="eyebrow">Collaboration</p>
              <h2 className="h2 mt-3">Senior craft, direct collaboration.</h2>
              <p className="mt-5 text-ink-muted text-lg leading-relaxed max-w-xl">
                The people who scope the work are the same people who design and
                build it. No account layer, no handoff to juniors. Direct
                collaboration from discovery to launch.
              </p>
              <Link
                href="/about"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium link-underline"
              >
                About the studio
                <ArrowUpRight aria-hidden="true" className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ============ Latest writing ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-24 md:pt-32">
        <Reveal>
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <p className="eyebrow">Latest writing</p>
              <h2 className="h2 mt-3">Insights from the studio</h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium link-underline"
            >
              All {total} articles
              <ArrowRight aria-hidden="true" className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {latest.map((a, i) => (
            <Reveal key={a.slug} delay={i * 80}>
              <Link
                href={`/blog/${a.slug}`}
                className="group block rounded-[20px] border border-line bg-paper-raise overflow-hidden hover:border-line-strong transition-colors"
              >
                <div className="relative aspect-video">
                  <Image
                    src={a.image}
                    alt={a.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 420px"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    style={{ transitionTimingFunction: "var(--ease-primary)" }}
                  />
                </div>
                <div className="p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
                    {a.category}
                    <span className="text-ink-faint">
                      {" · "}
                      {formatDate(a.date)} · {a.readingMinutes} min
                    </span>
                  </p>
                  <h3 className="mt-3 font-display font-bold tracking-[-0.02em] text-lg leading-snug group-hover:text-teal transition-colors">
                    {a.title}
                  </h3>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-24 md:pt-32">
        <Reveal>
          <div className="relative overflow-hidden rounded-[24px] border border-line bg-teal-mist px-6 py-16 md:p-20 text-center">
            <h2 className="h2">Have something worth building?</h2>
            <p className="mt-4 text-ink-muted max-w-xl mx-auto">
              Tell us what you are working on. We reply to every serious enquiry
              within two working days.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 h-12 px-7 rounded-full bg-ink text-paper text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Start a project brief
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
