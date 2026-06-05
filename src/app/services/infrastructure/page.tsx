import type { Metadata } from "next";
import { InfrastructurePage } from "./page-client";

export const metadata: Metadata = {
  title: "AI Infrastructure | TANGISON",
  description:
    "Agent orchestration, automation pipelines, deployment, and monitoring for production AI. Built for African environments by TANGISON.",
  alternates: {
    canonical: "/services/infrastructure",
  },
};

export default function Page() {
  return <InfrastructurePage />;
}
