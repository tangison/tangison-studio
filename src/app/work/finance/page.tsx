import type { Metadata } from "next";
import { IndustryComingSoonPage } from "../industry-template";

export const metadata: Metadata = {
  title: "Financial Services",
  description: "Secure fintech dashboards, banking portals, and micro-lending platforms engineered for compliance and accessibility. Case studies coming soon.",
  alternates: { canonical: "/work/finance" },
  openGraph: {
    title: "Financial Services | TANGISON STUDIO",
    description: "Secure fintech dashboards, banking portals, and micro-lending platforms engineered for compliance and accessibility. Case studies coming soon.",
    url: "/work/finance",
    images: [{ url: "/brand/favicon.webp", width: 499, height: 499, alt: "TANGISON STUDIO" }],
  },
};

export default function Page() {
  return (
    <IndustryComingSoonPage
      industry="Financial Services"
      description="Financial services demand digital platforms that are secure, compliant, and effortlessly clear. We design fintech dashboards, banking portals, and micro-lending platforms that meet the stringent requirements of Namibia's financial regulators while remaining accessible to users across the bandwidth spectrum. From transaction interfaces to risk reporting tools, every element is engineered for trust and precision."
      services={[
        "Fintech dashboards and analytics platforms",
        "Banking and micro-lending customer portals",
        "Compliance reporting and audit trail interfaces",
        "Secure transaction and payment flow design",
      ]}
      breadcrumb="Financial Services"
    />
  );
}
