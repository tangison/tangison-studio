import type { Metadata } from "next";
import { CareersPage } from "./page-client";

export const metadata: Metadata = {
  title: "Careers at Tangison Studio — Design & Development Roles in Windhoek",
  description: "Join Tangison Studio. Open positions and opportunities in Windhoek, Namibia for designers and developers who care about craft, thinking, and quality.",
  alternates: { canonical: "/careers" },
  openGraph: {
    title: "Careers | TANGISON STUDIO",
    description: "Join Tangison Studio. Open positions and opportunities in Windhoek, Namibia for designers and developers who care about craft, thinking, and quality.",
    url: "/careers",
    images: [{ url: "/brand/favicon.webp", width: 499, height: 499, alt: "TANGISON STUDIO" }],
  },
};

export default function Page() {
  return <CareersPage />;
}
