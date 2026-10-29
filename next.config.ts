import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    // AVIF first where the browser supports it — meaningfully smaller than
    // WebP for the painting-style imagery, WebP as the fallback.
    formats: ["image/avif", "image/webp"],
    // Cap the srcset ladder: the site's largest intrinsic art is 1200px
    // wide, so 2048/3840 candidates only ever produced dead URLs
    // (SquirrelScan images/dimensions flagged the 3840 candidates).
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
  async headers() {
    return [
      {
        // Security headers on every route (mirrors tangison.com).
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'; media-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'; upgrade-insecure-requests;",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
      {
        // the hero film + poster are content-stable; if they ever change,
        // ship them under a new filename to bust this cache.
        source: "/videos/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // paintings, case art, screenshots, OG images — stable but not
        // hash-named; a day of cache with a week of stale revalidation.
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
  async redirects() {
    // The Work section was renamed to Cases — keep every legacy URL working.
    return [
      { source: "/work", destination: "/cases", permanent: true },
      { source: "/work/:slug", destination: "/cases/:slug", permanent: true },
    ];
  },
  async rewrites() {
    // Markdown variants for agents (SquirrelScan ax/markdown-response):
    // every article and case study is also available as text/markdown.
    return [
      { source: "/blog/:slug.md", destination: "/md/blog/:slug" },
      { source: "/cases/:slug.md", destination: "/md/cases/:slug" },
    ];
  },
};

export default nextConfig;
