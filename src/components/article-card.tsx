import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatDate, type ArticleSummary } from "@/lib/article-types";

/**
 * Article card for the blog index — same motion language as the Cases
 * gallery: the artwork fills the card and zooms on hover/focus
 * (`.case-card-image`, 1.1s expo-out both ways). Takes a lean summary —
 * bodies are never serialized into client payloads.
 */
export function ArticleCard({
  article,
  priority = false,
  sizes = "(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw",
}: {
  article: ArticleSummary;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <Link
      href={`/blog/${article.slug}`}
      className="case-card group block rounded-[20px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"
      aria-label={`${article.title} — read article`}
    >
      <div className="relative overflow-hidden rounded-[20px] aspect-[16/9] bg-paper-raise">
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          priority={priority}
          sizes={sizes}
          className="case-card-image object-cover"
        />
      </div>
      <div className="mt-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
          {article.category}
          <span aria-hidden="true" className="text-ink-faint">
            {" · "}
            {formatDate(article.date)} · {article.readingMinutes} min
          </span>
        </p>
        <h3 className="mt-2 font-display font-bold tracking-[-0.02em] text-lg sm:text-xl leading-snug group-hover:text-teal transition-colors duration-300">
          {article.title}
        </h3>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-muted line-clamp-2">
          {article.excerpt}
        </p>
        <p className="mt-3 flex items-center gap-2 text-sm font-medium">
          Read article
          <ArrowUpRight
            aria-hidden="true"
            className="w-4 h-4 -translate-x-1 opacity-0 transition-transform duration-500 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
            style={{ transitionTimingFunction: "var(--ease-primary)" }}
          />
        </p>
      </div>
    </Link>
  );
}
