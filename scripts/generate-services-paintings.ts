/**
 * Generate unique paintings for services page so no image is reused across pages.
 * Also generate unique paintings for the work index fallback and case study detail fallback.
 */

import fs from "fs";
import path from "path";
import https from "https";

const PAINTINGS_DIR = path.resolve(process.cwd(), "public/images/paintings");

const MASTER = "Traditional oil painting on coarse woven linen canvas. Heavy raised impasto, thick palette-knife deposits, broken bristle marks, scraped pigment, raw canvas gaps, uneven layered colour and simplified semi-abstract forms. One primary object, one supporting object. Physical handmade paint more visible than the scene. Atlantic Black, Skeleton Bone, Deep Ocean Navy, Fog Gray and Signal Teal. Deliberately non-photographic.";
const NEGATIVE = "No photography, photorealism, CGI, 3D, smooth gradients, detailed face, hand, fingers, crowd, text, logo, watermark, brain, glowing network, busy background.";

interface Job { name: string; prompt: string; seed: number; output: string; }

const jobs: Job[] = [
  // SERVICES PAGE — unique paintings (different from homepage capability paintings)
  { name: "services-brand", prompt: "One stacked set of printed identity cards beside one bone-colored pencil on a dark table.", seed: 4101, output: path.join(PAINTINGS_DIR, "services-brand.jpg") },
  { name: "services-product", prompt: "One wireframe sketch beside one ruler and one small teal dot on cream paper.", seed: 4102, output: path.join(PAINTINGS_DIR, "services-product.jpg") },
  { name: "services-intelligence", prompt: "One compass beside one annotated map with a single teal route line on a dark surface.", seed: 4103, output: path.join(PAINTINGS_DIR, "services-intelligence.jpg") },
  // WORK INDEX — unique editorial introduction painting (not the hero)
  { name: "work-intro", prompt: "One open portfolio folder beside one signal mast silhouette on a muted background.", seed: 4201, output: path.join(PAINTINGS_DIR, "work-intro.jpg") },
];

function downloadImage(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const req = https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) { downloadImage(response.headers.location!, dest).then(resolve).catch(reject); return; }
      if (response.statusCode !== 200) { reject(new Error(`HTTP ${response.statusCode}`)); return; }
      response.pipe(file);
      file.on("finish", () => { file.close(); resolve(); });
    });
    req.on("error", (err) => { fs.unlink(dest, () => {}); reject(err); });
    req.setTimeout(90000, () => { req.destroy(); reject(new Error("timeout")); });
  });
}

async function generateOne(job: Job): Promise<void> {
  const webpOutput = job.output.replace(".jpg", ".webp");
  if (fs.existsSync(webpOutput)) { console.log(`  ⊙ ${job.name} skipped`); return; }
  const fullPrompt = `${job.prompt}. ${MASTER} ${NEGATIVE}`;
  const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(fullPrompt)}?width=1536&height=1024&seed=${job.seed}&nologo=true&model=flux`;
  console.log(`  → ${job.name}...`);
  try {
    await downloadImage(url, job.output);
    console.log(`  ✓ ${job.name} — ${(fs.statSync(job.output).size / 1024).toFixed(0)}KB`);
  } catch (err) { console.error(`  ✗ ${job.name}: ${(err as Error).message}`); }
}

async function main() {
  console.log(`Generating ${jobs.length} unique paintings...\n`);
  for (const job of jobs) {
    await generateOne(job);
  }
  console.log("\nDone.");
}
main().catch(console.error);
