import type { Metadata } from "next";
import { HomePage } from "./page-client";

export const metadata: Metadata = {
  title: "Creative Digital Agency in Windhoek, Namibia",
  description:
    "We design and build digital products that get results. Website design, development, brand systems, and creative direction from Windhoek, Namibia. Start your project today.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TANGISON STUDIO — Creative Digital Agency in Windhoek, Namibia",
    description:
      "We design and build digital products that get results. Website design, development, brand systems, and creative direction from Windhoek, Namibia. Start your project today.",
    url: "/",
    images: [{ url: "/brand/favicon.webp", width: 499, height: 499, alt: "TANGISON STUDIO" }],
  },
};

export default function Page() {
  return <HomePage />;
}
