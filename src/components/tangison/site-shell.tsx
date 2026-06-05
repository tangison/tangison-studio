"use client";

import React from "react";
import { Navigation } from "@/components/tangison/navigation";
import { Footer } from "@/components/tangison/footer";
import { TangisonAIWidget } from "@/components/tangison/ai-widget";

export function SiteShell({
  children,
  footerSlot,
}: {
  children: React.ReactNode;
  footerSlot?: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col bg-warm-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:z-[9999] focus:bg-rust-signal focus:text-warm-white focus:px-4 focus:py-2 focus:font-jetbrains focus:text-xs focus:uppercase focus:tracking-widest"
      >
        Skip to main content
      </a>
      <Navigation />
      <main id="main-content" className="flex-1">{children}</main>
      {footerSlot}
      <Footer />
      <TangisonAIWidget />
    </div>
  );
}
