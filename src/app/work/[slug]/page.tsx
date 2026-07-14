import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Monitor } from "lucide-react";
import { getCaseStudy, getAllCaseStudySlugs } from "@/lib/case-studies";
import { SiteShell } from "@/components/tangison/site-shell";
import { StudioButton } from "@/components/studio/button";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/tangison/json-ld";

export function generateStaticParams() {
  return getAllCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getCaseStudy(slug);
  if (!project) return { title: "Project not found" };

  const title = `${project.name} Case Study`;
  const description = project.descriptor;

  return {
    title,
    description,
    alternates: { canonical: `/work/${slug}` },
    openGraph: {
      title: `${title} | Studio`,
      description,
      url: `/work/${slug}`,
      type: "article",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: project.name }],
    },
  };
}

const projectPaintings: Record<string, string> = {
  proavia: "/images/paintings/projects/proavia.webp",
  nalago: "/images/paintings/projects/nalago.webp",
  clusterleaf: "/images/paintings/projects/clusterleaf.webp",
  smefrog: "/images/paintings/digital-journey.webp",
  petrocor: "/images/paintings/built-at-the-edge.webp",
  "tangison-systems": "/images/paintings/intelligence-systems.webp",
  crescendo: "/images/paintings/painted-signal-flag.webp",
  feorm: "/images/paintings/desert-threshold.webp",
  lrclearing: "/images/paintings/windhoek-studio-window.webp",
  reviveautoworks: "/images/paintings/product-detail.webp",
  miway: "/images/paintings/responsive-system.webp",
};

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getCaseStudy(slug);
  if (!project) notFound();

  const painting = projectPaintings[project.slug] || "/images/paintings/atlantic-signal-hero.webp";
  const screenshotPath = `/images/work/screenshots/full/${project.screenshotSlug}-full.webp`;
  const nextProject = getCaseStudy(project.nextSlug);

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "/" },
        { name: "Work", url: "/work" },
        { name: project.name, url: `/work/${project.slug}` },
      ]} />
      <WebPageJsonLd
        title={`${project.name} Case Study`}
        description={project.descriptor}
        url={`/work/${project.slug}`}
      />
      <SiteShell>
        {/* Back link */}
        <section className="pt-8">
          <div className="mx-auto max-w-4xl px-6">
            <Link href="/work" className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink transition-colors">
              <ArrowRight className="w-4 h-4 rotate-180" /> All work
            </Link>
          </div>
        </section>

        {/* Project header */}
        <section className="pt-6 pb-8">
          <div className="mx-auto max-w-4xl px-6">
            <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-3">{project.industry}</p>
            <h1 className="font-display font-bold text-ink text-4xl md:text-5xl mb-4">{project.name}</h1>
            <p className="font-satoshi text-lg text-ink-muted max-w-2xl mb-6">{project.descriptor}</p>
            <div className="flex flex-wrap gap-1.5 mb-6">
              {project.services.map((s) => (
                <span key={s} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-ocean-mist text-ink">{s}</span>
              ))}
            </div>
            {project.url && (
              <StudioButton as="link" href={project.url} variant="primary" hasArrow arrowType="up-right">
                Visit live site
              </StudioButton>
            )}
          </div>
        </section>

        {/* Oil painting lead visual */}
        <section className="pb-12">
          <div className="mx-auto max-w-5xl px-6">
            <div className="aspect-[16/9] overflow-hidden rounded-[24px] bg-ocean-mist">
              <Image
                src={painting}
                alt={`An oil painting representing ${project.name}.`}
                width={1080}
                height={608}
                className="w-full h-full object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 1080px"
              />
            </div>
          </div>
        </section>

        {/* Challenge */}
        <section className="py-8">
          <div className="mx-auto max-w-4xl px-6">
            <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-3">Challenge</p>
            <h2 className="font-display font-bold text-ink text-2xl md:text-3xl mb-6">{project.challengeH2}</h2>
            <div className="space-y-4">
              {project.challengeBody.map((p, i) => (
                <p key={i} className="font-satoshi text-base leading-relaxed text-ink-muted">{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Approach */}
        <section className="py-8 bg-ocean-mist/30">
          <div className="mx-auto max-w-4xl px-6 py-12">
            <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-3">Approach</p>
            <h2 className="font-display font-bold text-ink text-2xl md:text-3xl mb-6">{project.approachH2}</h2>
            <div className="space-y-4">
              {project.approachBody.map((p, i) => (
                <p key={i} className="font-satoshi text-base leading-relaxed text-ink-muted">{p}</p>
              ))}
            </div>
            {project.craftNotes && project.craftNotes.length > 0 && (
              <div className="mt-8 space-y-4">
                {project.craftNotes.map((note, i) => (
                  <div key={i} className="border-l-2 border-signal-teal pl-4">
                    <p className="font-satoshi text-sm font-bold text-ink mb-1">{note.label}</p>
                    <p className="font-satoshi text-sm text-ink-muted">{note.body}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Proof — scrollable screenshot viewer */}
        <section className="py-12">
          <div className="mx-auto max-w-5xl px-6">
            <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-3">Live proof</p>
            <h2 className="font-display font-bold text-ink text-2xl md:text-3xl mb-6">The production website</h2>
            <div className="overflow-hidden rounded-[24px] border border-card-border bg-signal-white">
              <div className="flex items-center justify-between px-4 py-3 border-b border-card-border bg-skeleton-bone">
                <div className="flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-ink-muted" />
                  <span className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em]">{project.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span>
                </div>
                {project.url && (
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-ink hover:text-signal-teal-text transition-colors">
                    View live site <ArrowUpRight className="w-3 h-3" />
                  </a>
                )}
              </div>
              <div className="max-h-[500px] overflow-y-auto bg-skeleton-bone">
                <Image
                  src={screenshotPath}
                  alt={`${project.name} live website screenshot`}
                  width={1080}
                  height={2000}
                  className="w-full h-auto"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 1080px"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Outcome */}
        <section className="py-8">
          <div className="mx-auto max-w-4xl px-6">
            <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-3">Outcome</p>
            <h2 className="font-display font-bold text-ink text-2xl md:text-3xl mb-6">{project.outcomeH2}</h2>
            <div className="space-y-4">
              {project.outcomeBody.map((p, i) => (
                <p key={i} className="font-satoshi text-base leading-relaxed text-ink-muted">{p}</p>
              ))}
            </div>
            {project.tech && project.tech.length > 0 && (
              <div className="mt-8">
                <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-3">Technology</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono bg-ocean-mist text-ink">{t}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Next project */}
        {nextProject && (
          <section className="py-12 border-t border-card-border">
            <div className="mx-auto max-w-4xl px-6">
              <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-3">Next project</p>
              <Link href={`/work/${nextProject.slug}`} className="group block">
                <h3 className="font-display font-bold text-ink text-2xl md:text-3xl group-hover:text-signal-teal-text transition-colors">
                  {nextProject.name}
                </h3>
                <p className="font-satoshi text-sm text-ink-muted mt-1">{nextProject.descriptor}</p>
              </Link>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-16 md:py-24 bg-atlantic-black">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="font-display font-bold text-skeleton-bone text-3xl md:text-4xl mb-4">
              Want something like this?
            </h2>
            <p className="font-satoshi text-lg text-skeleton-bone/70 mb-8">
              Tell us about your project.
            </p>
            <StudioButton as="link" href="/contact" variant="inverse" hasArrow arrowType="up-right">
              Start a project
            </StudioButton>
          </div>
        </section>
      </SiteShell>
    </>
  );
}
