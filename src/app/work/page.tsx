import type { Metadata } from "next";
import { WorkPage } from "./page-client";

export const metadata: Metadata = {
  title: "Work — Coming Soon",
  description: "We are rebranding from Gemsweb Digital to Tangison Studio. Our portfolio and case studies are being assembled. Explore the industries we serve.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Work — Coming Soon",
    description: "We are rebranding from Gemsweb Digital to Tangison Studio. Our portfolio and case studies are being assembled. Explore the industries we serve.",
    url: "/work",
  },
};

export default function Page() {
  return <WorkPage />;
}
