"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Building2, Rocket } from "lucide-react";
import { SiteShell } from "@/components/tangison/site-shell";

const industries = [
  {
    name: "SMEs & Startups",
    slug: "smes",
    description: "Small and medium enterprises building their digital presence from the ground up: brand systems, websites, and product design tailored for growth-stage ventures across Africa.",
    icon: Rocket,
    href: "/work/smes",
  },
  {
    name: "Mining & Resources",
    slug: "mining",
    description: "Corporate digital platforms for Namibia's mining sector: safety portals, stakeholder dashboards, and compliance-grade interfaces built for heavy industry.",
    icon: Building2,
    href: "/work/mining",
  },
  {
    name: "Government & Public Sector",
    slug: "government",
    description: "Accessible, standards-compliant digital experiences for municipalities, ministries, and public institutions serving Namibian citizens.",
    icon: Building2,
    href: "/work/government",
  },
  {
    name: "Tourism & Hospitality",
    slug: "tourism",
    description: "Booking platforms, lodge websites, and safari brand systems that connect travelers to Namibia's extraordinary landscapes.",
    icon: Building2,
    href: "/work/tourism",
  },
  {
    name: "Agriculture & Agro-processing",
    slug: "agriculture",
    description: "Marketplace platforms, cooperative management tools, and agri-tech interfaces built for Namibia's farming communities and value-chain operators.",
    icon: Building2,
    href: "/work/agriculture",
  },
  {
    name: "Financial Services",
    slug: "finance",
    description: "Secure fintech dashboards, banking portals, and micro-lending platforms built for compliance, clarity, and low-bandwidth access.",
    icon: Building2,
    href: "/work/finance",
  },
  {
    name: "Education & EdTech",
    slug: "education",
    description: "Learning management systems, AI education platforms, and academic portals built for access across low-bandwidth environments.",
    icon: Building2,
    href: "/work/education",
  },
  {
    name: "Healthcare & Wellness",
    slug: "healthcare",
    description: "Patient portals, telemedicine interfaces, and health information systems built with accessibility, privacy, and care at the center.",
    icon: Building2,
    href: "/work/healthcare",
  },
  {
    name: "Energy & Utilities",
    slug: "energy",
    description: "Renewable energy dashboards, utility customer portals, and infrastructure monitoring interfaces for Namibia's growing energy sector.",
    icon: Building2,
    href: "/work/energy",
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
      {/* Header — Coming Soon */}
      <section className="pt-36 md:pt-44 pb-20 md:pb-28 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp}>
            <span className="font-jetbrains text-[10px] uppercase tracking-[0.3em] text-signal-teal block mb-6">WORK</span>
            <h1 className="font-cabinet text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-ink mb-6">
              Coming Soon
            </h1>
            <p className="font-satoshi text-lg md:text-xl text-ink-muted max-w-2xl leading-relaxed">
              We are evolving from Gemsweb Digital to Tangison Studio. Our full portfolio and case studies are being assembled. In the meantime, explore the industries we serve across Africa.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Rebrand Story */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-20 bg-signal-white border-y border-card-border">
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-3xl">
            <motion.div {...fadeUp}>
              <div className="editorial-divider mb-8" />
              <h2 className="font-cabinet text-2xl md:text-3xl font-bold tracking-tight text-ink mb-6">
                From Gemsweb Digital to Tangison Studio
              </h2>
              <p className="font-satoshi text-ink-muted text-base md:text-lg leading-relaxed mb-6">
                For years we operated as Gemsweb Digital, designing and building digital products for organizations across Namibia and beyond. Now we are growing into something sharper. Tangison Studio carries forward the same craft, the same clients, and the same commitment to doing good work, but with a clearer identity, a broader vision, and a tighter studio practice.
              </p>
              <p className="font-satoshi text-ink-muted text-base md:text-lg leading-relaxed mb-6">
                We are putting everything together. Our case studies, project breakdowns, and the full portfolio from both the Gemsweb Digital era and the new Tangison Studio chapter are being carefully assembled. This takes time because we believe in presenting work with the same care we apply to creating it.
              </p>
              <p className="font-satoshi text-ink-muted text-base md:text-lg leading-relaxed">
                In the meantime, explore the industries we serve. Each sector page will eventually host case studies, outcomes, and the thinking behind every project we have shipped.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20" id="industries">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp} className="mb-16">
            <span className="font-jetbrains text-[10px] uppercase tracking-[0.3em] text-signal-teal block mb-6">INDUSTRIES</span>
            <h2 className="font-cabinet text-3xl md:text-4xl font-bold tracking-tight text-ink mb-4">
              By Industry
            </h2>
            <p className="font-satoshi text-ink-muted text-base md:text-lg max-w-xl leading-relaxed">
              Sector-specific work. No case studies available yet, but each industry page outlines what we do and the problems we solve.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {industries.map((industry, i) => (
              <motion.div
                key={industry.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={industry.href}
                  className="group block border border-card-border bg-signal-white p-6 md:p-8 hover:border-signal-teal/30 hover:bg-ocean-mist/30 transition-all duration-500 h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 bg-signal-teal-muted flex items-center justify-center">
                      <industry.icon className="w-5 h-5 text-signal-teal" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-ink-muted/30 group-hover:text-signal-teal transition-colors duration-300" />
                  </div>
                  <h3 className="font-cabinet text-lg md:text-xl font-bold tracking-tight text-ink mb-3 group-hover:text-signal-teal transition-colors duration-300">
                    {industry.name}
                  </h3>
                  <p className="font-satoshi text-ink-muted text-sm leading-relaxed">
                    {industry.description}
                  </p>
                  <div className="mt-5 flex items-center gap-2">
                    <Clock className="w-3 h-3 text-ink-muted/40" />
                    <span className="font-jetbrains text-[10px] uppercase tracking-[0.15em] text-ink-muted/50">
                      Case studies coming soon
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
            <h2 className="font-cabinet text-[clamp(2.5rem,6vw,6rem)] font-black tracking-[-0.04em] text-skeleton-bone mb-6 leading-[0.9]">
              Have a project?
            </h2>
            <p className="font-satoshi text-fog-gray/60 text-base md:text-lg mb-10 max-w-lg mx-auto leading-relaxed">
              While we put the portfolio together, we are still taking on new work. Start a conversation and let&apos;s build something together.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-signal-teal text-signal-white px-10 py-5 font-cabinet font-bold text-sm tracking-tight hover:opacity-90 hover:-translate-y-px transition-all duration-300"
            >
              Start a Project &rarr;
            </Link>
          </motion.div>
        </div>
      </section>
    </SiteShell>
  );
}
