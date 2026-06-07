import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "TANGISON STUDIO | Creative Digital Agency",
    template: "%s | TANGISON STUDIO",
  },
  description:
    "Tangison Studio is a creative digital agency that designs and builds digital experiences that move ideas forward. Windhoek, Namibia.",
  keywords: [
    "Tangison Studio",
    "creative agency",
    "digital agency",
    "web design",
    "brand design",
    "UI/UX",
    "product design",
    "Africa",
    "Namibia",
    "Windhoek",
  ],
  authors: [{ name: "Tangison Studio", url: "mailto:studio@tangison.com" }],
  publisher: "Tangison Studio",
  creator: "Tangison Studio",
  icons: {
    icon: [
      { url: "/brand/favicon.png", sizes: "64x64", type: "image/png" },
      { url: "/favicon.png", sizes: "48x48", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "TANGISON STUDIO | Creative Digital Agency",
    description: "We design and build digital experiences that move ideas forward.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://studio.tangison.com",
    siteName: "Tangison Studio",
    type: "website",
    images: [
      {
        url: "/brand/favicon.png",
        width: 499,
        height: 499,
        alt: "TANGISON STUDIO | Creative Digital Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TANGISON STUDIO | Creative Digital Agency",
    description: "We design and build digital experiences that move ideas forward.",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-satoshi antialiased bg-skeleton-bone text-ink overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
