import type { Metadata } from "next";
import { IndustryComingSoonPage } from "../industry-template";

export const metadata: Metadata = {
  title: "SMEs & Startups",
  description: "Brand systems, websites, and product design for small and medium enterprises across Africa and Namibia. Case studies coming soon.",
  alternates: { canonical: "/work/smes" },
  openGraph: {
    title: "SMEs & Startups | TANGISON STUDIO",
    description: "Brand systems, websites, and product design for small and medium enterprises across Africa and Namibia. Case studies coming soon.",
    url: "/work/smes",
    images: [{ url: "/brand/favicon.webp", width: 499, height: 499, alt: "TANGISON STUDIO" }],
  },
};

export default function Page() {
  return (
    <IndustryComingSoonPage
      industry="SMEs & Startups"
      description="Small and medium enterprises are the backbone of Africa's economy. From first-time founders establishing their brand identity to growth-stage ventures scaling their digital products, we work alongside SMEs to create digital experiences that are intentional, accessible, and built to perform in real-world conditions, including low-bandwidth environments and mobile-first audiences."
      services={[
        "Brand identity systems for new ventures and rebrands",
        "Marketing websites optimised for conversion and speed",
        "Product design for early-stage digital tools and platforms",
        "Design systems that scale with growing teams",
      ]}
      breadcrumb="SMEs & Startups"
    />
  );
}
