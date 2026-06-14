"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ArrowUpRight, MessageCircle, Mail, Check, X, Plus } from "lucide-react";
import { SiteShell } from "@/components/tangison/site-shell";
import { StudioButton } from "@/components/tangison/studio-button";
import { fadeUp, STUDIO_EASE, DURATION, VIEWPORT } from "@/lib/motion";

/* ──────────────────────────────────────────────
   PLAN DATA
   ────────────────────────────────────────────── */

const plans = [
  {
    name: "Care",
    price: 500,
    tagline: "Your site, watched over.",
    recommended: false,
    supportHours: "2 hrs/month",
    illustration: "/images/partnership/plan-care.webp",
    illustrationAlt: "Sparse Namibian landscape at dusk — Care plan",
    includes: [
      "Monthly site check & uptime monitoring",
      "Up to 2 minor text or image updates per month",
      "Security & backup monitoring",
      "Email support",
      "2 hours of support time per month",
    ],
    excludes: [
      "Social media management or post design",
      "New page additions",
      "Strategy sessions",
      "Priority response",
    ],
    idealFor:
      "Clients who want peace of mind that their site is live, secure, and up to date — without needing active growth support.",
  },
  {
    name: "Partner",
    price: 1000,
    tagline: "Your site, your brand, always moving.",
    recommended: true,
    supportHours: "10 hrs/month",
    illustration: "/images/partnership/plan-partner.webp",
    illustrationAlt: "Namibian coastal town at golden hour — Partner plan",
    includes: [
      "Everything in Care",
      "Unlimited minor site updates",
      "Branded email signatures for all staff",
      "4 social media post designs per month (Facebook & Instagram)",
      "Quarterly performance check-in",
      "10 hours of support time per month",
    ],
    excludes: [
      "Full social media management & posting",
      "Content calendar & scheduling",
      "Priority response",
      "Monthly strategy sessions",
    ],
    idealFor:
      "Growing businesses that need their site fresh and a consistent social media presence — without an in-house marketing person.",
  },
  {
    name: "Studio Plus",
    price: 2000,
    tagline: "Your studio, on call.",
    recommended: false,
    supportHours: "Priority — no cap",
    illustration: "/images/partnership/plan-studio-plus.webp",
    illustrationAlt: "Panoramic Namibian desert at dawn — Studio Plus plan",
    includes: [
      "Everything in Partner",
      "Full social media management (Facebook & Instagram)",
      "Content calendar & monthly posting schedule",
      "New page additions to your website as needed",
      "Priority support — call or message anytime, front of queue",
      "Monthly strategy session with the studio",
      "Document & collateral support (invoices, contracts, branded docs on request)",
      "Creative direction advice included",
    ],
    excludes: [] as string[],
    idealFor:
      "Clients who want Tangison Studio as an extension of their own team — from social media to strategy to business documents, handled.",
  },
];

const addOnServices = [
  {
    service: "Brand Identity Revamp",
    description:
      "Refined logo, colour palette, typography system, brand guidelines — print and digital ready.",
    price: "Starting from N$3,500",
  },
  {
    service: "Letterhead Design",
    description: "Professional letterhead template, digital and print-ready.",
    price: "Starting from N$800",
  },
  {
    service: "Company Profile Redesign",
    description:
      "Fully redesigned company profile aligned with your brand and website.",
    price: "Starting from N$2,000",
  },
  {
    service: "Additional Website Pages",
    description:
      "New pages added to your existing site — services, case studies, team, landing pages.",
    price: "Starting from N$500 / page",
  },
  {
    service: "Email Signature Design",
    description: "Branded image-based email signatures for your team.",
    price: "Included free with any plan",
  },
];

