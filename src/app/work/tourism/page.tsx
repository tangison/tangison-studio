import type { Metadata } from "next";
import { IndustryComingSoonPage } from "../industry-template";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/tangison/json-ld";

export const metadata: Metadata = {
  title: "Tourism & Hospitality | Work | Tangison Studio",
  description: "Booking platforms, lodge websites, and safari brand systems for Namibia's tourism industry. Tangison Studio designs digital experiences from Windhoek.",
  alternates: { canonical: "/work/tourism" },
  openGraph: {
    title: "Tourism & Hospitality | Work | Tangison Studio",
    description: "Booking platforms, lodge websites, and safari brand systems for Namibia's tourism industry.",
    url: "/work/tourism",
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "/" },
        { name: "Work", url: "/work" },
        { name: "Tourism & Hospitality", url: "/work/tourism" },
      ]} />
      <WebPageJsonLd
        title="Tourism & Hospitality | Work"
        description="Booking platforms, lodge websites, and safari brand systems for Namibia's tourism industry."
        url="/work/tourism"
      />
      <IndustryComingSoonPage
        industry="Tourism & Hospitality"
        description="Namibia's tourism industry is one of the country's most visible exports, and its digital presence should match the grandeur of the landscape. We design immersive booking platforms, lodge and safari websites, and destination brand systems that connect international travellers to Namibia's extraordinary natural heritage. Every design is optimised for conversion, visual storytelling, and the unique bandwidth constraints of remote lodge locations."
        services={[
          "Lodge and safari camp booking websites",
          "Destination brand systems and visual identity",
          "Travel itinerary and tour management platforms",
          "Visitor experience design for hospitality touchpoints",
        ]}
        breadcrumb="Tourism & Hospitality"
      />
    </>
  );
}
