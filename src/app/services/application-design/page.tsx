import type { Metadata } from "next";
import { ApplicationDesignPage } from "./page-client";

export const metadata: Metadata = {
  title: "Application Design — Tangison Studio",
  description: "Complex systems, clear UX. We design applications that make complexity manageable, turning dense functionality into intuitive experiences.",
  alternates: { canonical: "/services/application-design" },
  openGraph: {
    title: "Application Design — Tangison Studio",
    description: "Complex systems, clear UX. We design applications that make complexity manageable, turning dense functionality into intuitive experiences.",
    url: "/services/application-design",
  },
};

export default function Page() {
  return <ApplicationDesignPage />;
}
