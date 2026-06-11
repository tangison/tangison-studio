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
    title: "Cookie Policy",
    description:
      "Tangison Studio cookie policy. Information about how and why we use cookies on studio.tangison.com to improve your experience and analyze site usage.",
    url: "/legal/cookies",
  },
};

export default function Page() {
  return <CookiePolicyPage />;
}
