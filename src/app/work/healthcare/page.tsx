import type { Metadata } from "next";
import { IndustryComingSoonPage } from "../industry-template";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/tangison/json-ld";

export const metadata: Metadata = {
  title: "Healthcare & Wellness | Work | Tangison Studio",
  description: "Patient portals, telemedicine interfaces, and health information systems built with accessibility and care. Tangison Studio designs healthcare digital products from Windhoek, Namibia.",
  alternates: { canonical: "/work/healthcare" },
  openGraph: {
    title: "Healthcare & Wellness | Work | Tangison Studio",
    description: "Patient portals, telemedicine interfaces, and health information systems built with accessibility and care.",
    url: "/work/healthcare",
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "/" },
        { name: "Work", url: "/work" },
        { name: "Healthcare & Wellness", url: "/work/healthcare" },
      ]} />
      <WebPageJsonLd
        title="Healthcare & Wellness | Work"
        description="Patient portals, telemedicine interfaces, and health information systems built with accessibility and care."
        url="/work/healthcare"
      />
      <IndustryComingSoonPage
        industry="Healthcare & Wellness"
        description="Healthcare platforms carry a unique responsibility. They serve people at their most vulnerable, and every design decision impacts wellbeing. We design patient portals, telemedicine interfaces, and health information systems that prioritise accessibility, privacy, and clarity above all else. Our work in this sector is guided by the understanding that healthcare technology must work reliably for everyone, including those with limited digital literacy and intermittent connectivity."
        services={[
          "Patient portal and health record interfaces",
          "Telemedicine and virtual consultation platforms",
          "Health information and public health dashboards",
          "Clinic and facility management systems",
        ]}
        breadcrumb="Healthcare & Wellness"
      />
    </>
  );
}
