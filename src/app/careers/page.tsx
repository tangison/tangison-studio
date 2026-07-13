import type { Metadata } from "next";
import { CareersPage } from "./page-client";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/tangison/json-ld";

export const metadata: Metadata = {
  title: "Careers | Tangison Studio",
  description: "Join Tangison Studio. Open positions and opportunities in Windhoek, Namibia for designers and developers who care about craft, thinking, and quality.",
  alternates: { canonical: "/careers" },
  openGraph: {
    title: "Careers | Studio",
    description: "Join Tangison Studio. Open positions and opportunities in Windhoek, Namibia for designers and developers.",
    url: "/careers",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Studio" }],
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "/" },
        { name: "Careers", url: "/careers" },
      ]} />
      <WebPageJsonLd
        title="Careers | Tangison Studio"
        description="Join Tangison Studio. Open positions and opportunities in Windhoek, Namibia."
        url="/careers"
      />
      <CareersPage />
    </>
  );
}
