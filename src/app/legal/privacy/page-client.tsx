"use client";

import React from "react";
import Link from "next/link";

const sections = [
  {
    heading: "Overview",
    body: "TANGISON respects your privacy. This policy explains how we collect, use, and protect your personal information.",
  },
  {
    heading: "Information We Collect",
    body: "We collect information you provide directly: name, email, organization, and message content when you use our contact form. We collect chat messages when you use our AI assistant. We collect standard web analytics data (pages visited, browser type, device type).",
  },
  {
    heading: "How We Use Your Information",
    body: "To respond to your inquiries. To improve our services and website. To maintain the functionality of our AI assistant.",
  },
  {
    heading: "Data Storage",
    body: "Contact form submissions are stored securely. AI chat sessions are held in memory for up to 30 minutes and then automatically deleted. We do not persist chat logs long-term.",
  },
  {
    heading: "Third-Party Sharing",
    body: "We do not sell, rent, or share your personal information with third parties for marketing purposes.",
  },
  {
    heading: "Your Rights",
    body: "You may request access to, correction of, or deletion of your personal data by contacting tangison@proton.me.",
  },
  {
    heading: "Contact",
    body: "For privacy-related inquiries: tangison@proton.me",
  },
];

export function PrivacyPolicyPage() {
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
            PRIVACY POLICY
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
      <footer className="py-8 px-6 md:px-12 lg:px-20 border-t border-card-border">
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
