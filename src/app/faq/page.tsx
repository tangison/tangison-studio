import type { Metadata } from "next";
import { FAQPage } from "./page-client";
import { FAQPageJsonLd, BreadcrumbJsonLd } from "@/components/tangison/json-ld";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about working with Tangison Studio. Learn about our design process, project pricing, timelines, and how we engage with organizations across Africa.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ | TANGISON STUDIO",
    description: "Frequently asked questions about working with Tangison Studio. Learn about our design process, project pricing, timelines, and how we engage with organizations across Africa.",
    url: "/faq",
  },
};

const faqItems = [
  { question: "What does Tangison Studio do?", answer: "We design and build digital experiences — websites, applications, brand systems, and design systems. We work from Windhoek, Namibia, and serve clients across Africa and internationally." },
  { question: "What services do you offer?", answer: "Seven disciplines: Website Design, Website Development, Application Design, Product Design, Brand Systems, Design Systems, and Creative Direction." },
  { question: "What is your process?", answer: "Five phases: Discover, Define, Design, Develop, Launch. Every project starts with research and ends with a working product." },
  { question: "How do you price projects?", answer: "We scope every project individually based on requirements, complexity, and timeline. After the Discover phase, you receive a detailed proposal with transparent pricing." },
  { question: "Do you work with organizations outside Namibia?", answer: "Yes. While based in Windhoek, we work with organizations across Africa and internationally." },
  { question: "How long does a typical project take?", answer: "A brand identity system can take 4–6 weeks. A full website design and build typically runs 8–14 weeks." },
  { question: "How do I start a project?", answer: "Fill out the contact form or email studio@tangison.com. We respond to every message within two business days." },
  { question: "Do you offer ongoing support after launch?", answer: "Yes. We offer maintenance and support plans for launched projects." },
];

export default function Page() {
  return (
    <>
      <FAQPageJsonLd faqs={faqItems} />
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "/" },
        { name: "FAQ", url: "/faq" },
      ]} />
      <FAQPage />
    </>
  );
}
