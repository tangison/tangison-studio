import type { Metadata } from "next";
import { TermsOfServicePage } from "./page-client";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for Tangison Studio. Using our services and website.",
  alternates: { canonical: "/legal/terms" },
  openGraph: {
    title: "Terms of Service",
    description: "Terms of service for Tangison Studio. Using our services and website.",
    url: "/legal/terms",
  },
};

export default function Page() {
  return <TermsOfServicePage />;
}
