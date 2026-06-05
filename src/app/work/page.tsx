import type { Metadata } from "next";
import { WorkPage } from "./page-client";

export const metadata: Metadata = {
  title: "Work",
  description: "Case studies and projects from Tangison Studio. Digital experiences designed and built for organizations across Africa.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Work",
    description: "Case studies and projects from Tangison Studio. Digital experiences designed and built for organizations across Africa.",
    url: "/work",
  },
};

export default function Page() {
  return <WorkPage />;
}
