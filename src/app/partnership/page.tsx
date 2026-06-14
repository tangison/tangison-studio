import type { Metadata } from "next";
import { PartnershipPage } from "./page-client";

export const metadata: Metadata = {
  title: "Partnership Plans",
  description:
    "Keep your website live, your brand consistent, and your digital presence growing — with a Tangison Studio partnership plan. Care, Partner, or Studio Plus.",
  alternates: {
    canonical: "/partnership",
  },
  openGraph: {
    title: "Partnership Plans | TANGISON STUDIO",
    description:
      "Keep your website live, your brand consistent, and your digital presence growing — with a Tangison Studio partnership plan.",
    url: "/partnership",
    images: [
      {
        url: "/images/partnership/plan-partner.webp",
        width: 1344,
        height: 768,
        alt: "Tangison Studio Partnership Plans",
      },
    ],
  },
};

export default function Page() {
  return <PartnershipPage />;
}
