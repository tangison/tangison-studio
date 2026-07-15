import type { Metadata } from "next";
import Image from "next/image";
import { SiteShell } from "@/components/tangison/site-shell";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/tangison/json-ld";

export const metadata: Metadata = {
  title: "Brand Identity",
  description: "The Studio brand system: identity mark, wordmark, color system, typography, and design rules.",
  alternates: { canonical: "/brand" },
  openGraph: { title: "Brand Identity | Studio", description: "The Studio brand system.", url: "/brand", images: [{ url: "/og.png", width: 1200, height: 630, alt: "Studio" }] },
};

const colors = [
  { name: "Atlantic Black", hex: "#111315", usage: "Primary text, dark panels" },
  { name: "Deep Ocean Navy", hex: "#153E52", usage: "Primary identity, dark accents" },
  { name: "Signal Teal", hex: "#2CB5B4", usage: "Active states, links, highlights" },
  { name: "Accessible Teal", hex: "#0F5C5B", usage: "Button backgrounds, text on light" },
  { name: "Ocean Mist", hex: "#E6F2F1", usage: "Soft backgrounds, hover states" },
  { name: "Skeleton Bone", hex: "#F6F4EF", usage: "Page background" },
  { name: "Fog Gray", hex: "#D9D7D2", usage: "Borders, secondary structures" },
  { name: "Signal White", hex: "#FFFFFF", usage: "Cards, maximum contrast" },
];

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Brand", url: "/brand" }]} />
      <WebPageJsonLd title="Brand Identity" description="The Studio brand system." url="/brand" />
      <SiteShell>
        <section className="pt-12 md:pt-20 pb-8">
          <div className="mx-auto max-w-4xl px-6">
            <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-3">Brand</p>
            <h1 className="font-display font-bold text-ink text-4xl md:text-5xl mb-4">The Studio brand system.</h1>
            <p className="font-satoshi text-lg text-ink-muted max-w-2xl">Identity mark, wordmark, color system, typography, and design rules.</p>
          </div>
        </section>
        <section className="py-8">
          <div className="mx-auto max-w-4xl px-6">
            <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-4">Color palette</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {colors.map((c) => (
                <div key={c.hex} className="overflow-hidden rounded-2xl border border-card-border">
                  <div className="h-20" style={{ background: c.hex }} />
                  <div className="p-3 bg-signal-white">
                    <p className="font-satoshi text-sm font-medium text-ink">{c.name}</p>
                    <p className="font-jetbrains text-[10px] text-ink-muted">{c.hex}</p>
                    <p className="font-satoshi text-xs text-ink-muted mt-1">{c.usage}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-8">
          <div className="mx-auto max-w-4xl px-6">
            <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-4">Typography</p>
            <div className="space-y-4">
              <div className="p-6 rounded-2xl border border-card-border bg-signal-white">
                <p className="font-jetbrains text-[9px] text-ink-muted uppercase tracking-[0.2em] mb-2">Display — Cabinet Grotesk</p>
                <p className="font-display font-bold text-ink text-3xl">We build the brand.</p>
              </div>
              <div className="p-6 rounded-2xl border border-card-border bg-signal-white">
                <p className="font-jetbrains text-[9px] text-ink-muted uppercase tracking-[0.2em] mb-2">Body — Satoshi</p>
                <p className="font-satoshi text-base text-ink">Studio designs focused websites, applications and brand systems for ambitious organizations across Africa.</p>
              </div>
              <div className="p-6 rounded-2xl border border-card-border bg-signal-white">
                <p className="font-jetbrains text-[9px] text-ink-muted uppercase tracking-[0.2em] mb-2">Technical labels — JetBrains Mono</p>
                <p className="font-jetbrains text-sm text-ink">SELECTED WORK · WINDHOEK, NAMIBIA</p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-8 pb-20">
          <div className="mx-auto max-w-4xl px-6">
            <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-4">Identity</p>
            <div className="p-8 rounded-3xl border border-card-border bg-signal-white flex items-center gap-6">
              <Image src="/brand/favicon.webp" alt="Studio mast icon" width={64} height={64} className="shrink-0" />
              <div>
                <p className="font-display font-bold text-ink text-2xl">Studio</p>
                <p className="font-satoshi text-sm text-ink-muted mt-1">Transparent mast icon + wordmark. No artificial background.</p>
              </div>
            </div>
          </div>
        </section>
      </SiteShell>
    </>
  );
}