const faqs = [
  {
    q: "Do I need to have built my website with Tangison Studio?",
    a: "Yes — our partnership plans are designed for clients whose websites we built and host. This ensures we know the codebase and can maintain it properly.",
  },
  {
    q: "Can I switch plans after signing up?",
    a: "Absolutely. Upgrade or downgrade anytime — changes take effect from the next billing month.",
  },
  {
    q: "What counts as a minor update?",
    a: "Text changes, image swaps, contact detail updates, small layout adjustments. Anything requiring new page builds or structural changes falls outside minor updates.",
  },
  {
    q: "What happens if I cancel?",
    a: "You can cancel anytime with no penalty. Your website stays live as long as your domain is renewed — that's your responsibility directly with the registrar.",
  },
  {
    q: "How does the Studio Plus priority support work?",
    a: "You message or call us on WhatsApp and you go to the front of the queue. No hour cap — we treat Studio Plus clients as an extension of our own team.",
  },
  {
    q: "Can I get a branded document or invoice drafted under Studio Plus?",
    a: "Yes. Document support — contracts, proposals, branded invoices, cover letters — is included in Studio Plus on request.",
  },
];

/* ──────────────────────────────────────────────
   ACCORDION ITEM (PLAN DETAIL EXPANDER)
   ────────────────────────────────────────────── */

