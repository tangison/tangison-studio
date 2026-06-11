import type { Metadata } from "next";
import { IndustryComingSoonPage } from "../industry-template";

export const metadata: Metadata = {
  title: "Education & EdTech — Work — Tangison Studio",
  description: "Learning management systems, AI education platforms, and academic portals designed for accessibility. Case studies coming soon.",
  alternates: { canonical: "/work/education" },
};

export default function Page() {
  return (
    <IndustryComingSoonPage
      industry="Education & EdTech"
      description="Education is the most leveraged investment any society can make, and digital platforms must serve learners wherever they are. We design learning management systems, AI-powered education platforms, and academic portals that are accessible across bandwidth-constrained environments, work on basic smartphones, and support multilingual content delivery. From primary school resources to professional upskilling, we build for the realities of African education."
      services={[
        "Learning management systems and course platforms",
        "AI-powered education and tutoring interfaces",
        "Academic institution portals and student services",
        "Professional development and upskilling platforms",
      ]}
      breadcrumb="Education & EdTech"
    />
  );
}
