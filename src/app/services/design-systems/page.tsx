import type { Metadata } from "next";
import { DesignSystemsPage } from "./page-client";
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/tangison/json-ld";

export const metadata: Metadata = {
  title: "Design Systems — Tangison Studio",
  description: "Scalable component architecture. One source of truth for your entire product. We build design systems that unify teams and accelerate delivery.",
  alternates: { canonical: "/services/design-systems" },
  openGraph: {
    title: "Design Systems — Tangison Studio",
    description: "Scalable component architecture. One source of truth for your entire product. We build design systems that unify teams and accelerate delivery.",
    url: "/services/design-systems",
  },
};

export default function Page() {
  return (
    <>
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
