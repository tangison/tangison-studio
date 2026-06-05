import type { Metadata } from "next";
import { ContactPage } from "./page-client";

export const metadata: Metadata = {
  title: "Contact — Start a Project",
  description: "Get in touch with Tangison Studio. We respond to every message within 48 hours. Let's build something together.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — Start a Project",
    description: "Get in touch with Tangison Studio. We respond to every message within 48 hours. Let's build something together.",
    url: "/contact",
  },
};

export default function Page() {
  return <ContactPage />;
}
