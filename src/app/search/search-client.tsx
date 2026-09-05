"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import type { SearchEntry } from "@/lib/search-index";

const TYPE_LABEL: Record<SearchEntry["type"], string> = {
  article: "Article",
  case: "Case",
  page: "Page",
};

const SUGGESTIONS = ["AI adoption", "mining", "website cost", "brand", "agriculture", "SEO"];

/**
 * Instant client-side search over articles, cases, and pages. Every word of
 * the query must appear in the entry's corpus; title matches rank higher.
 *
 * The index itself is a static JSON asset (/search-index.json, prerendered
 * at build time) fetched once on mount and cached by the browser: the
 * page shell paints immediately and the index bytes transfer only when
 * search is actually used.
 */
export function SearchClient() {
  const [query, setQuery] = useState("");
  const [entries, setEntries] = useState<SearchEntry[] | null>(null);
  const [loadError, setLoadError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // fetch the search index once (cached static asset)
  useEffect(() => {
    let alive = true;
    fetch("/search-index.json")
      .then((r) => {
        if (!r.ok) throw new Error(`index ${r.status}`);
        return r.json() as Promise<SearchEntry[]>;
      })
      .then((data) => {
        if (alive) setEntries(data);
      })
      .catch(() => {
        if (alive) setLoadError(true);
      });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
    // deep-link support: /search?q=... (matches the JSON-LD SearchAction).
    // Deferred to a macrotask so state is set outside the effect body.
    const t = window.setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      const q = params.get("q");
      if (q) setQuery(q);
    }, 0);
    return () => window.clearTimeout(t);
  }, []);

  // keep the URL in sync so a running query is shareable / back-button friendly
  const urlSyncArmedRef = useRef(false);
  useEffect(() => {
    if (!urlSyncArmedRef.current) {
      // skip the first run (mount): the deep-link read owns the URL until it lands
      urlSyncArmedRef.current = true;
      return;
    }
    const url = new URL(window.location.href);
    if (query.trim()) url.searchParams.set("q", query.trim());
    else url.searchParams.delete("q");
    window.history.replaceState(null, "", url);
  }, [query]);

  const results = useMemo(() => {
    if (!entries) return [];
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const words = q.split(/\s+/).filter(Boolean);
    return entries
      .map((e) => {
        const title = e.title.toLowerCase();
        let score = 0;
        let match = true;
        for (const w of words) {
          if (!e.haystack.includes(w)) {
            match = false;
            break;
          }
          if (title.includes(w)) score += 10;
          if (e.meta.toLowerCase().includes(w)) score += 2;
          score += 1;
        }
        return match ? { e, score } : null;
      })
      .filter((r): r is { e: SearchEntry; score: number } => r !== null)
      .sort((a, b) => b.score - a.score)
      .map((r) => r.e);
  }, [entries, query]);

  const grouped = useMemo(() => {
    const groups: { type: SearchEntry["type"]; items: SearchEntry[] }[] = [
      { type: "article", items: [] },
      { type: "case", items: [] },
      { type: "page", items: [] },
    ];
    for (const r of results) {
      const g = groups.find((g) => g.type === r.type);
      if (g) g.items.push(r);
    }
    return groups.filter((g) => g.items.length > 0);
  }, [results]);

  return (
    <div>
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          if (results[0]) router.push(results[0].href);
        }}
        className="relative"
      >
        <label htmlFor="site-search" className="sr-only">
          Search articles, cases, and pages
        </label>
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-faint"
        />
        <input
          ref={inputRef}
          id="site-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles, cases, and pages…"
          autoComplete="off"
          className="w-full h-14 md:h-16 rounded-full border border-line bg-paper-raise pr-5 md:pr-6 text-base md:text-lg placeholder:text-ink-faint focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/25 transition-colors"
          style={{ paddingLeft: "3.25rem" }}
        />
      </form>

      {!query.trim() && (
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="text-sm text-ink-faint">Try:</span>
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setQuery(s)}
              className="h-9 px-4 rounded-full border border-line font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted hover:border-line-strong hover:text-ink transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <p className="mt-8 text-sm text-ink-muted" aria-live="polite" role="status">
        {loadError
          ? "The search index could not load. Refresh the page and try again."
          : entries === null
            ? "Loading the index…"
            : query.trim() === ""
              ? `${entries.length} things to find.`
              : results.length === 0
                ? "Nothing matches that search. Try fewer or different words."
                : `${results.length} result${results.length === 1 ? "" : "s"} for “${query.trim()}”`}
      </p>

      <div className="mt-6 flex flex-col gap-10">
        {grouped.map((g) => (
          <section key={g.type} aria-label={TYPE_LABEL[g.type]}>
            <p className="eyebrow">
              {TYPE_LABEL[g.type]}s · {g.items.length}
            </p>
            <ul className="mt-4 flex flex-col gap-3">
              {g.items.map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    className="group flex items-start justify-between gap-4 rounded-[16px] border border-line bg-paper-raise p-5 hover:border-line-strong transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-muted">
                        {r.meta}
                      </p>
                      <p className="mt-1 font-display font-bold tracking-[-0.01em] text-lg leading-snug group-hover:text-teal transition-colors duration-300">
                        {r.title}
                      </p>
                      <p className="mt-1 text-sm text-ink-muted leading-relaxed line-clamp-2">
                        {r.excerpt}
                      </p>
                    </div>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="w-5 h-5 shrink-0 mt-1 text-ink-faint transition-[color,transform] duration-500 group-hover:text-teal group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
