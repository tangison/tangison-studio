import fs from "fs";
import path from "path";
import sharp from "sharp";

const PAINTINGS_DIR = path.resolve(process.cwd(), "public/images/paintings");

async function convertToWebP(inputPath: string, outputPath: string, quality = 82) {
  if (fs.existsSync(outputPath)) {
    console.log(`  ⊙ ${path.basename(outputPath)} — skipped`);
    return;
  }
  if (!fs.existsSync(inputPath)) {
    console.log(`  ✗ ${path.basename(inputPath)} — source missing`);
    return;
  }
  await sharp(inputPath).webp({ quality }).toFile(outputPath);
  const outSize = (fs.statSync(outputPath).size / 1024).toFixed(0);
  console.log(`  ✓ ${path.basename(outputPath)} — ${outSize}KB`);
}

async function main() {
  console.log("Converting new paintings to WebP...");

  // Convert all PNG files in paintings dir and projects subdir
  const allPngs = [
    ...fs.readdirSync(PAINTINGS_DIR).filter(f => f.endsWith(".png")).map(f => path.join(PAINTINGS_DIR, f)),
    ...fs.readdirSync(path.join(PAINTINGS_DIR, "projects")).filter(f => f.endsWith(".png")).map(f => path.join(PAINTINGS_DIR, "projects", f)),
  ];

  for (const input of allPngs) {
    const output = input.replace(".png", ".webp");
    await convertToWebP(input, output, 82);
  }
  console.log("Done.");
}

main().catch((err) => { console.error("Fatal:", err); process.exit(1); });
