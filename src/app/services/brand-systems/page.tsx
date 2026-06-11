import type { Metadata } from "next";
import { BrandSystemsPage } from "./page-client";
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/tangison/json-ld";

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
  return (
    <>
      <ServiceJsonLd
        name="Brand Systems"
        description="Cohesive visual identity. Marks, wordmarks, and design systems that make brands unmistakable."
        slug="brand-systems"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: "Brand Systems", url: "/services/brand-systems" },
        ]}
      />
      <BrandSystemsPage />
    </>
  );
}
