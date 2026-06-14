import type { Metadata } from "next";
import { TermsOfServicePage } from "./page-client";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for Tangison Studio. Rules and guidelines for using our website, services, and digital products from Windhoek, Namibia.",
  alternates: { canonical: "/legal/terms" },
  openGraph: {
    title: "Terms of Service | TANGISON STUDIO",
    description: "Terms of service for Tangison Studio. Rules and guidelines for using our website, services, and digital products from Windhoek, Namibia.",
    url: "/legal/terms",
    images: [{ url: "/brand/favicon.webp", width: 499, height: 499, alt: "TANGISON STUDIO" }],
  },
};

export default function Page() {
  return <TermsOfServicePage />;
}
