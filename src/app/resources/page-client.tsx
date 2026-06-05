"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { SiteShell } from "@/components/tangison/site-shell";

const resourceCategories = [
  {
    category: "Strategy",
    items: [
      { title: "The AI Blueprint for Namibian Business", file: "Tangison_01_The_AI_Blueprint_for_Namibian_Business_v2.0.pdf" },
      { title: "The AI Maturity Framework", file: "Tangison_02_The_AI_Maturity_Framework_v2.0.pdf" },
      { title: "The AI ROI Playbook", file: "Tangison_03_The_AI_ROI_Playbook_v2.0.pdf" },
    ],
  },
  {
    category: "Governance",
    items: [
      { title: "The AI Ethics and Governance Guide", file: "Tangison_04_The_AI_Ethics_and_Governance_Guide_v2.0.pdf" },
      { title: "The AI Talent and Skills Roadmap", file: "Tangison_05_The_AI_Talent_and_Skills_Roadmap_v2.0.pdf" },
      { title: "The AI Vendor and Tool Landscape", file: "Tangison_06_The_AI_Vendor_and_Tool_Landscape_v2.0.pdf" },
    ],
  },
  {
    category: "Industry",
    items: [
      { title: "AI for Agriculture", file: "Tangison_07_AI_for_Agriculture_v2.0.pdf" },
      { title: "AI for Mining", file: "Tangison_08_AI_for_Mining_v2.0.pdf" },
      { title: "AI for Tourism", file: "Tangison_09_AI_for_Tourism_v2.0.pdf" },
      { title: "AI for Banking and Finance", file: "Tangison_11_AI_for_Banking_and_Finance_v2.0.pdf" },
      { title: "AI for Healthcare", file: "Tangison_13_AI_for_Healthcare_v2.0.pdf" },
      { title: "AI for Education", file: "Tangison_14_AI_for_Education_v2.0.pdf" },
    ],
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" as const },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

export function ResourcesPage() {
  return (
    <SiteShell>
      <section className="pt-36 md:pt-44 pb-20 md:pb-28 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp}>
            <span className="font-jetbrains text-[10px] uppercase tracking-[0.3em] text-signal-teal block mb-6">RESOURCES</span>
            <h1 className="font-cabinet text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-ink mb-6">
              Resources
            </h1>
            <p className="font-satoshi text-lg md:text-xl text-ink-muted max-w-2xl leading-relaxed">
              Free guides and frameworks for organizations exploring AI adoption.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto space-y-12">
          {resourceCategories.map((cat, ci) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: ci * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="font-jetbrains text-[10px] text-signal-teal uppercase tracking-[0.2em] mb-6">
                {cat.category}
              </h2>
              <div className="space-y-2">
                {cat.items.map((item) => (
                  <a
                    key={item.file}
                    href={`/documents/${item.file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between border border-black/[0.06] bg-signal-white p-5 hover:border-black/[0.1] transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <Download className="w-4 h-4 text-signal-teal shrink-0" />
                      <span className="font-satoshi text-ink text-sm md:text-base group-hover:text-signal-teal transition-colors duration-300">
                        {item.title}
                      </span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-ink-muted/30 group-hover:text-signal-teal group-hover:translate-x-1 transition-all duration-300 shrink-0" />
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
