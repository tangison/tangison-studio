import type { Metadata } from "next";
import { ProductDesignPage } from "./page-client";
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/tangison/json-ld";

export const metadata: Metadata = {
  title: "Product Design",
  description: "Complete product thinking. From concept to launch and beyond, we design products that solve real problems and create lasting value.",
  alternates: { canonical: "/services/product-design" },
  openGraph: {
    title: "Product Design | TANGISON STUDIO",
    description: "Complete product thinking. From concept to launch and beyond, we design products that solve real problems and create lasting value.",
    url: "/services/product-design",
    images: [{ url: "/images/services/product-design.webp", width: 1200, height: 630, alt: "Product Design service" }],
  },
};

export default function Page() {
  return (
    <>
      <ServiceJsonLd
        name="Product Design"
        description="From concept to launch. Complete product design that balances user needs with business goals."
        slug="product-design"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: "Product Design", url: "/services/product-design" },
        ]}
      />
      <ProductDesignPage />
    </>
  );
}
