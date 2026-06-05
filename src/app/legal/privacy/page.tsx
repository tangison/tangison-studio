import type { Metadata } from "next";
import { PrivacyPolicyPage } from "./page-client";

export const metadata: Metadata = {
  title: "Privacy Policy | TANGISON STUDIO",
  description: "Tangison Studio privacy policy. How we collect, use, and protect your personal information.",
  alternates: { canonical: "/legal/privacy" },
};

export default function Page() {
  return <PrivacyPolicyPage />;
}
