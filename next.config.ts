import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  async redirects() {
    // The Work section was renamed to Cases — keep every legacy URL working.
    return [
      { source: "/work", destination: "/cases", permanent: true },
      { source: "/work/:slug", destination: "/cases/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
