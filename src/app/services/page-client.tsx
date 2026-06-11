"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SiteShell } from "@/components/tangison/site-shell";

const services = [
  {
    title: "Website Design",
    slug: "website-design",
    description: "Intentional interfaces. We design websites that communicate clearly and convert effectively.",
    capabilities: ["User experience design", "Wireframing and prototyping", "Visual design systems", "Responsive design"],
  },
  {
    title: "Website Development",
    slug: "website-development",
    description: "Engineered to perform. Clean code, fast load times, built to scale.",
    capabilities: ["Frontend development", "CMS integration", "Performance optimization", "SEO implementation"],
  },
  {
    title: "Application Design",
    slug: "application-design",
    description: "Complex systems, clear UX. We design applications that make complexity manageable.",
    capabilities: ["Information architecture", "Interaction design", "User flow mapping", "Interface design"],
  },
  {
    title: "Product Design",
    slug: "product-design",
    description: "End-to-end product thinking. From concept to launch and beyond.",
    capabilities: ["Product strategy", "Feature prioritization", "Design sprints", "Launch planning"],
  },
  {
    title: "Brand Systems",
    slug: "brand-systems",
    description: "Cohesive visual identity. Marks, wordmarks, palettes, and guidelines that scale.",
    capabilities: ["Logo and wordmark design", "Color and type systems", "Brand guidelines", "Asset libraries"],
  },
  {
    title: "Design Systems",
    slug: "design-systems",
    description: "Scalable component architecture. One source of truth for your entire product.",
    capabilities: ["Component libraries", "Token systems", "Documentation", "Governance frameworks"],
  },
  {
    title: "Creative Direction",
    slug: "creative-direction",
    description: "Strategic visual leadership. We set the direction and ensure every touchpoint aligns.",
    capabilities: ["Campaign strategy", "Art direction", "Visual storytelling", "Cross-channel consistency"],
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" as const },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

export function ServicesPage() {
  return (
    <SiteShell>
      {/* Header */}
      <section className="pt-36 md:pt-44 pb-20 md:pb-28 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp}>
            <span className="font-jetbrains text-[10px] uppercase tracking-[0.3em] text-signal-teal block mb-6">SERVICES</span>
            <h1 className="font-cabinet text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-ink mb-6">
              Seven Disciplines
            </h1>
            <p className="font-satoshi text-lg md:text-xl text-ink-muted max-w-2xl leading-relaxed">
              One studio. Every project gets the right combination of strategy, design, and engineering. We work across seven disciplines to deliver digital experiences that are intentional, scalable, and built to perform.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto space-y-4 md:space-y-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={`/services/${service.slug}`} className="block group">
                <div className="border border-black/[0.06] bg-signal-white p-8 md:p-10 lg:p-12 hover:border-black/[0.1] transition-colors duration-500">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
                    {/* Left: Number + Name */}
                    <div className="lg:col-span-4">
                      <span className="font-jetbrains text-[10px] uppercase tracking-[0.2em] text-signal-teal mb-4 block">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex items-center gap-3">
                        <h2 className="font-cabinet text-2xl md:text-3xl font-bold tracking-tight text-ink">
                          {service.title}
                        </h2>
                        <span className="font-satoshi text-ink-muted text-xl transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </div>
                    </div>
                    {/* Right: Description + Capabilities */}
                    <div className="lg:col-span-8">
                      <p className="font-satoshi text-ink text-base md:text-lg leading-relaxed mb-8">
                        {service.description}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {service.capabilities.map((cap) => (
                          <div key={cap} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 bg-signal-teal mt-2 shrink-0" aria-hidden="true" />
                            <span className="font-satoshi text-sm text-ink-muted">{cap}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-atlantic-black">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <h2 className="font-cabinet text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-skeleton-bone mb-6">
              Not sure which service you need?
            </h2>
            <p className="font-satoshi text-skeleton-bone/60 text-lg mb-10 max-w-lg mx-auto">
              Tell us about your project. We&apos;ll recommend the right approach.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-signal-teal text-signal-white px-10 py-5 font-cabinet font-bold text-sm tracking-tight hover:opacity-90 hover:-translate-y-px transition-all duration-300 group"
             
            >
              Start a Project →
            </Link>
          </motion.div>
        </div>
      </section>
    </SiteShell>
  );
}
