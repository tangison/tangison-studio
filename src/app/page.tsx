import type { Metadata } from "next";
import { HomePage } from "./page-client";

export const metadata: Metadata = {
  title: "TANGISON | Applied AI Laboratory",
  description:
    "We build AI systems that solve real business problems for African organizations. Custom agents. Self-hosted infrastructure. Applied research. Windhoek, Namibia.",
  alternates: {
    canonical: "/",
  },
};

export default function Page() {
  return <HomePage />;
}
