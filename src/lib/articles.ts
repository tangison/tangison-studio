/**
 * Article loader: reads content/articles/*.md (frontmatter + markdown) at
 * build time. Articles are fully static (SSG), so the filesystem is never
 * touched at runtime in production.
 *
 * SERVER-ONLY: imports node:fs. Client components must import types and
 * helpers from article-types.ts instead.
 */
import fs from "node:fs";
import path from "node:path";
import type { Article, ArticleSummary } from "./article-types";
import { toSummary } from "./article-types";

export type { Article, ArticleSummary } from "./article-types";
export { formatDate, toSummary } from "./article-types";

const DIR = path.join(process.cwd(), "content", "articles");

function parseFrontmatter(raw: string): {
  data: Record<string, string>;
  body: string;
} {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
  if (!m) return { data: {}, body: raw };
  const data: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    const kv = /^([A-Za-z][A-Za-z0-9]*)\s*:\s*(.*)$/.exec(line);
    if (!kv) continue;
    let v = kv[2].trim();
    if (v.startsWith('"') && v.endsWith('"') && v.length >= 2) {
      v = v.slice(1, -1);
    }
    data[kv[1]] = v;
  }
  return { data, body: m[2].trim() };
}

function parseKeywords(v: string | undefined): string[] {
  if (!v) return [];
  return v
    .replace(/^\[|\]$/g, "")
    .split(",")
    .map((s) => s.trim().replace(/^"|"$/g, ""))
    .filter(Boolean);
}

function excerptFrom(body: string, description: string): string {
  const first = body.split(/\n\s*\n/).find((p) => p.trim().length > 40);
  if (!first) return description;
  const text = first.replace(/[#*\-]/g, " ").replace(/\s+/g, " ").trim();
  const sentences = text.split(/(?<=[.!?])\s+/);
  return sentences.slice(0, 2).join(" ").slice(0, 220);
}

let cache: Article[] | null = null;

export function getArticles(): Article[] {
  if (cache) return cache;
  const out: Article[] = [];
  let files: string[] = [];
  try {
    files = fs.readdirSync(DIR).filter((f) => f.endsWith(".md"));
  } catch {
    // content dir missing: no articles
    return (cache = []);
  }
  for (const file of files) {
    const raw = fs.readFileSync(path.join(DIR, file), "utf8");
    const { data, body } = parseFrontmatter(raw);
    const slug = data.slug ?? file.replace(/\.md$/, "");
    const words = body
      .replace(/[#*[\]()>-]/g, " ")
      .split(/\s+/)
      .filter(Boolean).length;
    out.push({
      slug,
      title: data.title ?? slug,
      description: data.description ?? "",
      keywords: parseKeywords(data.keywords),
      category: data.category ?? "Notes",
      date: data.date ?? "2026-01-01",
      readingMinutes: data.readingMinutes
        ? Number(data.readingMinutes)
        : Math.max(3, Math.round(words / 220)),
      image: data.image ?? "/images/paintings/blog/blog-01.webp",
      imageAlt: data.imageAlt ?? data.title ?? "Article illustration",
      author: data.author ?? "Tangi Iigonda",
      body,
      excerpt: excerptFrom(body, data.description ?? ""),
    });
  }
  out.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  cache = out;
  return out;
}

export function getArticle(slug: string): Article | undefined {
  return getArticles().find((a) => a.slug === slug);
}

/**
 * All articles as lean summaries (no markdown body). The body is only ever
 * needed by the article page renderer; lists, cards, and client search
 * filters work off summaries so page payloads stay small.
 */
export function getArticleSummaries(): ArticleSummary[] {
  return getArticles().map(toSummary);
}

export function getArticleCategories(): { name: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const a of getArticles()) {
    counts.set(a.category, (counts.get(a.category) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function relatedArticles(slug: string, n = 3): Article[] {
  const all = getArticles();
  const self = all.find((a) => a.slug === slug);
  if (!self) return all.slice(0, n);
  const sameCategory = all.filter(
    (a) => a.slug !== slug && a.category === self.category,
  );
  const others = all.filter(
    (a) => a.slug !== slug && a.category !== self.category,
  );
  return [...sameCategory, ...others].slice(0, n);
}

export function nextArticle(slug: string): Article | undefined {
  const all = getArticles();
  const idx = all.findIndex((a) => a.slug === slug);
  if (idx === -1) return undefined;
  return all[idx + 1] ?? all[0];
}

export function prevArticle(slug: string): Article | undefined {
  const all = getArticles();
  const idx = all.findIndex((a) => a.slug === slug);
  if (idx === -1) return undefined;
  return all[idx - 1] ?? all[all.length - 1];
}
