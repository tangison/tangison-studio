import type { Metadata } from "next";
import { WorkPage } from "./page-client";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Websites, platforms, and digital products for organizations across Namibia and beyond. See what Tangison Studio has designed and built.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Our Work | TANGISON STUDIO",
    description:
      "Websites, platforms, and digital products for organizations across Namibia and beyond. See what Tangison Studio has designed and built.",
    url: "/work",
  },
};

export default function Page() {
  return <WorkPage />;
}
