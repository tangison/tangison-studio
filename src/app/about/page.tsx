import type { Metadata } from "next";
import { AboutPage } from "./page-client";

export const metadata: Metadata = {
  title: "About — Applied AI Lab in Namibia",
  description:
    "We are an applied AI laboratory in Windhoek, Namibia. We research, build, and deploy intelligent systems and products designed for African business conditions, infrastructure, and operational needs.",
  alternates: {
    canonical: "/about",
  },
};

export default function Page() {
  return <AboutPage />;
}
