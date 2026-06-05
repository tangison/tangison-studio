import type { Metadata } from "next";
import { ResourcesPage } from "./page-client";

export const metadata: Metadata = {
  title: "Resources",
  description: "AI guides, frameworks, and industry-specific playbooks for organizations across Africa. Free downloads from Tangison Studio.",
  alternates: { canonical: "/resources" },
  openGraph: {
    title: "Resources",
    description: "AI guides, frameworks, and industry-specific playbooks for organizations across Africa. Free downloads from Tangison Studio.",
    url: "/resources",
  },
};

export default function Page() {
  return <ResourcesPage />;
}
