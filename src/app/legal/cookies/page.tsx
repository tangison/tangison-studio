import type { Metadata } from "next";
import { CookiePolicyPage } from "./page-client";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Tangison Studio cookie policy. Information about how and why we use cookies on studio.tangison.com to improve your experience and analyze site usage.",
  alternates: {
    canonical: "/legal/cookies",
  },
  openGraph: {
    title: "Cookie Policy | TANGISON STUDIO",
    description:
      "Tangison Studio cookie policy. Information about how and why we use cookies on studio.tangison.com to improve your experience and analyze site usage.",
    url: "/legal/cookies",
    images: [{ url: "/brand/favicon.webp", width: 499, height: 499, alt: "TANGISON STUDIO" }],
  },
};

export default function Page() {
  return <CookiePolicyPage />;
}
