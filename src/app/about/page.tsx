import type { Metadata } from "next";
import { AboutPage } from "./page-client";

export const metadata: Metadata = {
  title: "About Tangison Studio — Creative Digital Agency in Windhoek",
  description: "Tangison Studio is a creative digital agency based in Windhoek, Namibia. We design and build digital experiences that move ideas forward. Get to know our story and approach.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Tangison Studio — Creative Digital Agency in Windhoek",
    description: "Tangison Studio is a creative digital agency based in Windhoek, Namibia. We design and build digital experiences that move ideas forward. Get to know our story and approach.",
    url: "/about",
    images: [{ url: "/brand/favicon.webp", width: 499, height: 499, alt: "TANGISON STUDIO" }],
  },
};

export default function Page() {
  return <AboutPage />;
}
