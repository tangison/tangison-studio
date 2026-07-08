import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://studio.tangison.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /_next/ (Next.js static assets: JS chunks, CSS, fonts) was previously disallowed.
        // Removed because: (1) these assets are required for search renderers that
        // execute JS, (2) Googlebot can fetch them fine and they are immutable per-build,
        // (3) blocking them can cause "soft 404" / "blocked resource" warnings in
        // Search Console's URL Inspection tool. Only /api/ remains disallowed because
        // those routes are not public-facing content.
        disallow: ["/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
