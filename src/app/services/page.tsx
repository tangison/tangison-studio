import type { Metadata } from "next";
import { ServicesPage } from "./page-client";

export const metadata: Metadata = {
  title: "Design & Development Services",
  description: "Seven disciplines, one studio. Website design, development, application design, product design, brand systems, design systems, and creative direction.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Design & Development Services | TANGISON STUDIO",
    description: "Seven disciplines, one studio. Website design, development, application design, product design, brand systems, design systems, and creative direction.",
    url: "/services",
    images: [{ url: "/brand/favicon.webp", width: 499, height: 499, alt: "TANGISON STUDIO" }],
  },
};

export default function Page() {
  return <ServicesPage />;
}
