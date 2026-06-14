"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { SiteShell } from "@/components/tangison/site-shell";
import { fadeUp } from "@/lib/motion";

/* ──────────────────────────────────────────────
   PROJECT DATA
   ────────────────────────────────────────────── */

const projects = [
  {
    name: "ProAvia Travel & Tours",
    logo: "/images/work/proavia-logo.webp",
    screenshot: "/images/work/screenshots/proavia-screenshot.webp",
    description:
      "Premium travel logistics, tours, and transfers from Walvis Bay, Namibia.",
    tags: "Website Design & Development · Travel & Tourism",
    url: "https://proaviainc.com",
  },
  {
    name: "Nalago Skincare",
    logo: "/images/work/nalago-logo.webp",
    screenshot: "/images/work/screenshots/nalago-screenshot.webp",
    description:
      "Kalahari-inspired organic skincare built for the African market.",
    tags: "Website Design & E-Commerce · Beauty & Wellness",
    url: "https://nalago-nam.com",
  },
  {
    name: "Cluster Leaf Safaris",
    logo: "/images/work/clusterleaf-logo.webp",
    screenshot: "/images/work/screenshots/clusterleaf-screenshot.webp",
    description:
      "Owner-operated safari experiences across Namibia, Botswana, Zimbabwe & Zambia.",
    tags: "Website Design & Development · Safari & Tourism",
    url: "https://www.clusterleafsafaris.com",
  },
  {
    name: "SMEFrog",
    logo: "/images/work/smefrog-logo.webp",
    screenshot: "/images/work/screenshots/smefrog-screenshot.webp",
    description:
      "Namibia's remote business registration and compliance platform.",
    tags: "Product Design & Development · LegalTech",
    url: "https://smefrog.tangison.com",
  },
  {
    name: "Petrocor",
    logo: "/images/work/petrocor-logo.webp",
    screenshot: "/images/work/screenshots/petrocor-screenshot.webp",
    description:
      "Wholesale petroleum and chemical distribution across Southern Africa.",
    tags: "Website Design & Development · Energy & Resources",
    url: "https://petrocor.blackstarhorizon.com",
  },
  {
    name: "Tangison Systems",
    logo: "/images/work/tangison-logo.webp",
    screenshot: "/images/work/screenshots/tangison-screenshot.webp",
    description:
      "Sovereign intelligence infrastructure and applied AI lab from Windhoek.",
    tags: "Website Design & Development · Technology",
    url: "https://tangison.com",
  },
  {
    name: "Crescendo Namibia",
    logo: "/images/work/crescendo-logo.webp",
    screenshot: "/images/work/screenshots/crescendo-screenshot.webp",
    description:
      "Musical instruments, lessons, and academy platform serving Windhoek since 2009.",
    tags: "Website Design & Development · Music & Education",
    url: "https://cresendona.com",
  },
  {
    name: "Feorm",
    logo: "/images/work/feorm-logo.webp",
    screenshot: "/images/work/screenshots/feorm-screenshot.webp",
    description:
      "Agrotourism and equipment rental marketplace for Namibian farming communities.",
    tags: "Platform Design & Development · Agriculture",
    url: "https://feorm.tangison.com",
  },
];

/* ──────────────────────────────────────────────
   WORK PAGE
   ────────────────────────────────────────────── */

export function WorkPage() {
  return (
    <SiteShell>
      {/* Header */}
      <section className="pt-36 md:pt-44 pb-20 md:pb-28 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp}>
            <span className="font-jetbrains text-[10px] uppercase tracking-[0.3em] text-signal-teal block mb-6">
              Work
            </span>
            <h1 className="font-cabinet text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-ink mb-6">
              What We&apos;ve Built
            </h1>
            <p className="font-satoshi text-lg md:text-xl text-ink-muted max-w-2xl leading-relaxed">
              Websites, platforms, and digital products for organizations
              across Namibia and beyond. Each project is designed and built from
              the ground up.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Project Grid */}
      <section className="pb-28 md:pb-36 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block border border-card-border bg-signal-white hover:border-signal-teal/30 hover:bg-ocean-mist/30 transition-all duration-500"
                >
                  {/* Screenshot */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={project.screenshot}
                      alt={`${project.name} screenshot`}
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={i < 2}
                    />
                    {/* Logo pill — bottom-left, overlapping edge */}
                    <div className="absolute bottom-3 left-3 bg-signal-white px-2 py-1.5 flex items-center justify-center shadow-sm">
                      <Image
                        src={project.logo}
                        alt={`${project.name} logo`}
                        width={0}
                        height={0}
                        sizes="40px"
                        className="h-[32px] w-auto object-contain"
                        style={{ maxHeight: "32px" }}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8">
                    <h3 className="font-cabinet text-xl md:text-2xl font-bold tracking-tight text-ink group-hover:text-signal-teal transition-colors duration-300 mb-2">
                      {project.name}
                    </h3>
                    <p className="font-satoshi text-ink-muted text-sm md:text-base leading-relaxed mb-4">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-jetbrains text-[10px] uppercase tracking-[0.15em] text-ink-muted/50">
                        {project.tags}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-ink-muted/30 group-hover:text-signal-teal transition-colors duration-300" />
                    </div>
                  </div>
                </a>
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
              We design and build digital products that get results. Start a
              conversation and let&apos;s build something together.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-3 bg-signal-teal text-signal-white px-10 py-5 font-cabinet font-bold text-sm tracking-tight hover:opacity-90 hover:-translate-y-px transition-all duration-300"
            >
              Start a Project &rarr;
            </a>
          </motion.div>
        </div>
      </section>
    </SiteShell>
  );
}
