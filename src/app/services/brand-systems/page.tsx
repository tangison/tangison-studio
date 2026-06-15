import type { Metadata } from "next";
import { BrandSystemsPage } from "./page-client";
import { ServiceJsonLd, BreadcrumbJsonLd, WebPageJsonLd } from "@/components/tangison/json-ld";

export const metadata: Metadata = {
  title: "Brand Systems | Tangison Studio",
  description: "Cohesive visual identity. Marks, wordmarks, palettes, and guidelines that scale. We build brand systems that work everywhere, consistently.",
  alternates: { canonical: "/services/brand-systems" },
  openGraph: {
    title: "Brand Systems | Tangison Studio",
    description: "Cohesive visual identity. Marks, wordmarks, palettes, and guidelines that scale. We build brand systems that work everywhere, consistently.",
    url: "/services/brand-systems",
    images: [{ url: "/images/services/brand-systems.webp", width: 1200, height: 630, alt: "Brand Systems service" }],
  },
};

export default function Page() {
  return (
    <>
      <WebPageJsonLd
        title="Brand Systems | Tangison Studio"
        description="Cohesive visual identity. Marks, wordmarks, palettes, and guidelines that scale. We build brand systems that work everywhere, consistently."
        url="/services/brand-systems"
      />
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
