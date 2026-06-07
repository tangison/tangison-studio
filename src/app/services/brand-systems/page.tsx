import type { Metadata } from "next";
import { BrandSystemsPage } from "./page-client";

export const metadata: Metadata = {
  title: "Brand Systems — Tangison Studio",
  description: "Cohesive visual identity. Marks, wordmarks, palettes, and guidelines that scale. We build brand systems that work everywhere, consistently.",
  alternates: { canonical: "/services/brand-systems" },
  openGraph: {
    title: "Brand Systems — Tangison Studio",
    description: "Cohesive visual identity. Marks, wordmarks, palettes, and guidelines that scale. We build brand systems that work everywhere, consistently.",
    url: "/services/brand-systems",
  },
};

export default function Page() {
  return <BrandSystemsPage />;
}
