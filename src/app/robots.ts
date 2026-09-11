import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

// Stated crawler policy (SEO audit 2026-09-11): allowed, including AI
// crawlers. Mirrors the policy of tangison.com so the two properties
// behave as one estate.
const ALLOWED = [
  "Googlebot",
  "Bingbot",
  "Twitterbot",
  "facebookexternalhit",
  "GPTBot",
  "ClaudeBot",
  "PerplexityBot",
  "Google-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...ALLOWED.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/search-index.json"],
      })),
      { userAgent: "*", allow: "/", disallow: ["/search-index.json"] },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
