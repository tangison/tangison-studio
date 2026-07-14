/**
 * Generate new oil paintings for the visual recovery.
 *
 * Every prompt includes the locked style block:
 * "Traditional oil painting on coarse linen canvas, unmistakably hand-painted,
 *  thick layered impasto, palette-knife ridges, dry-brush edges, uneven pigment
 *  density, visible directional brushwork, physical canvas grain, simplified
 *  painterly forms, restrained editorial composition, Deep Ocean Navy and
 *  Signal Teal pigments, muted rust and Skeleton Bone highlights, not photography,
 *  not photorealistic, not a photograph with a paint filter, no text, no logo,
 *  no signature."
 */

import ZAI from "z-ai-web-dev-sdk";
import fs from "fs";
import path from "path";

const OUTPUT_DIR = path.resolve(process.cwd(), "public/images/paintings");
const PROJECT_DIR = path.resolve(OUTPUT_DIR, "projects");

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
if (!fs.existsSync(PROJECT_DIR)) fs.mkdirSync(PROJECT_DIR, { recursive: true });

const STYLE = "Traditional oil painting on coarse linen canvas, unmistakably hand-painted, thick layered impasto, palette-knife ridges, dry-brush edges, uneven pigment density, visible directional brushwork, physical canvas grain, simplified painterly forms, restrained editorial composition, Deep Ocean Navy and Signal Teal pigments, muted rust and Skeleton Bone highlights, not photography, not photorealistic, not a photograph with a paint filter, no text, no logo, no signature";

const PALETTE = "palette anchored in Deep Ocean Navy #153E52, Signal Teal #2CB5B4, Skeleton Bone #F6F4EF, Atlantic Black #111315, Ink Muted #6B6860, very small Rust Signal #C56A4A accents";

interface ImageJob {
  name: string;
  prompt: string;
  output: string;
}

const jobs: ImageJob[] = [
  // HOMEPAGE HERO — replace photographic-looking one
  {
    name: "hero-skeleton-coast",
    prompt: `${STYLE}. Subject: A solitary weathered signal mast on the Skeleton Coast shoreline at first light, seen from a low angle. Heavy impasto waves in desaturated blue-grey. Dark volcanic rocks in the foreground. A tiny teal circular beacon at the mast top. Thin cable fading into mist. Large areas of calm negative space in the foggy sky. ${PALETTE}. Mood: quiet, intelligent, Namibian, editorial.`,
    output: path.join(OUTPUT_DIR, "hero-skeleton-coast.png"),
  },
  // PROAVIA — travel logistics, aircraft, journey
  {
    name: "project-proavia",
    prompt: `${STYLE}. Subject: A small aircraft taxiing on a remote Namibian airstrip at dawn, seen from a distance across the tarmac. Soft fog. A single teal signal light on the hangar. Luggage cart nearby. No text, no tail numbers visible. ${PALETTE}. Mood: quiet anticipation, journey, operational coordination.`,
    output: path.join(PROJECT_DIR, "proavia.png"),
  },
  // NALAGO — skincare, human, tactile, material
  {
    name: "project-nalago",
    prompt: `${STYLE}. Subject: A close-up of a dark-skinned African hand holding a small glass dropper bottle of skincare oil, with a few marula fruits and kalahari melon pieces arranged on a worn cream linen surface. Soft window light. Tactile, material, human. No text, no label. ${PALETTE}. Mood: warm, organic, careful, premium.`,
    output: path.join(PROJECT_DIR, "nalago.png"),
  },
  // CLUSTER LEAF SAFARIS — landscape, guided journey, human-scale
  {
    name: "project-clusterleaf",
    prompt: `${STYLE}. Subject: A solitary acacia tree on a Namibian savanna at golden hour, with a thin footpath leading toward it. Low mist. A small distant figure of a guide. No vehicle. No text. ${PALETTE}. Mood: serene, premium, owner-operated, human-scale.`,
    output: path.join(PROJECT_DIR, "clusterleaf.png"),
  },
  // INTELLIGENCE — tactile oil-painted systems composition (NOT a brain, NOT neon)
  {
    name: "intelligence-systems",
    prompt: `${STYLE}. Subject: An abstract composition representing connected tools and human decision-making. A weathered wooden table with hand-drawn flow diagrams on cream paper, small circular teal markers at junction points, a pencil, and a compass. No screens, no robots, no brains, no neon. Physical, tactile, thoughtful. ${PALETTE}. Mood: intelligent, grounded, process-oriented.`,
    output: path.join(OUTPUT_DIR, "intelligence-systems.png"),
  },
  // PROCESS — one progressive visual
  {
    name: "process-progressive",
    prompt: `${STYLE}. Subject: A winding Namibian desert road seen from above, splitting and then resolving into one clear route, with five small circular teal markers along the path. Bone, navy, and grey mineral palette. No vehicle. No text. ${PALETTE}. Mood: directional, resolving, calm, progressive.`,
    output: path.join(OUTPUT_DIR, "process-progressive.png"),
  },
  // COLLABORATION — studio approach
  {
    name: "collaboration-studio",
    prompt: `${STYLE}. Subject: Two pairs of hands collaborating over a spread of interface sketches, color swatches, and a laptop on a worn wooden studio table. Soft window light. No readable text. No faces. ${PALETTE}. Mood: collaborative, focused, craft, human.`,
    output: path.join(OUTPUT_DIR, "collaboration-studio.png"),
  },
  // PRINCIPLES — physical studio texture
  {
    name: "principles-texture",
    prompt: `${STYLE}. Subject: A close-up of a studio work surface — coarse linen, charcoal sticks, a small dish of teal pigment, a bone-colored paper sample, and a single circular teal signal dot. Abstract, tactile, material. ${PALETTE}. Mood: principled, grounded, material.`,
    output: path.join(OUTPUT_DIR, "principles-texture.png"),
  },
];

async function generateOne(zai: any, job: ImageJob): Promise<void> {
  if (fs.existsSync(job.output.replace(".png", ".webp"))) {
    console.log(`  ⊙ ${job.name} — skipped (webp exists)`);
    return;
  }
  if (fs.existsSync(job.output)) {
    console.log(`  ⊙ ${job.name} — skipped (png exists)`);
    return;
  }
  const startTime = Date.now();
  console.log(`  → ${job.name}...`);
  const response = await zai.images.generations.create({
    prompt: job.prompt,
    size: "1344x768",
  });
  const buffer = Buffer.from(response.data[0].base64, "base64");
  fs.writeFileSync(job.output, buffer);
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  const sizeKB = (buffer.length / 1024).toFixed(0);
  console.log(`  ✓ ${job.name} — ${sizeKB}KB in ${elapsed}s`);
}

async function generateAll() {
  console.log(`Generating ${jobs.length} oil paintings...`);
  const zai = await ZAI.create();

  for (let i = 0; i < jobs.length; i += 2) {
    const batch = jobs.slice(i, i + 2);
    await Promise.all(batch.map((job) => generateOne(zai, job).catch((e) => {
      console.error(`  ✗ ${job.name} failed:`, (e as Error).message);
    })));
  }
  console.log("\nDone.");
}

generateAll().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
