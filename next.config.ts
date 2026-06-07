import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  /* ─── Image Optimization — Vercel Hobby budget: 1GB/mo ─── */
  images: {
    formats: ["image/avif", "image/webp"],
    // Limit device sizes to reduce optimization quota usage
    deviceSizes: [640, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128],
  },

  /* ─── Vercel-specific ─── */
  poweredByHeader: false,

  allowedDevOrigins: [
    ".space-z.ai",
  ],

  async redirects() {
    return [
      // Old page redirects
      {
        source: "/architecture",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/systems",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/intelligence",
        destination: "/work",
        permanent: true,
      },
      {
        source: "/manifesto",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/research",
        destination: "/resources",
        permanent: true,
      },
      // Insights → Blog redirect
      {
        source: "/insights",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/insights/:path*",
        destination: "/blog",
        permanent: true,
      },
      // Products → Work redirect
      {
        source: "/products",
        destination: "/work",
        permanent: true,
      },
      {
        source: "/products/:path*",
        destination: "/work",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), geolocation=()",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://api.fontshare.com https://fonts.googleapis.com; font-src 'self' https://api.fontshare.com https://fonts.gstatic.com; img-src 'self' data: blob:; media-src blob:; connect-src 'self' https://openrouter.ai; frame-ancestors 'none'; base-uri 'self'; form-action 'self';",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
