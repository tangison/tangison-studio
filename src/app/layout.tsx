import type { Metadata, Viewport } from "next";
import { poppins, satoshi, jetbrainsMono } from "@/lib/fonts";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/lib/site";
import { JsonLdScript, siteJsonLdGraph } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    // 57 characters, keyword-first: fits the SERP title slot whole.
    default: "Digital Product Studio in Windhoek | The Tangison Studio",
    template: "%s | The Tangison Studio",
  },
  description:
    "Independent digital product studio in Windhoek, Namibia. Brand, websites, and applied intelligence for organizations across Africa. One studio, not three vendors.",
  alternates: { canonical: "/" },
  authors: [{ name: site.founder, url: site.url }],
  creator: site.founder,
  publisher: site.legalName,
  keywords: [
    "digital product studio",
    "Namibia web design",
    "Windhoek web design",
    "Windhoek West",
    "brand systems",
    "applied AI",
    "website development Namibia",
  ],
  icons: {
    icon: "/brand/favicon.webp",
    apple: "/brand/apple-touch-icon.webp",
  },
  openGraph: {
    title:
      "The Tangison Studio | Independent Digital Product Studio, Windhoek, Namibia",
    description:
      "One studio instead of three vendors. Brand, product, and the intelligence behind it.",
    url: site.url,
    siteName: "The Tangison Studio",
    locale: "en_NA",
    type: "website",
    images: [
      {
        url: "/images/og/home.png",
        width: 1200,
        height: 630,
        alt: "The Tangison Studio: Rebuilding how the world sees your brand.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f4ef" },
    { media: "(prefers-color-scheme: dark)", color: "#0c1014" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-NA"
      data-scroll-behavior="smooth"
      className={`${poppins.variable} ${satoshi.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        {/* The .js gate class is added by the client bundle itself
            (module scope of site-nav.tsx, present on every page) — NOT by
            an inline script. If the bundle fails to load (stale cache,
            blocked, crashed) the class is never set and content stays
            fully visible: no blank pages, ever. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteJsonLdGraph()),
          }}
        />
        <noscript>
          <div className="border-b border-[var(--line)] bg-[var(--paper-raise)] px-6 py-4 text-sm text-[var(--ink-muted)]">
            This site works without JavaScript. Reach the studio at{" "}
            <a className="underline" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            , on WhatsApp{" "}
            <a className="underline" href={site.whatsapp}>
              085 341 1522
            </a>
            , or browse the{" "}
            <a className="underline" href="/cases">
              case studies
            </a>
            .
          </div>
        </noscript>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[300] focus:rounded-full focus:bg-ink focus:text-paper focus:px-5 focus:py-3 focus:text-sm"
        >
          Skip to main content
        </a>
        <SiteNav />
        <main id="main-content" className="flex-1 flex flex-col">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
