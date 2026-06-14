import type { Metadata } from "next";
import { StudioPage } from "./page-client";

export const metadata: Metadata = {
  title: "The Studio — Inside Tangison Studio | Windhoek, Namibia",
  description: "Inside Tangison Studio. Our workspace, tools, and design philosophy as a creative digital agency in Windhoek, Namibia. Craft, precision, and intention.",
  alternates: { canonical: "/studio" },
  openGraph: {
    title: "The Studio | TANGISON STUDIO",
    description: "Inside Tangison Studio. Our workspace, tools, and design philosophy as a creative digital agency in Windhoek, Namibia. Craft, precision, and intention.",
    url: "/studio",
    images: [{ url: "/brand/favicon.webp", width: 499, height: 499, alt: "TANGISON STUDIO" }],
  },
};

export default function Page() {
  return <StudioPage />;
}
