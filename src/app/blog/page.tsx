import type { Metadata } from "next";
import { BlogPage } from "./page-client";

export const metadata: Metadata = {
  title: "Blog",
  description: "Perspectives on design, engineering, and building digital products in Africa from Tangison Studio.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog",
    description: "Perspectives on design, engineering, and building digital products in Africa from Tangison Studio.",
    url: "/blog",
  },
};

export default function Page() {
  return <BlogPage />;
}
