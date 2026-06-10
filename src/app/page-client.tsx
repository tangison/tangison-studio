"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { SiteShell } from "@/components/tangison/site-shell";

/* ──────────────────────────────────────────────
   IMAGE DATA
   ────────────────────────────────────────────── */

const heroImages = [
  { src: "/images/gallery/hero-01-digital-interface.webp", alt: "Abstract digital interface grid" },
  { src: "/images/gallery/hero-02-ai-workflow.webp", alt: "AI workflow node diagram" },
  { src: "/images/gallery/hero-slider-namibia.webp", alt: "Namibian desert landscape at dawn" },
];

const featuredWork = [
  {
    name: "Tangison Agent",
    category: "Application Design",
    href: "/work",
    image: "/images/gallery/work-tangison-agent.webp",
    imageAlt: "Tangison Agent platform design",
  },
  {
    name: "SkillsCamp",
    category: "Product Design",
    href: "/work",
    image: "/images/gallery/work-skillscamp.webp",
    imageAlt: "SkillsCamp product design",
  },
  {
    name: "SMEFrog Academy",
    category: "Website Design",
    href: "/work",
    image: "/images/gallery/work-smefrog-academy.webp",
    imageAlt: "SMEFrog Academy interface design",
  },
];

const services = [
  "Website Design",
  "Website Development",
  "Application Design",
  "Product Design",
  "Brand Systems",
  "Design Systems",
  "Creative Direction",
];

const processSteps = [
  { num: "01", name: "Discover" },
  { num: "02", name: "Define" },
  { num: "03", name: "Design" },
  { num: "04", name: "Develop" },
  { num: "05", name: "Launch" },
];

const principles = ["Strategic", "Functional", "Beautiful", "Scalable"];

/* ──────────────────────────────────────────────
   ANIMATION VARIANTS
   ────────────────────────────────────────────── */

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" as const },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
};

/* ──────────────────────────────────────────────
   HERO SECTION
   ────────────────────────────────────────────── */

function HeroSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroSearchQuery, setHeroSearchQuery] = useState("");
  const router = useRouter();
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!headingRef.current) return;
    const words = headingRef.current.querySelectorAll(".hero-word");
    if (words.length === 0) return;
    const tl = gsap.timeline({ delay: 0.6 });
    tl.fromTo(
      words,
      { y: 60, opacity: 0, rotateX: -15 },
      { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.12, ease: "power4.out" }
    );
    return () => { tl.kill(); };
  }, []);

  const handleHeroSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const q = heroSearchQuery.trim().toLowerCase();
    if (!q) return;
    // Route to relevant section based on search
    if (q.includes("work") || q.includes("portfolio") || q.includes("project") || q.includes("case stud")) {
      router.push("/work");
    } else if (q.includes("service") || q.includes("design") || q.includes("develop") || q.includes("brand")) {
      router.push("/services");
    } else if (q.includes("contact") || q.includes("start") || q.includes("hire") || q.includes("build")) {
      router.push("/contact");
    } else if (q.includes("about") || q.includes("studio") || q.includes("team")) {
      router.push("/about");
    } else if (q.includes("process") || q.includes("how")) {
      router.push("/process");
    } else if (q.includes("sme") || q.includes("startup")) {
      router.push("/work/smes");
    } else if (q.includes("min")) {
      router.push("/work/mining");
    } else if (q.includes("govern") || q.includes("public")) {
      router.push("/work/government");
    } else if (q.includes("tour") || q.includes("hotel") || q.includes("safari")) {
      router.push("/work/tourism");
    } else if (q.includes("agri") || q.includes("farm")) {
      router.push("/work/agriculture");
    } else if (q.includes("financ") || q.includes("bank") || q.includes("fintech")) {
      router.push("/work/finance");
    } else if (q.includes("educ") || q.includes("learn")) {
      router.push("/work/education");
    } else if (q.includes("health") || q.includes("medic")) {
      router.push("/work/healthcare");
    } else if (q.includes("energy") || q.includes("solar") || q.includes("utilit")) {
      router.push("/work/energy");
    } else {
      router.push("/work");
    }
    setHeroSearchQuery("");
  }, [heroSearchQuery, router]);

  const headline = "We design and build digital experiences that move ideas forward.";

  return (
    <section
      className="hero hero-viewport relative w-full flex items-center overflow-hidden box-border bg-atlantic-black"
      aria-label="Hero section"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={heroImages[currentSlide].src}
              alt={heroImages[currentSlide].alt}
              className="object-cover"
              fill
              sizes="100vw"
              priority={currentSlide === 0}
            />
          </motion.div>
        </AnimatePresence>
        {/* Gradient overlay — atmospheric depth for dark hero */}
        <div className="absolute inset-0 bg-gradient-to-b from-atlantic-black/80 via-atlantic-black/50 to-atlantic-black/90" />
      </div>

      {/* Content */}
      <motion.div style={{ opacity: heroOpacity }} className="relative z-10 max-w-7xl w-full px-6 md:px-12 lg:px-20 pb-28 md:pb-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left: Text */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-2 h-2 bg-signal-teal" aria-hidden="true" />
              <span
                className="font-jetbrains uppercase tracking-[0.25em] text-skeleton-bone/60"
                style={{ fontSize: "clamp(0.65rem, 1.2vw, 0.75rem)" }}
              >
                Creative Digital Agency
              </span>
            </motion.div>

            <h1
              ref={headingRef}
              className="font-cabinet font-black tracking-[-0.04em] leading-[0.95] text-skeleton-bone mb-8"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 6rem)",
                perspective: "800px",
              }}
            >
              {headline.split(" ").map((word, i) => (
                <span
                  key={i}
                  className="hero-word inline-block mr-[0.2em]"
                  style={{ opacity: 0 }}
                >
                  {word}
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-skeleton-bone/60 font-satoshi text-lg md:text-xl font-light leading-relaxed mb-10 max-w-lg"
            >
              Strategy, design, and engineering from Windhoek.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/work"
                className="pill-button bg-signal-teal text-signal-white px-7 py-4 font-cabinet font-bold text-sm tracking-tight hover:opacity-90 hover:-translate-y-px transition-all duration-300 flex items-center gap-2"
                style={{ borderRadius: "999px" }}
              >
                Explore Work →
              </Link>
              <Link
                href="/contact"
                className="pill-button border border-signal-teal text-signal-teal px-7 py-4 font-cabinet font-bold text-sm tracking-tight hover:bg-signal-teal/10 transition-all duration-300"
                style={{ borderRadius: "999px" }}
              >
                Start a Project
              </Link>
            </motion.div>
          </div>

          {/* Right: Large editorial image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-64 md:h-80 lg:h-[560px] overflow-hidden hidden lg:block lg:col-span-5"
          >
            <Image
              src="/images/gallery/hero-editorial-studio.webp"
              alt="Minimal studio workspace"
              className="object-cover cinematic-image"
              fill
              sizes="40vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-atlantic-black/20" />
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Search/Action Bar — model.na inspired */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute z-20"
        style={{
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(600px, 90%)",
        }}
      >
        <form
          onSubmit={handleHeroSearch}
          className="hero-search-bar flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-0"
          style={{
            borderRadius: "999px",
            background: "rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
            padding: "0.4rem",
          }}
        >
          <div className="flex items-center gap-2 px-4 py-2 sm:py-0 flex-1">
            <Search className="w-4 h-4 text-skeleton-bone/40 shrink-0" />
            <input
              ref={searchInputRef}
              type="text"
              value={heroSearchQuery}
              onChange={(e) => setHeroSearchQuery(e.target.value)}
              placeholder="Search projects, services..."
              className="flex-1 bg-transparent font-satoshi text-sm text-skeleton-bone placeholder:text-skeleton-bone/30 focus:outline-none min-w-0"
              aria-label="Search projects and services"
            />
          </div>
          <button
            type="submit"
            className="bg-signal-teal text-signal-white px-6 py-2.5 font-cabinet font-bold text-xs tracking-tight hover:opacity-90 transition-all duration-300 shrink-0"
            style={{ borderRadius: "999px" }}
          >
            Start a Project →
          </button>
        </form>
      </motion.div>

      {/* Slider indicators */}
      <motion.div
        style={{ opacity: heroOpacity }}
        className="absolute bottom-8 left-6 md:left-12 lg:left-20 flex items-end gap-1.5 z-20"
        aria-label="Image slider indicators"
      >
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className="p-1.5 flex items-center"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === currentSlide ? "true" : undefined}
          >
            <span
              className={`block transition-all duration-700 ${
                i === currentSlide
                  ? "w-6 h-[1px] bg-signal-teal"
                  : "w-3 h-[1px] bg-skeleton-bone/20 hover:bg-skeleton-bone/40"
              }`}
            />
          </button>
        ))}
      </motion.div>

      {/* Bottom edge line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/[0.05]" aria-hidden="true" />
    </section>
  );
}

/* ──────────────────────────────────────────────
   FEATURED WORK
   ────────────────────────────────────────────── */

function FeaturedWorkSection() {
  return (
    <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-signal-white" aria-label="Featured work">
      <div className="max-w-[1400px] mx-auto">
        <motion.div {...fadeUp} className="flex items-center gap-4 mb-4">
          <div className="editorial-divider" aria-hidden="true" />
        </motion.div>
        <motion.h2 {...fadeUp} className="font-cabinet text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-ink mb-16 md:mb-20">
          Featured Work
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {featuredWork.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={project.href} className="group block">
                {/* Image */}
                <div className="relative h-64 md:h-80 overflow-hidden mb-4">
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    className="object-cover cinematic-image group-hover:scale-105 transition-transform duration-700"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                {/* Caption */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-jetbrains text-[10px] text-signal-teal uppercase tracking-[0.2em] block mb-1">
                      {project.category}
                    </span>
                    <h3 className="font-cabinet text-xl md:text-2xl font-bold tracking-tight text-ink group-hover:text-signal-teal transition-colors duration-300">
                      {project.name}
                    </h3>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-ink-muted group-hover:text-signal-teal group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   SERVICES GRID
   ────────────────────────────────────────────── */

function ServicesSection() {
  return (
    <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-skeleton-bone" aria-label="Services">
      <div className="max-w-[1400px] mx-auto">
        <motion.div {...fadeUp} className="flex items-center gap-4 mb-4">
          <div className="editorial-divider" aria-hidden="true" />
        </motion.div>
        <motion.h2 {...fadeUp} className="font-cabinet text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-ink mb-16 md:mb-20">
          Services
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href="/services"
                className="pillar-card group block border border-black/[0.06] bg-signal-white p-6 md:p-8 h-full"
              >
                {/* Teal accent line */}
                <div className="w-8 h-[2px] bg-signal-teal mb-6" aria-hidden="true" />
                <h3 className="font-cabinet text-lg md:text-xl font-bold tracking-tight text-ink group-hover:text-signal-teal transition-colors duration-300">
                  {service}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   PROCESS STEPS
   ────────────────────────────────────────────── */

function ProcessSection() {
  return (
    <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-signal-white" aria-label="Our process">
      <div className="max-w-[1400px] mx-auto">
        <motion.div {...fadeUp} className="flex items-center gap-4 mb-4">
          <div className="editorial-divider" aria-hidden="true" />
        </motion.div>
        <motion.h2 {...fadeUp} className="font-cabinet text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-ink mb-16 md:mb-20">
          Process
        </motion.h2>

        {/* Horizontal step-through */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-0">
          {processSteps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4 sm:flex-1"
            >
              <div className="flex items-center gap-3">
                <span className="font-jetbrains text-[11px] text-signal-teal tracking-[0.15em]">
                  {step.num}
                </span>
                <span className="font-cabinet text-xl md:text-2xl font-bold tracking-tight text-ink">
                  {step.name}
                </span>
              </div>
              {i < processSteps.length - 1 && (
                <ArrowRight className="w-4 h-4 text-fog-gray hidden sm:block ml-auto mr-4 shrink-0" />
              )}
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp} className="mt-12">
          <Link
            href="/process"
            className="inline-flex items-center gap-2 font-jetbrains text-[11px] uppercase tracking-[0.15em] text-ink-muted hover:text-signal-teal transition-colors duration-300 group"
          >
            Learn more about our process
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   STUDIO PRINCIPLES
   ────────────────────────────────────────────── */

function PrinciplesSection() {
  return (
    <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-skeleton-bone" aria-label="Studio principles">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-x-12 md:gap-x-20 gap-y-6">
          {principles.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-cabinet text-4xl md:text-6xl lg:text-8xl font-black tracking-[-0.04em] text-ink"
            >
              {word}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   CONTACT TEASER
   ────────────────────────────────────────────── */

function ContactTeaserSection() {
  return (
    <section className="relative py-32 md:py-48 px-6 md:px-12 lg:px-20 bg-atlantic-black overflow-hidden" aria-label="Start a project">
      {/* Gradient atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-br from-deep-ocean/40 via-atlantic-black to-terminal-black/60 pointer-events-none" />
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-cabinet text-[clamp(2.5rem,6vw,6rem)] font-black tracking-[-0.04em] text-skeleton-bone mb-10 leading-[0.9] relative z-10"
        >
          Ready to build something?
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-signal-teal text-signal-white px-10 py-5 font-cabinet font-bold text-sm tracking-tight hover:opacity-88 hover:-translate-y-px transition-all duration-300 group"
          >
            Start a Project →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   HOME PAGE (CLIENT COMPONENT)
   ────────────────────────────────────────────── */

export function HomePage() {
  return (
    <SiteShell>
      <HeroSection />
      <FeaturedWorkSection />
      <ServicesSection />
      <ProcessSection />
      <PrinciplesSection />
      <ContactTeaserSection />
    </SiteShell>
  );
}
