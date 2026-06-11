"use client";

import React from "react";
import Link from "next/link";

const sections = [
  {
    heading: "What Are Cookies",
    body: "Cookies are small text files stored on your device when you visit a website. They help the website remember your preferences and improve your experience.",
  },
  {
    heading: "Cookies We Use",
    body: "Essential cookies for website functionality. We do not use tracking cookies or third-party advertising cookies.",
  },
  {
    heading: "Managing Cookies",
    body: "You can control cookies through your browser settings.",
  },
  {
    heading: "Contact",
    body: "For cookie-related inquiries: tangison@proton.me",
  },
];

export function CookiePolicyPage() {
  return (
    <>
    <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:bg-signal-teal focus:text-signal-white focus:px-4 focus:py-2 font-jetbrains text-xs uppercase tracking-widest">
      Skip to main content
    </a>
    <div className="bg-signal-white min-h-screen flex flex-col">
      <main id="main-content" className="flex-1 py-28 md:py-36 px-6 md:px-12 lg:px-20">
        <div className="max-w-[800px] mx-auto">
          {/* Back link */}
          <Link
            href="/"
            className="font-jetbrains text-[10px] uppercase tracking-[0.2em] text-ink-muted hover:text-signal-teal transition-colors duration-300 inline-block mb-16"
          >
            &larr; Back to studio.tangison.com
          </Link>

          {/* Page header */}
          <h1 className="font-cabinet text-3xl md:text-4xl font-bold tracking-tight text-ink mb-3">
            COOKIE POLICY
          </h1>
          <p className="font-jetbrains text-[10px] uppercase tracking-[0.2em] text-ink-muted mb-16">
            Last updated: March 2025
          </p>

          {/* Content sections */}
          {sections.map((section) => (
            <div key={section.heading}>
              <h2 className="font-cabinet text-lg text-ink mt-8 mb-3">
                {section.heading}
              </h2>
              <p className="font-satoshi text-sm text-ink-muted leading-relaxed">
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </main>

      {/* Minimal footer */}
      <footer className="py-8 px-6 md:px-12 lg:px-20 border-t border-black/[0.06]">
        <div className="max-w-[800px] mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <span className="font-jetbrains text-[10px] uppercase tracking-[0.2em] text-ink-muted">
            &copy; 2025 TANGISON
          </span>
          <div className="flex gap-6">
            <Link
              href="/legal/privacy"
              className="font-jetbrains text-[10px] uppercase tracking-[0.15em] text-ink-muted hover:text-signal-teal transition-colors duration-300"
            >
              Privacy
            </Link>
            <Link
              href="/legal/terms"
              className="font-jetbrains text-[10px] uppercase tracking-[0.15em] text-ink-muted hover:text-signal-teal transition-colors duration-300"
            >
              Terms
            </Link>
            <Link
              href="/legal/cookies"
              className="font-jetbrains text-[10px] uppercase tracking-[0.15em] text-ink-muted hover:text-signal-teal transition-colors duration-300"
            >
              Cookies
            </Link>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}
