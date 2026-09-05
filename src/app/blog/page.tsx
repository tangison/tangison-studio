import type { Metadata } from "next";
import Image from "next/image";
import { getArticleSummaries, getArticleCategories } from "@/lib/articles";
import { BlogIndex } from "./blog-client";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Insights: AI Adoption, Web Design, and Brand in Namibia",
  description:
    "Research-backed guides from The Tangison Studio: AI adoption playbooks for 20 Namibian industries, plus practical writing on web design, branding, and digital product work in Windhoek.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "The Tangison Studio: Insights",
    description:
      "AI adoption playbooks for Namibian industries, plus practical writing on web design and brand systems.",
    type: "website",
    images: [{ url: "/images/og/blog.png", width: 1200, height: 630 }],
  },
};

export default function BlogPage() {
  // lean summaries — never ship 47 markdown bodies to the client
  const articles = getArticleSummaries();
  const categories = getArticleCategories();

  return (
    <div className="theme-ink bg-paper text-ink min-h-screen">
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-32 md:pt-40 pb-10 md:pb-14">
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-16 items-end">
          <div>
            <Reveal>
              <h1 className="h1 max-w-3xl">Thinking that does the work.</h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-6 text-lg md:text-xl text-ink-muted leading-relaxed max-w-2xl">
                {articles.length} research-backed guides on AI adoption across
                Namibian industries, and practical notes on design, brand, and
                building digital products from Windhoek.
              </p>
            </Reveal>
          </div>
          <Reveal variant="zoom" delay={100}>
            <div className="relative art-tile art-shadow aspect-[4/3] w-[240px] sm:w-[300px] lg:w-[360px] ml-auto bg-paper-raise">
              <Image
                src="/images/paintings/heroes/hero-blog.webp"
                alt="A single open book with blank pages on a calm cream table, a minimal oil painting."
                fill
                priority
                fetchPriority="high"
                sizes="360px"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pb-24 md:pb-32">
        <Reveal delay={100}>
          <BlogIndex articles={articles} categories={categories} />
        </Reveal>
      </section>
    </div>
  );
}
