"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { STUDIO_EASE, DURATION } from "@/lib/motion";

/* ──────────────────────────────────────────────
   CAROUSEL DATA
   ────────────────────────────────────────────── */

const carouselPlans = [
  {
    name: "Care",
    price: "N$500/mo",
    tagline: "Your site, watched over.",
    illustration: "/images/partnership/plan-care.webp",
    illustrationAlt: "Skeleton Coast fog with lone acacia, analogue film",
  },
  {
    name: "Partner",
    price: "N$1,000/mo",
    tagline: "Your site, your brand, always moving.",
    illustration: "/images/partnership/plan-partner.webp",
    illustrationAlt: "Luderitz harbour and colonial architecture, analogue film",
  },
  {
    name: "Studio Plus",
    price: "N$2,000/mo",
    tagline: "Your studio, on call.",
    illustration: "/images/partnership/plan-studio-plus.webp",
    illustrationAlt: "Sossusvlei red dunes with figure at summit, analogue film",
  },
];

/* ──────────────────────────────────────────────
   DESKTOP PLAN CARDS — Cascade Stack
   Responsive sizing using percentages, not fixed px.
   Cards scale with the viewport for proper proportions
   at all desktop sizes (1280px+).
   ────────────────────────────────────────────── */

function DesktopPlanCards() {
  const featuredCards = [carouselPlans[2], carouselPlans[1]]; // Studio Plus, Partner

  return (
    <div className="hidden xl:flex relative w-full items-start justify-end min-h-[420px]">
      {/* Back card (Partner) — offset creating depth */}
      <motion.div
        initial={{ opacity: 0, y: 32, x: -16 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 1, delay: 0.8, ease: STUDIO_EASE }}
        className="absolute top-10 -left-2 w-[55%] max-w-[280px] z-[1]"
      >
        <div className="relative w-full aspect-[3/4] overflow-hidden border border-card-border bg-signal-white shadow-sm">
          <Image
            src={featuredCards[1].illustration}
            alt={featuredCards[1].illustrationAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1280px) 200px, 280px"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-signal-white/95 backdrop-blur-sm px-4 py-3 border-t border-card-border">
            <span className="font-jetbrains text-[7px] uppercase tracking-[0.2em] text-signal-teal block mb-0.5">
              Partnership
            </span>
            <h3 className="font-cabinet text-base font-bold tracking-tight text-ink">
              {featuredCards[1].name}
            </h3>
            <span className="font-cabinet text-sm font-bold tracking-tight text-signal-teal block">
              {featuredCards[1].price}
            </span>
            <Link
              href="/partnership"
              className="inline-flex items-center gap-1.5 font-jetbrains text-[9px] uppercase tracking-[0.15em] text-ink-muted hover:text-signal-teal transition-colors duration-300 mt-1.5 group"
            >
              See Plans
              <ArrowRight className="w-2.5 h-2.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Front card (Studio Plus) — on top, right-aligned */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6, ease: STUDIO_EASE }}
        className="relative w-[65%] max-w-[340px] z-[2] ml-auto"
      >
        <div className="relative w-full aspect-[3/4] overflow-hidden border border-card-border bg-signal-white shadow-md">
          <Image
            src={featuredCards[0].illustration}
            alt={featuredCards[0].illustrationAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1280px) 240px, 340px"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-signal-white/95 backdrop-blur-sm px-5 py-4 border-t border-card-border">
            <span className="font-jetbrains text-[8px] uppercase tracking-[0.2em] text-signal-teal block mb-0.5">
              Partnership
            </span>
            <h3 className="font-cabinet text-lg font-bold tracking-tight text-ink">
              {featuredCards[0].name}
            </h3>
            <span className="font-cabinet text-base font-bold tracking-tight text-signal-teal block">
              {featuredCards[0].price}
            </span>
            <Link
              href="/partnership"
              className="inline-flex items-center gap-1.5 font-jetbrains text-[10px] uppercase tracking-[0.15em] text-ink-muted hover:text-signal-teal transition-colors duration-300 mt-2 group"
            >
              See Plans
              <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   TABLET PLAN CARDS — Horizontal pair (lg only)
   Shows two cards side by side for 1024-1279px
   ────────────────────────────────────────────── */

function TabletPlanCards() {
  const featuredCards = [carouselPlans[2], carouselPlans[1]];

  return (
    <div className="hidden lg:flex xl:hidden w-full gap-4">
      {featuredCards.map((card, i) => (
        <motion.div
          key={card.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 + i * 0.15, ease: STUDIO_EASE }}
          className="flex-1"
        >
          <div className="relative w-full aspect-[4/3] overflow-hidden border border-card-border bg-signal-white shadow-sm">
            <Image
              src={card.illustration}
              alt={card.illustrationAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 400px, 400px"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-signal-white/95 backdrop-blur-sm px-4 py-3 border-t border-card-border">
              <span className="font-jetbrains text-[7px] uppercase tracking-[0.2em] text-signal-teal block mb-0.5">
                Partnership
              </span>
              <h3 className="font-cabinet text-base font-bold tracking-tight text-ink">
                {card.name}
              </h3>
              <span className="font-cabinet text-sm font-bold tracking-tight text-signal-teal block">
                {card.price}
              </span>
              <Link
                href="/partnership"
                className="inline-flex items-center gap-1.5 font-jetbrains text-[9px] uppercase tracking-[0.15em] text-ink-muted hover:text-signal-teal transition-colors duration-300 mt-1.5 group"
              >
                See Plans
                <ArrowRight className="w-2.5 h-2.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────
   MOBILE PLAN CAROUSEL — Swipeable cards
   Compact aspect ratio (16:9) to fit above fold.
   ────────────────────────────────────────────── */

function MobileCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);

  const total = carouselPlans.length;

  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 4000);
  }, [total]);

  const stopAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isPaused) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }
    return stopAutoPlay;
  }, [isPaused, startAutoPlay, stopAutoPlay]);

  const goTo = useCallback(
    (index: number) => {
      setCurrent(index);
      if (!isPaused) {
        stopAutoPlay();
        startAutoPlay();
      }
    },
    [isPaused, stopAutoPlay, startAutoPlay]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    },
    []
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX.current === null) return;
      const diff = touchStartX.current - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          setCurrent((prev) => (prev + 1) % total);
        } else {
          setCurrent((prev) => (prev - 1 + total) % total);
        }
      }
      touchStartX.current = null;
    },
    [total]
  );

  const plan = carouselPlans[current];

  return (
    <div
      className="lg:hidden w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Card — 16:9 to fit above fold on mobile */}
      <div className="relative w-full aspect-[16/9] overflow-hidden border border-card-border bg-signal-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute inset-0"
          >
            <Image
              src={plan.illustration}
              alt={plan.illustrationAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-signal-white/95 backdrop-blur-sm px-5 py-3 border-t border-card-border">
              <span className="font-jetbrains text-[8px] uppercase tracking-[0.2em] text-signal-teal block mb-0.5">
                Partnership
              </span>
              <h3 className="font-cabinet text-lg font-bold tracking-tight text-ink">
                {plan.name}
              </h3>
              <div className="flex items-center justify-between">
                <span className="font-cabinet text-base font-bold tracking-tight text-signal-teal">
                  {plan.price}
                </span>
                <Link
                  href="/partnership"
                  className="inline-flex items-center gap-1.5 font-jetbrains text-[9px] uppercase tracking-[0.15em] text-ink-muted hover:text-signal-teal transition-colors duration-300 group"
                >
                  See Plans
                  <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center justify-center gap-2 mt-3">
        {carouselPlans.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-1.5 h-1.5 transition-all duration-400 ${
              i === current
                ? "bg-signal-teal w-5"
                : "bg-fog-gray hover:bg-ink-muted/30"
            }`}
            style={{ borderRadius: "999px" }}
            aria-label={`Go to ${carouselPlans[i].name} plan`}
          />
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   PLAN CAROUSEL EXPORT
   xl+ = Cascade | lg = Tablet pair | <lg = Carousel
   ────────────────────────────────────────────── */

export function PlanCarousel() {
  return (
    <>
      <DesktopPlanCards />
      <TabletPlanCards />
      <MobileCarousel />
    </>
  );
}
