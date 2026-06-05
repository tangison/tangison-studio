import type { Metadata } from "next";
import { ConsultingPage } from "./page-client";

export const metadata: Metadata = {
  title: "AI Consulting | TANGISON",
  description:
    "AI strategy, technology evaluation, implementation support, and team training. Practical guidance for organizations in Africa. By TANGISON.",
  alternates: {
    canonical: "/services/consulting",
  },
};

export default function Page() {
  return <ConsultingPage />;
}
