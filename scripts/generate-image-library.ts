/**
 * THE ATLANTIC SIGNAL — Expanded image library generator.
 *
 * Locked style block (from follow-up directive section 11):
 *   "Traditional editorial oil painting on coarse linen, visible impasto
 *    brush ridges, dry-brush scraping, palette-knife marks, translucent
 *    atmospheric glazing, mineral pigments, restrained realism, painterly
 *    single-source light, imperfect hand-painted edges, visible aged canvas
 *    grain, quiet Namibian atmosphere, deliberate negative space, no text,
 *    no signature."
 *
 * Palette anchors:
 *   Deep Ocean Navy #153E52, Signal Teal #2CB5B4, Skeleton Bone #F6F4EF,
 *   Atlantic Black #111315, Ink Muted #6B6860, small Rust Signal #C56A4A
 *
 * Intelligence mode uses cleaner technical language:
 *   Deep Ocean Navy backgrounds, Ocean Mist lines, Signal Teal circular nodes,
 *   fine technical diagrams. No oil-painting texture.
 */

import ZAI from "z-ai-web-dev-sdk";
import fs from "fs";
import path from "path";

const PAINTINGS_DIR = path.resolve(process.cwd(), "public/images/paintings");
const INTEL_DIR = path.resolve(process.cwd(), "public/images/intelligence");
const PUBLIC_DIR = path.resolve(process.cwd(), "public");

if (!fs.existsSync(PAINTINGS_DIR)) fs.mkdirSync(PAINTINGS_DIR, { recursive: true });
if (!fs.existsSync(INTEL_DIR)) fs.mkdirSync(INTEL_DIR, { recursive: true });

const STYLE = "traditional editorial oil painting on coarse linen, visible impasto brush ridges, dry-brush scraping, palette-knife marks, translucent atmospheric glazing, mineral pigments, restrained realism, painterly single-source light, imperfect hand-painted edges, visible aged canvas grain, quiet Namibian atmosphere, deliberate negative space, no text, no signature, no lettering, no logo, no watermark, no concrete monument, no photorealism, no fantasy, no surrealism, no glossy digital painting, no neon, no purple gradient";

const PALETTE = "palette anchored in Deep Ocean Navy #153E52, Signal Teal #2CB5B4, Skeleton Bone #F6F4EF, Atlantic Black #111315, Ink Muted #6B6860, with very small Rust Signal #C56A4A accents only";

const INTEL_STYLE = "clean minimalist technical diagram, Deep Ocean Navy background, Ocean Mist #E6F2F1 thin lines, Signal Teal #2CB5B4 circular nodes, precise geometric relationships, fine line work, restrained grain, no neon, no glowing effects, no robot imagery, no brain imagery, no purple, no photorealism, no text labels, no signature, editorial technical illustration";

interface ImageJob {
  name: string;
  prompt: string;
  size: "1344x768" | "1152x864";
  output: string;
  mode: "painting" | "intelligence";
}

