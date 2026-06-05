"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SiteShell } from "@/components/tangison/site-shell";

const projects = [
  {
    name: "Tangison Agent",
    category: "Application Design",
    description: "Autonomous AI operations platform. Designed for clarity in complex workflow management.",
    image: "/images/gallery/concrete-glass-architecture-structure.webp",
    imageAlt: "Tangison Agent platform interface design",
    href: "/work",
  },
  {
    name: "SkillsCamp",
    category: "Product Design",
    description: "531+ modular AI agent skills. A product ecosystem built for discoverability and self-service.",
    image: "/images/gallery/desk-books-lamp-sunlight.webp",
    imageAlt: "SkillsCamp product design showing skill directory",
    href: "/work",
  },
  {
    name: "SMEFrog Academy",
    category: "Website Design",
    description: "AI education for African SMEs. Accessible, practical, and built for low-bandwidth environments.",
    image: "/images/gallery/business-registration-compliance.webp",
    imageAlt: "SMEFrog Academy website design",
    href: "/work",
  },
  {
    name: "Tangison Studio Brand",
    category: "Brand Systems",
    description: "Complete visual identity system for Tangison Studio. Mark, wordmark, palette, typography, and motion.",
    image: "/images/gallery/desk-succulent-sketch-pencil.webp",
    imageAlt: "Tangison Studio brand identity system",
    href: "/brand",
  },
  {
    name: "Feorm",
    category: "Product Design",
    description: "Agrotourism and equipment rental marketplace. Namibia-focused, built with Tuppaman Investment.",
    image: "/images/gallery/desert-path-mountain-view.webp",
    imageAlt: "Feorm marketplace product design",
    href: "/work",
  },
  {
    name: "AI Research Series",
    category: "Creative Direction",
    description: "26 industry-specific AI guides for African organizations. Editorial design at scale.",
    image: "/images/gallery/sunlit-books-desk-lamp.webp",
    imageAlt: "AI research series creative direction",
    href: "/work",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" as const },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

export function WorkPage() {
  return (
    <SiteShell>
      {/* Header */}
      <section className="pt-36 md:pt-44 pb-20 md:pb-28 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp}>
            <span className="font-jetbrains text-[10px] uppercase tracking-[0.3em] text-signal-teal block mb-6">WORK</span>
            <h1 className="font-cabinet text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-ink mb-6">
              Case Studies
            </h1>
            <p className="font-satoshi text-lg md:text-xl text-ink-muted max-w-2xl leading-relaxed">
              Projects we&apos;ve designed, built, and shipped.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Project Grid */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={project.href}
                  className="group block border border-black/[0.06] bg-signal-white overflow-hidden hover:border-black/[0.1] transition-all duration-500 h-full"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      className="object-cover cinematic-image group-hover:scale-105 transition-transform duration-700"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6 md:p-8">
                    <span className="font-jetbrains text-[10px] text-signal-teal uppercase tracking-[0.2em] mb-3 block">
                      {project.category}
                    </span>
                    <h3 className="font-cabinet text-xl md:text-2xl font-bold tracking-tight text-ink mb-3 group-hover:text-signal-teal transition-colors duration-300">
                      {project.name}
                    </h3>
                    <p className="font-satoshi text-ink-muted text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>
                    <span className="inline-flex items-center gap-1 font-jetbrains text-[10px] uppercase tracking-[0.15em] text-ink-muted group-hover:text-signal-teal transition-colors">
                      View
                      <ArrowUpRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 md:py-48 px-6 md:px-12 lg:px-20 bg-atlantic-black">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <h2 className="font-cabinet text-[clamp(2.5rem,6vw,6rem)] font-black tracking-[-0.04em] text-skeleton-bone mb-10 leading-[0.9]">
              Have a project?
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-signal-teal text-signal-white px-10 py-5 font-cabinet font-bold text-sm tracking-tight hover:opacity-88 hover:-translate-y-px transition-all duration-300"
            >
              Start a Project →
            </Link>
          </motion.div>
        </div>
      </section>
    </SiteShell>
  );
}
