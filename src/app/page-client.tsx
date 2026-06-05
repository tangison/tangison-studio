"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { SiteShell } from "@/components/tangison/site-shell";

/* ──────────────────────────────────────────────
   IMAGE DATA
   ────────────────────────────────────────────── */

const heroSlides = [
  { src: "/images/gallery/desert-path-quiver-trees.webp", alt: "Quiver trees lining a desert path in southern Namibia" },
  { src: "/images/gallery/desert-road-landscape.webp", alt: "Desert road stretching toward the horizon in Namibia" },
  { src: "/images/gallery/desert-shadow-landscape.webp", alt: "Namibian desert landscape with long morning shadows" },
  { src: "/images/gallery/desert-glass-concrete-landscape.webp", alt: "Modern concrete and glass architecture in the Namibian desert" },
  { src: "/images/gallery/desert-road-line.webp", alt: "Straight desert road under a vast Namibian sky" },
];

const pillarImages = [
  { src: "/images/gallery/concrete-glass-architecture-blue-sky.webp", alt: "Concrete and glass building under blue sky representing custom AI systems" },
  { src: "/images/gallery/concrete-glass-architecture-structure.webp", alt: "Architectural structure representing self-hosted AI infrastructure" },
  { src: "/images/gallery/desk-succulent-sketch-pencil.webp", alt: "Desk with succulent and pencil sketch representing applied AI research" },
  { src: "/images/gallery/business-registration-compliance.webp", alt: "Business documents and forms representing TANGISON product lineup" },
];

const productSlides: { tag: string; title: string; desc: string; href: string; external: string | null; image: string; imageAlt: string }[] = [
  {
    tag: "PRODUCT",
    title: "SkillsCamp",
    desc: "531+ modular AI agent skills running on your servers, not the cloud. Built for African conditions.",
    href: "/products/skillscamp",
    external: null,
    image: "/images/gallery/desk-books-lamp-sunlight.webp",
    imageAlt: "Warm workspace with books and desk lamp for AI skill development",
  },
  {
    tag: "PRODUCT",
    title: "SMEFrog Academy",
    desc: "AI training designed for African SMEs. Your team learns to deploy and manage AI in your business. No technical background required.",
    href: "/products/smefrog-academy",
    external: null,
    image: "/images/gallery/business-registration-compliance.webp",
    imageAlt: "Business registration documents for African SME AI training",
  },
  {
    tag: "PRODUCT",
    title: "Tangison Agent",
    desc: "AI agents that run operations on their own. Deploy once. Monitor in real time. Scale without limits.",
    href: "/products/tangison-agent",
    external: null,
    image: "/images/gallery/concrete-glass-architecture.webp",
    imageAlt: "Concrete and glass architecture representing autonomous AI agent deployment",
  },
  {
    tag: "COLLABORATION",
    title: "Feorm",
    desc: "Data orchestration for complex African business workflows. Built with Tuppaman Investment.",
    href: "/products/feorm",
    external: null,
    image: "/images/gallery/minimalist-desk-objects.webp",
    imageAlt: "Minimalist desk with geometric objects representing data workflow orchestration",
  },
];

const whyImages = [
  { src: "/images/gallery/concrete-glass-metal-connection.webp", alt: "Concrete, glass, and metal joints in structural architecture" },
  { src: "/images/gallery/concrete-succulent-metal-edge.webp", alt: "Desert succulent growing against a concrete and metal edge" },
];

const researchImages = [
  { src: "/images/gallery/concrete-glass-architecture-structure.webp", alt: "Multi-agent orchestration research for African enterprise" },
  { src: "/images/gallery/concrete-glass-metal-connection.webp", alt: "Offline-first AI systems designed for unreliable networks" },
  { src: "/images/gallery/desert-path-mountain-view.webp", alt: "African language model development and regional NLP research" },
];

/* ──────────────────────────────────────────────
   DATA
   ────────────────────────────────────────────── */

const pillars = [
  {
    num: "01",
    title: "Applied AI",
    desc: "Custom AI agents and systems that solve your specific business problems. No templates. No generic solutions.",
    href: "/services/applied-ai",
  },
  {
    num: "02",
    title: "AI Infrastructure",
    desc: "Agent orchestration and deployment on your own servers. No cloud dependency. No vendor lock-in.",
    href: "/services/infrastructure",
  },
  {
    num: "03",
    title: "Research & Development",
    desc: "Applied research that becomes real products and capabilities, not papers on a shelf.",
    href: "/research",
  },
  {
    num: "04",
    title: "Products",
    desc: "531+ agent skills in SkillsCamp. SMEFrog Academy for AI training. More products shipping from our lab.",
    href: "/products",
  },
];

