import type { Metadata } from "next";
import { AboutPage } from "./page-client";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/tangison/json-ld";

export const metadata: Metadata = {
  title: "About Tangison Studio | Creative Digital Agency in Namibia",
  description: "Tangison Studio is a creative digital agency in Windhoek, Namibia. Founded by Tangi Iigonda in 2023 as Gemsweb Digital. We design and build digital experiences that move ideas forward.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Tangison Studio | Creative Digital Agency in Namibia",
    description: "Tangison Studio is a creative digital agency in Windhoek, Namibia. Founded by Tangi Iigonda in 2023 as Gemsweb Digital.",
    url: "/about",
    images: [{ url: "/brand/favicon.webp", width: 499, height: 499, alt: "TANGISON STUDIO" }],
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "/" },
        { name: "About", url: "/about" },
      ]} />
      <WebPageJsonLd
        title="About Tangison Studio"
        description="Tangison Studio is a creative digital agency in Windhoek, Namibia. Founded by Tangi Iigonda in 2023 as Gemsweb Digital."
        url="/about"
      />
      <AboutPage />
    </>
  );
}
