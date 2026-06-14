import type { Metadata } from "next";
import { IndustryComingSoonPage } from "../industry-template";

export const metadata: Metadata = {
  title: "Agriculture & Agro-processing",
  description: "Marketplace platforms, cooperative management tools, and agri-tech interfaces for Namibia's farming communities. Case studies coming soon.",
  alternates: { canonical: "/work/agriculture" },
  openGraph: {
    title: "Agriculture & Agro-processing | TANGISON STUDIO",
    description: "Marketplace platforms, cooperative management tools, and agri-tech interfaces for Namibia's farming communities. Case studies coming soon.",
    url: "/work/agriculture",
    images: [{ url: "/brand/favicon.webp", width: 499, height: 499, alt: "TANGISON STUDIO" }],
  },
};

export default function Page() {
  return (
    <IndustryComingSoonPage
      industry="Agriculture & Agro-processing"
      description="Agriculture is the lifeblood of Namibia's rural economy, and digital tools can deliver enormous value for farmers, cooperatives, and value-chain operators. We design marketplace platforms for produce and equipment, cooperative management tools, and agri-tech interfaces that work in the field, literally. Our designs account for intermittent connectivity, mobile-first usage patterns, and the practical realities of agricultural work."
      services={[
        "Agricultural marketplace and e-commerce platforms",
        "Cooperative management and member portals",
        "Equipment rental and resource-sharing interfaces",
        "Agri-tech dashboards for crop and livestock monitoring",
      ]}
      breadcrumb="Agriculture & Agro-processing"
    />
  );
}
