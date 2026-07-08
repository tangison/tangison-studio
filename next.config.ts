import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: false,

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
      // SEO: Redirect all .vercel.app traffic to the canonical domain
      // This ensures all SEO equity goes to studio.tangison.com
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "tangison-studio.vercel.app",
          },
        ],
        destination: "https://studio.tangison.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "tangison-studio-tangison-s-projects.vercel.app",
          },
        ],
        destination: "https://studio.tangison.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "tangison-studio-git-main-tangison-s-projects.vercel.app",
          },
        ],
        destination: "https://studio.tangison.com/:path*",
        permanent: true,
      },
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
            // CSP review (agent/audit-fix-pass-1):
            // - Removed 'unsafe-eval' from script-src. Next.js 16 production builds
            //   do not require eval; dev mode does, but dev is not served with these
            //   headers (Vercel dev server does not run next.config.ts headers()).
            //   Verified by `npm run build` + `npm run start` smoke test (see PR).
            // - KEPT 'unsafe-inline' in script-src and style-src. Next.js App Router
            //   injects inline runtime scripts for hydration and inline styles for
            //   Tailwind/RSC. Removing 'unsafe-inline' would break hydration.
            //   FOLLOW-UP TECH DEBT: replace 'unsafe-inline' with nonce-based CSP
            //   (Next.js 16 supports `nonce` per-request via middleware). Tracked
            //   as a separate task — requires middleware setup + per-request nonce.
            value: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data: blob:; media-src blob:; connect-src 'self' https://openrouter.ai; frame-ancestors 'none'; base-uri 'self'; form-action 'self';",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
