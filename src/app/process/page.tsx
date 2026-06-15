import type { Metadata } from "next";
import { ProcessPage } from "./page-client";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/tangison/json-ld";

export const metadata: Metadata = {
  title: "Our Design Process | Tangison Studio",
  description: "Our five-phase design process: Discover, Define, Design, Develop, Launch. Every Tangison Studio project is grounded in research and built to deliver measurable outcomes from Windhoek, Namibia.",
  alternates: { canonical: "/process" },
  openGraph: {
    title: "Our Design Process | TANGISON STUDIO",
    description: "Our five-phase design process: Discover, Define, Design, Develop, Launch. Every project is grounded in research and built to deliver measurable outcomes.",
    url: "/process",
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "/" },
        { name: "Process", url: "/process" },
      ]} />
      <WebPageJsonLd
        title="Our Design Process | Tangison Studio"
        description="Our five-phase design process: Discover, Define, Design, Develop, Launch."
        url="/process"
      />
      <ProcessPage />
    </>
  );
}
