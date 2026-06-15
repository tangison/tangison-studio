import type { Metadata } from "next";
import { PrivacyPolicyPage } from "./page-client";
import { BreadcrumbJsonLd } from "@/components/tangison/json-ld";

export const metadata: Metadata = {
  title: "Privacy Policy | Tangison Studio",
  description: "Tangison Studio privacy policy. How we collect, use, and protect your personal information when you use our website and services.",
  alternates: { canonical: "/legal/privacy" },
  openGraph: {
    title: "Privacy Policy | TANGISON STUDIO",
    description: "Tangison Studio privacy policy. How we collect, use, and protect your personal information.",
    url: "/legal/privacy",
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "/" },
        { name: "Privacy Policy", url: "/legal/privacy" },
      ]} />
      <PrivacyPolicyPage />
    </>
  );
}
