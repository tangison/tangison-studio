import type { Metadata } from "next";
import { CaseStudiesPage } from "./page-client";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Real projects, real outcomes. Applied AI case studies from Tangison Studio showing how organizations deploy intelligent systems across African industries.",
  alternates: {
    canonical: "/insights/case-studies",
  },
  openGraph: {
    title: "Case Studies",
    description:
      "Real projects, real outcomes. Applied AI case studies from Tangison Studio showing how organizations deploy intelligent systems across African industries.",
    url: "/insights/case-studies",
  },
};

export default function Page() {
  return <CaseStudiesPage />;
}
