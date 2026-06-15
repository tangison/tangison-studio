import type { Metadata } from "next";
import { IndustryComingSoonPage } from "../industry-template";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/tangison/json-ld";

export const metadata: Metadata = {
  title: "Financial Services | Work | Tangison Studio",
  description: "Secure fintech dashboards, banking portals, and micro-lending platforms engineered for compliance and accessibility. Built by Tangison Studio in Windhoek, Namibia.",
  alternates: { canonical: "/work/finance" },
  openGraph: {
    title: "Financial Services | Work | Tangison Studio",
    description: "Secure fintech dashboards, banking portals, and micro-lending platforms engineered for compliance and accessibility.",
    url: "/work/finance",
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "/" },
        { name: "Work", url: "/work" },
        { name: "Financial Services", url: "/work/finance" },
      ]} />
      <WebPageJsonLd
        title="Financial Services | Work"
        description="Secure fintech dashboards, banking portals, and micro-lending platforms engineered for compliance and accessibility."
        url="/work/finance"
      />
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
    </>
  );
}
