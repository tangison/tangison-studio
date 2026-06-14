import type { Metadata } from "next";
import { ContactPage } from "./page-client";
import { LocalBusinessJsonLd, BreadcrumbJsonLd } from "@/components/tangison/json-ld";

export const metadata: Metadata = {
  title: "Contact Us — Start Your Digital Project | Windhoek, Namibia",
  description: "Get in touch with Tangison Studio to discuss your next digital project. We respond within 48 hours. Strategy, design, and engineering from Windhoek. Contact us today.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Us — Start Your Digital Project | TANGISON STUDIO",
    description: "Get in touch with Tangison Studio to discuss your next digital project. We respond within 48 hours. Strategy, design, and engineering from Windhoek. Contact us today.",
    url: "/contact",
    images: [{ url: "/brand/favicon.webp", width: 499, height: 499, alt: "TANGISON STUDIO" }],
  },
};

export default function Page() {
  return (
    <>
      <LocalBusinessJsonLd />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "/" },
        { name: "Contact", url: "/contact" },
      ]} />
      <ContactPage />
    </>
  );
}
