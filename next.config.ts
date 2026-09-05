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
  },
  async headers() {
    return [
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
};

export default nextConfig;
