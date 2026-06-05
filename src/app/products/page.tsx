import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "Products built by Tangison Studio.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Products",
    description: "Products built by Tangison Studio.",
    url: "/products",
  },
};

export default function Page() {
  // This page redirects to /work via next.config.ts
  return null;
}
