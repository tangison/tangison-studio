import type { Metadata } from "next";
import { IndustryComingSoonPage } from "../industry-template";

export const metadata: Metadata = {
  title: "Tourism & Hospitality",
  description: "Booking platforms, lodge websites, and safari brand systems for Namibia's tourism and hospitality industry. Case studies coming soon.",
  alternates: { canonical: "/work/tourism" },
  openGraph: {
    title: "Tourism & Hospitality | TANGISON STUDIO",
    description: "Booking platforms, lodge websites, and safari brand systems for Namibia's tourism and hospitality industry. Case studies coming soon.",
    url: "/work/tourism",
    images: [{ url: "/brand/favicon.webp", width: 499, height: 499, alt: "TANGISON STUDIO" }],
  },
};

export default function Page() {
  return (
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
  );
}
