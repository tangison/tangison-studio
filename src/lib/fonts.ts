import localFont from "next/font/local";

/** Cabinet Grotesk — display (headings). Sourced from the production site. */
export const cabinetGrotesk = localFont({
  src: [
    { path: "../fonts/CabinetGrotesk-400.ttf", weight: "400", style: "normal" },
    { path: "../fonts/CabinetGrotesk-500.ttf", weight: "500", style: "normal" },
    { path: "../fonts/CabinetGrotesk-700.ttf", weight: "700", style: "normal" },
    { path: "../fonts/CabinetGrotesk-800.ttf", weight: "800", style: "normal" },
    { path: "../fonts/CabinetGrotesk-900.ttf", weight: "900", style: "normal" },
  ],
  variable: "--font-cabinet",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

/** Satoshi — body. Sourced from the production site. */
export const satoshi = localFont({
  src: [
    { path: "../fonts/Satoshi-300.ttf", weight: "300", style: "normal" },
    { path: "../fonts/Satoshi-400.ttf", weight: "400", style: "normal" },
    { path: "../fonts/Satoshi-500.ttf", weight: "500", style: "normal" },
    { path: "../fonts/Satoshi-700.ttf", weight: "700", style: "normal" },
    { path: "../fonts/Satoshi-900.ttf", weight: "900", style: "normal" },
  ],
  variable: "--font-satoshi",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

/** JetBrains Mono — labels. Sourced from the production site. */
export const jetbrainsMono = localFont({
  src: [{ path: "../fonts/JetBrainsMono-400.ttf", weight: "400", style: "normal" }],
  variable: "--font-jetbrains",
  display: "swap",
  fallback: ["monospace"],
});
