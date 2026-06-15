import type { Metadata } from "next";
import { TermsOfServicePage } from "./page-client";
import { BreadcrumbJsonLd } from "@/components/tangison/json-ld";

export const metadata: Metadata = {
  title: "Terms of Service | Tangison Studio",
  description: "Terms of service for Tangison Studio. Using our services and website.",
  alternates: { canonical: "/legal/terms" },
  openGraph: {
    title: "Terms of Service | TANGISON STUDIO",
    description: "Terms of service for Tangison Studio. Using our services and website.",
    url: "/legal/terms",
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "/" },
        { name: "Terms of Service", url: "/legal/terms" },
      ]} />
      <TermsOfServicePage />
    </>
  );
}
