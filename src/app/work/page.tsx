import type { Metadata } from "next";
import { WorkPage } from "./page-client";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/tangison/json-ld";

export const metadata: Metadata = {
  title: "Our Work | Portfolio and Case Studies",
  description: "Explore our portfolio of digital experiences across nine industries in Africa. From SMEs and mining to healthcare and education, see how Tangison Studio delivers strategic, functional design from Windhoek, Namibia.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Our Work | Portfolio and Case Studies | TANGISON STUDIO",
    description: "Explore our portfolio of digital experiences across nine industries in Africa. From SMEs and mining to healthcare and education.",
    url: "/work",
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "/" },
        { name: "Work", url: "/work" },
      ]} />
      <WebPageJsonLd
        title="Our Work | Portfolio and Case Studies"
        description="Explore our portfolio of digital experiences across nine industries in Africa."
        url="/work"
      />
      <WorkPage />
    </>
  );
}
