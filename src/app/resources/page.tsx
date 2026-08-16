import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { resources, resourceCategories } from "@/lib/resources";
import { SiteShell } from "@/components/tangison/site-shell";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/tangison/json-ld";
import { ResourceMotifMark } from "@/components/studio/resource-motif";

export const metadata: Metadata = {
  title: {
    absolute: "Resources | Practical Guides for Namibian Businesses",
  },
  description:
    "Twenty practical guides on websites, brand, product and operations, written for businesses in Namibia and the wider region. Free to read, no signup.",
  alternates: { canonical: "/resources" },
  openGraph: {
    title: "Resources | Practical Guides for Namibian Businesses",
    description:
      "Twenty practical guides on websites, brand, product and operations, written for businesses in Namibia and the wider region.",
    url: "/resources",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Studio Resources" }],
  },
};

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Studio Resources",
  description:
    "Practical guides on websites, brand, product and operations for Namibian businesses.",
  numberOfItems: resources.length,
  itemListElement: resources.map((r, i) => ({
    "@type": "ListItem",
    position: i + 1,
    url: `https://studio.tangison.com/resources/${r.slug}`,
    name: r.title,
  })),
};

export default function Page() {
  const [lead, ...rest] = resources;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Resources", url: "/resources" },
        ]}
      />
      <WebPageJsonLd
        title="Resources"
        description="Practical guides on websites, brand, product and operations for Namibian businesses."
        url="/resources"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <SiteShell>
        {/* Masthead */}
        <section className="pt-12 md:pt-20 pb-10">
          <div className="mx-auto max-w-6xl px-6">
            <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mb-3">
              Resources
            </p>
            <h1 className="font-display font-bold text-ink text-4xl md:text-5xl lg:text-6xl mb-5 max-w-3xl">
              Practical guides, written for here.
            </h1>
            <p className="font-satoshi text-lg text-ink-muted max-w-2xl">
              Twenty guides on websites, brand, product and operations, written
              for businesses working in Namibia and the wider region. No signup,
              no gated downloads, no lead magnet. Read them, use them, send them
              to whoever needs them.
            </p>
            <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em] mt-8">
              {resources.length} resources
              <span className="mx-2 text-fog-gray">/</span>
              {resourceCategories.length} categories
              <span className="mx-2 text-fog-gray">/</span>
              free to read
            </p>
          </div>
        </section>

        {/* Lead resource, given its own accent treatment */}
        <section className="pb-14">
          <div className="mx-auto max-w-6xl px-6">
            <Link href={`/resources/${lead.slug}`} className="group block">
              <div
                className="rounded-[25px] overflow-hidden border transition-colors duration-300"
                style={{
                  borderColor: `${lead.accent}33`,
                  backgroundColor: `${lead.accent}0A`,
                }}
              >
                <div className="grid md:grid-cols-2 gap-0 items-stretch">
                  <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[340px] overflow-hidden">
                    <Image
                      src={lead.cover}
                      alt={`An oil painting representing: ${lead.title}`}
                      fill
                      priority
                      fetchPriority="high"
                      sizes="(max-width: 768px) 100vw, 600px"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <ResourceMotifMark motif={lead.motif} color={lead.accentInk} />
                      <p
                        className="font-jetbrains text-[10px] uppercase tracking-[0.2em]"
                        style={{ color: lead.accentInk }}
                      >
                        Start here
                        <span className="mx-2 text-fog-gray">/</span>
                        {lead.format}
                      </p>
                    </div>
                    <h2 className="font-display font-bold text-ink text-2xl md:text-3xl mb-3">
                      {lead.title}
                    </h2>
                    <p className="font-satoshi text-base text-ink-muted mb-6 max-w-md">
                      {lead.excerpt}
                    </p>
                    <span
                      className="font-satoshi text-sm font-medium inline-flex items-center gap-2"
                      style={{ color: lead.accentInk }}
                    >
                      Read this guide
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* The rest, grouped by category so the library has a shape */}
        {resourceCategories.map((cat) => {
          const inCat = rest.filter((r) => r.category === cat);
          if (inCat.length === 0) return null;
          return (
            <section key={cat} className="pb-14">
              <div className="mx-auto max-w-6xl px-6">
                <div className="flex items-baseline justify-between mb-6 pb-3 border-b border-card-border">
                  <h2 className="font-display font-bold text-ink text-xl md:text-2xl">
                    {cat}
                  </h2>
                  <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em]">
                    {inCat.length} {inCat.length === 1 ? "guide" : "guides"}
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {inCat.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/resources/${r.slug}`}
                      className="group block rounded-[25px] overflow-hidden bg-signal-white border border-card-border hover:border-border-medium transition-colors duration-300"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={r.cover}
                          alt={`An oil painting representing: ${r.title}`}
                          fill
                          loading="lazy"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                          className="object-cover"
                        />
                        <span
                          className="absolute top-3 left-3 inline-flex items-center gap-2 px-2.5 py-1 rounded-full backdrop-blur-sm"
                          style={{ backgroundColor: "rgba(246,244,239,0.92)" }}
                        >
                          <ResourceMotifMark motif={r.motif} color={r.accentInk} size={12} />
                          <span
                            className="font-jetbrains text-[9px] uppercase tracking-[0.16em]"
                            style={{ color: r.accentInk }}
                          >
                            {r.format}
                          </span>
                        </span>
                      </div>
                      <div className="p-6">
                        <h3 className="font-display font-bold text-ink text-lg mb-2 leading-snug">
                          {r.title}
                        </h3>
                        <p className="font-satoshi text-sm text-ink-muted mb-4 line-clamp-3">
                          {r.excerpt}
                        </p>
                        <p className="font-jetbrains text-[10px] text-ink-muted uppercase tracking-[0.2em]">
                          {r.readingTime} min read
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          );
        })}

        {/* Close */}
        <section className="pb-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="rounded-[25px] bg-atlantic-black p-10 md:p-14 text-center">
              <h2 className="font-display font-bold text-skeleton-bone text-2xl md:text-3xl mb-3">
                Something here that applies to you?
              </h2>
              <p className="font-satoshi text-base text-fog-gray max-w-xl mx-auto mb-7">
                If one of these guides describes a problem you are currently
                sitting with, we are happy to talk it through. No cost to scope
                it.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-skeleton-bone text-atlantic-black font-satoshi text-sm font-medium hover:bg-white transition-colors duration-300"
              >
                Start a project brief
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </SiteShell>
    </>
  );
}
