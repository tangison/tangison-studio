import type { Metadata } from "next";
import { BlogPage } from "./page-client";

export const metadata: Metadata = {
  title: "Insights & Blog",
  description: "Perspectives on design, engineering, and building digital products in Africa. Articles, case studies, and resources from Tangison Studio in Windhoek, Namibia.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Insights & Blog | TANGISON STUDIO",
    description: "Perspectives on design, engineering, and building digital products in Africa. Articles, case studies, and resources from Tangison Studio in Windhoek, Namibia.",
    url: "/blog",
    images: [{ url: "/brand/favicon.webp", width: 499, height: 499, alt: "TANGISON STUDIO" }],
  },
};

export default function Page() {
  return <BlogPage />;
}
