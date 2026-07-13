import type { Metadata } from "next";
import type React from "react";
import localFont from "next/font/local";
import { OrganizationJsonLd } from "@/components/tangison/json-ld";
import "./globals.css";

/* ── next/font/local: Self-hosted, zero render-blocking ── */
const cabinetGrotesk = localFont({
  src: [
    { path: "../../public/fonts/CabinetGrotesk-400.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/CabinetGrotesk-500.ttf", weight: "500", style: "normal" },
    { path: "../../public/fonts/CabinetGrotesk-700.ttf", weight: "700", style: "normal" },
    { path: "../../public/fonts/CabinetGrotesk-800.ttf", weight: "800", style: "normal" },
    { path: "../../public/fonts/CabinetGrotesk-900.ttf", weight: "900", style: "normal" },
  ],
  variable: "--font-cabinet-grotesk",
  display: "swap",
  preload: false,
});

const satoshi = localFont({
  src: [
    { path: "../../public/fonts/Satoshi-300.ttf", weight: "300", style: "normal" },
    { path: "../../public/fonts/Satoshi-400.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/Satoshi-500.ttf", weight: "500", style: "normal" },
    { path: "../../public/fonts/Satoshi-700.ttf", weight: "700", style: "normal" },
    { path: "../../public/fonts/Satoshi-900.ttf", weight: "900", style: "normal" },
  ],
  variable: "--font-satoshi",
  display: "swap",
  preload: false,
});

const jetbrainsMono = localFont({
  src: [
    { path: "../../public/fonts/JetBrainsMono-Regular.ttf", weight: "400", style: "normal" },
  ],
  variable: "--font-jetbrains-mono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "Studio | Digital Product Design and Development in Namibia",
    template: "%s | Studio",
  },
  description:
    "Studio brings brand, digital product design and applied intelligence together for ambitious organizations across Africa. One studio instead of three vendors.",
  keywords: [],
  authors: [{ name: "Tangi Iigonda", url: "mailto:studio@tangison.com" }],
  publisher: "Tangison Studio",
  creator: "Tangi Iigonda",
  icons: {
    icon: [
      { url: "/brand/favicon.png", sizes: "64x64", type: "image/png" },
      { url: "/favicon.png", sizes: "48x48", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Studio | Digital Product Design and Development in Namibia",
    description:
      "Studio brings brand, digital product design and applied intelligence together for ambitious organizations across Africa.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://studio.tangison.com",
    siteName: "Studio",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Studio — Digital products built with clarity, character and purpose.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio | Digital Product Design and Development in Namibia",
    description:
      "Studio brings brand, digital product design and applied intelligence together for ambitious organizations across Africa.",
    images: ["/og.png"],
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://studio.tangison.com"),
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${cabinetGrotesk.variable} ${satoshi.variable} ${jetbrainsMono.variable}`} style={{ maxWidth: "100%", overflowX: "hidden" }}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <OrganizationJsonLd />
      </head>
      <body
        className="font-satoshi antialiased bg-skeleton-bone text-ink overflow-x-hidden"
        style={{ maxWidth: "100%" }}
        data-build={
          process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ??
          process.env.NEXT_PUBLIC_BUILD_ID ??
          "local"
        }
      >
        {children}
      </body>
    </html>
  );
}
