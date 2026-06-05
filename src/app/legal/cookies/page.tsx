import type { Metadata } from "next";
import { CookiePolicyPage } from "./page-client";

export const metadata: Metadata = {
  title: "Cookie Policy | TANGISON",
  description:
    "TANGISON cookie policy. Information about how and why we use cookies on tangison.com to improve your experience and analyze site usage.",
  alternates: {
    canonical: "/legal/cookies",
  },
};

export default function Page() {
  return <CookiePolicyPage />;
}
