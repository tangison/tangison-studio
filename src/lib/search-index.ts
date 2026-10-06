/**
 * Search index: built at build time from articles, cases, and site pages.
 * SERVER-ONLY (imports the fs-based article loader); search-client.tsx
 * receives the plain JSON entries as props.
 */
import { getArticles } from "@/lib/articles";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

export interface SearchEntry {
  type: "article" | "case" | "page";
  title: string;
  href: string;
  meta: string;
  excerpt: string;
  /** Lowercase corpus the client filters against. */
  haystack: string;
}

/** Static page entries except /cases, which carries live counts and is
 *  built in buildSearchIndex so the numbers can never go stale. */
const PAGES: { title: string; href: string; meta: string; excerpt: string }[] = [
  {
    title: "Services: what we do",
    href: "/services",
    meta: "Services",
    excerpt:
      "Brand and identity, website design and development, digital products, and applied AI.",
  },
  {
    title: "Insights: articles and research",
    href: "/blog",
    meta: "Blog · research library",
    excerpt:
      "AI adoption playbooks for Namibian industries, plus practical notes on web design and brand.",
  },
  {
    title: "About the studio",
    href: "/about",
    meta: "About",
    excerpt:
      "Studio Tangison: one team for brand, product, and intelligence, based in Windhoek.",
  },
  {
    title: "Contact: start a project",
    href: "/contact",
    meta: "Contact",
    excerpt:
      "Tell us what you are building. Email, phone, WhatsApp, or the project brief form.",
  },
  {
    title: "Free website audit",
    href: "/audit",
    meta: "Free audit",
    excerpt:
      "A free, written audit of your website: findability, speed, mobile experience, and trust signals.",
  },
];

export function buildSearchIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];

  // /cases page entry with live counts (was hardcoded "15 case studies"
  // while the gallery grew to 19; now computed so it stays true forever).
  entries.push({
    type: "page",
    title: "Cases: our work",
    href: "/cases",
    meta: `Gallery · ${projects.length} case studies`,
    excerpt: `All ${projects.length} case studies: brand systems, websites, and platforms built in and beyond Namibia.`,
    haystack: "cases our work gallery case studies brand systems websites platforms namibia",
  });

  for (const a of getArticles()) {
    // headings from the body make searches like "checklist" or "roadmap"
    // land on the right article even when the title does not carry the word
    const headings = (a.body.match(/^##+ .+$/gm) ?? [])
      .join(" ")
      .replace(/#+\s*/g, "");
    entries.push({
      type: "article",
      title: a.title,
      href: `/blog/${a.slug}`,
      meta: `${a.category} · ${a.date} · ${a.readingMinutes} min`,
      excerpt: a.excerpt,
      haystack: [
        a.title,
        a.description,
        a.category,
        a.excerpt,
        a.keywords.join(" "),
        headings,
      ]
        .join(" ")
        .toLowerCase(),
    });
  }

  for (const p of projects) {
    entries.push({
      type: "case",
      title: p.name,
      href: `/cases/${p.slug}`,
      meta: `${p.category} · case study`,
      excerpt: p.short || p.description,
      haystack: [
        p.name,
        p.title,
        p.category,
        p.eyebrow,
        p.short,
        p.description,
        p.tags.join(" "),
      ]
        .join(" ")
        .toLowerCase(),
    });
  }

  for (const page of PAGES) {
    entries.push({
      type: "page",
      title: page.title,
      href: page.href,
      meta: page.meta,
      excerpt: page.excerpt,
      haystack: `${page.title} ${page.meta} ${page.excerpt}`.toLowerCase(),
    });
  }

  return entries;
}