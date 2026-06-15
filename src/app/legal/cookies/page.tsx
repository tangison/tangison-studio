import type { Metadata } from "next";
import { CookiePolicyPage } from "./page-client";
import { BreadcrumbJsonLd } from "@/components/tangison/json-ld";

export const metadata: Metadata = {
  title: "Cookie Policy | Tangison Studio",
  description: "Tangison Studio cookie policy. Information about how and why we use cookies on our website to improve your experience and analyze site usage.",
  alternates: { canonical: "/legal/cookies" },
  openGraph: {
    title: "Cookie Policy | TANGISON STUDIO",
    description: "Tangison Studio cookie policy. Information about how and why we use cookies on our website.",
    url: "/legal/cookies",
  },
};

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "/" },
        { name: "Cookie Policy", url: "/legal/cookies" },
      ]} />
      <CookiePolicyPage />
    </>
  );
}
