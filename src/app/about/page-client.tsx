"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SiteShell } from "@/components/tangison/site-shell";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" as const },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

export function AboutPage() {
  return (
    <SiteShell>
      {/* Header */}
      <section className="pt-36 md:pt-44 pb-20 md:pb-28 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp}>
            <span className="font-jetbrains text-[10px] uppercase tracking-[0.3em] text-signal-teal block mb-6">ABOUT</span>
            <h1 className="font-cabinet text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-ink mb-6">
              Tangison Studio
            </h1>
            <p className="font-satoshi text-lg md:text-xl text-ink-muted max-w-2xl leading-relaxed">
              A creative digital agency. Based in Windhoek.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24">
          <motion.div {...fadeUp} className="space-y-6">
            <p className="font-satoshi text-ink text-base md:text-lg leading-relaxed">
              Tangison Studio is a creative digital agency in Windhoek, Namibia. We design and build websites, applications, brand systems, and design systems for organizations that need their digital presence to actually perform.
            </p>
            <p className="font-satoshi text-ink text-base md:text-lg leading-relaxed">
              We work with organizations that want strategic, functional, beautiful, and scalable digital products. Our method is straightforward: research before designing, design before building, and build before promising.
            </p>
            <p className="font-satoshi text-ink text-base md:text-lg leading-relaxed">
              Every project starts with understanding the problem. Every solution is built to last. We do not chase trends. We solve problems.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative min-h-[300px] md:min-h-[400px] overflow-hidden"
          >
            <Image
              src="/images/gallery/about-philosophy.webp"
              alt="Namibian landscape philosophy"
              className="object-cover cinematic-image"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-atlantic-black">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp} className="flex items-center gap-4 mb-4">
            <div className="w-10 h-[1px] bg-signal-teal/50" aria-hidden="true" />
          </motion.div>
          <motion.h2 {...fadeUp} className="font-cabinet text-3xl md:text-4xl font-bold tracking-tight text-skeleton-bone mb-16">
            What We Believe
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {[
              { title: "Design is problem-solving", desc: "Aesthetics serve function. Every visual decision answers a question. If it looks good but does not work, it is not done." },
              { title: "Quality is non-negotiable", desc: "No shortcuts. No templates. Every system is built to perform for years, not months. We would rather turn down work than ship something half-baked." },
              { title: "Africa is a context, not a market", desc: "We build for African realities: connectivity, access, constraints. Not assumptions imported from somewhere else." },
              { title: "Silence is part of design", desc: "We remove what is unnecessary: elements, words, interactions. Restraint is a choice, and empty space works harder than clutter." },
            ].map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="border border-white/[0.06] p-8 md:p-10"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-1.5 bg-signal-teal" aria-hidden="true" />
                  <span className="font-jetbrains text-[10px] text-skeleton-bone/70 uppercase tracking-[0.2em]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-cabinet text-xl md:text-2xl font-bold tracking-tight text-skeleton-bone mb-3">
                  {value.title}
                </h3>
                <p className="font-satoshi text-skeleton-bone/60 text-sm md:text-base leading-relaxed">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Evolution */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp} className="flex items-center gap-4 mb-4">
            <div className="editorial-divider" aria-hidden="true" />
          </motion.div>
          <motion.h2 {...fadeUp} className="font-cabinet text-3xl md:text-4xl font-bold tracking-tight text-ink mb-16">
            Our Path
          </motion.h2>
          <div className="max-w-3xl">
            {[
              { name: "GemsWeb Digital", description: "Started as a digital agency delivering web and marketing solutions across Namibia." },
              { name: "Tangison", description: "Grew into Tangison Studio: a creative digital agency focused on strategic design and engineering with a sharper identity and a broader vision." },
            ].map((entry, i) => (
              <motion.div
                key={entry.name}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.1 }}
                className="relative pl-8 pb-12 last:pb-0"
              >
                <div className="absolute left-0 top-2 bottom-0 w-[1px] bg-black/[0.08]" aria-hidden="true" />
                <div className="absolute left-0 top-2 -translate-x-1/2 w-2 h-2 bg-signal-teal" aria-hidden="true" />
                <h3 className="font-cabinet text-xl md:text-2xl font-bold tracking-tight text-ink mb-2">
                  {entry.name}
                </h3>
                <p className="font-satoshi text-ink-muted text-sm md:text-base leading-relaxed">
                  {entry.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 md:py-48 px-6 md:px-12 lg:px-20 bg-atlantic-black">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-cabinet text-[clamp(2.5rem,6vw,6rem)] font-black tracking-[-0.04em] text-skeleton-bone mb-10 leading-[0.9]"
          >
            Start a project together
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-signal-teal text-signal-white px-10 py-5 font-cabinet font-bold text-sm tracking-tight hover:opacity-90 hover:-translate-y-px transition-all duration-300 group"
            >
              Get in touch
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </motion.div>
        </div>
      </section>
    </SiteShell>
  );
}
