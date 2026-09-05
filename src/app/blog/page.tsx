import type { Metadata } from "next";
import { getArticles, getArticleCategories } from "@/lib/articles";
import { BlogIndex } from "./blog-client";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Insights — AI Adoption, Web Design, and Brand in Namibia",
  description:
    "Research-backed guides from Tangison Studio: AI adoption playbooks for 20 Namibian industries, plus practical writing on web design, branding, and digital product work in Windhoek.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Tangison Studio Insights",
    description:
      "AI adoption playbooks for Namibian industries, plus practical writing on web design and brand systems.",
    type: "website",
  },
};

export default function BlogPage() {
  const articles = getArticles();
  const categories = getArticleCategories();

  return (
    <div className="theme-ink bg-paper text-ink min-h-screen">
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-32 md:pt-40 pb-10 md:pb-14">
        <div className="max-w-3xl">
          <Reveal>
            <p className="eyebrow">Insights</p>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="h1 mt-4">Thinking that does the work.</h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 text-lg md:text-xl text-ink-muted leading-relaxed">
              {articles.length} research-backed guides on AI adoption across
              Namibian industries, and practical notes on design, brand, and
              building digital products from Windhoek.
            </p>
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
