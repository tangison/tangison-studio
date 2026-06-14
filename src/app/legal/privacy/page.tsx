import type { Metadata } from "next";
import { PrivacyPolicyPage } from "./page-client";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Tangison Studio privacy policy. How we collect, use, store, and protect your personal information when you use our website and services.",
  alternates: { canonical: "/legal/privacy" },
  openGraph: {
    title: "Privacy Policy | TANGISON STUDIO",
    description: "Tangison Studio privacy policy. How we collect, use, store, and protect your personal information when you use our website and services.",
    url: "/legal/privacy",
    images: [{ url: "/brand/favicon.webp", width: 499, height: 499, alt: "TANGISON STUDIO" }],
  },
};

export default function Page() {
  return <PrivacyPolicyPage />;
}
