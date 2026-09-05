"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Article } from "@/lib/article-types";
import { ArticleCard } from "@/components/article-card";

/**
 * Blog index interactivity: instant client-side search across titles,
 * categories and excerpts + category filter chips. 47 articles filter in
 * under a millisecond — no server round-trip, no search dependency.
 */
export function BlogIndex({
  articles,
  categories,
}: {
  articles: Article[];
  categories: { name: string; count: number }[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      if (category && a.category !== category) return false;
      if (!q) return true;
      const haystack = [
        a.title,
        a.description,
        a.category,
        a.excerpt,
        a.keywords.join(" "),
      ]
        .join(" ")
        .toLowerCase();
      return q.split(/\s+/).every((word) => haystack.includes(word));
    });
  }, [articles, query, category]);

  const featured = filtered[0];

  return (
    <div>
      {/* Search + filter controls */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <label className="relative block w-full md:max-w-md">
          <span className="sr-only">Search articles</span>
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-faint"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${articles.length} articles…`}
            className="w-full h-12 rounded-full border border-line bg-paper-raise pl-11 pr-5 text-sm placeholder:text-ink-faint focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/25 transition-colors"
          />
        </label>

        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter by category"
        >
          <button
            type="button"
            onClick={() => setCategory(null)}
            aria-pressed={category === null}
            className={`h-9 px-4 rounded-full font-mono text-[10px] uppercase tracking-[0.12em] border transition-colors ${
              category === null
                ? "border-teal bg-teal-mist text-ink"
                : "border-line text-ink-muted hover:border-line-strong hover:text-ink"
            }`}
          >
            All · {articles.length}
          </button>
          {categories.map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() =>
                setCategory((prev) => (prev === c.name ? null : c.name))
              }
              aria-pressed={category === c.name}
              className={`h-9 px-4 rounded-full font-mono text-[10px] uppercase tracking-[0.12em] border transition-colors ${
                category === c.name
                  ? "border-teal bg-teal-mist text-ink"
                  : "border-line text-ink-muted hover:border-line-strong hover:text-ink"
              }`}
            >
              {c.name} · {c.count}
            </button>
          ))}
        </div>
      </div>

      {/* Result count */}
      <p
        className="mt-8 text-sm text-ink-muted"
        aria-live="polite"
        role="status"
      >
        {filtered.length === 0
          ? "No articles match that search."
          : `Showing ${filtered.length} of ${articles.length} articles`}
      </p>

      {/* Featured (newest match) */}
      {featured && (
        <div className="mt-6">
          <ArticleCard
            article={featured}
            priority
            sizes="(max-width: 1400px) 100vw, 1360px"
          />
        </div>
      )}

      {/* Grid */}
      {filtered.length > 1 && (
        <div className="mt-6 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.slice(1).map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      )}
    </div>
  );
}
