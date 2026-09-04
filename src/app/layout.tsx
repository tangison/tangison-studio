import type { Metadata, Viewport } from "next";
import { cabinetGrotesk, satoshi, jetbrainsMono } from "@/lib/fonts";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Studio | Digital Product Design and Development in Namibia",
    template: "%s | Studio",
  },
  description:
    "Studio builds brand, digital product, and applied intelligence for organizations across Africa. One studio instead of three vendors.",
  authors: [{ name: site.founder, url: site.url }],
  creator: site.founder,
  publisher: site.legalName,
  keywords: [
    "digital product studio",
    "Namibia web design",
    "Windhoek",
    "brand systems",
    "applied AI",
    "website development",
  ],
  icons: {
    icon: "/brand/favicon.webp",
    apple: "/brand/favicon.webp",
  },
  openGraph: {
    title: "Studio | Digital Product Design and Development in Namibia",
    description:
      "One studio instead of three vendors. Brand, product, and the intelligence behind it.",
    url: site.url,
    siteName: site.legalName,
    locale: "en_NA",
    type: "website",
    images: [{ url: "/images/paintings/hero-poster.webp", width: 1280, height: 720 }],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4efe6" },
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
    "@type": "Organization",
    name: site.legalName,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    founder: { "@type": "Person", name: site.founder },
    foundingDate: site.founded,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Windhoek",
      addressCountry: "NA",
    },
    parentOrganization: { "@type": "Organization", name: site.group.name, url: site.group.url },
  };

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${cabinetGrotesk.variable} ${satoshi.variable} ${jetbrainsMono.variable}`}
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
