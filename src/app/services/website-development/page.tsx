import type { Metadata } from "next";
import { WebsiteDevelopmentPage } from "./page-client";

export const metadata: Metadata = {
  title: "Website Development — Tangison Studio",
  description: "Engineered to perform. Clean code, fast load times, and built to scale. We develop websites that deliver on every metric.",
  alternates: { canonical: "/services/website-development" },
  openGraph: {
    title: "Website Development — Tangison Studio",
    description: "Engineered to perform. Clean code, fast load times, and built to scale. We develop websites that deliver on every metric.",
    url: "/services/website-development",
  },
};

export default function Page() {
  return <WebsiteDevelopmentPage />;
}
