/**
 * Generate unique sparse impasto paintings for each project and blog article.
 * Uses Pollinations FLUX via image.pollinations.ai/prompt/ endpoint.
 */

import fs from "fs";
import path from "path";
import https from "https";

const PROJECT_DIR = path.resolve(process.cwd(), "public/images/paintings/projects");
const BLOG_DIR = path.resolve(process.cwd(), "public/images/paintings/blog");

if (!fs.existsSync(PROJECT_DIR)) fs.mkdirSync(PROJECT_DIR, { recursive: true });
if (!fs.existsSync(BLOG_DIR)) fs.mkdirSync(BLOG_DIR, { recursive: true });

const MASTER = "An unmistakable traditional oil painting on coarse woven linen canvas. Extremely visible thick impasto pigment, raised palette-knife ridges, broken bristle marks, scraped paint, layered uneven colour, dry-brush interruptions and raw canvas showing between strokes. Simplified semi-abstract forms with intentionally softened detail. The subject is suggested through shape, colour and gesture rather than photographic accuracy. Restrained editorial composition with large quiet areas and only two or three visual elements. Physical handmade painting, imperfect edges, tactile pigment and expressive brush direction. Skeleton Bone, Atlantic Black, Deep Ocean Navy, muted Fog Gray and restrained Signal Teal palette. Deliberately non-photographic and non-digital.";

const NEGATIVE = "Not photography. Not photorealistic. Not hyper-realistic. Not cinematic photography. Not 3D. Not CGI. Not vector art. Not digital concept art. Not smooth. Not glossy. No sharp facial detail. No tiny background details. No busy composition. No crowds. No text. No letters. No numbers. No logos. No signature. No watermark. No neural-network brain. No glowing nodes. No neon.";

interface Job { name: string; prompt: string; seed: number; output: string; }

const jobs: Job[] = [
  // UNIQUE PROJECT PAINTINGS (8 new — for projects that were reusing generic paintings)
  { name: "smefrog", prompt: "One simplified registration document beside one green ink stamp on a cream surface.", seed: 2101, output: path.join(PROJECT_DIR, "smefrog.jpg") },
  { name: "petrocor", prompt: "One fuel tanker beside one industrial storage tank in muted fog.", seed: 2102, output: path.join(PROJECT_DIR, "petrocor.jpg") },
  { name: "tangison-systems", prompt: "One compact server enclosure connected to one Signal Teal fibre line.", seed: 2103, output: path.join(PROJECT_DIR, "tangison-systems.jpg") },
  { name: "crescendo", prompt: "One upright piano beside one brass instrument in soft light.", seed: 2104, output: path.join(PROJECT_DIR, "crescendo.jpg") },
  { name: "feorm", prompt: "One Namibian farmhouse beside one gravel access road in muted tone.", seed: 2105, output: path.join(PROJECT_DIR, "feorm.jpg") },
  { name: "lrclearing", prompt: "One freight container beside one customs-document folder on a dark table.", seed: 2106, output: path.join(PROJECT_DIR, "lrclearing.jpg") },
  { name: "reviveautoworks", prompt: "One vehicle in side profile on a workshop lift beside one mechanical spanner.", seed: 2107, output: path.join(PROJECT_DIR, "reviveautoworks.jpg") },
  { name: "miway", prompt: "One passenger minibus on a Northern Namibian road beside one construction marker.", seed: 2108, output: path.join(PROJECT_DIR, "miway.jpg") },
  // UNIQUE BLOG COVERS (8 new — one per article)
  { name: "blog-01", prompt: "Three small circular marks merging into one on a dark surface, representing unification.", seed: 3101, output: path.join(BLOG_DIR, "blog-01.jpg") },
  { name: "blog-02", prompt: "One broken compass beside one blank map on a cream surface, representing lost direction.", seed: 3102, output: path.join(BLOG_DIR, "blog-02.jpg") },
  { name: "blog-03", prompt: "One stacked set of identity cards beside one teal pencil, representing brand systems.", seed: 3103, output: path.join(BLOG_DIR, "blog-03.jpg") },
  { name: "blog-04", prompt: "One pair of pliers connecting two wires beside one small teal light, representing practical AI.", seed: 3104, output: path.join(BLOG_DIR, "blog-04.jpg") },
  { name: "blog-05", prompt: "One scaffolding structure beside one foundation stone, representing building products.", seed: 3105, output: path.join(BLOG_DIR, "blog-05.jpg") },
  { name: "blog-06", prompt: "One grid of connected dots beside one ruler, representing design systems.", seed: 3106, output: path.join(BLOG_DIR, "blog-06.jpg") },
  { name: "blog-07", prompt: "One simplified Windhoek hill silhouette beside one signal mast, representing local building.", seed: 3107, output: path.join(BLOG_DIR, "blog-07.jpg") },
  { name: "blog-08", prompt: "One open door with one small ramp beside it, representing accessibility.", seed: 3108, output: path.join(BLOG_DIR, "blog-08.jpg") },
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
    const sizeKB = (fs.statSync(job.output).size / 1024).toFixed(0);
    console.log(`  ✓ ${job.name} — ${sizeKB}KB`);
  } catch (err) { console.error(`  ✗ ${job.name}: ${(err as Error).message}`); }
}

async function main() {
  console.log(`Generating ${jobs.length} unique paintings...\n`);
  for (let i = 0; i < jobs.length; i += 2) {
    await Promise.all(jobs.slice(i, i + 2).map(generateOne));
  }
  console.log("\nDone.");
}
main().catch(console.error);
