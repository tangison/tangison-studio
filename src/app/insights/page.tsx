import type { Metadata } from "next";
import { InsightsPage } from "./page-client";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Perspectives on AI, engineering, and building in Africa. Read articles and case studies from Tangison Studio on applied intelligence, infrastructure, and product development.",
  alternates: {
    canonical: "/insights",
  },
  openGraph: {
    title: "Insights",
    description:
      "Perspectives on AI, engineering, and building in Africa. Read articles and case studies from Tangison Studio on applied intelligence, infrastructure, and product development.",
    url: "/insights",
  },
};

export default function Page() {
  return <InsightsPage />;
}
