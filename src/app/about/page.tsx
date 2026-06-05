import type { Metadata } from "next";
import { AboutPage } from "./page-client";

export const metadata: Metadata = {
  title: "About — Creative Digital Agency in Namibia",
  description: "Tangison Studio is a creative digital agency in Windhoek, Namibia. We design and build digital experiences that move ideas forward.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — Creative Digital Agency in Namibia",
    description: "Tangison Studio is a creative digital agency in Windhoek, Namibia. We design and build digital experiences that move ideas forward.",
    url: "/about",
  },
};

export default function Page() {
  return <AboutPage />;
}
