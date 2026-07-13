import type { Metadata } from "next";
import BrandPage from "./page-client";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/tangison/json-ld";

export const metadata: Metadata = {
  title: "Brand Identity | Tangison Studio",
  description: "The Tangison Studio brand system: identity mark, wordmark, color system, typography, motion, and design rules. For partners, designers, and collaborators.",
  alternates: { canonical: "/brand" },
  openGraph: {
    title: "Brand Identity | Studio",
    description: "The Tangison Studio brand system: identity mark, wordmark, color system, typography, motion, and design rules.",
    url: "/brand",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Studio" }],
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "/" },
        { name: "Brand Identity", url: "/brand" },
      ]} />
      <WebPageJsonLd
        title="Brand Identity | Tangison Studio"
        description="The Tangison Studio brand system: identity mark, wordmark, color system, typography, motion, and design rules."
        url="/brand"
      />
      <BrandPage />
    </>
  );
}
