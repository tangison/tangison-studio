import type { Metadata } from "next";
import { HomePage } from "./page-client";
import { WebPageJsonLd } from "@/components/tangison/json-ld";

export const metadata: Metadata = {
  title: "TANGISON STUDIO | Creative Digital Agency in Namibia",
  description:
    "Tangison Studio designs and builds websites, brand systems, and digital products for organizations across Africa. Website design, development, and creative direction from Windhoek, Namibia.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TANGISON STUDIO | Creative Digital Agency in Namibia",
    description:
      "Tangison Studio designs and builds websites, brand systems, and digital products for organizations across Africa. From Windhoek, Namibia.",
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
