"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SiteShell } from "@/components/tangison/site-shell";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" as const },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

export function StudioPage() {
  return (
    <SiteShell>
      {/* Header */}
      <section className="pt-36 md:pt-44 pb-20 md:pb-28 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp}>
            <span className="font-jetbrains text-[10px] uppercase tracking-[0.3em] text-signal-teal block mb-6">THE STUDIO</span>
            <h1 className="font-cabinet text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-ink mb-6">
              About the Studio
            </h1>
            <p className="font-satoshi text-lg md:text-xl text-ink-muted max-w-2xl leading-relaxed">
              A creative digital agency in Windhoek, Namibia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24">
          <motion.div {...fadeUp} className="space-y-6">
            <p className="font-satoshi text-ink text-base md:text-lg leading-relaxed">
              Tangison Studio is a creative digital agency that designs and builds digital products. We work with organizations that need strategic, functional, beautiful, and scalable digital products.
            </p>
            <p className="font-satoshi text-ink text-base md:text-lg leading-relaxed">
              Based in Windhoek, we combine design thinking with engineering discipline. Every project starts with understanding the problem. Every solution is built to last.
            </p>
            <p className="font-satoshi text-ink text-base md:text-lg leading-relaxed">
              Our method is straightforward: research before designing, design before building, and build before promising. We believe digital products should be invisible. They should work so well that people do not notice them.
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
              src="/images/gallery/studio-workspace.webp"
              alt="Tangison Studio workspace"
              className="object-cover cinematic-image"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-atlantic-black">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp} className="flex items-center gap-4 mb-4">
            <div className="w-10 h-[1px] bg-signal-teal/50" aria-hidden="true" />
          </motion.div>
          <motion.h2 {...fadeUp} className="font-cabinet text-3xl md:text-4xl font-bold tracking-tight text-skeleton-bone mb-16">
            How We Work
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {[
              { title: "Deep focus over multitasking", desc: "We work on a limited number of projects at a time. Every client gets our full attention, not a fraction of our bandwidth." },
              { title: "Tools chosen with intent", desc: "We pick technology based on the problem, not the trend. Every framework, platform, and library serves a purpose we can articulate." },
              { title: "Iterate in the open", desc: "Clients see work as it develops, not just at the finish line. Early feedback saves time and prevents misalignment." },
              { title: "Ship, measure, improve", desc: "Launch is the beginning, not the end. We build for continuous improvement based on real data, not assumptions." },
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
                  <span className="font-jetbrains text-[10px] text-skeleton-bone/40 uppercase tracking-[0.2em]">
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

      {/* Location */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp} className="flex items-center gap-4 mb-4">
            <div className="editorial-divider" aria-hidden="true" />
          </motion.div>
          <motion.h2 {...fadeUp} className="font-cabinet text-3xl md:text-4xl font-bold tracking-tight text-ink mb-16">
            Location
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24">
            <motion.div {...fadeUp} className="flex flex-col justify-center">
              <span className="font-jetbrains text-[10px] text-signal-teal uppercase tracking-[0.25em] block mb-6">SATELLITE OFFICE</span>
              <address className="font-cabinet text-xl md:text-2xl font-bold tracking-tight text-ink leading-relaxed not-italic">
                Corner of Frans Indongo Street and John Meinert Street, Windhoek, Namibia
              </address>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative min-h-[280px] md:min-h-[360px] overflow-hidden"
            >
              <Image
                src="/images/gallery/studio-location.webp"
                alt="Skeleton Coast aerial view"
                className="object-cover cinematic-image"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
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
            Work with us
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
              Get in Touch
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </motion.div>
        </div>
      </section>
    </SiteShell>
  );
}
