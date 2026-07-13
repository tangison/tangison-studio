import type { Metadata } from "next";
import { ResourcesPage } from "./page-client";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/tangison/json-ld";

export const metadata: Metadata = {
  title: "Resources & Guides | Tangison Studio",
  description: "AI guides, frameworks, and industry-specific playbooks for organizations across Africa. Free downloads and practical resources from Tangison Studio in Windhoek, Namibia.",
  alternates: { canonical: "/resources" },
  openGraph: {
    title: "Resources & Guides | Studio",
    description: "AI guides, frameworks, and industry-specific playbooks for organizations across Africa. Free downloads and practical resources.",
    url: "/resources",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Studio" }],
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "/" },
        { name: "Resources", url: "/resources" },
      ]} />
      <WebPageJsonLd
        title="Resources & Guides | Tangison Studio"
        description="AI guides, frameworks, and industry-specific playbooks for organizations across Africa."
        url="/resources"
      />
      <ResourcesPage />
    </>
  );
}
