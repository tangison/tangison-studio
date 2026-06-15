import type { Metadata } from "next";
import { ServicesPage } from "./page-client";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/tangison/json-ld";

export const metadata: Metadata = {
  title: "Design & Development Services | Tangison Studio",
  description: "Seven disciplines. One studio. Website design, development, application design, product design, brand systems, design systems, and creative direction from Windhoek, Namibia.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Design & Development Services | TANGISON STUDIO",
    description: "Seven disciplines. One studio. Website design, development, application design, product design, brand systems, design systems, and creative direction from Windhoek, Namibia.",
    url: "/services",
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "/" },
        { name: "Services", url: "/services" },
      ]} />
      <WebPageJsonLd
        title="Design & Development Services"
        description="Seven disciplines. One studio. Website design, development, application design, product design, brand systems, design systems, and creative direction."
        url="/services"
      />
      <ServicesPage />
    </>
  );
}
