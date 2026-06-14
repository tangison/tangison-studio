"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Mail, Lock, MapPin, Github, Send, CheckCircle, AlertCircle } from "lucide-react";
import { SiteShell } from "@/components/tangison/site-shell";

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
   FORM STATE
   ────────────────────────────────────────────── */

type FormState = "idle" | "submitting" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  organization: string;
  message: string;
  website?: string; // honeypot field
}

/* ──────────────────────────────────────────────
   CONTACT DETAILS DATA
   ────────────────────────────────────────────── */

const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: "studio@tangison.com",
    href: "mailto:studio@tangison.com",
  },
  {
    icon: Lock,
    label: "Legal and Privacy",
    value: "tangison@proton.me",
    href: "mailto:tangison@proton.me",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "Corner of Frans Indongo Street and John Meinert Street, Windhoek, Namibia",
    href: null,
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/tangison",
    href: "https://github.com/tangison",
  },
];

/* ──────────────────────────────────────────────
   CONTACT PAGE (CLIENT COMPONENT)
   ────────────────────────────────────────────── */

export function ContactPage() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    organization: "",
    message: "",
    website: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");

    // Honeypot check - if filled, it's a bot
    if (formData.website) {
      setFormState("success"); // Pretend success to confuse bots
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (data.error === "Rate limit exceeded") {
          setFormState("error");
          return;
        }
        setFormState("error");
        return;
      }

      setFormState("success");
    } catch {
      setFormState("error");
    }
  };

  return (
    <SiteShell>
      {/* ── Section 1: Page Header (LIGHT) ── */}
      <section className="pt-36 md:pt-44 pb-20 md:pb-28 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp}>
            <span className="font-jetbrains text-[10px] uppercase tracking-[0.3em] text-signal-teal block mb-6">
              CONTACT
            </span>
            <h1 className="font-cabinet text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-ink mb-6">
              Get in Touch
            </h1>
            <p className="font-satoshi text-lg md:text-xl text-ink-muted max-w-2xl leading-relaxed">
              We read every message and reply within two business days.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Section 2: Contact Information (LIGHT) ── */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20" aria-label="Contact information">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="sr-only">Contact Information</h2>
        </div>
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24">
          {/* Left: Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <AnimatePresence mode="wait">
              {formState === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="border border-card-border bg-skeleton-bone p-10 md:p-12 flex flex-col items-center text-center"
                >
                  <CheckCircle className="w-10 h-10 text-signal-teal mb-6" />
                  <h3 className="font-cabinet text-xl md:text-2xl font-bold tracking-tight text-ink mb-3">
                    Thank you.
                  </h3>
                  <p className="font-satoshi text-ink-muted text-base leading-relaxed max-w-md">
                  We received your message. We will get back to you within two business days.
                  </p>
                </motion.div>
              ) : formState === "error" ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="border border-card-border bg-skeleton-bone p-10 md:p-12 flex flex-col items-center text-center"
                >
                  <AlertCircle className="w-10 h-10 text-signal-teal mb-6" />
                  <h3 className="font-cabinet text-xl md:text-2xl font-bold tracking-tight text-ink mb-3">
                    Something went wrong.
                  </h3>
                  <p className="font-satoshi text-ink-muted text-base leading-relaxed max-w-md mb-6">
                    Please try again, or email us directly at{" "}
                    <a
                      href="mailto:studio@tangison.com"
                      className="text-signal-teal hover:text-signal-teal-light transition-colors"
                    >
                      studio@tangison.com
                    </a>
                    .
                  </p>
                  <button
                    onClick={() => setFormState("idle")}
                    className="bg-ink text-signal-white font-jetbrains text-[11px] uppercase tracking-[0.15em] px-8 py-4 hover:bg-signal-teal transition-colors"
                  >
                    Try again
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-2"
                    >
                      Name <span className="text-signal-teal">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full border border-card-border bg-signal-white p-3 font-satoshi text-ink placeholder:text-ink-muted focus:border-signal-teal/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-teal focus-visible:ring-offset-1 transition"
                      autoComplete="name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-2"
                    >
                      Email <span className="text-signal-teal">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@organization.com"
                      className="w-full border border-card-border bg-signal-white p-3 font-satoshi text-ink placeholder:text-ink-muted focus:border-signal-teal/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-teal focus-visible:ring-offset-1 transition"
                      autoComplete="email"
                    />
                  </div>

                  {/* Organization */}
                  <div>
                    <label
                      htmlFor="organization"
                      className="block font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-2"
                    >
                      Organization <span className="text-signal-teal">*</span>
                    </label>
                    <input
                      id="organization"
                      name="organization"
                      type="text"
                      required
                      value={formData.organization}
                      onChange={handleChange}
                      placeholder="Your organization"
                      className="w-full border border-card-border bg-signal-white p-3 font-satoshi text-ink placeholder:text-ink-muted focus:border-signal-teal/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-teal focus-visible:ring-offset-1 transition"
                      autoComplete="organization"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-2"
                    >
                      Message <span className="text-signal-teal">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project or inquiry..."
                      className="w-full border border-card-border bg-signal-white p-3 font-satoshi text-ink placeholder:text-ink-muted focus:border-signal-teal/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-signal-teal focus-visible:ring-offset-1 transition resize-none"
                    />
                  </div>

                  {/* Honeypot field - hidden from real users, bots will fill it */}
                  <div className="absolute opacity-0 h-0 w-0 overflow-hidden" aria-hidden="true" inert>
                    <label htmlFor="website" className="sr-only" aria-hidden="true">Website</label>
                    <input
                      id="website"
                      name="website"
                      type="text"
                      value={formData.website}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={formState === "submitting"}
                    className="bg-ink text-signal-white font-jetbrains text-[11px] uppercase tracking-[0.15em] p-4 w-full hover:bg-signal-teal transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
                  >
                    {formState === "submitting" ? (
                      <>
                        <div className="w-4 h-4 border-2 border-skeleton-bone/30 border-t-skeleton-bone animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send message
                        <Send className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right: Contact Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-0"
          >
            {contactDetails.map((detail, i) => (
              <motion.div
                key={detail.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="border-b border-card-border py-6 first:pt-0 last:border-b-0"
              >
                <div className="flex items-center gap-3 mb-2">
                  <detail.icon className="w-4 h-4 text-signal-teal" />
                  <span className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em]">
                    {detail.label}
                  </span>
                </div>
                {detail.href ? (
                  <a
                    href={detail.href}
                    target={detail.href.startsWith("http") ? "_blank" : undefined}
                    rel={detail.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="font-cabinet text-lg md:text-xl font-bold tracking-tight text-ink hover:text-signal-teal transition-colors duration-300 inline-flex items-center gap-2 group"
                  >
                    {detail.value}
                    {detail.href.startsWith("http") && (
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-ink-muted group-hover:text-signal-teal" />
                    )}
                  </a>
                ) : (
                  <address className="font-cabinet text-lg md:text-xl font-bold tracking-tight text-ink not-italic leading-relaxed">
                    {detail.value}
                  </address>
                )}
              </motion.div>
            ))}

            {/* Additional context */}
            <div className="pt-8">
              <div className="border border-card-border bg-skeleton-bone p-6 md:p-8">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-1.5 bg-signal-teal" aria-hidden="true" />
                  <span className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em]">
                    Response Time
                  </span>
                </div>
                <p className="font-satoshi text-ink text-sm leading-relaxed">
                  Most projects begin with a discovery call within the first week of outreach.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-28 md:py-36 px-6 md:px-12 lg:px-20 bg-skeleton-bone" aria-label="Frequently asked questions">
        <div className="max-w-[1400px] mx-auto">
          <motion.div {...fadeUp} className="flex items-center gap-4 mb-4">
            <div className="editorial-divider" aria-hidden="true" />
          </motion.div>
          <motion.h2 {...fadeUp} className="font-cabinet text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-ink mb-16 md:mb-20">
            Frequently Asked Questions
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "What does Tangison Studio do?",
                answer: "We design and build websites, applications, brand systems, and design systems. We are a creative digital agency based in Windhoek, Namibia, working with clients across Africa and beyond."
              },
              {
                question: "Do you work with organizations outside Namibia?",
                answer: "Yes. We are based in Windhoek but work with organizations across Africa and internationally. Our process works remotely by default."
              },
              {
                question: "How much does a project cost?",
                answer: "We scope every project individually based on requirements, complexity, and timeline. After the Discover phase, you get a detailed proposal with transparent pricing. No hidden fees."
              },
              {
                question: "How do I start a project?",
                answer: "Fill out the contact form on this page, or email us at studio@tangison.com. Tell us about your organization and what you need. We reply to every message within two business days."
              },
              {
                question: "What industries do you serve?",
                answer: "We work across mining, tourism, agriculture, finance, government, healthcare, education, energy, and more. Our approach adapts to the specific needs of each sector."
              },
              {
                question: "What if I only need design, not development?",
                answer: "We can handle design-only projects. We deliver complete design files, specifications, and a handoff package your developers can use right away."
              },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="border border-card-border bg-signal-white p-6 md:p-8"
              >
                <h3 className="font-cabinet text-lg md:text-xl font-bold tracking-tight text-ink mb-3">
                  {faq.question}
                </h3>
                <p className="font-satoshi text-ink-muted text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
