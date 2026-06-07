import type { Metadata } from "next";
import { ProductDesignPage } from "./page-client";

export const metadata: Metadata = {
  title: "Product Design — Tangison Studio",
  description: "End-to-end product thinking. From concept to launch and beyond, we design products that solve real problems and create lasting value.",
  alternates: { canonical: "/services/product-design" },
  openGraph: {
    title: "Product Design — Tangison Studio",
    description: "End-to-end product thinking. From concept to launch and beyond, we design products that solve real problems and create lasting value.",
    url: "/services/product-design",
  },
};

export default function Page() {
  return <ProductDesignPage />;
}
