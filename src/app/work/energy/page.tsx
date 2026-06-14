import type { Metadata } from "next";
import { IndustryComingSoonPage } from "../industry-template";

export const metadata: Metadata = {
  title: "Energy & Utilities",
  description: "Renewable energy dashboards, utility customer portals, and infrastructure monitoring interfaces for the energy sector. Case studies coming soon.",
  alternates: { canonical: "/work/energy" },
  openGraph: {
    title: "Energy & Utilities | TANGISON STUDIO",
    description: "Renewable energy dashboards, utility customer portals, and infrastructure monitoring interfaces for the energy sector. Case studies coming soon.",
    url: "/work/energy",
    images: [{ url: "/brand/favicon.webp", width: 499, height: 499, alt: "TANGISON STUDIO" }],
  },
};

export default function Page() {
  return (
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
  );
}
