import type { Metadata } from "next";
import { DesignSystemsPage } from "./page-client";
import { ServiceJsonLd, BreadcrumbJsonLd, WebPageJsonLd } from "@/components/tangison/json-ld";

export const metadata: Metadata = {
  title: "Design Systems | Tangison Studio",
  description: "Scalable component architecture. One source of truth for your entire product. We build design systems that unify teams and accelerate delivery.",
  alternates: { canonical: "/services/design-systems" },
  openGraph: {
    title: "Design Systems | Tangison Studio",
    description: "Scalable component architecture. One source of truth for your entire product. We build design systems that unify teams and accelerate delivery.",
    url: "/services/design-systems",
    images: [{ url: "/images/services/design-systems.webp", width: 1200, height: 630, alt: "Design Systems service" }],
  },
};

export default function Page() {
  return (
    <>
      <WebPageJsonLd
        title="Design Systems | Tangison Studio"
        description="Scalable component architecture. One source of truth for your entire product. We build design systems that unify teams and accelerate delivery."
        url="/services/design-systems"
      />
      <ServiceJsonLd
        name="Design Systems"
        description="Scalable design infrastructure. Component libraries and design tokens that keep teams aligned."
        slug="design-systems"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: "Design Systems", url: "/services/design-systems" },
        ]}
      />
      <DesignSystemsPage />
    </>
  );
}
