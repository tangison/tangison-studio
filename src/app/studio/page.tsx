import type { Metadata } from "next";
import { StudioPage } from "./page-client";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/tangison/json-ld";

export const metadata: Metadata = {
  title: "The Studio | Tangison Studio",
  description: "Inside Tangison Studio: a creative digital agency in Windhoek, Namibia. Our space, our tools, our philosophy. Founded by Tangi Iigonda in 2023.",
  alternates: { canonical: "/studio" },
  openGraph: {
    title: "The Studio | TANGISON STUDIO",
    description: "Inside Tangison Studio: a creative digital agency in Windhoek, Namibia. Our space, our tools, our philosophy.",
    url: "/studio",
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "/" },
        { name: "The Studio", url: "/studio" },
      ]} />
      <WebPageJsonLd
        title="The Studio | Tangison Studio"
        description="Inside Tangison Studio: a creative digital agency in Windhoek, Namibia."
        url="/studio"
      />
      <StudioPage />
    </>
  );
}
