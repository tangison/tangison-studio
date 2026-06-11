"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { SiteShell } from "@/components/tangison/site-shell";

const faqs = [
  {
    question: "What does Tangison Studio do?",
    answer: "We design and build websites, applications, brand systems, and design systems. We work from Windhoek, Namibia, and serve clients across Africa and beyond.",
  },
  {
    question: "What services do you offer?",
    answer: "Seven disciplines: Website Design, Website Development, Application Design, Product Design, Brand Systems, Design Systems, and Creative Direction. We can handle any single service or combine them for full-scope projects.",
  },
  {
    question: "What is your process?",
    answer: "Five phases: Discover, Define, Design, Develop, Launch. Every project starts with research and ends with a working product. No skipping steps.",
  },
  {
    question: "How do you price projects?",
    answer: "We scope every project individually based on requirements, complexity, and timeline. After the Discover phase, you get a detailed proposal with transparent pricing. No hidden fees.",
  },
  {
    question: "Do you work with organizations outside Namibia?",
    answer: "Yes. We are based in Windhoek but work with organizations across Africa and internationally. Our design and development process works remotely.",
  },
  {
    question: "How long does a typical project take?",
    answer: "Timelines depend on scope. A brand identity system takes 4 to 6 weeks. A full website design and build typically runs 8 to 14 weeks. We set clear milestones and delivery dates in every proposal.",
  },
  {
    question: "Do you build with specific technologies?",
    answer: "We choose technology based on what the project needs, not the other way around. Our team works with modern frameworks including Next.js, React, and others. We prioritize performance, accessibility, and maintainability.",
  },
  {
    question: "How do I start a project?",
    answer: "Fill out the contact form or email studio@tangison.com. Tell us about your organization and what you need. We reply to every message within two business days.",
  },
  {
    question: "What if I only need design, not development?",
    answer: "We can handle design-only projects. We deliver complete design files, specifications, and a handoff package your developers can use right away. We also offer development review as an add-on.",
  },
  {
    question: "Do you offer ongoing support after launch?",
    answer: "Yes. We offer maintenance and support plans for launched projects. Details and pricing are included in your project proposal.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" as const },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

export function FAQPage() {
  return (
    <SiteShell>
      <section className="pt-36 md:pt-44 pb-20 md:pb-28 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp}>
            <span className="font-jetbrains text-[10px] uppercase tracking-[0.3em] text-signal-teal block mb-6">FAQ</span>
            <h1 className="font-cabinet text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-ink mb-6">
              Frequently Asked Questions
            </h1>
            <p className="font-satoshi text-lg md:text-xl text-ink-muted max-w-2xl leading-relaxed">
              Common questions about working with Tangison Studio.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20">
        <div className="max-w-[800px] mx-auto">
          <div className="space-y-0">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="border-b border-black/[0.06] py-8 first:pt-0"
              >
                <h3 className="font-cabinet text-lg md:text-xl font-bold tracking-tight text-ink mb-3">
                  {faq.question}
                </h3>
                <p className="font-satoshi text-ink-muted text-base leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-skeleton-bone">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <h2 className="font-cabinet text-2xl md:text-3xl font-bold tracking-tight text-ink mb-6">
              Still have questions?
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-signal-teal text-signal-white px-10 py-5 font-cabinet font-bold text-sm tracking-tight hover:opacity-90 hover:-translate-y-px transition-all duration-300"
            >
              Get in Touch →
            </Link>
          </motion.div>
        </div>
      </section>
    </SiteShell>
  );
}
