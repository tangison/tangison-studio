"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Quote } from "lucide-react";
import { SiteShell } from "@/components/tangison/site-shell";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" as const },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

const testimonials = [
  {
    quote: "The digital foundation built for our platform is exceptional. We are well-positioned for our next phase of growth.",
    author: "Mr. Job",
    company: "Nalago",
  },
  {
    quote: "Awesome work. Now our customers have all the information they need online.",
    author: "Mr. T",
    company: "Cluster Leaf Safaris",
  },
  {
    quote: "We are looking forward to collaborating on larger enterprise infrastructure projects moving forward.",
    author: "Mr. Makopa",
    company: "Petrocor & Blackster Horizon",
  },
  {
    quote: "The design system delivered by Gemsweb Digital (now Tangison Studio) completely elevated our brand visibility.",
    author: "Miss Kay",
    company: "Proavia Travel",
  },
  {
    quote: "Our AI agent is the best. Nangula AI developed by Gemsweb Digital (now Tangison Studio) is a game-changer for our workflow.",
    author: "Mr. Timoteus",
    company: "Rico Printing",
  },
  {
    quote: "The strategic digital infrastructure aligns perfectly with our organizational and municipal goals.",
    author: "Miss Helen",
    company: "Stampriet VC",
  },
  {
    quote: "Paife ochima owechidhenga neeh ndumhenu.",
    author: "Mr. Micheal",
    company: "Techbridge College",
  },
  {
    quote: "The technical execution and asset delivery were highly professional.",
    author: "Miss Patricia",
    company: "Emerald Training",
    alert: true,
  },
];

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
              A creative digital agency. Based in Windhoek, Namibia.
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

      {/* Founder */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-20 bg-signal-white border-y border-card-border">
        <div className="max-w-[1400px] mx-auto">
          <div className="max-w-3xl">
            <motion.div {...fadeUp}>
              <div className="editorial-divider mb-8" />
              <h2 className="font-cabinet text-2xl md:text-3xl font-bold tracking-tight text-ink mb-6">
                Founded by Tangi Iigonda
              </h2>
              <p className="font-satoshi text-ink-muted text-base md:text-lg leading-relaxed mb-6">
                Tangison Studio started in 2023 as Gemsweb Digital, founded by Tangi Iigonda with a clear mission: build fast, honest, and functional digital products for businesses in Namibia and across Africa. What began as a solo operation in Windhoek has grown into a studio that serves organizations in tourism, finance, education, agriculture, mining, and more.
              </p>
              <p className="font-satoshi text-ink-muted text-base md:text-lg leading-relaxed mb-6">
                Under the Gemsweb Digital name, the studio delivered websites, AI tools, and brand systems for clients across Namibia. As the work grew in scope and ambition, the evolution to Tangison Studio became a natural next step: a sharper identity, a broader vision, and the same commitment to doing good work.
              </p>
              <p className="font-satoshi text-ink-muted text-base md:text-lg leading-relaxed">
                Tangison Studio is part of Tangison Technologies. The studio operates from Windhoek, Namibia, and works with clients across Africa and internationally.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp}>
            <div className="editorial-divider mb-8" />
            <h2 className="font-cabinet text-2xl md:text-3xl font-bold tracking-tight text-ink mb-4">
              Client Testimonials
            </h2>
            <p className="font-satoshi text-ink-muted text-base md:text-lg max-w-xl leading-relaxed mb-12">
              Real feedback from the organizations we have worked with across Namibia.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="border border-card-border bg-signal-white p-6 hover:border-signal-teal/30 hover:bg-ocean-mist/20 transition-all duration-500"
              >
                <Quote className="w-5 h-5 text-signal-teal/40 mb-4" />
                {"alert" in testimonial && testimonial.alert && (
                  <span className="inline-block font-jetbrains text-[8px] uppercase tracking-[0.2em] text-signal-teal bg-signal-teal/10 px-2 py-0.5 mb-3">
                    CRITICAL ALIGNMENT ALERT: SYSTEM RISK MITIGATED
                  </span>
                )}
                <p className="font-satoshi text-ink text-sm md:text-base leading-relaxed mb-5">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="border-t border-card-border pt-4">
                  <p className="font-cabinet text-sm font-bold text-ink">{testimonial.author}</p>
                  <p className="font-satoshi text-ink-muted text-xs mt-0.5">{testimonial.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
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
              { name: "GemsWeb Digital", year: "2023", description: "Founded by Tangi Iigonda in Windhoek, Namibia as Gemsweb Digital. Started as a digital agency delivering websites, brand systems, and AI tools for businesses across Namibia." },
              { name: "Tangison Studio", year: "2025", description: "Grew into Tangison Studio: a creative digital agency focused on strategic design and engineering with a sharper identity and a broader vision. Part of Tangison Technologies." },
            ].map((entry, i) => (
              <motion.div
                key={entry.name}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.1 }}
                className="relative pl-8 pb-12 last:pb-0"
              >
                <div className="absolute left-0 top-2 bottom-0 w-[1px] bg-black/[0.08]" aria-hidden="true" />
                <div className="absolute left-0 top-2 -translate-x-1/2 w-2 h-2 bg-signal-teal" aria-hidden="true" />
                <span className="font-jetbrains text-[10px] text-signal-teal uppercase tracking-[0.2em] mb-2 block">{entry.year}</span>
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
