import type { Metadata } from "next";
import { CreativeDirectionPage } from "./page-client";
import { ServiceJsonLd, BreadcrumbJsonLd } from "@/components/tangison/json-ld";

export const metadata: Metadata = {
  title: "Creative Direction — Tangison Studio",
  description: "Strategic visual leadership. We set the direction and ensure every touchpoint aligns, from campaigns to brand experiences.",
  alternates: { canonical: "/services/creative-direction" },
  openGraph: {
    title: "Creative Direction — Tangison Studio",
    description: "Strategic visual leadership. We set the direction and ensure every touchpoint aligns, from campaigns to brand experiences.",
    url: "/services/creative-direction",
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
