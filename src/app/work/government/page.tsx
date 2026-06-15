import type { Metadata } from "next";
import { IndustryComingSoonPage } from "../industry-template";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/tangison/json-ld";

export const metadata: Metadata = {
  title: "Government & Public Sector | Work | Tangison Studio",
  description: "Accessible, standards-compliant digital experiences for municipalities, ministries, and public institutions in Namibia. Built by Tangison Studio in Windhoek.",
  alternates: { canonical: "/work/government" },
  openGraph: {
    title: "Government & Public Sector | Work | Tangison Studio",
    description: "Accessible, standards-compliant digital experiences for municipalities, ministries, and public institutions in Namibia.",
    url: "/work/government",
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "/" },
        { name: "Work", url: "/work" },
        { name: "Government & Public Sector", url: "/work/government" },
      ]} />
      <WebPageJsonLd
        title="Government & Public Sector | Work"
        description="Accessible, standards-compliant digital experiences for municipalities, ministries, and public institutions in Namibia."
        url="/work/government"
      />
      <IndustryComingSoonPage
        industry="Government & Public Sector"
        description="Public institutions serve every citizen, and their digital platforms must reflect that responsibility. We design accessible, standards-compliant websites and portals for municipalities, ministries, and government agencies across Namibia. Our approach prioritises inclusive design, multilingual support, low-bandwidth performance, and adherence to government web standards, making sure every citizen can access the services they need."
        services={[
          "Municipal and ministry websites with WCAG accessibility",
          "Citizen service portals and e-governance platforms",
          "Public information and document management systems",
          "Multilingual interfaces for diverse communities",
        ]}
        breadcrumb="Government & Public Sector"
      />
    </>
  );
}
