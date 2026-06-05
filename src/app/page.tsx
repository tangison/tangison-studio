import type { Metadata } from "next";
import { HomePage } from "./page-client";

export const metadata: Metadata = {
  title: "TANGISON STUDIO | Creative Digital Agency",
  description:
    "We design and build digital experiences that move ideas forward. Website design, development, brand systems, and creative direction from Windhoek, Namibia.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TANGISON STUDIO | Creative Digital Agency",
    description:
      "We design and build digital experiences that move ideas forward. Website design, development, brand systems, and creative direction from Windhoek, Namibia.",
    url: "/",
  },
};

export default function Page() {
  return <HomePage />;
}
