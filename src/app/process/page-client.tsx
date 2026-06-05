"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/tangison/site-shell";

const steps = [
  {
    num: "01",
    name: "Discover",
    description: "We listen. We research. We understand the problem, the audience, and the context before proposing anything.",
    details: ["Stakeholder interviews", "Competitive audit", "User research", "Technical constraints review"],
  },
  {
    num: "02",
    name: "Define",
    description: "From research to strategy. We establish scope, objectives, and a clear plan of action.",
    details: ["Project brief", "Information architecture", "Content strategy", "Technical specification"],
  },
  {
    num: "03",
    name: "Design",
    description: "Visual systems, interface design, and prototyping. Every decision rooted in the strategy.",
    details: ["Wireframes", "Visual design", "Interactive prototypes", "Design system creation"],
  },
  {
    num: "04",
    name: "Develop",
    description: "Engineered with precision. Clean code, performance-first, built to scale.",
    details: ["Frontend development", "Backend integration", "Performance optimization", "Quality assurance"],
  },
  {
    num: "05",
    name: "Launch",
    description: "Deployment, monitoring, and iteration. We don't disappear after launch day.",
    details: ["Deployment pipeline", "Analytics setup", "Post-launch support", "Iterative improvements"],
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" as const },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

export function ProcessPage() {
  return (
    <SiteShell>
      {/* Header */}
      <section className="pt-36 md:pt-44 pb-20 md:pb-28 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp}>
            <span className="font-jetbrains text-[10px] uppercase tracking-[0.3em] text-signal-teal block mb-6">PROCESS</span>
            <h1 className="font-cabinet text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-ink mb-6">
              How We Work
            </h1>
            <p className="font-satoshi text-lg md:text-xl text-ink-muted max-w-2xl leading-relaxed">
              Five phases. No shortcuts. Every step intentional.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="space-y-4 md:space-y-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="border border-black/[0.06] bg-signal-white"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                  {/* Number + Name */}
                  <div className="lg:col-span-4 p-8 md:p-10 lg:p-12 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-black/[0.06]">
                    <span className="font-jetbrains text-[11px] text-signal-teal tracking-[0.15em] mb-3">
                      {step.num}
                    </span>
                    <h2 className="font-cabinet text-3xl md:text-4xl font-bold tracking-tight text-ink">
                      {step.name}
                    </h2>
                  </div>
                  {/* Description + Details */}
                  <div className="lg:col-span-8 p-8 md:p-10 lg:p-12">
                    <p className="font-satoshi text-ink text-base md:text-lg leading-relaxed mb-6">
                      {step.description}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {step.details.map((detail) => (
                        <div key={detail} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-signal-teal shrink-0" aria-hidden="true" />
                          <span className="font-satoshi text-sm text-ink-muted">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Break */}
      <section className="relative h-48 md:h-72 overflow-hidden" aria-hidden="true">
        <Image
          src="/images/gallery/desert-road-line.webp"
          alt="Straight desert road under vast sky representing the Tangison Studio process"
          className="object-cover cinematic-image"
          fill
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-skeleton-bone via-transparent to-skeleton-bone" />
      </section>

      {/* CTA */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <h2 className="font-cabinet text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-ink mb-6">
              Ready to start?
            </h2>
            <p className="font-satoshi text-ink-muted text-lg mb-10 max-w-lg mx-auto">
              Every project begins with Discover. Tell us about yours.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-signal-teal text-signal-white px-10 py-5 font-cabinet font-bold text-sm tracking-tight hover:opacity-88 hover:-translate-y-px transition-all duration-300 group"
            >
              Start a Project →
            </Link>
          </motion.div>
        </div>
      </section>
    </SiteShell>
  );
}
