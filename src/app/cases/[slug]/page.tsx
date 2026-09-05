import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { getProject, nextProject, projects } from "@/lib/projects";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: {
      absolute: `${project.name} Case Study | The Tangison Studio, Windhoek`,
    },
    description: project.description,
    alternates: { canonical: `/cases/${project.slug}` },
    openGraph: {
      title: `${project.name} Case Study`,
      description: project.description,
      images: [
        {
          url: `/images/paintings/projects/${project.slug}.webp`,
          width: 1200,
          height: 900,
        },
      ],
    },
  };
}

/** Live-proof screenshot exists for shipped projects with a reachable site. */
const SCREENSHOTS: Record<string, string> = {
  weca: "/images/work/screenshots/full/weca-full.webp",
  mendozer: "/images/work/screenshots/full/mendozer-full.webp",
  enchanted: "/images/work/screenshots/full/enchanted-full.webp",
  dieselman: "/images/work/screenshots/full/dieselman-full.webp",
  miway: "/images/work/screenshots/full/miway-full.webp",
  oci: "/images/work/screenshots/full/oci-full.webp",
  giftedwithpurpose: "/images/work/screenshots/full/giftedwithpurpose-full.webp",
};

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = nextProject(project.slug);
  const screenshot = SCREENSHOTS[project.slug];
  const c = project.case;

  return (
    <div className="theme-ink bg-paper text-ink min-h-screen">
      {/* ============ Header ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-32 md:pt-40">
        <Reveal>
          <Link
            href="/cases"
            className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink link-underline"
          >
            <ArrowLeft aria-hidden="true" className="w-4 h-4" />
            All cases
          </Link>
        </Reveal>
        <div className="mt-8 md:mt-10 max-w-4xl">
          <Reveal delay={60}>
            <p className="eyebrow">{project.eyebrow}</p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="h1 mt-4">{project.name}</h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-6 text-lg md:text-xl text-ink-muted leading-relaxed max-w-2xl">
              {project.description}
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-7 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-full border border-line px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
          {project.live && (
            <Reveal delay={300}>
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary mt-8"
              >
                Visit the live site
              </a>
            </Reveal>
          )}
        </div>
      </section>

      {/* ============ Hero image ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-10 md:pt-14">
        <Reveal>
          <div className="relative aspect-[16/10] md:aspect-[21/9] rounded-[24px] overflow-hidden border border-line">
            <Image
              src={`/images/paintings/projects/${project.slug}.webp`}
              alt={`Soft artwork representing ${project.name}`}
              fill
              priority
              sizes="(max-width: 1400px) 100vw, 1360px"
              className="object-cover"
            />
          </div>
        </Reveal>
      </section>

      {/* ============ Challenge / Approach ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-20 md:pt-28">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.6fr]">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <h2 className="h3">{c.challengeSub || "The problem in front of us"}</h2>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="prose-body flex flex-col gap-5">
              {c.challenge.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-20 md:mt-28 grid gap-14 lg:grid-cols-[1fr_1.6fr]">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <h2 className="h3">{c.approachSub || "How we answered it"}</h2>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="prose-body flex flex-col gap-5">
              {c.approach.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ Craft points ============ */}
      {c.craft.length > 0 && (
        <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-20 md:pt-28">
          <Reveal>
            <h2 className="h2 max-w-2xl">What carried the result</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:gap-8 md:grid-cols-3">
            {c.craft.map((point, i) => (
              <Reveal key={point.title} delay={i * 80}>
                <article className="h-full rounded-[20px] border border-line bg-paper-raise p-6 md:p-8">
                  <h3 className="h3">{point.title}</h3>
                  <p className="mt-3 text-ink-muted text-[15px] leading-relaxed">
                    {point.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ============ Live proof ============ */}
      {screenshot && (
        <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-20 md:pt-28">
          <Reveal>
            <h2 className="h2">The production website</h2>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium link-underline"
              >
                {project.live.replace(/^https?:\/\/(www\.)?/, "")}
                <ArrowUpRight aria-hidden="true" className="w-4 h-4" />
              </a>
            )}
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-8 relative rounded-[24px] overflow-hidden border border-line">
              <Image
                src={screenshot}
                alt={`${project.name} live website screenshot`}
                width={1920}
                height={1080}
                sizes="(max-width: 1400px) 100vw, 1360px"
                className="w-full h-auto"
              />
            </div>
          </Reveal>
        </section>
      )}

      {/* ============ Outcome ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-20 md:pt-28">
        <Reveal>
          <div className="rounded-[24px] border border-line bg-teal-mist px-6 py-12 md:p-16 max-w-4xl">
            <h2 className="h2">{project.short}</h2>
            <div className="mt-6 flex flex-col gap-4 text-ink-muted leading-relaxed max-w-2xl">
              {c.outcome.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ============ Technology ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-20 md:pt-28">
        <Reveal>
          <h3 className="h3">Built with</h3>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="inline-flex items-center rounded-full border border-line px-4 py-2 font-mono text-[11px] tracking-[0.08em] text-ink-muted"
              >
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ============ Next project ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-20 md:pt-28">
        <Reveal>
          <Link
            href={`/cases/${next.slug}`}
            className="group grid gap-6 md:grid-cols-[1fr_1.4fr] items-center rounded-[24px] border border-line bg-paper-raise overflow-hidden hover:border-line-strong transition-colors"
          >
            <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[280px]">
              <Image
                src={`/images/paintings/projects/${next.slug}.webp`}
                alt={`Soft artwork representing ${next.name}`}
                fill
                sizes="(max-width: 768px) 100vw, 560px"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                style={{ transitionTimingFunction: "var(--ease-primary)" }}
              />
            </div>
            <div className="p-6 md:p-10 md:pr-14">
              <p className="eyebrow">Next case</p>
              <h3 className="h3 mt-4 group-hover:text-teal transition-colors">{next.name}</h3>
              <p className="mt-4 text-ink-muted leading-relaxed">{next.description}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium">
                Read the case
                <ArrowRight aria-hidden="true" className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* ============ CTA ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-20 md:pt-28">
        <Reveal>
          <div className="rounded-[24px] border border-line bg-paper-raise px-6 py-14 md:p-16 text-center">
            <h2 className="h2">Want something like this?</h2>
            <p className="mt-4 text-ink-muted max-w-xl mx-auto">
              Tell us about your project. We reply within two working days.
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
        </Reveal>
      </section>
    </div>
  );
}
