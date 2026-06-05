import type { Metadata } from "next";
import { TermsPage } from "./page-client";

export const metadata: Metadata = {
  title: "Terms of Service | TANGISON STUDIO",
  description: "Terms of service for Tangison Studio. Using our services and website.",
  alternates: { canonical: "/legal/terms" },
};

export default function Page() {
  return <TermsPage />;
}
