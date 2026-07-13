/**
 * Convert the official uploaded Studio icon to optimized WebP.
 * Source: /home/z/my-project/upload/Upscale_image_perfectly_202606050212__1_-removebg-preview.png
 * Output: /home/z/my-project/real-repo/public/brand/favicon.webp (replaces existing)
 *         /home/z/my-project/real-repo/public/brand/icon-studio.webp (new high-quality)
 *
 * Also generates:
 *   - favicon.png (high-quality PNG fallback)
 *   - apple-touch-icon.png (180x180 for iOS)
 *   - icon-32.png, icon-64.png (standard favicon sizes)
 */

import sharp from "sharp";
import fs from "fs";
import path from "path";

const SOURCE = "/home/z/my-project/upload/Upscale_image_perfectly_202606050212__1_-removebg-preview.png";
const BRAND_DIR = path.resolve("/home/z/my-project/real-repo/public/brand");

if (!fs.existsSync(BRAND_DIR)) {
  fs.mkdirSync(BRAND_DIR, { recursive: true });
}

async function main() {
  console.log("Converting official Studio icon to optimized formats...\n");
  console.log(`Source: ${SOURCE}`);
  console.log(`Output: ${BRAND_DIR}\n`);

  const sourceBuffer = fs.readFileSync(SOURCE);
  const sourceSize = (sourceBuffer.length / 1024).toFixed(0);
  console.log(`Source PNG: 499×499 RGBA, ${sourceSize}KB\n`);

  // 1. High-quality WebP favicon (replaces existing)
  const webpPath = path.join(BRAND_DIR, "favicon.webp");
  await sharp(SOURCE)
    .webp({ quality: 95, lossless: false })
    .toFile(webpPath);
  const webpSize = (fs.statSync(webpPath).length / 1024).toFixed(0);
  console.log(`✓ favicon.webp — ${webpSize}KB (replaces existing)`);

  // 2. High-quality PNG favicon (replaces existing)
  const pngPath = path.join(BRAND_DIR, "favicon.png");
  await sharp(SOURCE)
    .png({ quality: 95, compressionLevel: 9 })
    .toFile(pngPath);
  const pngSize = (fs.statSync(pngPath).length / 1024).toFixed(0);
  console.log(`✓ favicon.png — ${pngSize}KB (replaces existing)`);

  // 3. Apple touch icon (180x180 — iOS requires this size, no transparency)
  const applePath = path.join(BRAND_DIR, "apple-touch-icon.png");
  await sharp(SOURCE)
    .resize(180, 180, { fit: "contain", background: { r: 21, g: 62, b: 82, alpha: 1 } })
    .png()
    .toFile(applePath);
  const appleSize = (fs.statSync(applePath).length / 1024).toFixed(0);
  console.log(`✓ apple-touch-icon.png — ${appleSize}KB (180×180, navy background)`);

  // Also copy to public root for apple-touch-icon convention
  const appleRootPath = path.resolve("/home/z/my-project/real-repo/public/apple-touch-icon.png");
  await sharp(SOURCE)
    .resize(180, 180, { fit: "contain", background: { r: 21, g: 62, b: 82, alpha: 1 } })
    .png()
    .toFile(appleRootPath);

  // 4. Standard favicon sizes
  for (const size of [32, 64, 128, 256]) {
    const sizePath = path.join(BRAND_DIR, `icon-${size}.png`);
    await sharp(SOURCE)
      .resize(size, size, { fit: "contain" })
      .png()
      .toFile(sizePath);
    const sizeKB = (fs.statSync(sizePath).length / 1024).toFixed(0);
    console.log(`✓ icon-${size}.png — ${sizeKB}KB (${size}×${size})`);
  }

  // 5. High-quality WebP for use in logo component (larger display)
  const iconStudioPath = path.join(BRAND_DIR, "icon-studio.webp");
  await sharp(SOURCE)
    .webp({ quality: 95 })
    .toFile(iconStudioPath);
  const iconStudioSize = (fs.statSync(iconStudioPath).length / 1024).toFixed(0);
  console.log(`✓ icon-studio.webp — ${iconStudioSize}KB (499×499, for logo display)`);

  console.log("\n✓ All icon formats generated. The official uploaded icon is now the production favicon.");
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
