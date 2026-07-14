/**
 * Generate sparse editorial impasto paintings via Pollinations.
 * Uses image.pollinations.ai/prompt/ endpoint which works without auth.
 */

import fs from "fs";
import path from "path";
import https from "https";

const PAINTINGS_DIR = path.resolve(process.cwd(), "public/images/paintings");
const PROJECT_DIR = path.resolve(PAINTINGS_DIR, "projects");

if (!fs.existsSync(PAINTINGS_DIR)) fs.mkdirSync(PAINTINGS_DIR, { recursive: true });
if (!fs.existsSync(PROJECT_DIR)) fs.mkdirSync(PROJECT_DIR, { recursive: true });

const MASTER_PROMPT =
  "An unmistakable traditional oil painting on coarse woven linen canvas. Extremely visible thick impasto pigment, raised palette-knife ridges, broken bristle marks, scraped paint, layered uneven colour, dry-brush interruptions and raw canvas showing between strokes. Simplified semi-abstract forms with intentionally softened detail. The subject is suggested through shape, colour and gesture rather than photographic accuracy. Restrained editorial composition with large quiet areas and only two or three visual elements. Physical handmade painting, imperfect edges, tactile pigment and expressive brush direction. Skeleton Bone, Atlantic Black, Deep Ocean Navy, muted Fog Gray and restrained Signal Teal palette. Deliberately non-photographic and non-digital.";

const NEGATIVE =
  "Not photography. Not photorealistic. Not hyper-realistic. Not cinematic photography. Not 3D. Not CGI. Not vector art. Not digital concept art. Not smooth. Not glossy. No sharp facial detail. No tiny background details. No busy composition. No crowds. No text. No letters. No numbers. No logos. No signature. No watermark. No neural-network brain. No glowing nodes. No neon.";

interface ImageJob {
  name: string;
  subjectPrompt: string;
  seed: number;
  output: string;
}

const jobs: ImageJob[] = [
  { name: "hero-skeleton-coast", subjectPrompt: "A solitary rusted coastal signal mast beside one low Atlantic wave, with a small teal navigation light.", seed: 1001, output: path.join(PAINTINGS_DIR, "hero-skeleton-coast-v2.jpg") },
  { name: "project-proavia", subjectPrompt: "One small aircraft beside one isolated runway marker on a foggy airstrip, with a small teal light.", seed: 2001, output: path.join(PROJECT_DIR, "proavia-v2.jpg") },
  { name: "project-nalago", subjectPrompt: "One amber skincare bottle beside one marula fruit on a cream linen surface.", seed: 2002, output: path.join(PROJECT_DIR, "nalago-v2.jpg") },
  { name: "project-clusterleaf", subjectPrompt: "One acacia tree silhouette beside one distant safari vehicle on a misty savanna.", seed: 2003, output: path.join(PROJECT_DIR, "clusterleaf-v2.jpg") },
  { name: "capability-brand", subjectPrompt: "Two hands aligning one printed identity sheet on a dark worktable, with one teal pencil.", seed: 3001, output: path.join(PAINTINGS_DIR, "capability-brand-v2.jpg") },
  { name: "capability-product", subjectPrompt: "One open sketchbook showing abstract interface blocks beside one black mechanical pencil.", seed: 3002, output: path.join(PAINTINGS_DIR, "capability-product-v2.jpg") },
  { name: "capability-intelligence", subjectPrompt: "One hand connecting two paper workflow cards with a single teal thread on a dark table.", seed: 3003, output: path.join(PAINTINGS_DIR, "capability-intelligence-v2.jpg") },
  { name: "process-progressive", subjectPrompt: "One unfinished blueprint beside one wooden ruler, with a small teal paint mark.", seed: 4001, output: path.join(PAINTINGS_DIR, "process-progressive-v2.jpg") },
  { name: "collaboration-studio", subjectPrompt: "Two hands meeting over one shared plan, with a single teal line joining their positions.", seed: 5001, output: path.join(PAINTINGS_DIR, "collaboration-studio-v2.jpg") },
  { name: "about-windhoek", subjectPrompt: "One studio desk facing a simplified Windhoek horizon, with one closed notebook.", seed: 6001, output: path.join(PAINTINGS_DIR, "about-windhoek-v2.jpg") },
  { name: "contact-invitation", subjectPrompt: "One dark telephone receiver beside one handwritten blank note on a cream surface.", seed: 7001, output: path.join(PAINTINGS_DIR, "contact-invitation-v2.jpg") },
  { name: "not-found-signal", subjectPrompt: "One broken wooden signal post in fog, with one small fading teal light.", seed: 8001, output: path.join(PAINTINGS_DIR, "not-found-signal-v2.jpg") },
];

function downloadImage(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const req = https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        downloadImage(response.headers.location!, dest).then(resolve).catch(reject);
        return;
      }
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on("finish", () => { file.close(); resolve(); });
    });
    req.on("error", (err) => { fs.unlink(dest, () => {}); reject(err); });
    req.setTimeout(90000, () => { req.destroy(); reject(new Error("timeout")); });
  });
}

async function generateOne(job: ImageJob): Promise<void> {
  const webpOutput = job.output.replace(".jpg", ".webp");
  if (fs.existsSync(webpOutput)) { console.log(`  \u{2299} ${job.name} skipped`); return; }
  if (fs.existsSync(job.output)) { console.log(`  \u{2299} ${job.name} skipped (jpg)`); return; }

  const fullPrompt = `${job.subjectPrompt}. ${MASTER_PROMPT} ${NEGATIVE}`;
  const encodedPrompt = encodeURIComponent(fullPrompt);
  const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1536&height=1024&seed=${job.seed}&nologo=true&model=flux`;

  console.log(`  \u2192 ${job.name} (seed: ${job.seed})...`);
  const startTime = Date.now();
  try {
    await downloadImage(url, job.output);
    const sizeKB = (fs.statSync(job.output).size / 1024).toFixed(0);
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`  \u2713 ${job.name} \u2014 ${sizeKB}KB in ${elapsed}s`);
  } catch (err) {
    console.error(`  \u2717 ${job.name} failed: ${(err as Error).message}`);
  }
}

async function generateAll() {
  console.log(`Generating ${jobs.length} sparse impasto paintings...\n`);
  for (let i = 0; i < jobs.length; i += 2) {
    const batch = jobs.slice(i, i + 2);
    await Promise.all(batch.map((job) => generateOne(job)));
  }
  console.log("\nGeneration complete.");
}

generateAll().catch((err) => { console.error("Fatal:", err); process.exit(1); });
