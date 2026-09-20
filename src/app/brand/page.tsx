import type { Metadata } from "next";
import { buildPageMetadata, JsonLdScript, pageJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Brand System",
  description:
    "The Tangison Studio brand system: the editorial genre, the locked palette of bone, Atlantic black, and Signal Teal, the type stack, and the rules every page obeys.",
  path: "/brand",
  ogTitle: "Brand System | The Tangison Studio",
});

const PALETTE: { name: string; hex: string; role: string; swatch: string }[] = [
  { name: "Bone", hex: "#F6F4EF", role: "Paper. The light surface every page prints on.", swatch: "bg-[#F6F4EF] border border-line" },
  { name: "Warm raise", hex: "#FEFDFB", role: "Raised cards and table surfaces, one step above bone.", swatch: "bg-[#FEFDFB] border border-line" },
  { name: "Atlantic black", hex: "#111315", role: "Ink. Text, headings, and the dark theme's foreground.", swatch: "bg-[#111315]" },
  { name: "Ink paper", hex: "#0C1014", role: "The dark theme's surface, with raise at #14181D.", swatch: "bg-[#0C1014]" },
  { name: "Signal Teal", hex: "#2CB5B4", role: "The only accent. Capped at five percent of any viewport.", swatch: "bg-[#2CB5B4]" },
];

const RULES: { title: string; body: string }[] = [
  {
    title: "One accent, capped",
    body: "Signal Teal is the only chromatic color in the system. It never exceeds five percent of a viewport, never tints a large surface, and never appears as a gradient. Restraint is the mechanism: one color earns attention precisely because nothing else competes with it.",
  },
  {
    title: "No pure black or white",
    body: "Text is Atlantic black on bone, never #000000 on #FFFFFF. The pair softens glare on mobile screens and keeps printed matter from looking harsh. The dark theme inverts the same pair: bone text on ink paper.",
  },
  {
    title: "Hairlines carry structure",
    body: "Layout is drawn with 1px rules at ink opacity rather than boxes and shadows. Cards exist, but they are quiet: a warm raise surface, a hairline edge, no glass, no glow, no drop shadow that pretends to be depth.",
  },
  {
    title: "Type does the talking",
    body: "Poppins carries display sizes in two weights, Satoshi carries reading text, and JetBrains Mono is reserved for functional metadata: labels, coordinates, timestamps. Two sizes of the same voice beat five sizes of noise.",
  },
  {
    title: "Art, not stock",
    body: "Photography is art-directed for the studio: paintings of rooms, coastlines, and still lifes, used with purpose and never as filler. Scrim gradients over photography are the only gradients the system allows.",
  },
  {
    title: "Claims are dated and named",
    body: "The voice states what can be checked: a track record lists clients, locations, and dates; a case study names the decisions. No invented metrics, no undated superlatives, no filler adjectives.",
  },
];

export default function BrandPage() {
  return (
    <div className="theme-ink bg-paper text-ink min-h-screen">
      <JsonLdScript
        data={pageJsonLd(
          "Brand System | The Tangison Studio",
          "The Tangison Studio brand system: the editorial genre, the locked palette of bone, Atlantic black, and Signal Teal, the type stack, and the rules every page obeys.",
          "/brand",
        )}
      />
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-36 md:pt-44">
        <div className="max-w-3xl">
          <p className="eyebrow mb-4">The system</p>
          <h1 className="h1">A locked design system, not a mood board.</h1>
          <p className="mt-6 text-ink-muted leading-relaxed max-w-2xl">
            Every page this studio ships, for itself or for a client, reads the
            same rules first. The genre is editorial studio work, held to the
            craft level of a named reference rather than the look of one. What
            follows is the system as it is enforced today.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 mt-20">
        <h2 className="h2 max-w-2xl">The palette</h2>
        <div className="mt-8 border-t border-line">
          {PALETTE.map((c) => (
            <div
              key={c.name}
              className="py-6 border-b border-line grid grid-cols-[64px_1fr_auto] gap-6 items-center"
            >
              <div className={`h-12 w-16 rounded-sm ${c.swatch}`} aria-hidden="true" />
              <div>
                <p className="font-semibold">{c.name}</p>
                <p className="mt-1 text-ink-muted">{c.role}</p>
              </div>
              <p className="font-mono text-sm text-ink-muted">{c.hex}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 mt-20">
        <h2 className="h2 max-w-2xl">The type stack</h2>
        <div className="mt-8 max-w-2xl border-t border-line">
          <div className="py-7 border-b border-line">
            <p className="h3">Poppins, 600 and 700</p>
            <p className="mt-2 text-ink-muted">
              Display and headings. Two weights only; hierarchy comes from size
              and spacing, not from collecting weights.
            </p>
          </div>
          <div className="py-7 border-b border-line">
            <p className="h3">Satoshi, 400, 500, and 700</p>
            <p className="mt-2 text-ink-muted">
              Body text and interface copy, served locally as woff2 subsets so
              the reading experience does not wait on a font network.
            </p>
          </div>
          <div className="py-7 border-b border-line">
            <p className="h3">JetBrains Mono, 400 and 500</p>
            <p className="mt-2 text-ink-muted">
              Functional metadata only: labels, coordinates, timestamps. Mono
              never carries sentences worth reading slowly.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 mt-20 pb-24">
        <h2 className="h2 max-w-2xl">The rules every page obeys</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2 max-w-none">
          {RULES.map((r) => (
            <div key={r.title} className="border border-line bg-paper-raise p-6">
              <p className="font-semibold">{r.title}</p>
              <p className="mt-2 text-ink-muted leading-relaxed">{r.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
