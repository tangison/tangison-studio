import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
import { buildPageMetadata } from "@/lib/seo";

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
  // SERP title policy: prefer an explicit seoTitle; else keep the branded
  // template when it fits the ~60 character SERP slot; else drop the
  // suffix and ship the article title alone (45-57 chars).
  const branded = `${article.title} | Tangison Studio`;
  const pageTitle = article.seoTitle
    ? { absolute: article.seoTitle }
    : branded.length <= 60
      ? { absolute: branded }
      : { absolute: article.title };
  return {
    ...buildPageMetadata({
      title: pageTitle,
      description: article.description,
      path: `/blog/${article.slug}`,
      ogTitle: article.title,
      ogImage: {
        url: article.image,
        width: 1200,
        height: 675,
        alt: article.title,
      },
      type: "article",
      publishedTime: `${article.date}T08:00:00+02:00`,
      articleAuthor: article.author,
    }),
    keywords: article.keywords,
    alternates: {
      canonical: `/blog/${article.slug}`,
      types: { "text/markdown": `/blog/${article.slug}.md` },
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
          "@id": `${site.url}/#founder`,
          name: article.author,
        },
        publisher: {
          "@type": "Organization",
          "@id": `${site.url}/#organization`,
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
        <div>
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
        </div>
        <div className="mt-8 md:mt-12 max-w-3xl">
          <div>
            <p className="eyebrow">
              {article.category} · {formatDate(article.date)} ·{" "}
              {article.readingMinutes} min read
            </p>
          </div>
          <div>
            <h1 className="h1 mt-4">{article.title}</h1>
          </div>
          <div>
            <p className="mt-6 text-lg md:text-xl text-ink-muted leading-relaxed">
              {article.description}
            </p>
          </div>
          <div>
            <p className="mt-8 md:mt-10 text-sm text-ink-faint">
              By {article.author}, The Tangison Studio
            </p>
          </div>
        </div>
      </section>

      {/* ============ Hero image ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-12 md:pt-14">
        <div>
          <div className="relative aspect-[16/9] max-w-4xl rounded-[24px] overflow-hidden border border-line">
            <Image
              src={article.image}
              alt={article.imageAlt}
            width={960}
            height={540}
              priority
              sizes="(max-width: 1200px) 100vw, 960px"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ============ Body ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-14 md:pt-20 pb-20">
        <div className="prose-body max-w-[72ch]">
          <div>{renderMarkdown(article.body)}</div>
        </div>
      </section>

      {/* ============ Prev / next ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pb-20">
        <div className="grid gap-4 md:grid-cols-2">
          {prev && (
            <div>
              <Link
                href={`/blog/${prev.slug}`}
                className="group flex flex-col rounded-[20px] border border-line bg-paper-raise p-6 hover:border-line-strong"
              >
                <span className="flex items-center gap-2 text-sm text-ink-muted">
                  <ArrowLeft
                    aria-hidden="true"
                    className="w-4 h-4 group-hover:-translate-x-1"
                  />
                  Previous
                </span>
                <span className="mt-2 font-display font-bold tracking-[-0.02em] text-lg leading-snug">
                  {prev.title}
                </span>
              </Link>
            </div>
          )}
          {next && (
            <div>
              <Link
                href={`/blog/${next.slug}`}
                className="group flex flex-col items-end text-right rounded-[20px] border border-line bg-paper-raise p-6 hover:border-line-strong"
              >
                <span className="flex items-center gap-2 text-sm text-ink-muted">
                  Next
                  <ArrowRight
                    aria-hidden="true"
                    className="w-4 h-4 group-hover:translate-x-1"
                  />
                </span>
                <span className="mt-2 font-display font-bold tracking-[-0.02em] text-lg leading-snug">
                  {next.title}
                </span>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ============ Related ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pb-20 md:pb-28">
        <div>
          <h2 className="h3">Keep reading.</h2>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {related.map((r, i) => (
            <div key={r.slug}>
              <Link
                href={`/blog/${r.slug}`}
                className="group flex gap-4 rounded-[20px] border border-line bg-paper-raise p-5 hover:border-line-strong"
              >
                <div className="relative w-20 h-20 shrink-0 overflow-hidden rounded-[12px] bg-paper">
                  <Image
                    src={r.image}
                    alt={r.imageAlt}
                  width={960}
                  height={540}
                    sizes="80px"
                    className="absolute inset-0 h-full w-full case-card-image object-cover"
                  />
                </div>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted">
                    {r.category}
                  </p>
                  <p className="mt-1 font-display font-bold tracking-[-0.02em] leading-snug group-hover:text-teal">
                    {r.title}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pb-24 md:pb-32">
        <div>
          <div className="rounded-[24px] border border-line bg-paper-raise p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-xl">
              <h2 className="h3">
                Turning this research into a working advantage?
              </h2>
              <p className="mt-3 text-ink-muted leading-relaxed">
                The Tangison Studio designs and builds the brand, product, and
                systems behind intelligent organizations. Start with a
                conversation, not a contract.
              </p>
            </div>
            <Link href="/contact" className="btn btn-primary shrink-0">
              Start a project brief
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
