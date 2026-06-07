import type { Metadata } from "next";
import { CreativeDirectionPage } from "./page-client";

export const metadata: Metadata = {
  title: "Creative Direction — Tangison Studio",
  description: "Strategic visual leadership. We set the direction and ensure every touchpoint aligns, from campaigns to brand experiences.",
  alternates: { canonical: "/services/creative-direction" },
  openGraph: {
    title: "Creative Direction — Tangison Studio",
    description: "Strategic visual leadership. We set the direction and ensure every touchpoint aligns, from campaigns to brand experiences.",
    url: "/services/creative-direction",
  },
};

export default function Page() {
  return <CreativeDirectionPage />;
}
