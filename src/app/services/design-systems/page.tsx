import type { Metadata } from "next";
import { DesignSystemsPage } from "./page-client";

export const metadata: Metadata = {
  title: "Design Systems — Tangison Studio",
  description: "Scalable component architecture. One source of truth for your entire product. We build design systems that unify teams and accelerate delivery.",
  alternates: { canonical: "/services/design-systems" },
  openGraph: {
    title: "Design Systems — Tangison Studio",
    description: "Scalable component architecture. One source of truth for your entire product. We build design systems that unify teams and accelerate delivery.",
    url: "/services/design-systems",
  },
};

export default function Page() {
  return <DesignSystemsPage />;
}
