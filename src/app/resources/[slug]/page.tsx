import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import {
  getResource,
  getAllResourceSlugs,
  getRelated,
  type ResourceSection,
} from "@/lib/resources";
import { SiteShell } from "@/components/tangison/site-shell";
import { BreadcrumbJsonLd } from "@/components/tangison/json-ld";
import { ResourceMotifMark, ResourceMotifRule } from "@/components/studio/resource-motif";

export function generateStaticParams() {
  return getAllResourceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const r = getResource(slug);
  if (!r) return { title: "Resource not found" };
  return {
    title: r.title,
    description: r.excerpt,
    alternates: { canonical: `/resources/${slug}` },
    openGraph: {
      title: `${r.title} | Studio`,
      description: r.excerpt,
      url: `/resources/${slug}`,
      type: "article",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: r.title }],
    },
  };
}

/** Branching renderer. A section carries any combination of these keys. */
function Section({
  section,
  accent,
  accentInk,
}: {
  section: ResourceSection;
  accent: string;
  accentInk: string;
}) {
  return (
    <div className="mb-10">
      {section.heading ? (
        <h2 className="font-display font-bold text-ink text-xl md:text-2xl mb-4">
          {section.heading}
        </h2>
      ) : null}

      {section.body?.map((p, i) => (
        <p key={i} className="font-satoshi text-base leading-relaxed text-ink mb-4">
          {p}
        </p>
      ))}

      {section.steps ? (
        <ol className="mt-2 mb-2 space-y-4">
          {section.steps.map((s, i) => (
            <li key={i} className="flex gap-4">
              <span
                className="shrink-0 w-7 h-7 rounded-full grid place-items-center font-jetbrains text-[11px] font-medium"
                style={{ backgroundColor: `${accent}1F`, color: accentInk }}
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <div>
                <p className="font-satoshi text-base font-semibold text-ink mb-1">
                  {s.title}
                </p>
                <p className="font-satoshi text-base leading-relaxed text-ink-muted">
                  {s.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>
      ) : null}

      {section.checks ? (
        <ul className="mt-2 mb-2 space-y-3">
          {section.checks.map((c, i) => (
            <li key={i} className="flex gap-3">
              <span
                className="shrink-0 mt-0.5 w-5 h-5 rounded grid place-items-center"
                style={{ backgroundColor: `${accent}1F` }}
                aria-hidden="true"
              >
                <Check className="w-3.5 h-3.5" style={{ color: accentInk }} />
              </span>
              <span className="font-satoshi text-base leading-relaxed text-ink">
                {c}
              </span>
            </li>
          ))}
        </ul>
      ) : null}

      {section.table ? (
        <figure className="mt-4 mb-2">
          <div className="overflow-x-auto rounded-[16px] border border-card-border">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr style={{ backgroundColor: `${accent}14` }}>
                  {section.table.head.map((h, i) => (
                    <th
                      key={i}
                      scope="col"
                      className="font-jetbrains text-[10px] uppercase tracking-[0.16em] px-4 py-3 whitespace-nowrap"
                      style={{ color: accentInk }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {section.table.rows.map((row, i) => (
                  <tr key={i} className="border-t border-card-border">
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        className="font-satoshi text-[15px] leading-relaxed text-ink px-4 py-3 align-top"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {section.table.caption ? (
            <figcaption className="font-satoshi text-sm text-ink-muted mt-2">
              {section.table.caption}
            </figcaption>
          ) : null}
        </figure>
      ) : null}

      {section.callout ? (
        <blockquote
          className="mt-4 mb-2 rounded-[16px] p-6 border-l-4"
          style={{ backgroundColor: `${accent}0F`, borderLeftColor: accent }}
        >
          <p className="font-display text-lg leading-snug text-ink">
            {section.callout}
          </p>
        </blockquote>
      ) : null}
    </div>
  );
}

export default async function ResourcePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const r = getResource(slug);
  if (!r) notFound();
  const related = getRelated(slug);

  const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://studio.tangison.com";
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: r.title,
    description: r.excerpt,
    datePublished: r.date,
    dateModified: r.date,
    image: `${SITE}${r.cover}`,
    articleSection: r.category,
    author: { "@type": "Organization", name: "Tangison Studio", url: SITE },
    publisher: {
      "@type": "Organization",
      name: "Tangison Studio",
      url: SITE,
      logo: { "@type": "ImageObject", url: `${SITE}/brand/favicon.webp` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/resources/${slug}` },
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Resources", url: "/resources" },
          { name: r.title, url: `/resources/${slug}` },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <SiteShell>
        {/* Hero, tinted by this resource's own accent */}
        <section
          className="pt-12 md:pt-16 pb-10"
          style={{ backgroundColor: `${r.accent}0A` }}
        >
          <div className="mx-auto max-w-3xl px-6">
            <Link
              href="/resources"
              className="font-jetbrains text-[10px] uppercase tracking-[0.2em] text-ink-muted hover:text-ink transition-colors"
            >
              &larr; All resources
            </Link>

            <div className="flex items-center gap-3 mt-6 mb-4">
              <ResourceMotifMark motif={r.motif} color={r.accentInk} />
              <p
                className="font-jetbrains text-[10px] uppercase tracking-[0.2em]"
                style={{ color: r.accentInk }}
              >
                {r.category}
                <span className="mx-2 text-fog-gray">/</span>
                {r.format}
                <span className="mx-2 text-fog-gray">/</span>
                {r.readingTime} min read
              </p>
            </div>

            <h1 className="font-display font-bold text-ink text-3xl md:text-4xl lg:text-5xl mb-4">
              {r.title}
            </h1>
            <p className="font-satoshi text-lg text-ink-muted">{r.standfirst}</p>
          </div>

          <div className="mx-auto max-w-3xl px-6 mt-8">
            <ResourceMotifRule motif={r.motif} color={r.accent} />
          </div>
        </section>

        {/* Cover */}
        <section className="pb-10">
          <div className="mx-auto max-w-3xl px-6">
            <div className="relative aspect-[3/2] rounded-[25px] overflow-hidden">
              <Image
                src={r.cover}
                alt={`An oil painting representing: ${r.title}`}
                fill
                priority
                fetchPriority="high"
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Body */}
        <article className="pb-14">
          <div className="mx-auto max-w-3xl px-6">
            {r.sections.map((s, i) => (
              <Section key={i} section={s} accent={r.accent} accentInk={r.accentInk} />
            ))}
          </div>
        </article>

        {/* CTA */}
        <section className="pb-14">
          <div className="mx-auto max-w-3xl px-6">
            <div
              className="rounded-[25px] p-8 md:p-10 border"
              style={{
                backgroundColor: `${r.accent}0F`,
                borderColor: `${r.accent}33`,
              }}
            >
              <h2 className="font-display font-bold text-ink text-xl md:text-2xl mb-3">
                Want a second opinion on yours?
              </h2>
              <p className="font-satoshi text-base text-ink-muted mb-6">
                If this guide describes something you are working through right
                now, send it to us and we will tell you what we would do. No cost
                to scope it.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-satoshi text-sm font-medium text-white transition-opacity duration-300 hover:opacity-90"
                style={{ backgroundColor: r.accentInk }}
              >
                Start a project brief
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Related */}
        {related.length > 0 ? (
          <section className="pb-20">
            <div className="mx-auto max-w-6xl px-6">
              <h2 className="font-display font-bold text-ink text-xl md:text-2xl mb-6 pb-3 border-b border-card-border">
                Read next
              </h2>
              <div className="grid sm:grid-cols-3 gap-6">
                {related.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/resources/${rel.slug}`}
                    className="group block rounded-[25px] overflow-hidden bg-signal-white border border-card-border hover:border-border-medium transition-colors duration-300"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={rel.cover}
                        alt={`An oil painting representing: ${rel.title}`}
                        fill
                        loading="lazy"
                        sizes="(max-width: 640px) 100vw, 380px"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <ResourceMotifMark motif={rel.motif} color={rel.accentInk} size={12} />
                        <p
                          className="font-jetbrains text-[9px] uppercase tracking-[0.16em]"
                          style={{ color: rel.accentInk }}
                        >
                          {rel.format}
                        </p>
                      </div>
                      <h3 className="font-display font-bold text-ink text-base leading-snug">
                        {rel.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </SiteShell>
    </>
  );
}
