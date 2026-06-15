import type { Metadata } from "next";
import { CreativeDirectionPage } from "./page-client";
import { ServiceJsonLd, BreadcrumbJsonLd, WebPageJsonLd } from "@/components/tangison/json-ld";

export const metadata: Metadata = {
  title: "Creative Direction | Tangison Studio",
  description: "Strategic visual leadership. We set the direction and make sure every touchpoint lines up, from campaigns to full brand experiences.",
  alternates: { canonical: "/services/creative-direction" },
  openGraph: {
    title: "Creative Direction | Tangison Studio",
    description: "Strategic visual leadership. We set the direction and make sure every touchpoint lines up, from campaigns to full brand experiences.",
    url: "/services/creative-direction",
    images: [{ url: "/images/services/creative-direction.webp", width: 1200, height: 630, alt: "Creative Direction service" }],
  },
};

export default function Page() {
  return (
    <>
      <WebPageJsonLd
        title="Creative Direction | Tangison Studio"
        description="Strategic visual leadership. We set the direction and make sure every touchpoint lines up, from campaigns to full brand experiences."
        url="/services/creative-direction"
      />
      <ServiceJsonLd
        name="Creative Direction"
        description="Strategic creative vision. Complete creative leadership that aligns aesthetics with business objectives."
        slug="creative-direction"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
          { name: "Creative Direction", url: "/services/creative-direction" },
        ]}
      />
      <CreativeDirectionPage />
    </>
  );
}
