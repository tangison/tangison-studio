import type { Metadata } from "next";
import { IndustryComingSoonPage } from "../industry-template";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/tangison/json-ld";

export const metadata: Metadata = {
  title: "Mining & Resources | Work | Tangison Studio",
  description: "Corporate digital platforms for Namibia's mining sector. Safety portals, stakeholder dashboards, and compliance-grade interfaces built by Tangison Studio in Windhoek.",
  alternates: { canonical: "/work/mining" },
  openGraph: {
    title: "Mining & Resources | Work | Tangison Studio",
    description: "Corporate digital platforms for Namibia's mining sector. Safety portals, stakeholder dashboards, and compliance-grade interfaces.",
    url: "/work/mining",
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "/" },
        { name: "Work", url: "/work" },
        { name: "Mining & Resources", url: "/work/mining" },
      ]} />
      <WebPageJsonLd
        title="Mining & Resources | Work"
        description="Corporate digital platforms for Namibia's mining sector. Safety portals, stakeholder dashboards, and compliance-grade interfaces."
        url="/work/mining"
      />
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
    </>
  );
}
