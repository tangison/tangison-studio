import type { Metadata } from "next";
import { IndustryComingSoonPage } from "../industry-template";

export const metadata: Metadata = {
  title: "Mining & Resources",
  description: "Corporate digital platforms for Namibia's mining sector. Safety portals, stakeholder dashboards, and compliance-grade interfaces. Case studies coming soon.",
  alternates: { canonical: "/work/mining" },
  openGraph: {
    title: "Mining & Resources | TANGISON STUDIO",
    description: "Corporate digital platforms for Namibia's mining sector. Safety portals, stakeholder dashboards, and compliance-grade interfaces. Case studies coming soon.",
    url: "/work/mining",
    images: [{ url: "/brand/favicon.webp", width: 499, height: 499, alt: "TANGISON STUDIO" }],
  },
};

export default function Page() {
  return (
    <IndustryComingSoonPage
      industry="Mining & Resources"
      description="Namibia's mining sector demands digital platforms that are as rigorous as the industry itself. We design safety management portals, stakeholder reporting dashboards, and compliance-grade interfaces that serve operational teams, executives, and regulatory bodies alike. Every interaction is engineered for clarity under pressure, accessible on-site connectivity, and strict adherence to industry standards."
      services={[
        "Safety management and incident reporting portals",
        "Stakeholder reporting and investor dashboards",
        "Compliance-grade interface design for regulatory submissions",
        "Internal operational tools for mine-site teams",
      ]}
      breadcrumb="Mining & Resources"
    />
  );
}
