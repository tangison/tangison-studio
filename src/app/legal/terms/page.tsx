import type { Metadata } from "next";
import { TermsOfServicePage } from "./page-client";

export const metadata: Metadata = {
  title: "Terms of Service | TANGISON",
  description:
    "TANGISON terms of service. By using tangison.com and our services, you agree to these terms governing your relationship with TANGISON.",
  alternates: {
    canonical: "/legal/terms",
  },
};

export default function Page() {
  return <TermsOfServicePage />;
}
