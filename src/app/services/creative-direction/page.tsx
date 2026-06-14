import type { Metadata } from "next";
import { CreativeDirectionPage } from "./page-client";
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/tangison/json-ld";

export const metadata: Metadata = {
  title: "Creative Direction",
  description: "Strategic visual leadership. We set the direction and make sure every touchpoint lines up, from campaigns to full brand experiences.",
  alternates: { canonical: "/services/creative-direction" },
  openGraph: {
    title: "Creative Direction | TANGISON STUDIO",
    description: "Strategic visual leadership. We set the direction and make sure every touchpoint lines up, from campaigns to full brand experiences.",
    url: "/services/creative-direction",
    images: [{ url: "/images/services/creative-direction.webp", width: 1200, height: 630, alt: "Creative Direction service" }],
  },
};

export default function Page() {
  return (
    <>
      <ServiceJsonLd
        name="Creative Direction"
        description="Strategic creative vision. End-to-end creative leadership that aligns aesthetics with business objectives."
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
