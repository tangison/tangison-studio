import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { CaseCard } from "@/components/case-card";
import { CLIENT_BY_SLUG, ClientMarkLogo } from "@/components/client-mark";
import { projects } from "@/lib/projects";
import { capabilities, principles, processSteps, site } from "@/lib/site";
import { getArticleSummaries } from "@/lib/articles";
import { formatDate } from "@/lib/article-types";

export default function HomePage() {
  const featured = projects.slice(0, 5);
  const articles = getArticleSummaries();
  const latest = articles.slice(0, 3);
  const total = articles.length;
  // Trust row: the first four portfolio anchors plus the Oryx Polytechnic
  // Institute, whose lockup and partnership are new (2026-11).
  const trust = [
    ...projects.slice(0, 4),
    projects.find((p) => p.slug === "oryxinstitute"),
  ].filter(Boolean);
  const rest = projects.length - trust.length;

  return (
    <>
      {/* ============ Hero: the slogan and the still studio image.
          Static by owner instruction (2026-11): no film, no motion. ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-36 md:pt-52">
        <h1 className="h1 max-w-6xl">
          <span className="block">Rebuilding how the world</span>
          <span className="block">sees your brand.</span>
        </h1>

        {/* One primary action, reachable in the first phone viewport
            (conversion audit 2026-11-10: the fold held only the slogan,
            the still image and the client strip, so a first-time
            visitor had no visible next step without scrolling or
            opening the menu). One quiet primary button, one outline
            companion; the image keeps its place directly after. */}
        <div className="mt-10 md:mt-12 flex flex-wrap items-center gap-x-6 gap-y-4">
          <Link href="/contact" className="btn btn-primary">
            Start a project
          </Link>
          <Link href="/cases" className="btn btn-outline">
            See the work
          </Link>
        </div>

        <div className="mt-14 md:mt-20">
          <div className="art-tile art-shadow bg-ink aspect-[16/10]">
            <Image
              src="/images/paintings/hero-studio.webp"
              alt="The Tangison Studio worktable: interface sketches, color swatches and a laptop under soft coastal light."
              width={1200}
              height={750}
              priority
              sizes="(max-width: 768px) 100vw, 1200px"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>

        {/* trust layer: the real marks, pulled from each client's own
            site and linking back out to it; the full record is one
            path away on /cases */}
        <div className="mt-10 md:mt-12 flex flex-wrap items-baseline gap-x-8 gap-y-4">
          <div className="min-w-0">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-ink-faint">
              Selected clients
            </p>
            <ul className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
              {trust.map((p) => {
                const mark = CLIENT_BY_SLUG.get(p.slug);
                return (
                  <li key={p.slug}>
                    {mark ? (
                      <a
                        href={mark.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${mark.name} - visit website`}
                        className="inline-flex items-center rounded-sm outline-offset-6 outline-teal focus-visible:outline-2"
                      >
                        <ClientMarkLogo mark={mark} />
                      </a>
                    ) : (
                      <span className="whitespace-nowrap font-display font-semibold text-[17px] md:text-xl tracking-[-0.01em]">
                        {p.title}
                      </span>
                    )}
                  </li>
                );
              })}
              <li className="whitespace-nowrap">
                <Link
                  href="/cases"
                  className="text-ink-faint font-medium text-[15px] md:text-base link-underline"
                >
                  and {rest} more
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ============ Selected work: tight gallery ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-20 md:pt-28">
        <div className="flex items-end justify-between gap-6">
          <h2 className="h2">Selected work.</h2>
          <Link
            href="/cases"
            className="inline-flex items-center gap-2 text-sm font-medium link-underline shrink-0"
          >
            All {projects.length} cases
            <ArrowUpRight aria-hidden="true" className="w-4 h-4" />
          </Link>
        </div>

        <div className="mt-8 md:mt-12 grid gap-6 md:gap-8 sm:grid-cols-2">
          {featured.map((p, i) => (
            <div
              key={p.slug}
              className={i === 0 ? "sm:col-span-2" : ""}
            >
              <CaseCard
                project={p}
                featured={i === 0}
                priority={i === 0}
                sizes={
                  i === 0
                    ? "(max-width: 768px) 100vw, 1360px"
                    : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 660px"
                }
              />
            </div>
          ))}
        </div>
      </section>

      {/* ============ Capabilities ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-24 md:pt-32">
        <h2 className="h2 max-w-3xl">Studio and Intelligence. One practice.</h2>

        <div className="mt-10 md:mt-14 grid gap-6 md:gap-8 md:grid-cols-2">
          {capabilities.map((cap) => (
            <article key={cap.key} className="group art-tile art-shadow bg-paper-raise">
              <div className="relative aspect-[4/3]">
                <Image
                  src={cap.image}
                  alt={cap.alt}
                  width={1200}
                  height={900}
                  sizes="(max-width: 768px) 100vw, 640px"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="p-6 md:p-8">
                <h3 className="h3">{cap.title}</h3>
                <p className="mt-3 text-ink-muted">{cap.lead}</p>
                <Link
                  href={`/services#${cap.key}`}
                  prefetch={false}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium link-underline"
                >
                  Explore {cap.title}
                  <ArrowUpRight aria-hidden="true" className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
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

      {/* ============ Process ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-24 md:pt-32">
        <h2 className="h2">Five steps, one way of working.</h2>
        <ol className="mt-10 md:mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {processSteps.map((step, i) => (
            <li key={step.name} className="relative">
              <div className="relative rounded-[20px] border border-line bg-paper-raise p-6 h-full">
                <p className="font-mono text-[11px] text-ink-faint">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="h3 mt-3">{step.name}</h3>
                <p className="mt-3 text-ink-muted text-[15px] leading-relaxed">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ============ Collaboration ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-24 md:pt-32">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <div className="relative art-tile art-shadow aspect-[4/3] order-2 lg:order-1 bg-paper-raise">
            <Image
              src="/images/paintings/collaboration-studio.webp"
              alt="Two blank sketchbooks and a box of color swatch cards arranged for a working session on a warm wooden table."
              width={1200}
              height={900}
              sizes="(max-width: 1024px) 100vw, 640px"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="h2">Senior craft, direct collaboration.</h2>
            <p className="mt-5 text-ink-muted text-lg leading-relaxed max-w-xl">
              The people who scope the work are the same people who design and
              build it. No account layer, no handoff to juniors.
            </p>
            <Link
              href="/about"
              prefetch={false}
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium link-underline"
            >
              About the studio
              <ArrowUpRight aria-hidden="true" className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ Latest writing ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-24 md:pt-32">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <h2 className="h2">Latest writing.</h2>
          <Link
            href="/blog"
            prefetch={false}
            className="inline-flex items-center gap-2 text-sm font-medium link-underline"
          >
            All {total} articles
            <ArrowUpRight aria-hidden="true" className="w-4 h-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {latest.map((a) => (
            <Link
              key={a.slug}
              href={`/blog/${a.slug}`}
              prefetch={false}
              className="group block art-tile art-shadow bg-paper-raise hover:border-line-strong"
            >
              <div className="relative aspect-video">
                <Image
                  src={a.image}
                  alt={a.imageAlt}
                  width={960}
                  height={540}
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="absolute inset-0 h-full w-full object-cover"
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
                <h3 className="mt-3 h3 !text-lg group-hover:text-teal">
                  {a.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-24 md:pt-32">
        <div className="relative art-tile bg-teal-mist px-6 py-16 md:p-20 text-center">
          <h2 className="h2">Have something worth building?</h2>
          <p className="mt-4 text-ink-muted max-w-xl mx-auto">
            Tell us what you are working on. We reply to every serious enquiry
            within two working days.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn btn-primary">
              Start a project brief
            </Link>
            <a href={site.whatsapp} className="btn btn-outline">
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