function PlanExpander({
  plan,
  isOpen,
  onToggle,
}: {
  plan: (typeof plans)[number];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<string>("0px");

  useEffect(() => {
    if (contentRef.current) {
      setMaxHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isOpen]);

  return (
    <div className="border-t border-card-border">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left group"
        aria-expanded={isOpen}
      >
        <span className="font-cabinet text-lg md:text-xl font-bold tracking-tight text-ink group-hover:text-signal-teal transition-colors duration-300">
          {plan.name} — Full Details
        </span>
        <ChevronDown
          className={`w-5 h-5 text-ink-muted transition-transform duration-400 shrink-0 ml-4 ${
            isOpen ? "rotate-180" : ""
          }`}
          style={{
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      </button>
      <div
        style={{ maxHeight, overflow: "hidden" }}
        className="transition-[max-height] duration-600"
      >
        <div ref={contentRef} className="pb-8">
          {/* Includes */}
          <div className="mb-6">
            <h4 className="font-jetbrains text-[10px] uppercase tracking-[0.2em] text-signal-teal mb-3">
              Includes
            </h4>
            <ul className="space-y-2">
              {plan.includes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-signal-teal shrink-0 mt-0.5" />
                  <span className="font-satoshi text-sm text-ink-muted leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Excludes */}
          {plan.excludes.length > 0 && (
            <div className="mb-6">
              <h4 className="font-jetbrains text-[10px] uppercase tracking-[0.2em] text-ink-muted/50 mb-3">
                Not included
              </h4>
              <ul className="space-y-2">
                {plan.excludes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <X className="w-4 h-4 text-ink-muted/30 shrink-0 mt-0.5" />
                    <span className="font-satoshi text-sm text-ink-muted/50 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Ideal for */}
          <div className="mb-8">
            <h4 className="font-jetbrains text-[10px] uppercase tracking-[0.2em] text-ink-muted/50 mb-3">
              Ideal for
            </h4>
            <p className="font-satoshi text-sm text-ink-muted leading-relaxed max-w-xl">
              {plan.idealFor}
            </p>
          </div>

          {/* WhatsApp CTA */}
          <StudioButton
            href="https://wa.me/264853411522"
            external
            variant="primary"
            size="md"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp Us — {plan.name}
          </StudioButton>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   FAQ ACCORDION ITEM
   ────────────────────────────────────────────── */

function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<string>("0px");

  useEffect(() => {
    if (contentRef.current) {
      setMaxHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px");
    }
  }, [isOpen]);

  return (
    <div className="border-b border-card-border">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-6 text-left group"
        aria-expanded={isOpen}
      >
        <span className="font-cabinet text-base md:text-lg font-bold tracking-tight text-ink group-hover:text-signal-teal transition-colors duration-300 pr-4">
          {question}
        </span>
        <Plus
          className={`w-5 h-5 text-ink-muted shrink-0 transition-transform duration-400 ${
            isOpen ? "rotate-45" : ""
          }`}
          style={{
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      </button>
      <div
        style={{ maxHeight, overflow: "hidden" }}
        className="transition-[max-height] duration-500"
      >
        <div ref={contentRef} className="pb-6">
          <p className="font-satoshi text-ink-muted text-sm md:text-base leading-relaxed max-w-2xl">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   HERO SECTION
   ────────────────────────────────────────────── */

function HeroSection() {
  return (
    <section className="pt-36 md:pt-44 pb-20 md:pb-28 px-6 md:px-12 lg:px-20 bg-skeleton-bone">
      <div className="max-w-[1400px] mx-auto">
        <motion.div {...fadeUp}>
          <span className="font-jetbrains text-[10px] uppercase tracking-[0.3em] text-signal-teal block mb-6">
            ONGOING PARTNERSHIP
          </span>
          <h1 className="font-cabinet text-[clamp(2.2rem,5vw,4.5rem)] font-black tracking-[-0.04em] leading-[0.95] text-ink mb-6 max-w-4xl">
            Your website is live. Now keep it working.
          </h1>
          <p className="font-satoshi text-lg md:text-xl text-ink-muted max-w-2xl leading-relaxed">
            A Tangison Studio partnership plan keeps your site maintained, your
            brand active, and your business looking its best — every month,
            without the overhead of an in-house team. Cancel anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   PLAN CARDS SECTION
   ────────────────────────────────────────────── */

function PlanCardsSection() {
  const [expandedPlans, setExpandedPlans] = useState<Set<string>>(new Set());

  const togglePlan = useCallback(
    (name: string) => {
      setExpandedPlans((prev) => {
        const next = new Set(prev);
        if (next.has(name)) {
          next.delete(name);
        } else {
          next.add(name);
        }
        return next;
      });
    },
    []
  );

  return (
    <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-signal-white" aria-label="Partnership plans">
      <div className="max-w-[1400px] mx-auto">
        {/* Plan cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{
                duration: DURATION.base,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`relative flex flex-col border bg-signal-white overflow-hidden ${
                plan.recommended
                  ? "border-signal-teal md:-mt-4 md:mb-[-16px] shadow-[0_8px_40px_rgba(44,181,180,0.1)]"
                  : "border-card-border"
              }`}
            >
              {/* Recommended badge */}
              {plan.recommended && (
                <div className="absolute top-0 right-0 bg-signal-teal px-4 py-1.5 z-10">
                  <span className="font-jetbrains text-[9px] uppercase tracking-[0.2em] text-skeleton-bone">
                    Recommended
                  </span>
                </div>
              )}

              {/* Illustration */}
              <div className="relative w-full aspect-[16/9] overflow-hidden">
                <Image
                  src={plan.illustration}
                  alt={plan.illustrationAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Card body */}
              <div className="p-6 md:p-8 flex flex-col flex-1">
                {/* Plan name + Support badge */}
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-cabinet text-2xl md:text-3xl font-bold tracking-tight text-ink">
                    {plan.name}
                  </h3>
                  <span className="font-jetbrains text-[9px] uppercase tracking-[0.15em] text-ink-muted/50 bg-skeleton-bone px-2 py-1 shrink-0 ml-3 mt-1">
                    {plan.supportHours}
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="font-cabinet text-3xl md:text-4xl font-black tracking-tight text-signal-teal">
                    N${plan.price}
                  </span>
                  <span className="font-satoshi text-sm text-ink-muted">
                    /month
                  </span>
                </div>

                {/* Tagline */}
                <p className="font-satoshi text-sm text-ink-muted leading-relaxed mb-6">
                  {plan.tagline}
                </p>

                {/* Key includes preview (first 3) */}
                <ul className="space-y-2 mb-8 flex-1">
                  {plan.includes.slice(0, 3).map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check className="w-3.5 h-3.5 text-signal-teal shrink-0 mt-0.5" />
                      <span className="font-satoshi text-sm text-ink-muted leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                  {plan.includes.length > 3 && (
                    <li className="font-jetbrains text-[10px] text-ink-muted/40 uppercase tracking-[0.1em] pl-6">
                      +{plan.includes.length - 3} more
                    </li>
                  )}
                </ul>

                {/* CTA */}
                <StudioButton
                  onClick={() => togglePlan(plan.name)}
                  variant={plan.recommended ? "primary" : "outline"}
                  size="md"
                  className="w-full"
                >
                  See Full Details
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      expandedPlans.has(plan.name) ? "rotate-180" : ""
                    }`}
                  />
                </StudioButton>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detail expanders */}
        <div className="mt-12 max-w-3xl mx-auto">
          {plans.map((plan) => (
            <PlanExpander
              key={plan.name}
              plan={plan}
              isOpen={expandedPlans.has(plan.name)}
              onToggle={() => togglePlan(plan.name)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   ADD-ON SERVICES SECTION
   ────────────────────────────────────────────── */

function AddOnSection() {
  return (
    <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-skeleton-bone" aria-label="À la carte services">
      <div className="max-w-[1400px] mx-auto">
        <motion.div {...fadeUp}>
          <span className="font-jetbrains text-[10px] uppercase tracking-[0.3em] text-signal-teal block mb-6">
            À LA CARTE
          </span>
          <h2 className="font-cabinet text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-ink mb-4">
            Need something once-off?
          </h2>
          <p className="font-satoshi text-lg text-ink-muted max-w-2xl leading-relaxed mb-16">
            These services are available to any client at any time — no
            subscription required.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {addOnServices.map((item, i) => (
            <motion.div
              key={item.service}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{
                duration: DURATION.base,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="border border-card-border bg-signal-white p-6 md:p-8 flex flex-col justify-between"
            >
              <div>
                <h3 className="font-cabinet text-lg md:text-xl font-bold tracking-tight text-ink mb-2">
                  {item.service}
                </h3>
                <p className="font-satoshi text-sm text-ink-muted leading-relaxed mb-4">
                  {item.description}
                </p>
              </div>
              <span className="font-jetbrains text-[11px] uppercase tracking-[0.1em] text-signal-teal">
                {item.price}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.p
          {...fadeUp}
          className="mt-8 font-satoshi text-sm text-ink-muted/50 leading-relaxed"
        >
          All prices are starting points. Final quotes are tailored to your
          brief — message us on WhatsApp to discuss.
        </motion.p>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   FAQ SECTION
   ────────────────────────────────────────────── */

function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-signal-white" aria-label="Frequently asked questions">
      <div className="max-w-[800px] mx-auto">
        <motion.div {...fadeUp}>
          <span className="font-jetbrains text-[10px] uppercase tracking-[0.3em] text-signal-teal block mb-6">
            QUESTIONS
          </span>
          <h2 className="font-cabinet text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-ink mb-16">
            Good questions, straight answers.
          </h2>
        </motion.div>

        <div>
          {faqs.map((faq, i) => (
            <FaqItem
              key={i}
              question={faq.q}
              answer={faq.a}
              isOpen={openIndex === i}
              onToggle={() =>
                setOpenIndex((prev) => (prev === i ? null : i))
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   CLOSING CTA SECTION
   ────────────────────────────────────────────── */

function ClosingCtaSection() {
  return (
    <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-skeleton-bone" aria-label="Get started">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          {...fadeUp}
          className="font-cabinet text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-ink mb-4"
        >
          Ready to keep your brand moving?
        </motion.h2>
        <motion.p
          {...fadeUp}
          className="font-satoshi text-lg text-ink-muted leading-relaxed mb-10"
        >
          Message us on WhatsApp and we will activate your plan within 24 hours.
        </motion.p>
        <motion.div
          {...fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <StudioButton
            href="https://wa.me/264853411522"
            external
            variant="primary"
            size="lg"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp Us →
          </StudioButton>
          <StudioButton
            href="mailto:studio@tangison.com"
            external
            variant="ghost"
            size="lg"
          >
            <Mail className="w-4 h-4" />
            Email Us
          </StudioButton>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   PARTNERSHIP PAGE (CLIENT COMPONENT)
   ────────────────────────────────────────────── */

export function PartnershipPage() {
  return (
    <SiteShell>
      <HeroSection />
      <PlanCardsSection />
      <AddOnSection />
      <FaqSection />
      <ClosingCtaSection />
    </SiteShell>
  );
}
