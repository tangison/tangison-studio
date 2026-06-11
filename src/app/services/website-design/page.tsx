import type { Metadata } from "next";
import { WebsiteDesignPage } from "./page-client";
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/tangison/json-ld";

export const metadata: Metadata = {
  title: "Website Design — Tangison Studio",
  description: "Intentional interfaces. We design websites that communicate clearly, convert effectively, and represent your brand with precision.",
  alternates: { canonical: "/services/website-design" },
  openGraph: {
    title: "Website Design — Tangison Studio",
    description: "Intentional interfaces. We design websites that communicate clearly, convert effectively, and represent your brand with precision.",
    url: "/services/website-design",
  },
};

export default function Page() {
  return (
    <>
      <ServiceJsonLd
        name="Website Design"
        description="Intentional interfaces. We design websites that communicate clearly and convert effectively."
        slug="website-design"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: "Website Design", url: "/services/website-design" },
        ]}
      />
      <WebsiteDesignPage />
    </>
  );
}
