import type { Metadata } from "next";
import { WorkPage } from "./page-client";

export const metadata: Metadata = {
  title: "Work | TANGISON STUDIO",
  description: "Case studies and projects from Tangison Studio. Digital experiences designed and built for organizations across Africa.",
  alternates: { canonical: "/work" },
};

export default function Page() {
  return <WorkPage />;
}
