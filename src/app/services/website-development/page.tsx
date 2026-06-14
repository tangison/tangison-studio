import type { Metadata } from "next";
import { WebsiteDevelopmentPage } from "./page-client";
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/tangison/json-ld";

export const metadata: Metadata = {
  title: "Website Development in Namibia",
  description: "Engineered to perform. Clean code, fast load times, and built to scale. We develop websites that deliver on every metric that matters.",
  alternates: { canonical: "/services/website-development" },
  openGraph: {
    title: "Website Development | TANGISON STUDIO",
    description: "Engineered to perform. Clean code, fast load times, and built to scale. We develop websites that deliver on every metric that matters.",
    url: "/services/website-development",
    images: [{ url: "/images/services/website-development.webp", width: 1200, height: 630, alt: "Website Development service" }],
  },
};

export default function Page() {
  return (
    <>
      <ServiceJsonLd
        name="Website Development"
        description="Built to perform. We develop websites that are fast, accessible, and built to scale."
        slug="website-development"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: "Website Development", url: "/services/website-development" },
        ]}
      />
      <WebsiteDevelopmentPage />
    </>
  );
}
