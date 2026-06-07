import type { Metadata } from "next";
import { WebsiteDesignPage } from "./page-client";

export const metadata: Metadata = {
  title: "Website Design — Tangison Studio",
  description: "Intentional interfaces. We design websites that communicate clearly, convert effectively, and represent your brand with precision.",
  alternates: { canonical: "/services/website-design" },
  openGraph: {
    title: "Website Design — Tangison Studio",
    description: "Intentional interfaces. We design websites that communicate clearly, convert effectively, and represent your brand with precision.",
    url: "/services/website-design",
  },
};

export default function Page() {
  return <WebsiteDesignPage />;
}
