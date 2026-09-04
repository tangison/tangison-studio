import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "One Studio Instead of Three Vendors",
  description:
    "Why we collapsed brand, product, and intelligence into a single studio, and what that changes for the organizations we work with.",
  alternates: { canonical: "/blog/one-studio-instead-of-three-vendors" },
  openGraph: {
    title: "One Studio Instead of Three Vendors",
    description:
      "Why we collapsed brand, product, and intelligence into a single studio, and what that changes for the organizations we work with.",
    type: "article",
    images: [{ url: "/images/paintings/blog/blog-01.webp", width: 1200, height: 675 }],
  },
};

const article = [
  "Most organizations that need a digital product end up coordinating three separate vendors. A brand consultancy designs the identity. A web studio builds the website. A technology partner handles the backend and any AI features.",
  "Each vendor has its own timeline, its own priorities, and its own interpretation of what the others are doing. The result is a product that feels like three products stitched together.",
  "Studio takes a different approach. We handle brand, product, and intelligence under one roof. The people who define the brand are the same people who design the interface and build the systems behind it.",
  "When one studio owns all three layers, the handoffs disappear. The brand strategy informs the interface design directly, not through a brief document. The interface design informs the technical architecture, not through a specification call. The technical architecture informs what intelligence features are actually feasible, not through a feasibility study.",
  "This is not about saving time. It is about saving coherence. A product built by one team with one set of priorities feels different from a product assembled from parts.",
];

const whenThree = [
  "There are situations where separate vendors are the right choice. If you already have a strong brand system and only need a new website, a specialized web studio is sufficient. If you have a mature product and only need to add an AI feature, a technology partner is the right call.",
  "But if you are building something new, or rebuilding something that has drifted, one studio gives you a coherence that coordination cannot match.",
];

const related = [
  {
    title: "Why Digital Products Fail Before Development Starts",
    read: "5 min read",
    image: "/images/paintings/blog/blog-02.webp",
    alt: "A paper boat drifting on calm pale water in soft morning mist.",
  },
  {
    title: "Brand Systems for Growing Namibian Businesses",
    read: "4 min read",
    image: "/images/paintings/blog/blog-03.webp",
    alt: "Seedlings sprouting in small terracotta pots on a windowsill in gentle light.",
  },
  {
    title: "Designing AI That Does Actual Work",
    read: "5 min read",
    image: "/images/paintings/blog/blog-04.webp",
    alt: "A small glowing orb held gently between cupped hands in soft dusk light.",
  },
];

export default function BlogArticlePage() {
  return (
    <div className="theme-ink bg-paper text-ink min-h-screen">
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-32 md:pt-40">
        <Reveal>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink link-underline"
          >
            ← Back
          </Link>
        </Reveal>
        <div className="mt-8 max-w-3xl">
          <Reveal delay={60}>
            <p className="eyebrow">Positioning · 4 min read</p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="h1 mt-4">One Studio Instead of Three Vendors</h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-6 text-lg md:text-xl text-ink-muted leading-relaxed">
              Why we collapsed brand, product, and intelligence into a single
              studio, and what that changes for the organizations we work with.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-10 md:pt-14">
        <Reveal>
          <div className="relative aspect-[16/9] max-w-4xl rounded-[24px] overflow-hidden border border-line">
            <Image
              src="/images/paintings/blog/blog-01.webp"
              alt="Three ceramic vessels of different sizes resting together on a cream table in soft light."
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 960px"
              className="object-cover"
            />
          </div>
        </Reveal>
      </section>

      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-14 md:pt-20">
        <div className="max-w-3xl">
          <Reveal>
            <h2 className="h3 text-teal">What this changes</h2>
            <div className="mt-6 prose-body flex flex-col gap-5">
              {article.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="h3 text-teal mt-14">When three vendors makes sense</h2>
            <div className="mt-6 prose-body flex flex-col gap-5">
              {whenThree.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-10 text-lg text-ink leading-relaxed">
              Studio is built for organizations that need all three layers
              working together. Brand, product, and intelligence. One studio
              instead of three vendors.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ Related articles ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-24 md:pt-32">
        <Reveal>
          <p className="eyebrow">Related articles</p>
        </Reveal>
        <div className="mt-8 grid gap-6 md:gap-8 sm:grid-cols-3">
          {related.map((r, i) => (
            <Reveal key={r.title} delay={i * 80}>
              <article className="rounded-[20px] border border-line bg-paper-raise overflow-hidden">
                <div className="relative aspect-video">
                  <Image
                    src={r.image}
                    alt={r.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 420px"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display font-bold text-lg tracking-[-0.01em]">
                    {r.title}
                  </h3>
                  <p className="mt-2 eyebrow !tracking-[0.1em]">{r.read}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="mx-auto w-full max-w-[1400px] px-6 md:px-12 pt-24 md:pt-32">
        <Reveal>
          <div className="rounded-[24px] border border-line bg-teal-mist px-6 py-14 md:p-16 text-center max-w-3xl">
            <h2 className="h2">Want to work with us?</h2>
            <p className="mt-4 text-ink-muted max-w-xl mx-auto">
              Tell us what you are building. We reply within two working days.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 h-12 px-7 rounded-full bg-ink text-paper text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Start a project
              <ArrowRight aria-hidden="true" className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
