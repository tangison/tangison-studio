import type { Metadata } from "next";
import { BlogPage } from "./page-client";

export const metadata: Metadata = {
  title: "Blog | TANGISON STUDIO",
  description: "Perspectives on design, engineering, and building digital products in Africa from Tangison Studio.",
  alternates: { canonical: "/blog" },
};

export default function Page() {
  return <BlogPage />;
}
