import type { Metadata } from "next";
import { ServicesPage } from "./page-client";

export const metadata: Metadata = {
  title: "Services | TANGISON STUDIO",
  description: "Seven disciplines. One studio. Website design, development, application design, product design, brand systems, design systems, and creative direction.",
  alternates: { canonical: "/services" },
};

export default function Page() {
  return <ServicesPage />;
}
