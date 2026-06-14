import type { Metadata } from "next";
import { ProcessPage } from "./page-client";

export const metadata: Metadata = {
  title: "Our Design Process",
  description: "Our five-phase design process: Discover, Define, Design, Develop, Launch. Every project is grounded in research and built to deliver measurable outcomes.",
  alternates: { canonical: "/process" },
  openGraph: {
    title: "Our Design Process | TANGISON STUDIO",
    description: "Our five-phase design process: Discover, Define, Design, Develop, Launch. Every project is grounded in research and built to deliver measurable outcomes.",
    url: "/process",
    images: [{ url: "/brand/favicon.webp", width: 499, height: 499, alt: "TANGISON STUDIO" }],
  },
};

export default function Page() {
  return <ProcessPage />;
}
