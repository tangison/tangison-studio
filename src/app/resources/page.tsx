import type { Metadata } from "next";
import { ResourcesPage } from "./page-client";

export const metadata: Metadata = {
  title: "Resources & Guides",
  description: "AI guides, frameworks, and industry-specific playbooks for organizations across Africa. Free downloads and practical resources from Tangison Studio.",
  alternates: { canonical: "/resources" },
  openGraph: {
    title: "Resources & Guides | TANGISON STUDIO",
    description: "AI guides, frameworks, and industry-specific playbooks for organizations across Africa. Free downloads and practical resources from Tangison Studio.",
    url: "/resources",
  },
};

export default function Page() {
  return <ResourcesPage />;
}
