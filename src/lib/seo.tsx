import type { Metadata } from "next";
import { site } from "./site";

/**
 * Complete page metadata and JSON-LD structured data for
 * The Tangison Studio.
 */

/**
 * Builds complete page metadata: canonical, Open Graph (type, url,
 * siteName, locale, images) and Twitter card in one place.
 *
 * Why this exists (SEO audit 2026-09-11): Next.js metadata merging
 * replaces the parent's `openGraph` object wholesale when a child page
 * defines its own, so per-page `openGraph: { title, description, images }`
 * silently dropped og:type, og:url, og:site_name and og:locale from every
 * child page (confirmed live on /about before this fix). Routing every
 * page through this helper keeps the full set on every route.
 */
export function buildPageMetadata(input: {
  /** Page title. A plain string gets the root template suffix; { absolute } is used as-is. */
  title: string | { absolute: string };
  /** Meta description, target 150-165 characters. */
  description: string;
  /** Canonical path, e.g. "/cases". */
  path: string;
  /** Open Graph title; defaults to the title string passed above. */
  ogTitle?: string;
  /** Open Graph image; defaults to the shared 1200x630 OG card. */
  ogImage?: { url: string; width: number; height: number; alt?: string };
  /** Open Graph type; "article" adds publishedTime support. */
  type?: "website" | "article";
  publishedTime?: string;
  articleAuthor?: string;
  /** Set on pages that must stay out of the index (e.g. /search). */
  noindex?: boolean;
}): Metadata {
  const titleText =
    typeof input.title === "string" ? input.title : input.title.absolute;
  const image = input.ogImage ?? {
    url: "/images/og/home.png",
    width: 1200,
    height: 630,
    alt: "The Tangison Studio: Rebuilding how the world sees your brand.",
  };
  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: input.path },
    ...(input.noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title: input.ogTitle ?? titleText,
      description: input.description,
      url: `${site.url}${input.path}`,
      siteName: site.name,
      locale: "en_NA",
      type: input.type ?? "website",
      images: [image],
      ...(input.publishedTime ? { publishedTime: input.publishedTime } : {}),
      ...(input.articleAuthor ? { authors: [input.articleAuthor] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: input.ogTitle ?? titleText,
      description: input.description,
      // No explicit image: falls back to the resolved Open Graph image
      // so og:image and twitter:image can never drift apart.
    },
  };
}

/**
 * Organization + WebSite JSON-LD graph for the root layout.
 *
 * Mirrors the graph construction of the Tangison Technologies site:
 * stable @id nodes, sameAs to the studio's real social profiles,
 * contactPoint, and the parent organization link.
 */
export function siteJsonLdGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.name,
        legalName: site.legalName,
        description: `${site.tagline} ${site.positioning} An independent digital product studio in Windhoek, Namibia.`,
        url: site.url,
        logo: `${site.url}/brand/favicon.webp`,
        email: site.email,
        telephone: site.phone,
        founder: { "@type": "Person", name: site.founder },
        foundingDate: site.founded,
        address: {
          "@type": "PostalAddress",
          streetAddress:
            "Corner of Frans Indongo Street and John Meinert Street",
          addressLocality: "Windhoek West",
          addressRegion: "Khomas",
          addressCountry: "NA",
        },
        sameAs: [
          site.social.facebook,
          site.social.instagram,
          site.social.threads,
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "customer service",
            telephone: site.phone,
            email: site.email,
            areaServed: "NA",
            availableLanguage: ["en"],
          },
        ],
        areaServed: [
          { "@type": "Place", name: "Namibia" },
          { "@type": "Place", name: "Southern Africa" },
        ],
        knowsLanguage: ["en"],
        parentOrganization: {
          "@type": "Organization",
          name: site.group.name,
          url: site.group.url,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        name: site.name,
        url: site.url,
        publisher: {
          "@type": "Organization",
          "@id": `${site.url}/#organization`,
        },
        inLanguage: "en-NA",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${site.url}/search?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };
}

/**
 * Per-page WebPage structured data.
 */
export function pageJsonLd(title: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${site.url}${path}`,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
    },
  };
}

/**
 * Renders JSON-LD as a script tag for embedding in the page.
 */
export function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
