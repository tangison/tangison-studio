import type { Metadata } from "next";
import { IndustryComingSoonPage } from "../industry-template";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/tangison/json-ld";

export const metadata: Metadata = {
  title: "SMEs & Startups | Work | Tangison Studio",
  description: "Brand systems, websites, and product design for small and medium enterprises across Africa. Tangison Studio helps startups build their digital presence from Windhoek, Namibia.",
  alternates: { canonical: "/work/smes" },
  openGraph: {
    title: "SMEs & Startups | Work | Tangison Studio",
    description: "Brand systems, websites, and product design for small and medium enterprises across Africa.",
    url: "/work/smes",
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "/" },
        { name: "Work", url: "/work" },
        { name: "SMEs & Startups", url: "/work/smes" },
      ]} />
      <WebPageJsonLd
        title="SMEs & Startups | Work"
        description="Brand systems, websites, and product design for small and medium enterprises across Africa."
        url="/work/smes"
      />
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
    </>
  );
}
