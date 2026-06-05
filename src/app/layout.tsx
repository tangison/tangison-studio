import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "TANGISON STUDIO | Creative Digital Agency",
    template: "%s | TANGISON STUDIO",
  },
  description:
    "TANGISON STUDIO is a Namibian creative digital agency that designs, builds, and deploys beautiful digital experiences, brands, and platforms for organizations across Africa.",
  keywords: [
    "Tangison Studio",
    "creative agency",
    "digital agency",
    "web design",
    "brand design",
    "UI/UX",
    "Africa",
    "Namibia",
    "Windhoek",
  ],
  authors: [{ name: "Tangison Studio", email: "tangison@proton.me" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "TANGISON STUDIO | Creative Digital Agency",
    description: "Creative digital agency. Built in Africa. Design, build, deploy.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://tangisonstudio.com",
    siteName: "Tangison Studio",
    type: "website",
    images: [
      {
        url: "/images/og-image.png",
        width: 1344,
        height: 768,
        alt: "TANGISON STUDIO | Creative Digital Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TANGISON STUDIO | Creative Digital Agency",
    description: "Creative digital agency. Built in Africa.",
    images: ["/images/og-image.png"],
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://tangisonstudio.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-satoshi antialiased bg-warm-white text-ink overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