const differentiators = [
  {
    title: "Africa-first",
    desc: "Built in Namibia for African business conditions. Not Western software with local labels.",
  },
  {
    title: "Laboratory approach",
    desc: "We research before we build. We build before we ship. Rigor over speed.",
  },
  {
    title: "Working AI",
    desc: "Our AI assistant is live on this site right now. We demonstrate, not just claim.",
  },
  {
    title: "Engineered to last",
    desc: "No shortcuts. No templates. No compromises. Every system is built to perform for years, not months.",
  },
];

const researchCards = [
  {
    title: "Agent Architecture",
    desc: "Orchestration patterns that make multiple AI agents coordinate complex business workflows reliably.",
  },
  {
    title: "Offline-First AI",
    desc: "AI systems that run locally and stay operational when your internet connection drops.",
  },
  {
    title: "African Language Models",
    desc: "Language models trained on regional contexts, not English-only datasets repackaged for Africa.",
  },
];

/* ──────────────────────────────────────────────
   ANIMATION VARIANTS
   ────────────────────────────────────────────── */

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" as const },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
};

/* ──────────────────────────────────────────────
   HERO SECTION WITH SLIDER
   ────────────────────────────────────────────── */

function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1200], [0, 250]);
  const scale = useTransform(scrollY, [0, 1200], [1, 1.1]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  // Auto-advance hero slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // GSAP word reveal
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

  const headline = "Applied AI. Built in Africa.";

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col justify-end pb-20 md:pb-32 px-6 md:px-12 lg:px-20 overflow-hidden bg-atlantic-black"
      aria-label="Hero section"
    >
      {/* Slider Background Images */}
      <motion.div
        style={{ y: y1, scale }}
        className="absolute inset-0 w-full h-[130%] -top-[15%] will-change-transform"
      >
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
              src={heroSlides[currentSlide].src}
              alt={heroSlides[currentSlide].alt}
              className="object-cover cinematic-image"
              fill
              sizes="100vw"
              priority={currentSlide === 0}
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-atlantic-black via-atlantic-black/70 to-atlantic-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-atlantic-black/80 via-atlantic-black/30 to-transparent" />
        <div className="absolute inset-0 bg-atlantic-black/20" />
        <div
          className="absolute inset-0"
          style={{ boxShadow: "inset 0 0 150px 60px rgba(10,11,12,0.5)" }}
          aria-hidden="true"
        />
      </motion.div>

      {/* Content */}
      <motion.div style={{ opacity: heroOpacity }} className="relative z-10 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-2 h-2 bg-rust-signal" aria-hidden="true" />
          <span className="font-jetbrains text-[11px] text-skeleton-bone/60 uppercase tracking-[0.25em]">
            Applied AI Laboratory
          </span>
        </motion.div>

        <h1
          ref={headingRef}
          className="font-cabinet text-[clamp(2.8rem,7vw,7rem)] font-black tracking-[-0.04em] leading-[0.9] text-skeleton-bone mb-8"
          style={{ perspective: "800px" }}
        >
          {headline.split(" ").map((word, i) => (
            <span
              key={i}
              className="hero-word inline-block mr-[0.25em]"
              style={{ opacity: 0 }}
            >
              {word}
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl mb-10"
        >
          <p className="text-skeleton-bone/70 font-satoshi text-lg md:text-xl leading-relaxed font-light">
            AI systems that work where you operate. Infrastructure that stays
            up when networks drop. Products built for African conditions, not
            adapted from elsewhere. We build from Windhoek.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap gap-4"
        >
          <Link
            href="/services"
            className="bg-rust-signal text-warm-white px-8 py-5 font-jetbrains text-xs uppercase tracking-widest hover:bg-rust-light transition-colors flex items-center gap-3 group"
          >
            Explore Services
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            href="/contact"
            className="border border-skeleton-bone/20 text-skeleton-bone px-8 py-5 font-jetbrains text-xs uppercase tracking-widest hover:bg-white/5 transition-colors focus-visible:outline-2 focus-visible:outline-rust-signal focus-visible:outline-offset-2"
          >
            Contact Us
          </Link>
        </motion.div>
      </motion.div>

      {/* Slider indicators — bottom-left, clean horizontal lines */}
      <motion.div
        style={{ opacity: heroOpacity }}
        className="absolute bottom-8 left-6 md:left-12 lg:left-20 flex items-end gap-1.5 z-20"
        aria-label="Image slider indicators"
      >
        {heroSlides.map((_, i) => (
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
                  ? "w-6 h-[1px] bg-rust-signal"
                  : "w-3 h-[1px] bg-white/20 hover:bg-white/40"
              }`}
            />
          </button>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity: heroOpacity }}
        className="absolute bottom-10 right-8 md:right-12 flex flex-col items-center gap-4 opacity-30 md:opacity-100"
        aria-hidden="true"
      >
        <span
          className="font-jetbrains text-[9px] text-white/40 tracking-[0.3em]"
          style={{ writingMode: "vertical-rl" }}
        >
          SCROLL
        </span>
        <div className="w-[1px] h-16 bg-white/10 relative overflow-hidden">
          <div
            className="w-full h-6 absolute top-0"
            style={{
              background: "linear-gradient(to bottom, transparent, rgba(197,106,74,0.4), transparent)",
              animation: "scroll-pulse 2.8s cubic-bezier(0.16, 1, 0.3, 1) infinite",
            }}
          />
        </div>
      </motion.div>

      {/* Bottom edge line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/5" aria-hidden="true" />
    </section>
  );
}

/* ──────────────────────────────────────────────
   PILLARS SECTION WITH IMAGES
   ────────────────────────────────────────────── */

function PillarsSection() {
  return (
    <section
      className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-warm-white"
      aria-label="What we do"
    >
      <div className="max-w-[1400px] mx-auto">
        <motion.div {...fadeUp} className="flex items-center gap-4 mb-4">
          <div className="editorial-divider" aria-hidden="true" />
        </motion.div>
        <motion.h2
          {...fadeUp}
          className="font-cabinet text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-ink mb-16 md:mb-20"
        >
          What We Do
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={pillar.href}
                className="pillar-card group block border border-black/[0.06] bg-warm-white h-full overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-48 md:h-56 overflow-hidden">
                  <Image
                    src={pillarImages[i].src}
                    alt={pillarImages[i].alt}
                    className="object-cover cinematic-image group-hover:scale-105 transition-transform duration-700"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-warm-white via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-rust-signal" aria-hidden="true" />
                    <span className="font-jetbrains text-[10px] text-white uppercase tracking-[0.2em] drop-shadow-sm">
                      {pillar.num}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <h3 className="font-cabinet text-xl font-bold tracking-tight text-ink mb-3 group-hover:text-rust-signal transition-colors duration-300">
                    {pillar.title}
                  </h3>
                  <p className="font-satoshi text-ink-muted text-sm leading-relaxed mb-6">
                    {pillar.desc}
                  </p>
                  <div className="flex items-center gap-2 text-ink-muted group-hover:text-rust-signal transition-colors duration-300">
                    <span className="font-jetbrains text-[10px] uppercase tracking-[0.15em]">
                      Explore
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
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
   PRODUCTS SLIDER SECTION
   ────────────────────────────────────────────── */

function ProductsSliderSection() {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const goTo = useCallback((dir: "prev" | "next") => {
    setCurrent((prev) =>
      dir === "next"
        ? (prev + 1) % productSlides.length
        : prev === 0
        ? productSlides.length - 1
        : prev - 1
    );
  }, []);

  // Auto-advance
  useEffect(() => {
    const interval = setInterval(() => goTo("next"), 7000);
    return () => clearInterval(interval);
  }, [goTo]);

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(diff > 0 ? "next" : "prev");
    touchStartX.current = null;
  };

  const product = productSlides[current];

  return (
    <section
      className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-warm-gray"
      aria-label="Products"
    >
      <div className="max-w-[1400px] mx-auto">
        <motion.div {...fadeUp} className="flex items-center gap-4 mb-4">
          <div className="editorial-divider" aria-hidden="true" />
        </motion.div>
        <div className="flex items-end justify-between mb-16 md:mb-20">
          <motion.h2
            {...fadeUp}
            className="font-cabinet text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-ink"
          >
            Products
          </motion.h2>
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => goTo("prev")}
              className="flex items-center gap-2 text-ink-muted hover:text-ink transition-colors group"
              aria-label="Previous product"
            >
              <span className="w-6 h-[1px] bg-current transition-all duration-300 group-hover:w-8" />
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="font-jetbrains text-[10px] text-ink-muted tracking-widest min-w-[3rem] text-center">
              {String(current + 1).padStart(2, "0")} / {String(productSlides.length).padStart(2, "0")}
            </span>
            <button
              onClick={() => goTo("next")}
              className="flex items-center gap-2 text-ink-muted hover:text-ink transition-colors group"
              aria-label="Next product"
            >
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="w-6 h-[1px] bg-current transition-all duration-300 group-hover:w-8" />
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative border border-black/[0.06] bg-warm-white overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-2"
            >
              {/* Image */}
              <div className="relative h-64 md:h-full min-h-[320px] overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  className="object-cover cinematic-image"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-warm-white/10 hidden md:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-warm-white/20 to-transparent md:hidden" />
              </div>

              {/* Content */}
              <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                <span className="font-jetbrains text-[10px] text-rust-signal uppercase tracking-[0.25em] mb-4 block">
                  {product.tag}
                </span>
                <h3 className="font-cabinet text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-ink mb-4">
                  {product.title}
                </h3>
                <p className="font-satoshi text-ink-muted text-base md:text-lg leading-relaxed max-w-xl mb-6">
                  {product.desc}
                </p>
                {product.external && (
                  <a
                    href={product.external}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-jetbrains text-xs text-rust-signal hover:text-rust-light transition-colors mb-6 uppercase tracking-[0.1em]"
                  >
                    {product.external.replace("https://", "")}
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
                <div>
                  <Link
                    href={product.href}
                    className="inline-flex items-center gap-3 bg-rust-signal text-warm-white px-8 py-4 font-jetbrains text-xs uppercase tracking-widest hover:bg-rust-light transition-colors group"
                    aria-label={`Learn more about ${product.title}`}
                  >
                    Explore {product.title}
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

        </motion.div>

        {/* Mobile nav with inline indicators */}
        <div className="flex md:hidden items-center justify-center gap-4 mt-6">
          <button
            onClick={() => goTo("prev")}
            className="flex items-center gap-2 text-ink-muted hover:text-ink transition-colors group"
            aria-label="Previous product"
          >
            <span className="w-5 h-[1px] bg-current transition-all duration-300 group-hover:w-7" />
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          {/* Inline horizontal-line indicators */}
          <div className="flex items-center gap-1" aria-label="Product slider indicators">
            {productSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="p-1 flex items-center"
                aria-label={`Go to product ${i + 1}`}
                aria-current={i === current ? "true" : undefined}
              >
                <span
                  className={`block transition-all duration-500 ${
                    i === current ? "w-5 h-[1px] bg-rust-signal" : "w-2.5 h-[1px] bg-black/15"
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            onClick={() => goTo("next")}
            className="flex items-center gap-2 text-ink-muted hover:text-ink transition-colors group"
            aria-label="Next product"
          >
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="w-5 h-[1px] bg-current transition-all duration-300 group-hover:w-7" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   WHY TANGISON SECTION WITH IMAGES
   ────────────────────────────────────────────── */

function WhyTangisonSection() {
  return (
    <section
      className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-warm-white"
      aria-label="Why TANGISON"
    >
      <div className="max-w-[1400px] mx-auto">
        <motion.div {...fadeUp} className="flex items-center gap-4 mb-4">
          <div className="editorial-divider" aria-hidden="true" />
        </motion.div>
        <motion.h2
          {...fadeUp}
          className="font-cabinet text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-ink mb-16 md:mb-20"
        >
          Why TANGISON
        </motion.h2>

        {/* Image + content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
          {/* Left image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative h-64 md:h-80 lg:h-auto overflow-hidden border border-black/[0.06]"
          >
            <Image
              src={whyImages[0].src}
              alt={whyImages[0].alt}
              className="object-cover cinematic-image"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </motion.div>

          {/* Differentiator cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {differentiators.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="border border-black/[0.06] p-6 md:p-8"
              >
                <h3 className="font-cabinet text-lg md:text-xl font-bold tracking-tight text-ink mb-3">
                  {item.title}
                </h3>
                <p className="font-satoshi text-ink-muted text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   VISUAL BREAK — FULL-WIDTH IMAGE
   ────────────────────────────────────────────── */

function VisualBreak() {
  return (
    <div className="relative h-48 md:h-72 lg:h-96 overflow-hidden" aria-hidden="true">
      <Image
        src="/images/gallery/sunlit-books-desk-lamp.webp"
        alt="Sunlit books on a desk with a warm lamp, representing knowledge and learning"
        className="object-cover cinematic-image"
        fill
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-warm-white via-transparent to-warm-white" />
      <div className="absolute inset-0 bg-warm-white/30" />
    </div>
  );
}

/* ──────────────────────────────────────────────
   RESEARCH PREVIEW SECTION WITH IMAGES
   ────────────────────────────────────────────── */

function ResearchPreviewSection() {
  return (
    <section
      className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-atlantic-black"
      aria-label="From the lab: research preview"
    >
      <div className="max-w-[1400px] mx-auto">
        <motion.div {...fadeUp} className="flex items-center gap-4 mb-4">
          <div className="w-10 h-[1px] bg-rust-signal/50" aria-hidden="true" />
        </motion.div>
        <motion.h2
          {...fadeUp}
          className="font-cabinet text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-skeleton-bone mb-16 md:mb-20"
        >
          From the Lab
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12">
          {researchCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href="/research"
                className="group block border border-white/[0.06] overflow-hidden hover:border-white/[0.12] transition-all duration-500 h-full"
              >
                {/* Card image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={researchImages[i].src}
                    alt={researchImages[i].alt}
                    className="object-cover cinematic-image group-hover:scale-105 transition-transform duration-700"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-atlantic-black via-atlantic-black/30 to-transparent" />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-rust-signal" aria-hidden="true" />
                    <span className="font-jetbrains text-[10px] text-skeleton-bone/60 uppercase tracking-[0.2em]">
                      RESEARCH
                    </span>
                  </div>
                </div>

                {/* Card content */}
                <div className="p-6 md:p-8">
                  <h3 className="font-cabinet text-lg md:text-xl font-bold tracking-tight text-skeleton-bone mb-3 group-hover:text-rust-signal transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="font-satoshi text-skeleton-bone/60 text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp} className="flex items-center">
          <Link
            href="/research"
            className="group inline-flex items-center gap-3 font-jetbrains text-xs uppercase tracking-[0.2em] text-skeleton-bone/60 hover:text-rust-signal transition-colors duration-300"
          >
            View All Research
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   CTA SECTION
   ────────────────────────────────────────────── */

function CTASection() {
  return (
    <section
      className="relative py-32 md:py-48 px-6 md:px-12 lg:px-20 overflow-hidden bg-atlantic-black"
      aria-label="Call to action"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/gallery/sand-shadow-grid-pattern.webp"
          alt="Sand and shadow grid pattern representing structured AI systems"
          className="object-cover cinematic-image opacity-25"
          fill
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-atlantic-black via-atlantic-black/90 to-atlantic-black" />
      </div>

      {/* Decorative elements */}
      <div
        className="absolute -right-32 -top-32 w-[500px] h-[500px] border-[1px] border-white/[0.03] pointer-events-none rotate-45"
        aria-hidden="true"
      />
      <div
        className="absolute -left-24 -bottom-24 w-[350px] h-[350px] border-[1px] border-white/[0.02] pointer-events-none rotate-12"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-cabinet text-[clamp(2.5rem,6vw,6rem)] font-black tracking-[-0.04em] text-skeleton-bone mb-6 leading-[0.9]"
        >
          Put AI to work in your business
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-cabinet text-2xl md:text-3xl font-bold text-skeleton-bone/60 mb-14"
        >
          Tell us what you want AI to do. We will figure out how.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-rust-signal text-warm-white px-10 py-5 font-jetbrains text-xs uppercase tracking-[0.2em] hover:bg-rust-light transition-colors duration-300 group"
          >
            Contact Us
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="border border-skeleton-bone/20 text-skeleton-bone px-8 py-5 font-jetbrains text-xs uppercase tracking-widest hover:bg-white/5 transition-colors"
          >
            Talk to our AI first
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-16 flex items-center justify-center gap-3 font-jetbrains text-[10px] text-skeleton-bone/30 uppercase tracking-[0.3em]"
        >
          <div className="w-1.5 h-1.5 bg-rust-signal/50" aria-hidden="true" />
          <span>Windhoek, Namibia</span>
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
      <PillarsSection />
      <ProductsSliderSection />
      <WhyTangisonSection />
      <VisualBreak />
      <ResearchPreviewSection />
      <CTASection />
    </SiteShell>
  );
}
