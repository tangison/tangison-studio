import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { getArticle, getRelatedArticles, getAllArticleSlugs } from "@/lib/blog";
import { SiteShell } from "@/components/tangison/site-shell";
import { StudioButton } from "@/components/studio/button";
import { BreadcrumbJsonLd } from "@/components/tangison/json-ld";

export function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Article not found" };
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: { title: `${article.title} | Studio`, description: article.excerpt, url: `/blog/${slug}`, type: "article", images: [{ url: "/og.png", width: 1200, height: 630, alt: article.title }] },
  };
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const related = getRelatedArticles(slug);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    author: { "@type": "Organization", name: "Tangison Studio" },
    publisher: { "@type": "Organization", name: "Tangison Studio" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Blog", url: "/blog" }, { name: article.title, url: `/blog/${article.slug}` }]} />
      <SiteShell>
        {/* Back link */}
        <section className="pt-8">
          <div className="mx-auto max-w-3xl px-6">
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink transition-colors">
              <ArrowRight className="w-4 h-4 rotate-180" /> All articles
            </Link>
          </div>
        </section>

        {/* Article header */}
        <section className="pt-6 pb-8">
          <div className="mx-auto max-w-3xl px-6">
            <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-3">{article.category}</p>
            <h1 className="font-display font-bold text-ink text-3xl md:text-4xl mb-4">{article.title}</h1>
            <p className="font-satoshi text-lg text-ink-muted mb-4">{article.excerpt}</p>
            <div className="flex items-center gap-3 text-sm text-ink-muted">
              <span>{new Date(article.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
              <span>·</span>
              <span>{article.readingTime} min read</span>
              <span>·</span>
              <span>Studio</span>
            </div>
          </div>
        </section>

        {/* Cover */}
        <section className="pb-12">
          <div className="mx-auto max-w-4xl px-6">
            <div className="aspect-[16/9] overflow-hidden rounded-3xl bg-ocean-mist">
              <Image src={article.cover} alt={`An oil painting representing: ${article.title}`} width={1080} height={608} className="w-full h-full object-cover" priority sizes="(max-width: 768px) 100vw, 1080px" />
            </div>
          </div>
        </section>

        {/* Article body */}
        <section className="pb-16">
          <div className="mx-auto max-w-2xl px-6">
            <div className="space-y-8">
              {article.content.map((section, i) => (
                <div key={i}>
                  {section.heading && <h2 className="font-display font-bold text-ink text-xl md:text-2xl mb-4">{section.heading}</h2>}
                  <div className="space-y-4">
                    {section.body.map((p, j) => (
                      <p key={j} className="font-satoshi text-base leading-relaxed text-ink-muted">{p}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-ocean-mist text-ink">#{tag}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Related articles */}
        {related.length > 0 && (
          <section className="py-12 border-t border-card-border">
            <div className="mx-auto max-w-4xl px-6">
              <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-6">Related articles</p>
              <div className="grid md:grid-cols-3 gap-6">
                {related.map((rel) => (
                  <Link key={rel.slug} href={`/blog/${rel.slug}`} className="group block">
                    <div className="aspect-[3/2] overflow-hidden rounded-2xl bg-ocean-mist mb-3">
                      <Image src={rel.cover} alt={`An oil painting representing: ${rel.title}`} width={400} height={267} className="w-full h-full object-cover" loading="lazy" sizes="(max-width: 768px) 100vw, 300px" />
                    </div>
                    <h3 className="font-display font-bold text-ink text-sm group-hover:text-signal-teal-text transition-colors">{rel.title}</h3>
                    <p className="font-satoshi text-xs text-ink-muted mt-1">{rel.readingTime} min read</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-16 md:py-24 bg-atlantic-black">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="font-display font-bold text-skeleton-bone text-3xl mb-4">Want to work with us?</h2>
            <StudioButton href="/contact" variant="inverse" hasArrow arrowType="up-right">Start a project</StudioButton>
          </div>
        </section>
      </SiteShell>
    </>
  );
}
