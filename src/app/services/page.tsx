import type { Metadata } from "next";
import { ServicesPage } from "./page-client";

export const metadata: Metadata = {
  title: "Services | TANGISON",
  description:
    "We build custom AI systems, deploy self-hosted infrastructure, and provide independent consulting for organizations across Africa.",
  alternates: {
    canonical: "/services",
  },
};

export default function Page() {
  return <ServicesPage />;
}
