import type { Metadata } from "next";
import { HomePage } from "./page-client";
import { WebPageJsonLd } from "@/components/tangison/json-ld";

export const metadata: Metadata = {
  title: "TANGISON STUDIO | Creative Digital Agency in Namibia",
  description:
    "Tangison Studio is a Windhoek-based digital agency. Website design, development, brand systems, and creative direction for organizations across Africa.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TANGISON STUDIO | Creative Digital Agency in Namibia",
    description:
      "Tangison Studio is a Windhoek-based digital agency. Website design, development, brand systems, and creative direction for organizations across Africa.",
    url: "/",
    images: [{ url: "/brand/favicon.webp", width: 499, height: 499, alt: "TANGISON STUDIO" }],
  },
};

export default function Page() {
  return (
    <>
      <WebPageJsonLd
        title="TANGISON STUDIO | Creative Digital Agency in Namibia"
        description="Tangison Studio designs and builds websites, brand systems, and digital products for organizations across Africa."
        url="/"
      />
      <HomePage />
    </>
  );
}
