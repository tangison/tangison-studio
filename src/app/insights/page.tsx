import type { Metadata } from "next";
import { InsightsPage } from "./page-client";

export const metadata: Metadata = {
  title: "Insights | TANGISON",
  description:
    "Perspectives on AI, engineering, and building in Africa. Read articles and case studies from TANGISON on applied intelligence, infrastructure, and product development.",
  alternates: {
    canonical: "/insights",
  },
};

export default function Page() {
  return <InsightsPage />;
}