const jobs: ImageJob[] = [
  // ── A. HOMEPAGE (4 paintings) ──
  {
    name: "atlantic-signal-hero",
    prompt: `${STYLE}. Subject: Skeleton Coast shoreline at first light, cold fog over dark volcanic rocks, desaturated blue-grey Atlantic waves with heavy impasto brush ridges, a solitary weathered wooden navigational mast, a tiny teal circular signal beacon at the top, a thin cable fading into mist, very small rust oxidation on metal fittings, large calm negative space in sky and water. ${PALETTE}. Mood: quiet, intelligent, slightly mysterious, Namibian.`,
    size: "1344x768",
    output: path.join(PAINTINGS_DIR, "atlantic-signal-hero.png"),
    mode: "painting",
  },
  {
    name: "windhoek-studio-window",
    prompt: `${STYLE}. Subject: Windhoek cityscape viewed through a quiet studio window in early winter light, distant hills, subtle human movement far below, one small circular teal signal reflected in the glass, worn wooden window frame. ${PALETTE}. Mood: quiet, observational, morning stillness.`,
    size: "1344x768",
    output: path.join(PAINTINGS_DIR, "windhoek-studio-window.png"),
    mode: "painting",
  },
  {
    name: "interface-sketch",
    prompt: `${STYLE}. Subject: a dark-skinned African hand sketching a responsive website interface with charcoal pencil on worn Skeleton Bone cream paper, a Deep Ocean Navy notebook edge visible, a small teal alignment dot, warm but restrained studio light from the left, no readable text in the sketch. ${PALETTE}. Mood: tactile, human, focused.`,
    size: "1152x864",
    output: path.join(PAINTINGS_DIR, "interface-sketch.png"),
    mode: "painting",
  },
  {
    name: "night-signal",
    prompt: `${STYLE}. Subject: a dark Namibian coast at night, heavy impasto ocean brushwork, one small teal circular signal reflected on the water, very limited rust accent on a rock edge, strong negative space in the dark sky. ${PALETTE}. Mood: mysterious, calm, archival.`,
    size: "1344x768",
    output: path.join(PAINTINGS_DIR, "night-signal.png"),
    mode: "painting",
  },

  // ── B. BRAND (3 paintings) ──
  {
    name: "identity-table",
    prompt: `${STYLE}. Subject: a working studio table with paper samples, a small circular Studio mark stamp, colour swatch strips, type specimen sheets, and hand-painted texture studies arranged loosely. No readable text. ${PALETTE}. Mood: craft, preparation, materiality.`,
    size: "1344x768",
    output: path.join(PAINTINGS_DIR, "identity-table.png"),
    mode: "painting",
  },
  {
    name: "painted-signal-flag",
    prompt: `${STYLE}. Subject: a minimal hand-painted signal marker flag moving in Atlantic wind, attached to a thin weathered pole, navy and bone tones with small teal accents, vast soft sky behind. ${PALETTE}. Mood: minimal, directional, quiet.`,
    size: "1152x864",
    output: path.join(PAINTINGS_DIR, "painted-signal-flag.png"),
    mode: "painting",
  },
  {
    name: "brand-recognition",
    prompt: `${STYLE}. Subject: an abstract restrained study of repeated small circular signals gradually resolving into one distinct larger mark, oil paint on linen, concentric and scattered marks finding focus. ${PALETTE}. Mood: emergence, clarity, identity.`,
    size: "1344x768",
    output: path.join(PAINTINGS_DIR, "brand-recognition.png"),
    mode: "painting",
  },

  // ── C. PRODUCT (4 paintings) ──
  {
    name: "product-workshop",
    prompt: `${STYLE}. Subject: hands reviewing printed interface screens beside a laptop on a compact Windhoek workspace table, pencil and paper notes, soft window light, no readable screen text. ${PALETTE}. Mood: collaborative, practical, working.`,
    size: "1344x768",
    output: path.join(PAINTINGS_DIR, "product-workshop.png"),
    mode: "painting",
  },
  {
    name: "responsive-system",
    prompt: `${STYLE}. Subject: a phone, a tablet, and a desktop monitor represented as painted physical objects on a studio table, no interface text on screens, soft editorial light. ${PALETTE}. Mood: systematic, tactile, contemporary.`,
    size: "1344x768",
    output: path.join(PAINTINGS_DIR, "responsive-system.png"),
    mode: "painting",
  },
  {
    name: "digital-journey",
    prompt: `${STYLE}. Subject: a Namibian desert road splitting into two paths and then resolving into one clear route, a small circular signal marker at the junction, bone and navy mineral palette, distant fog. ${PALETTE}. Mood: directional, resolving, calm.`,
    size: "1344x768",
    output: path.join(PAINTINGS_DIR, "digital-journey.png"),
    mode: "painting",
  },
  {
    name: "product-detail",
    prompt: `${STYLE}. Subject: close-up of wireframe sketches, component notes, pencil alignment marks, and a single teal alignment dot on cream paper, no readable text. ${PALETTE}. Mood: precise, craft, detail.`,
    size: "1152x864",
    output: path.join(PAINTINGS_DIR, "product-detail.png"),
    mode: "painting",
  },

  // ── D. INTELLIGENCE (4 technical diagrams — cleaner mode) ──
  {
    name: "connected-systems",
    prompt: `${INTEL_STYLE}. Subject: a clean technical system diagram showing connected nodes in a network, circular Signal Teal nodes connected by thin Ocean Mist lines, some nodes larger representing hubs, Deep Ocean Navy background, balanced composition, fine line work.`,
    size: "1344x768",
    output: path.join(INTEL_DIR, "connected-systems.png"),
    mode: "intelligence",
  },
  {
    name: "agent-infrastructure",
    prompt: `${INTEL_STYLE}. Subject: a clean system map showing the relationship between an interface layer, a model layer, a tools layer, and a controlled infrastructure layer, connected by thin lines with small circular Signal Teal nodes at each junction, Deep Ocean Navy background, precise geometric layout.`,
    size: "1344x768",
    output: path.join(INTEL_DIR, "agent-infrastructure.png"),
    mode: "intelligence",
  },
  {
    name: "private-intelligence",
    prompt: `${INTEL_STYLE}. Subject: an abstract secure boundary represented by a Deep Ocean Navy field, with a ring of small circular Signal Teal nodes forming a protective perimeter, and a single central node, restrained technical geometry, minimal.`,
    size: "1152x864",
    output: path.join(INTEL_DIR, "private-intelligence.png"),
    mode: "intelligence",
  },
  {
    name: "workflow-automation",
    prompt: `${INTEL_STYLE}. Subject: a clear flow diagram showing the path between a person node, a software node, and automated action nodes, connected by thin Ocean Mist lines with small circular Signal Teal nodes, Deep Ocean Navy background, left-to-right flow.`,
    size: "1344x768",
    output: path.join(INTEL_DIR, "workflow-automation.png"),
    mode: "intelligence",
  },

  // ── E. STUDIO & ABOUT (4 paintings) ──
  {
    name: "windhoek-working-city",
    prompt: `${STYLE}. Subject: an early-morning Windhoek street scene with soft human activity, a few figures walking, low winter light casting long shadows, distant hills visible, restrained painterly atmosphere. ${PALETTE}. Mood: quiet, working, real.`,
    size: "1344x768",
    output: path.join(PAINTINGS_DIR, "windhoek-working-city.png"),
    mode: "painting",
  },
  {
    name: "studio-portrait",
    prompt: `${STYLE}. Subject: an editorial painting of a small independent design studio in use, hands visible on a drawing table, a laptop, scattered papers and samples, soft window light, no faces visible. ${PALETTE}. Mood: intimate, working, authentic.`,
    size: "1344x768",
    output: path.join(PAINTINGS_DIR, "studio-portrait.png"),
    mode: "painting",
  },
  {
    name: "built-at-the-edge",
    prompt: `${STYLE}. Subject: a Namibian Atlantic landscape where a hand-built weathered signal structure made of wood and metal remains visible through fog, perched on dark rocks above the ocean, small teal beacon. ${PALETTE}. Mood: resilient, quiet, rooted.`,
    size: "1344x768",
    output: path.join(PAINTINGS_DIR, "built-at-the-edge.png"),
    mode: "painting",
  },
  {
    name: "materials-and-craft",
    prompt: `${STYLE}. Subject: a close-up of studio materials — coarse linen, charcoal sticks, oil paint tubes, cream paper, a piece of screen glass, and a small dab of teal pigment — arranged on a worn table. ${PALETTE}. Mood: material, honest, grounded.`,
    size: "1152x864",
    output: path.join(PAINTINGS_DIR, "materials-and-craft.png"),
    mode: "painting",
  },

  // ── F. CONTACT & TRANSITIONS (3 paintings) ──
  {
    name: "open-signal",
    prompt: `${STYLE}. Subject: a quiet Namibian coastline with one clear circular teal signal visible on the horizon, large open negative space in the sky for text, calm water, minimal rocks. ${PALETTE}. Mood: open, inviting, quiet.`,
    size: "1344x768",
    output: path.join(PAINTINGS_DIR, "open-signal.png"),
    mode: "painting",
  },
  {
    name: "desert-threshold",
    prompt: `${STYLE}. Subject: a doorway-like gap formed by two weathered rock walls with cold fog passing through, suggesting the beginning of a journey, a small teal signal dot in the gap. ${PALETTE}. Mood: threshold, beginning, mysterious.`,
    size: "1152x864",
    output: path.join(PAINTINGS_DIR, "desert-threshold.png"),
    mode: "painting",
  },
  {
    name: "footer-texture",
    prompt: `${STYLE}. Subject: a very dark Deep Ocean Navy and Atlantic Black painted surface with subtle visible canvas grain, one distant tiny teal dot of light in the lower right, vast darkness. ${PALETTE}. Mood: archival, deep, quiet.`,
    size: "1344x768",
    output: path.join(PAINTINGS_DIR, "footer-texture.png"),
    mode: "painting",
  },
];

