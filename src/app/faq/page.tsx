import type { Metadata } from "next";
import { FAQPage } from "./page-client";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about working with Tangison Studio. Process, pricing, timelines, and more.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ",
    description: "Frequently asked questions about working with Tangison Studio. Process, pricing, timelines, and more.",
    url: "/faq",
  },
};

export default function Page() {
  return <FAQPage />;
}
