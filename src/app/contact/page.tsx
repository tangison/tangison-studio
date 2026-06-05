import type { Metadata } from "next";
import { ContactPage } from "./page-client";

export const metadata: Metadata = {
  title: "Contact — Get in Touch",
  description:
    "Get in touch with TANGISON. We respond to every message within 48 hours. Contact our applied AI lab in Windhoek, Namibia for consulting, infrastructure, and custom AI solutions.",
  alternates: {
    canonical: "/contact",
  },
};

export default function Page() {
  return <ContactPage />;
}