async function generateOne(zai: any, job: ImageJob): Promise<void> {
  if (fs.existsSync(job.output)) {
    console.log(`  \u{2299} ${job.name} \u2014 skipped (exists)`);
    return;
  }
  const startTime = Date.now();
  console.log(`  \u2192 ${job.name} (${job.size}, ${job.mode})...`);
  const response = await zai.images.generations.create({
    prompt: job.prompt,
    size: job.size,
  });
  const imageBase64 = response.data[0].base64;
  const buffer = Buffer.from(imageBase64, "base64");
  fs.writeFileSync(job.output, buffer);
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  const sizeKB = (buffer.length / 1024).toFixed(0);
  console.log(`  \u2713 ${job.name} \u2014 ${sizeKB}KB in ${elapsed}s`);
}

async function generateAll() {
  console.log(`Generating ${jobs.length} images (parallel batches of 3)...`);
  console.log(`Paintings: ${jobs.filter(j => j.mode === "painting").length}, Intelligence: ${jobs.filter(j => j.mode === "intelligence").length}\n`);

  const zai = await ZAI.create();

  for (let i = 0; i < jobs.length; i += 3) {
    const batch = jobs.slice(i, i + 3);
    console.log(`\nBatch ${Math.floor(i / 3) + 1}:`);
    await Promise.all(batch.map((job) => generateOne(zai, job).catch((e) => {
      console.error(`  \u2717 ${job.name} failed:`, (e as Error).message);
    })));
  }

  console.log("\nAll image generation complete.");
}

generateAll().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
