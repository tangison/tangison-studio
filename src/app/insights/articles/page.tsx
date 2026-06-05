import type { Metadata } from "next";
import { ArticlesPage } from "./page-client";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Perspectives and educational content on applied AI, self-hosted infrastructure, and building technology solutions for African organizations and markets.",
  alternates: {
    canonical: "/insights/articles",
  },
  openGraph: {
    title: "Articles",
    description:
      "Perspectives and educational content on applied AI, self-hosted infrastructure, and building technology solutions for African organizations and markets.",
    url: "/insights/articles",
  },
};

export default function Page() {
  return <ArticlesPage />;
}
