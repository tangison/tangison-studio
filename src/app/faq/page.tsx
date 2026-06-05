import type { Metadata } from "next";
import { FAQPage } from "./page-client";

export const metadata: Metadata = {
  title: "FAQ | TANGISON STUDIO",
  description: "Frequently asked questions about working with Tangison Studio. Process, pricing, timelines, and more.",
  alternates: { canonical: "/faq" },
};

export default function Page() {
  return <FAQPage />;
}
