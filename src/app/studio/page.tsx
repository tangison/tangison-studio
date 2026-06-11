import type { Metadata } from "next";
import { StudioPage } from "./page-client";

export const metadata: Metadata = {
  title: "The Studio",
  description: "About Tangison Studio — a creative digital agency in Windhoek, Namibia. Our space, our tools, our philosophy.",
  alternates: { canonical: "/studio" },
  openGraph: {
    title: "The Studio",
    description: "About Tangison Studio — a creative digital agency in Windhoek, Namibia. Our space, our tools, our philosophy.",
    url: "/studio",
  },
};

export default function Page() {
  return <StudioPage />;
}
