import type { Metadata } from "next";
import { IndustryComingSoonPage } from "../industry-template";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/tangison/json-ld";

export const metadata: Metadata = {
  title: "Energy & Utilities | Work | Tangison Studio",
  description: "Renewable energy dashboards, utility customer portals, and infrastructure monitoring interfaces for Namibia's energy sector. Built by Tangison Studio in Windhoek.",
  alternates: { canonical: "/work/energy" },
  openGraph: {
    title: "Energy & Utilities | Work | Tangison Studio",
    description: "Renewable energy dashboards, utility customer portals, and infrastructure monitoring interfaces for Namibia's energy sector.",
    url: "/work/energy",
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "/" },
        { name: "Work", url: "/work" },
        { name: "Energy & Utilities", url: "/work/energy" },
      ]} />
      <WebPageJsonLd
        title="Energy & Utilities | Work"
        description="Renewable energy dashboards, utility customer portals, and infrastructure monitoring interfaces for Namibia's energy sector."
        url="/work/energy"
      />
      <IndustryComingSoonPage
        industry="Energy & Utilities"
        description="Namibia's energy sector is evolving rapidly, with renewable energy projects and infrastructure modernisation driving demand for sophisticated digital platforms. We design renewable energy monitoring dashboards, utility customer portals, and infrastructure management interfaces that serve engineers, operators, and end consumers. Our designs balance technical depth with usability, so complex data is always presented with clarity and purpose."
        services={[
          "Renewable energy monitoring and analytics dashboards",
          "Utility customer self-service portals",
          "Infrastructure and grid management interfaces",
          "Compliance reporting for energy regulators",
        ]}
        breadcrumb="Energy & Utilities"
      />
    </>
  );
}
