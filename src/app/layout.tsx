import type { Metadata } from "next";
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
});

const jetbrainsMono = localFont({
  src: [
    { path: "../../public/fonts/JetBrainsMono-Regular.ttf", weight: "400", style: "normal" },
  ],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "TANGISON STUDIO | Creative Digital Agency in Namibia",
    template: "%s | TANGISON STUDIO",
  },
  description:
    "Tangison Studio is a creative digital agency in Windhoek, Namibia. Founded by Tangi Iigonda in 2023. Website design, development, brand systems, and creative direction for organizations across Africa.",
  keywords: [
    "Tangison Studio",
    "Gemsweb Digital",
    "Tangi Iigonda",
    "creative agency",
    "digital agency",
    "web design Namibia",
    "brand design",
    "UI/UX",
    "product design",
    "Africa",
    "Namibia",
    "Windhoek",
    "website development",
    "design systems",
    "creative direction",
  ],
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
    title: "TANGISON STUDIO | Creative Digital Agency in Namibia",
    description: "We design and build websites, brand systems, and digital products for organizations across Africa. Founded by Tangi Iigonda in Windhoek, Namibia.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://studio.tangison.com",
    siteName: "Tangison Studio",
    type: "website",
    images: [
      {
        url: "/brand/favicon.png",
        width: 499,
        height: 499,
        alt: "TANGISON STUDIO | Creative Digital Agency in Namibia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TANGISON STUDIO | Creative Digital Agency in Namibia",
    description: "We design and build websites, brand systems, and digital products for organizations across Africa.",
    images: ["/brand/favicon.png"],
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
      <body className="font-satoshi antialiased bg-skeleton-bone text-ink overflow-x-hidden" style={{ maxWidth: "100%" }}>
        {children}
      </body>
    </html>
  );
}
