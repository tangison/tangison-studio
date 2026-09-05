import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { renderMarkdown } from "@/lib/markdown";
import {
  formatDate,
  getArticles,
  getArticle,
  nextArticle,
  prevArticle,
  relatedArticles,
} from "@/lib/articles";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: { absolute: `${article.title} | Tangison Studio` },
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: `${article.date}T08:00:00+02:00`,
      authors: [article.author],
      images: [{ url: article.image, width: 1200, height: 675 }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const prev = prevArticle(article.slug);
  const next = nextArticle(article.slug);
  const related = relatedArticles(article.slug, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${site.url}/blog/${article.slug}#article`,
        headline: article.title,
        description: article.description,
        image: `${site.url}${article.image}`,
        datePublished: `${article.date}T08:00:00+02:00`,
        author: {
          "@type": "Person",
          name: article.author,
        },
        publisher: {
          "@type": "Organization",
          name: "Tangison Studio",
          url: site.url,
        },
        mainEntityOfPage: `${site.url}/blog/${article.slug}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: site.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Insights",
            item: `${site.url}/blog`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: article.title,
            item: `${site.url}/blog/${article.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <div className="theme-ink bg-paper text-ink min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ============ Header ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-32 md:pt-40">
        <Reveal>
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm text-ink-muted"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 hover:text-ink link-underline"
            >
              <ArrowLeft aria-hidden="true" className="w-4 h-4" />
              All insights
            </Link>
            <span aria-hidden="true" className="text-ink-faint">
              /
            </span>
            <span className="text-ink-faint">{article.category}</span>
          </nav>
        </Reveal>
        <div className="mt-8 max-w-3xl">
          <Reveal delay={60}>
            <p className="eyebrow">
              {article.category} · {formatDate(article.date)} ·{" "}
              {article.readingMinutes} min read
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="h1 mt-4">{article.title}</h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-6 text-lg md:text-xl text-ink-muted leading-relaxed">
              {article.description}
            </p>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-6 text-sm text-ink-faint">
              By {article.author}, Tangison Studio
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ Hero image ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-10 md:pt-14">
        <Reveal>
          <div className="relative aspect-[16/9] max-w-4xl rounded-[24px] overflow-hidden border border-line">
            <Image
              src={article.image}
              alt={article.imageAlt}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 960px"
              className="object-cover"
            />
          </div>
        </Reveal>
      </section>

      {/* ============ Body ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-14 md:pt-20 pb-20">
        <div className="prose-body max-w-[72ch]">
          <Reveal>{renderMarkdown(article.body)}</Reveal>
        </div>
      </section>

      {/* ============ Prev / next ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pb-20">
        <div className="grid gap-4 md:grid-cols-2">
          {prev && (
            <Reveal>
              <Link
                href={`/blog/${prev.slug}`}
                className="group flex flex-col rounded-[20px] border border-line bg-paper-raise p-6 hover:border-line-strong transition-colors"
              >
                <span className="flex items-center gap-2 text-sm text-ink-muted">
                  <ArrowLeft
                    aria-hidden="true"
                    className="w-4 h-4 transition-transform duration-500 group-hover:-translate-x-1"
                  />
                  Previous
                </span>
                <span className="mt-2 font-display font-bold tracking-[-0.02em] text-lg leading-snug">
                  {prev.title}
                </span>
              </Link>
            </Reveal>
          )}
          {next && (
            <Reveal delay={80}>
              <Link
                href={`/blog/${next.slug}`}
                className="group flex flex-col items-end text-right rounded-[20px] border border-line bg-paper-raise p-6 hover:border-line-strong transition-colors"
              >
                <span className="flex items-center gap-2 text-sm text-ink-muted">
                  Next
                  <ArrowRight
                    aria-hidden="true"
                    className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1"
                  />
                </span>
                <span className="mt-2 font-display font-bold tracking-[-0.02em] text-lg leading-snug">
                  {next.title}
                </span>
              </Link>
            </Reveal>
          )}
        </div>
      </section>

      {/* ============ Related ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pb-20 md:pb-28">
        <Reveal>
          <p className="eyebrow">Keep reading</p>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {related.map((r, i) => (
            <Reveal key={r.slug} delay={i * 80}>
              <Link
                href={`/blog/${r.slug}`}
                className="group flex gap-4 rounded-[20px] border border-line bg-paper-raise p-5 hover:border-line-strong transition-colors"
              >
                <div className="relative w-20 h-20 shrink-0 overflow-hidden rounded-[12px] bg-paper">
                  <Image
                    src={r.image}
                    alt={r.imageAlt}
                    fill
                    sizes="80px"
                    className="case-card-image object-cover"
                  />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted">
                    {r.category}
                  </p>
                  <p className="mt-1 font-display font-bold tracking-[-0.02em] leading-snug group-hover:text-teal transition-colors duration-300">
                    {r.title}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pb-24 md:pb-32">
        <Reveal>
          <div className="rounded-[24px] border border-line bg-paper-raise p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-xl">
              <p className="eyebrow">Work with us</p>
              <h2 className="h3 mt-3">
                Turning this research into a working advantage?
              </h2>
              <p className="mt-3 text-ink-muted leading-relaxed">
                Studio Tangison designs and builds the brand, product, and
                systems behind intelligent organizations. Start with a
                conversation, not a contract.
              </p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-ink text-paper text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Start a project brief
              <ArrowRight aria-hidden="true" className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
