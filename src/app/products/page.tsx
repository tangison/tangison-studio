import type { Metadata } from "next";
import { ProductsPage } from "./page-client";

export const metadata: Metadata = {
  title: "Products | TANGISON",
  description:
    "Self-hosted AI products by TANGISON. SkillsCamp offers 531+ agent skills. Tangison Agent runs autonomous operations. Zero cloud dependency. Built for Africa.",
  alternates: {
    canonical: "/products",
  },
};

export default function Page() {
  return <ProductsPage />;
}
