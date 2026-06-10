import type { Metadata } from "next";
import { FAQPage } from "./page-client";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about working with Tangison Studio. Learn about our design process, project pricing, timelines, and how we engage with organizations across Africa.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ | TANGISON STUDIO",
    description: "Frequently asked questions about working with Tangison Studio. Learn about our design process, project pricing, timelines, and how we engage with organizations across Africa.",
    url: "/faq",
  },
};

export default function Page() {
  return <FAQPage />;
}
