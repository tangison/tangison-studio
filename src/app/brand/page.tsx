import type { Metadata } from "next";
import BrandPage from "./page-client";

export const metadata: Metadata = {
  title: "Brand Identity",
  description:
    "The Tangison Studio brand system — identity mark, wordmark, color system, typography, motion, and design rules. For partners, designers, and collaborators.",
  alternates: {
    canonical: "/brand",
  },
  openGraph: {
    title: "Brand Identity",
    description:
      "The Tangison Studio brand system — identity mark, wordmark, color system, typography, motion, and design rules. For partners, designers, and collaborators.",
    url: "/brand",
  },
};

export default function Page() {
  return <BrandPage />;
}
