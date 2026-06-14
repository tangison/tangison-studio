import type { Metadata } from "next";
import { WorkPage } from "./page-client";

export const metadata: Metadata = {
  title: "Our Work | Tangison Studio",
  description:
    "Websites, platforms, and digital products designed and built by Tangison Studio for organizations across Namibia and beyond. Eight projects. Full case studies.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Our Work | Tangison Studio",
    description:
      "Websites, platforms, and digital products designed and built by Tangison Studio for organizations across Namibia and beyond. Eight projects. Full case studies.",
    url: "/work",
  },
};

export default function Page() {
  return <WorkPage />;
}
