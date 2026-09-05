/**
 * Client-safe article types and helpers (no filesystem imports: safe to
 * import from client components). The server-only loader lives in
 * articles.ts.
 */
export interface Article {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  category: string;
  date: string; // ISO date
  readingMinutes: number;
  image: string;
  imageAlt: string;
  author: string;
  /** Markdown body (frontmatter stripped, lede paragraphs included). */
  body: string;
  /** Excerpt used in cards and search (first ~2 sentences of the lede). */
  excerpt: string;
}

/**
 * An article without its markdown body: what list views and client
 * components receive. Passing the full Article (with body) into a client
 * component serializes every body into the page payload; summaries keep
 * the /blog index lean.
 */
export type ArticleSummary = Omit<Article, "body">;

export function toSummary(a: Article): ArticleSummary {
  const { body: _body, ...summary } = a;
  return summary;
}

export function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
