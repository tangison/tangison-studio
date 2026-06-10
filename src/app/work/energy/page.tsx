import type { Metadata } from "next";
import { IndustryComingSoonPage } from "../industry-template";

export const metadata: Metadata = {
  title: "Energy & Utilities — Work — Tangison Studio",
  description: "Renewable energy dashboards, utility customer portals, and infrastructure monitoring interfaces. Case studies coming soon.",
  alternates: { canonical: "/work/energy" },
};

export default function Page() {
  return (
    <IndustryComingSoonPage
      industry="Energy & Utilities"
      description="Namibia's energy sector is evolving rapidly, with renewable energy projects and infrastructure modernisation driving demand for sophisticated digital platforms. We design renewable energy monitoring dashboards, utility customer portals, and infrastructure management interfaces that serve engineers, operators, and end consumers. Our designs balance technical depth with usability, ensuring complex data is always presented with clarity and purpose."
      services={[
        "Renewable energy monitoring and analytics dashboards",
        "Utility customer self-service portals",
        "Infrastructure and grid management interfaces",
        "Compliance reporting for energy regulators",
      ]}
      breadcrumb="Energy & Utilities"
    />
  );
}
