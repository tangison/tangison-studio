import type { Metadata } from "next";
import { CareersPage } from "./page-client";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join Tangison Studio. Open positions and opportunities in Windhoek, Namibia for designers and developers.",
  alternates: { canonical: "/careers" },
  openGraph: {
    title: "Careers",
    description: "Join Tangison Studio. Open positions and opportunities in Windhoek, Namibia for designers and developers.",
    url: "/careers",
  },
};

export default function Page() {
  return <CareersPage />;
}
