"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SiteShell } from "@/components/tangison/site-shell";
import { ArrowUpRight, Map, Search, Wrench, Users } from "lucide-react";

const capabilities = [
  {
    title: "Strategy & Roadmaps",
    description:
      "Build AI strategies tied to your business goals and operational realities. We map the path from where you are to where AI creates measurable value. Realistic timelines. Honest resource estimates.",
    icon: Map,
  },
  {
    title: "Technology Evaluation",
    description:
      "We assess AI tools, platforms, and approaches against your requirements. Separate what works from what does not. Independent. Vendor-neutral.",
    icon: Search,
  },
  {
    title: "Implementation Support",
    description:
      "Hands-on guidance through your AI implementation. From pilot to production. We help you avoid common pitfalls, manage change, and build confidence in AI processes.",
    icon: Wrench,
  },
  {
    title: "Team Training",
    description:
      "Train your team to work with AI systems effectively. Practical, context-specific training. Build lasting capability within your organization.",
    icon: Users,
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" } as const,
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
};

export function ConsultingPage() {
  return (
    <SiteShell>
      {/* Page Header */}
      <section className="pt-36 md:pt-44 pb-20 md:pb-28 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeInUp}>
            <span className="font-jetbrains text-[10px] uppercase tracking-[0.3em] text-rust-signal block mb-6">
              AI CONSULTING
            </span>
            <h1 className="font-cabinet text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-ink mb-6">
              Clear AI Direction
            </h1>
            <p className="font-satoshi text-lg md:text-xl text-ink-muted max-w-2xl leading-relaxed">
              Not every organization needs to build from scratch. Sometimes you
              need a clear strategy, honest evaluation, and practical guidance.
              We help organizations make sound AI decisions. Whether starting
              from zero or advancing existing work.
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
              Want clarity on your AI strategy?
            </h2>
            <p className="font-satoshi text-ink-muted text-lg mb-10 max-w-lg mx-auto">
              A conversation costs nothing. Explore where AI fits your organization and what a realistic path forward looks like.
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
