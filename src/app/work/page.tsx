import type { Metadata } from "next";
import { WorkPage } from "./page-client";

export const metadata: Metadata = {
  title: "Our Work & Case Studies",
  description: "Explore our portfolio of digital experiences across nine industries in Africa. From SMEs and mining to healthcare and education — see how Tangison Studio delivers strategic, functional design.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Our Work & Case Studies | TANGISON STUDIO",
    description: "Explore our portfolio of digital experiences across nine industries in Africa. From SMEs and mining to healthcare and education — see how Tangison Studio delivers strategic, functional design.",
    url: "/work",
  },
};

export default function Page() {
  return <WorkPage />;
}
