import type { Metadata } from "next";
import { ContactPage } from "./page-client";

export const metadata: Metadata = {
  title: "Contact — Start a Project",
  description: "Get in touch with Tangison Studio to discuss your next digital project. We respond to every message within 48 hours. Strategy, design, and engineering from Windhoek, Namibia.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — Start a Project | TANGISON STUDIO",
    description: "Get in touch with Tangison Studio to discuss your next digital project. We respond to every message within 48 hours. Strategy, design, and engineering from Windhoek, Namibia.",
    url: "/contact",
  },
};

export default function Page() {
  return <ContactPage />;
}
