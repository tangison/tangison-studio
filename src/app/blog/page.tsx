import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { articles, getFeaturedArticle } from "@/lib/blog";
import { SiteShell } from "@/components/tangison/site-shell";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/tangison/json-ld";

export const metadata: Metadata = {
  title: {
    absolute: "Studio Blog | Notes on Design, Development, and Digital Product Practice",
  },
  description:
    "Field notes from Studio in Windhoek, Namibia, on brand systems, design process, web development, applied intelligence, and what it takes to ship focused digital products for organizations across Africa. Written by the people who do the work.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Studio Blog | Notes on Design and Development from Windhoek",
    description:
      "Field notes on design, development, and digital product practice from Studio in Windhoek, Namibia. Written by the people who do the work.",
    url: "/blog",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Studio Blog" }],
  },
};

export default function Page() {
  const featured = getFeaturedArticle();
  const rest = articles.filter((a) => a.slug !== featured.slug);

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Blog", url: "/blog" }]} />
      <WebPageJsonLd title="Blog" description="Notes on design, development, and digital product practice." url="/blog" />
      <SiteShell>
        <section className="pt-12 md:pt-20 pb-8">
          <div className="mx-auto max-w-4xl px-6">
            <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-3">Blog</p>
            <h1 className="font-display font-bold text-ink text-4xl md:text-5xl mb-4">Notes from the studio.</h1>
            <p className="font-satoshi text-lg text-ink-muted max-w-2xl">Writing on design, development, and the craft of digital product practice.</p>
          </div>
        </section>

        {/* Featured article */}
        <section className="pb-12">
          <div className="mx-auto max-w-6xl px-6">
            <Link href={`/blog/${featured.slug}`} className="group block">
              <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
                <div className="aspect-[4/3] overflow-hidden rounded-[25px] bg-ocean-mist">
                  <Image src={featured.cover} alt={`An oil painting representing: ${featured.title}`} width={800} height={600} className="w-full h-full object-cover" priority fetchPriority="high" sizes="(max-width: 768px) 100vw, 540px" />
                </div>
                <div>
                  <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-2">Featured · {featured.category}</p>
                  <h2 className="font-display font-bold text-ink text-2xl md:text-3xl mb-3 group-hover:text-signal-teal-text transition-colors">{featured.title}</h2>
                  <p className="font-satoshi text-base leading-relaxed text-ink-muted mb-4">{featured.excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-ink-muted">
                    <span>{new Date(featured.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                    <span>·</span>
                    <span>{featured.readingTime} min read</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Article grid */}
        <section className="pb-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((article) => (
                <Link key={article.slug} href={`/blog/${article.slug}`} className="group block">
                  <div className="aspect-[3/2] overflow-hidden rounded-[25px] bg-ocean-mist mb-4">
                    <Image src={article.cover} alt={`An oil painting representing: ${article.title}`} width={600} height={400} className="w-full h-full object-cover" loading="lazy" sizes="(max-width: 768px) 100vw, 360px" />
                  </div>
                  <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-1">{article.category}</p>
                  <h3 className="font-display font-bold text-ink text-lg mb-2 group-hover:text-signal-teal-text transition-colors">{article.title}</h3>
                  <p className="font-satoshi text-sm text-ink-muted leading-relaxed mb-3 line-clamp-2">{article.excerpt}</p>
                  <div className="flex items-center gap-2 text-xs text-ink-muted">
                    <span>{new Date(article.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                    <span>·</span>
                    <span>{article.readingTime} min</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </SiteShell>
    </>
  );
}
