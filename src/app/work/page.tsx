import type { Metadata } from "next";
import { WorkPage } from "./page-client";

export const metadata: Metadata = {
  title: "Our Work — Website Design Portfolio | Namibia",
  description:
    "Websites, platforms, and digital products designed and built by Tangison Studio for organizations across Namibia and beyond. Eight projects. Full case studies.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Our Work | TANGISON STUDIO",
    description:
      "Websites, platforms, and digital products designed and built by Tangison Studio for organizations across Namibia and beyond. Eight projects. Full case studies.",
    url: "/work",
    images: [{ url: "/brand/favicon.webp", width: 499, height: 499, alt: "TANGISON STUDIO" }],
  },
};

export default function Page() {
  return <WorkPage />;
}
