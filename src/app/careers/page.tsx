import type { Metadata } from "next";
import { CareersPage } from "./page-client";

export const metadata: Metadata = {
  title: "Careers | TANGISON STUDIO",
  description: "Join Tangison Studio. Open positions and opportunities in Windhoek, Namibia for designers and developers.",
  alternates: { canonical: "/careers" },
};

export default function Page() {
  return <CareersPage />;
}
