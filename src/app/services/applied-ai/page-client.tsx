"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SiteShell } from "@/components/tangison/site-shell";
import { ArrowUpRight, Brain, Cpu, Workflow, BarChart3, Plug, Sparkles } from "lucide-react";

const capabilities = [
  {
    title: "Custom AI Systems",
    description:
      "AI solutions designed around your data, workflows, and business logic. No generic templates. Every system built for your context.",
    icon: Brain,
  },
  {
    title: "Enterprise Deployments",
    description:
      "Deploy AI within your own infrastructure. Full observability, compliance, and governance. Operate at scale without compromising reliability.",
    icon: Cpu,
  },
  {
    title: "Business Workflow Automation",
    description:
      "Automation that understands context, adapts to exceptions, and escalates when humans need to decide. Not rigid scripts. Workflows that handle variation.",
    icon: Workflow,
  },
  {
    title: "Data Analysis & Decision Support",
    description:
      "Analysis that surfaces patterns and predicts outcomes. Present actionable insights to decision-makers. Turn raw data into decisions you can act on.",
    icon: BarChart3,
  },
  {
    title: "AI Integrations",
    description:
      "Connect AI to your existing tools, platforms, and data sources. Enhance what you already have. No disruption to operations.",
    icon: Plug,
  },
  {
    title: "Context-Aware AI",
    description:
      "Systems that understand local context. Language, regulation, market conditions, cultural nuance. AI that works the way your organization works.",
    icon: Sparkles,
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" } as const,
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
};

export function AppliedAiPage() {
  return (
    <SiteShell>
      {/* Page Header */}
      <section className="pt-36 md:pt-44 pb-20 md:pb-28 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeInUp}>
            <span className="font-jetbrains text-[10px] uppercase tracking-[0.3em] text-rust-signal block mb-6">
              APPLIED AI
            </span>
            <h1 className="font-cabinet text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-ink mb-6">
              AI Built for Your Context
            </h1>
            <p className="font-satoshi text-lg md:text-xl text-ink-muted max-w-2xl leading-relaxed">
              We design and build AI systems for your specific needs. Custom
              models, enterprise deployments, intelligent workflows, and data
              analysis. Every solution fits the context it runs in.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Capabilities Grid */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1] as const,
                }}
                className="border border-black/[0.06] bg-warm-gray p-8 md:p-10 hover:border-black/[0.1] transition-colors duration-500"
              >
                <cap.icon className="w-5 h-5 text-rust-signal mb-5" />
                <h3 className="font-cabinet text-xl md:text-2xl font-bold tracking-tight text-ink mb-3">
                  {cap.title}
                </h3>
                <p className="font-satoshi text-ink-muted text-sm md:text-base leading-relaxed">
                  {cap.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <div className="w-12 h-[2px] bg-rust-signal mx-auto mb-8" aria-hidden="true" />
            <h2 className="font-cabinet text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-ink mb-6">
              Have a specific problem to solve?
            </h2>
            <p className="font-satoshi text-ink-muted text-lg mb-10 max-w-lg mx-auto">
              Tell us about the challenge. We will design a system that fits your context, not the other way around.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-ink text-warm-white px-8 py-4 font-jetbrains text-[11px] uppercase tracking-[0.15em] hover:bg-ink-light transition-colors duration-300 group"
            >
              Discuss your project
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </SiteShell>
  );
}
