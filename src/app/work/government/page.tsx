import type { Metadata } from "next";
import { IndustryComingSoonPage } from "../industry-template";

export const metadata: Metadata = {
  title: "Government & Public Sector",
  description: "Accessible, standards-compliant digital experiences for municipalities, ministries, and public institutions. Case studies coming soon.",
  alternates: { canonical: "/work/government" },
  openGraph: {
    title: "Government & Public Sector | TANGISON STUDIO",
    description: "Accessible, standards-compliant digital experiences for municipalities, ministries, and public institutions. Case studies coming soon.",
    url: "/work/government",
    images: [{ url: "/brand/favicon.webp", width: 499, height: 499, alt: "TANGISON STUDIO" }],
  },
};

export default function Page() {
  return (
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
  );
}
