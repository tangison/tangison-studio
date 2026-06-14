import type { Metadata } from "next";
import { AboutPage } from "./page-client";

export const metadata: Metadata = {
  title: "About",
  description: "Tangison Studio is a creative digital agency based in Windhoek, Namibia. We design and build digital experiences that move ideas forward.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | TANGISON STUDIO",
    description: "Tangison Studio is a creative digital agency based in Windhoek, Namibia. We design and build digital experiences that move ideas forward.",
    url: "/about",
    images: [{ url: "/brand/favicon.webp", width: 499, height: 499, alt: "TANGISON STUDIO" }],
  },
};

export default function Page() {
  return <AboutPage />;
}
