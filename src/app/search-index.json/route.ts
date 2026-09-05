import { buildSearchIndex } from "@/lib/search-index";

/**
 * The site search index, prerendered as a static JSON asset at build time
 * (same data the old /search page embedded in its RSC payload). The search
 * client fetches it on mount: the page shell paints immediately and the
 * ~60KB of index data transfers only when search is actually used.
 */
export const dynamic = "force-static";

export async function GET() {
  return new Response(JSON.stringify(buildSearchIndex()), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=86400",
    },
  });
}
