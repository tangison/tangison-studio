import type { Metadata } from "next";
import { ProcessPage } from "./page-client";

export const metadata: Metadata = {
  title: "Process",
  description: "Our five-phase process: Discover, Define, Design, Develop, Launch. How Tangison Studio delivers digital experiences.",
  alternates: { canonical: "/process" },
  openGraph: {
    title: "Process",
    description: "Our five-phase process: Discover, Define, Design, Develop, Launch. How Tangison Studio delivers digital experiences.",
    url: "/process",
  },
};

export default function Page() {
  return <ProcessPage />;
}
