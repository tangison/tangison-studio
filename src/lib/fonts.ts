import localFont from "next/font/local";

/**
 * The Tangison Studio type system (design.md):
 *  - Display: Poppins (user-mandated heading face, latin subset woff2)
 *  - Body:    Satoshi
 *  - Mono:    JetBrains Mono (metadata labels only)
 */
export const poppins = localFont({
  src: [
    { path: "../fonts/poppins/Poppins-600.woff2", weight: "600", style: "normal" },
    { path: "../fonts/poppins/Poppins-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-poppins",
  display: "swap",
  fallback: ["Satoshi", "system-ui", "sans-serif"],
});

/** Satoshi: body. Sourced from the production site. 400/500/700 only. */
export const satoshi = localFont({
  src: [
    { path: "../fonts/Satoshi-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Satoshi-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/Satoshi-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-satoshi",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

/** JetBrains Mono: labels. Latin-subset woff2, ~28KB. */
export const jetbrainsMono = localFont({
  src: [{ path: "../fonts/JetBrainsMono-400-latin.woff2", weight: "400", style: "normal" }],
  variable: "--font-jetbrains",
  display: "swap",
  fallback: ["monospace"],
});
