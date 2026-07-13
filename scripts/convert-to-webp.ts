/**
 * Convert all generated PNGs to optimized WebP.
 * Create the 1200×630 OG image with Studio logo + tagline overlay.
 */

import fs from "fs";
import path from "path";
import sharp from "sharp";

const PAINTINGS_DIR = path.resolve(process.cwd(), "public/images/paintings");
const INTEL_DIR = path.resolve(process.cwd(), "public/images/intelligence");
const PUBLIC_DIR = path.resolve(process.cwd(), "public");

async function convertToWebP(inputPath: string, outputPath: string, quality = 82) {
  if (fs.existsSync(outputPath)) {
    console.log(`  \u{2299} ${path.basename(outputPath)} \u2014 skipped (exists)`);
    return;
  }
  if (!fs.existsSync(inputPath)) {
    console.log(`  \u2717 ${path.basename(inputPath)} \u2014 source missing`);
    return;
  }
  const inSize = (fs.statSync(inputPath).size / 1024).toFixed(0);
  await sharp(inputPath)
    .webp({ quality })
    .toFile(outputPath);
  const outSize = (fs.statSync(outputPath).size / 1024).toFixed(0);
  console.log(`  \u2713 ${path.basename(outputPath)} \u2014 ${inSize}KB \u2192 ${outSize}KB`);
}

async function createOGImage() {
  const ogPath = path.join(PUBLIC_DIR, "og.png");
  if (fs.existsSync(ogPath)) {
    console.log("  \u{2299} og.png \u2014 skipped (exists)");
    return;
  }

  const baseImage = path.join(PAINTINGS_DIR, "atlantic-signal-hero.png");
  const width = 1200;
  const height = 630;

  const overlay = Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="darken" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#111315" stop-opacity="0.78"/>
          <stop offset="55%" stop-color="#111315" stop-opacity="0.45"/>
          <stop offset="100%" stop-color="#111315" stop-opacity="0.12"/>
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#darken)"/>

      <!-- Studio circular logo (navy circle) -->
      <circle cx="80" cy="80" r="36" fill="#153E52"/>
      <line x1="80" y1="62" x2="80" y2="98" stroke="#E6F2F1" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="80" cy="63" r="3.5" fill="#E6F2F1"/>
      <path d="M70 98 L90 98" stroke="#E6F2F1" stroke-width="2.5" stroke-linecap="round" opacity="0.5"/>

      <!-- Studio wordmark -->
      <text x="130" y="93" font-family="Helvetica, Arial, sans-serif" font-size="36" font-weight="bold" fill="#E6F2F1" letter-spacing="-1">Studio</text>

      <!-- Headline -->
      <text x="80" y="320" font-family="Helvetica, Arial, sans-serif" font-size="48" font-weight="bold" fill="#E6F2F1" letter-spacing="-1.5">
        <tspan x="80" dy="0">We build the brand,</tspan>
        <tspan x="80" dy="58">the product and the AI</tspan>
        <tspan x="80" dy="58">systems behind it.</tspan>
      </text>

      <!-- Supporting line -->
      <text x="80" y="520" font-family="Helvetica, Arial, sans-serif" font-size="24" font-weight="400" fill="#2CB5B4">One studio instead of three vendors.</text>

      <!-- URL -->
      <text x="80" y="580" font-family="Helvetica, Arial, sans-serif" font-size="20" font-weight="400" fill="#E6F2F1" opacity="0.7">studio.tangison.com · Windhoek, Namibia</text>
    </svg>
  `);

  await sharp(baseImage)
    .resize(width, height, { fit: "cover", position: "center" })
    .composite([{ input: overlay, top: 0, left: 0 }])
    .png()
    .toFile(ogPath);

  const sizeKB = (fs.statSync(ogPath).size / 1024).toFixed(0);
  console.log(`  \u2713 og.png \u2014 ${sizeKB}KB (1200\u00d7630 with overlay)`);
}

async function main() {
  console.log("Converting paintings to WebP...");
  const paintingFiles = fs
    .readdirSync(PAINTINGS_DIR)
    .filter((f) => f.endsWith(".png"));

  for (const file of paintingFiles) {
    const input = path.join(PAINTINGS_DIR, file);
    const output = path.join(PAINTINGS_DIR, file.replace(".png", ".webp"));
    await convertToWebP(input, output, 82);
  }

  console.log("\nConverting intelligence diagrams to WebP...");
  const intelFiles = fs
    .readdirSync(INTEL_DIR)
    .filter((f) => f.endsWith(".png"));

  for (const file of intelFiles) {
    const input = path.join(INTEL_DIR, file);
    const output = path.join(INTEL_DIR, file.replace(".png", ".webp"));
    await convertToWebP(input, output, 82);
  }

  console.log("\nCreating OG image with text overlay...");
  await createOGImage();

  console.log("\nDone. All WebP conversions complete.");
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
