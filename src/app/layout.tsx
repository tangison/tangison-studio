import type { Metadata, Viewport } from "next";
import { poppins, satoshi, jetbrainsMono } from "@/lib/fonts";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default:
      "The Tangison Studio | Digital Product Design and Development in Namibia",
    template: "%s | The Tangison Studio",
  },
  description:
    "The Tangison Studio is an independent digital product studio in Windhoek, Namibia. Brand, digital product, and applied intelligence for organizations across Africa. One studio instead of three vendors.",
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
    images: [{ url: "/images/og/home.png", width: 1200, height: 630 }],
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "The Tangison Studio",
        url: site.url,
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
        parentOrganization: {
          "@type": "Organization",
          name: site.group.name,
          url: site.group.url,
        },
      },
      {
        "@type": "WebSite",
        name: "The Tangison Studio",
        url: site.url,
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

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${poppins.variable} ${satoshi.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
