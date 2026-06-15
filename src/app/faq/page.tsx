import type { Metadata } from "next";
import { FAQPage } from "./page-client";
import { FAQPageJsonLd, BreadcrumbJsonLd, WebPageJsonLd } from "@/components/tangison/json-ld";

export const metadata: Metadata = {
  title: "FAQ | Tangison Studio",
  description: "Frequently asked questions about working with Tangison Studio. Learn about our design process, project pricing, timelines, and how we engage with organizations across Africa.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ | TANGISON STUDIO",
    description: "Frequently asked questions about working with Tangison Studio. Learn about our design process, project pricing, timelines, and how we engage with organizations across Africa.",
    url: "/faq",
  },
};

const faqItems = [
  { question: "What does Tangison Studio do?", answer: "We design and build websites, applications, brand systems, and design systems. We work from Windhoek, Namibia, and serve clients across Africa and beyond." },
  { question: "What services do you offer?", answer: "Seven disciplines: Website Design, Website Development, Application Design, Product Design, Brand Systems, Design Systems, and Creative Direction." },
  { question: "What is your process?", answer: "Five phases: Discover, Define, Design, Develop, Launch. Every project starts with research and ends with a working product." },
  { question: "How do you price projects?", answer: "We scope every project individually based on requirements, complexity, and timeline. After the Discover phase, you receive a detailed proposal with transparent pricing." },
  { question: "Do you work with organizations outside Namibia?", answer: "Yes. While based in Windhoek, we work with organizations across Africa and internationally." },
  { question: "How long does a typical project take?", answer: "A brand identity system can take 4 to 6 weeks. A full website design and build typically runs 8 to 14 weeks." },
  { question: "Do you build with specific technologies?", answer: "We choose technology based on what the project needs. Our team works with modern frameworks including Next.js, React, and others. We prioritize performance, accessibility, and maintainability." },
  { question: "How do I start a project?", answer: "Fill out the contact form or email studio@tangison.com. We respond to every message within two business days." },
  { question: "What if I only need design, not development?", answer: "We can handle design-only projects. We deliver complete design files, specifications, and a handoff package your developers can use right away." },
  { question: "Do you offer ongoing support after launch?", answer: "Yes. We offer maintenance and support plans for launched projects. Details and pricing are included in your project proposal." },
];

export default function Page() {
  return (
    <>
      <FAQPageJsonLd faqs={faqItems} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "/" },
        { name: "FAQ", url: "/faq" },
      ]} />
      <WebPageJsonLd
        title="FAQ | Tangison Studio"
        description="Frequently asked questions about working with Tangison Studio."
        url="/faq"
      />
      <FAQPage />
    </>
  );
}
