#!/usr/bin/env python3
"""
Studio Tangison — Pollinations image generator (soft style).

Recreates / swaps any of the 31 soft-style paintings used across the site.
Each manifest entry is exactly ONE Pollinations call, so swapping a single
image is cheap and surgical:

    # list every image with its seed and dimensions
    python3 scripts/generate_images.py --list

    # swap just one (regenerates + normalizes + writes the webp in place)
    python3 scripts/generate_images.py --only nalago

    # swap several at once
    python3 scripts/generate_images.py --only mendozer,weca,blog-02

    # re-roll an image you don't love (new seed, same prompt)
    python3 scripts/generate_images.py --only clusterleaf --reseed

    # force a specific seed for one key
    python3 scripts/generate_images.py --only proavia --seed proavia=4711

Post-processing per image (same pipeline as the original 31):
    center-crop to exact aspect -> resize to exact dimensions
    -> 0.6px gaussian soft finish -> webp quality 84.

Rate-limit hardening (Pollinations is 1-concurrent per IP):
    serial queue, 25s backoff on HTTP 429/5xx, up to 5 attempts,
    180s per request timeout. Raw responses kept in scripts/.raw/.

The generated files land in public/images/paintings/ (git-tracked).
"""
from __future__ import annotations

import argparse
import hashlib
import shutil
import sys
import time
import urllib.parse
import urllib.request
from pathlib import Path

from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
PAINTINGS = ROOT / "public" / "images" / "paintings"
RAW_DIR = ROOT / "scripts" / ".raw"

API = "https://image.pollinations.ai/prompt"
MODEL = "flux"
TIMEOUT = 180          # seconds per request
MAX_ATTEMPTS = 5
BACKOFF_429 = 25       # seconds — pollinations rate limit is per IP
GAUSS = 0.6            # px — soft finish
WEBP_Q = 84

STYLE = (
    ", soft pastel palette, cream sage and warm clay tones, gentle diffused "
    "light, matte paper texture, minimalist editorial composition, dreamy "
    "soft focus, no text, no watermark"
)

# key -> (relative out path, width, height, seed, prompt)
# seeds are pinned so a re-run is reproducible; --reseed / --seed overrides.
MANIFEST: dict[str, dict] = {}


def _add(key: str, rel: str, w: int, h: int, seed: int, prompt: str) -> None:
    MANIFEST[key] = {
        "out": PAINTINGS / rel,
        "rel": rel,
        "w": w,
        "h": h,
        "seed": seed,
        "prompt": prompt + STYLE,
    }


def _seed(key: str) -> int:
    return int(hashlib.sha1(key.encode()).hexdigest()[:8], 16) % 100_000


def _p(key: str, seed: int, prompt: str, w: int = 1200, h: int = 900,
       rel: str | None = None) -> None:
    rel = rel or f"projects/{key}.webp"
    _add(key, rel, w, h, seed, prompt)


# ---------------- 15 case paintings (1200x900, /projects) ----------------
_p("mendozer", 21041,
   "soft abstract composition of six distinct pastel geometric forms "
   "arranged into one unified balanced structure")
_p("weca", 21042,
   "soft still life of offroad equipment, a rolled recovery rope and tools "
   "on a workbench in gentle morning light")
_p("enchanted", 21043,
   "soft beauty still life with cosmetics brushes, silk ribbon and dried "
   "flowers on cream linen")
_p("dieselman", 21044,
   "soft scene of a mechanic's tools and a heavy truck silhouette in warm "
   "dawn haze")
_p("miway", 21045,
   "soft still life of a toy taxi, small building blocks and logistics "
   "pieces arranged on warm linen")
_p("reviveautoworks", 21046,
   "soft garage still life with a polished car body panel and clean tools "
   "in gentle light")
_p("lrclearing", 21047,
   "soft harbor scene with shipping containers and cranes softened by "
   "morning fog")
_p("feorm", 21048,
   "soft farmhouse on a wide open plain with morning mist over golden grass")
_p("crescendo", 21049,
   "soft still life of a violin, strings and sheet music on cream fabric")
_p("tangison-systems", 21050,
   "soft abstract of a calm constellation of glowing nodes connected by "
   "fine lines over a deep sage gradient")
_p("petrocor", 21051,
   "soft industrial scene of fuel storage tanks and a tanker truck in dusty "
   "golden light")
_p("smefrog", 21052,
   "soft still life of neatly stacked documents, a round stamp and a small "
   "frog figurine on a cream desk")
_p("clusterleaf", 21053,
   "soft safari scene with acacia trees and a distant elephant herd in "
   "dusty rose light")
_p("nalago", 21054,
   "soft skincare still life with ceramic jars, aloe leaves and desert sand "
   "in warm cream tones")
_p("proavia", 21055,
   "soft scene of a small aircraft over coastal dunes with a winding road "
   "below")

# ---------------- capability / services / process (1200x900) ----------------
_add("capability-brand", "capability-brand.webp", 1200, 900, 22001,
     "A soft still life of layered paper swatches, color cards and a pencil "
     "on warm cream linen." + STYLE)
_add("services-brand", "services-brand.webp", 1200, 900, 22002,
     "A soft still life of layered paper swatches, color cards and a pencil "
     "on warm cream linen." + STYLE)
_add("capability-intelligence", "capability-intelligence.webp", 1200, 900, 22003,
     "A soft abstract of a gentle constellation of light nodes over a calm "
     "dark sage gradient." + STYLE)
_add("services-intelligence", "services-intelligence.webp", 1200, 900, 22004,
     "A soft abstract of a gentle constellation of light nodes over a calm "
     "dark sage gradient." + STYLE)
_add("process-progressive", "process-progressive.webp", 1200, 900, 22005,
     "A winding desert road forking gently across soft dunes and resolving "
     "into one clear path." + STYLE)
_add("collaboration-studio", "collaboration-studio.webp", 1200, 900, 22006,
     "Two pairs of hands collaborating over interface sketches, color "
     "swatches, and a laptop on a warm wooden studio table." + STYLE)

# ---------------- about / contact (1200x900, invitation portrait) ----------------
_add("about-windhoek", "about-windhoek.webp", 1200, 900, 23001,
     "A quiet Windhoek hillside street in soft early morning light, with "
     "acacia trees and low fences in pastel haze." + STYLE)
_add("contact-gallery-01", "contact-gallery-01.webp", 1200, 900, 23002,
     "A lone desert road at dawn with a distant signal mast, in soft pastel "
     "light." + STYLE)
_add("contact-gallery-02", "contact-gallery-02.webp", 1200, 900, 23003,
     "The Atlantic coastline with dark rocks softened by haze and a single "
     "teal light glow." + STYLE)
_add("contact-gallery-03", "contact-gallery-03.webp", 1200, 900, 23004,
     "A Windhoek cityscape at early morning, rooftops and hills in soft "
     "pastel light." + STYLE)
_add("contact-invitation", "contact-invitation.webp", 900, 1200, 23005,
     "A narrow doorway of light between two soft weathered rock walls, with "
     "gentle fog passing through." + STYLE)

# ---------------- blog (1200x675) ----------------
_add("blog-01", "blog/blog-01.webp", 1200, 675, 24001,
     "Three ceramic vessels of different sizes resting together on a cream "
     "table in soft light." + STYLE)
_add("blog-02", "blog/blog-02.webp", 1200, 675, 24002,
     "A paper boat drifting on calm pale water in soft morning mist." + STYLE)
_add("blog-03", "blog/blog-03.webp", 1200, 675, 24003,
     "Seedlings sprouting in small terracotta pots on a windowsill in "
     "gentle light." + STYLE)
_add("blog-04", "blog/blog-04.webp", 1200, 675, 24004,
     "A small glowing orb held gently between cupped hands in soft dusk "
     "light." + STYLE)

# ---------------- hero poster (1280x720, og image) ----------------
_add("hero-poster", "hero-poster.webp", 1280, 720, 25001,
     "soft abstract gradient of cream, sage and warm clay tones with gentle "
     "drifting light" + STYLE)


# ---------------- minimal single-element hero paintings (design.md) ----------------
# Every page hero carries ONE element, light and lean: vast negative space,
# warm bone ground, soft oil texture. Custom minimal style, NOT the soft
# pastel STYLE suffix used by the case covers.
MINIMAL_STYLE = (
    ", minimalist oil painting, exactly one single object as the only element "
    "in the whole image, plain light warm cream ivory background filling the "
    "entire canvas, vast empty negative space all around the object, bright "
    "airy daylight, soft visible brush strokes, muted warm palette, no other "
    "objects, no shadows of other objects, no text, no watermark, no border"
)

def _add_min(key: str, rel: str, w: int, h: int, seed: int, prompt: str) -> None:
    MANIFEST[key] = {
        "out": PAINTINGS / rel,
        "rel": rel,
        "w": w,
        "h": h,
        "seed": seed,
        "prompt": prompt + MINIMAL_STYLE,
    }

_add_min("hero-home", "heroes/hero-home.webp", 1200, 900, 26001,
     "A single small pale sage-green ceramic bowl, one quiet object, on a plain warm cream background")
_add_min("hero-cases", "heroes/hero-cases.webp", 1200, 900, 26002,
     "One small empty wooden picture frame leaning against a plain warm cream wall")
_add_min("hero-services", "heroes/hero-services.webp", 1200, 900, 26003,
     "One single black fountain pen lying flat on plain warm cream paper")
_add_min("hero-about", "heroes/hero-about.webp", 1200, 900, 26004,
     "One simple light wooden chair standing alone in soft warm window light")
_add_min("hero-blog", "heroes/hero-blog.webp", 1200, 900, 26005,
     "One single closed book with a plain cloth cover on a calm cream table")
_add_min("hero-contact", "heroes/hero-contact.webp", 1200, 900, 26006,
     "One cream envelope resting on warm linen")
_add_min("hero-audit", "heroes/hero-audit.webp", 1200, 900, 26007,
     "One brass magnifying glass on warm plain paper")

# ---------------- 3 new case covers (soft style, same as the other 15) ----------------
_p("oci", 21056,
   "soft scene of a single truck on a long southern desert road under warm "
   "morning light")
_p("giftedwithpurpose", 21057,
   "soft still life of a pastel tumbler cup, ribbons and a small gift box "
   "on cream linen")
_p("emeraldspacc", 21058,
   "soft spa still life with folded warm towels, eucalyptus leaves and "
   "gentle steam light")


# ---------------------------------------------------------------- fetch ----
def fetch(key: str, spec: dict, seed: int, dry: bool) -> Path | None:
    """One Pollinations call. Returns path to the raw download."""
    RAW_DIR.mkdir(parents=True, exist_ok=True)
    raw = RAW_DIR / f"{key}.jpg"
    url = (
        f"{API}/{urllib.parse.quote(spec['prompt'], safe='')}"
        f"?width={spec['w']}&height={spec['h']}&seed={seed}"
        f"&nologo=true&model={MODEL}"
    )
    print(f"[{key}] GET seed={seed} {spec['w']}x{spec['h']}")
    if dry:
        print(f"[{key}] dry-run, url:\n      {url}")
        return None

    for attempt in range(1, MAX_ATTEMPTS + 1):
        try:
            req = urllib.request.Request(
                url, headers={"User-Agent": "studio-tangison-image-pipeline/1.0"}
            )
            with urllib.request.urlopen(req, timeout=TIMEOUT) as res:
                data = res.read()
            if len(data) < 20_000:
                raise RuntimeError(f"suspiciously small response ({len(data)} bytes)")
            raw.write_bytes(data)
            print(f"[{key}] ok, {len(data) // 1024} KB -> {raw}")
            return raw
        except Exception as exc:  # noqa: BLE001 — retry anything networkish
            if attempt == MAX_ATTEMPTS:
                print(f"[{key}] FAILED after {attempt} attempts: {exc}", file=sys.stderr)
                return None
            wait = BACKOFF_429 if "429" in str(exc) else 8 * attempt
            print(f"[{key}] attempt {attempt} failed ({exc}); waiting {wait}s",
                  file=sys.stderr)
            time.sleep(wait)
    return None


# ------------------------------------------------------------- normalize ----
def normalize(key: str, spec: dict, raw: Path) -> None:
    """Center-crop -> exact dims -> 0.6px gaussian soft finish -> webp q84."""
    im = Image.open(raw).convert("RGB")
    tw, th = spec["w"], spec["h"]
    # center-crop to the target aspect first
    sw, sh = im.size
    target_ratio = tw / th
    src_ratio = sw / sh
    if abs(src_ratio - target_ratio) > 0.001:
        if src_ratio > target_ratio:
            nw = int(sh * target_ratio)
            x = (sw - nw) // 2
            im = im.crop((x, 0, x + nw, sh))
        else:
            nh = int(sw / target_ratio)
            y = (sh - nh) // 2
            im = im.crop((0, y, sw, y + nh))
    if im.size != (tw, th):
        im = im.resize((tw, th), Image.LANCZOS)
    im = im.filter(ImageFilter.GaussianBlur(GAUSS))
    spec["out"].parent.mkdir(parents=True, exist_ok=True)
    im.save(spec["out"], "WEBP", quality=WEBP_Q, method=6)
    print(f"[{key}] normalized -> {spec['out'].relative_to(ROOT)} "
          f"({tw}x{th}, webp q{WEBP_Q}, {GAUSS}px soft)")


# ------------------------------------------------------------------ cli ----



# ---------------- 47 article hero images (1200x675, /blog) ----------------
_p("ai-blueprint-for-namibian-business", _seed("ai-blueprint-for-namibian-business"),
   "soft abstract blueprint composition of layered pastel geometric city forms", w=1200, h=675, rel="blog/ai-blueprint-for-namibian-business.webp")
_p("ai-ethics-and-governance-guide", _seed("ai-ethics-and-governance-guide"),
   "soft still life with scales of justice and a shield in muted tones", w=1200, h=675, rel="blog/ai-ethics-and-governance-guide.webp")
_p("ai-for-agriculture-in-namibia", _seed("ai-for-agriculture-in-namibia"),
   "soft pastoral farmland with distant irrigation pivots under a wide pastel sky", w=1200, h=675, rel="blog/ai-for-agriculture-in-namibia.webp")
_p("ai-for-banking-and-finance-in-namibia", _seed("ai-for-banking-and-finance-in-namibia"),
   "soft still life with stacked coins, a pen and linen drape in gentle light", w=1200, h=675, rel="blog/ai-for-banking-and-finance-in-namibia.webp")
_p("ai-for-construction-and-real-estate-in-namibia", _seed("ai-for-construction-and-real-estate-in-namibia"),
   "soft architectural forms and scaffolding silhouette in warm light", w=1200, h=675, rel="blog/ai-for-construction-and-real-estate-in-namibia.webp")
_p("ai-for-education-in-namibia", _seed("ai-for-education-in-namibia"),
   "soft desk still life with open book, pencils and morning light", w=1200, h=675, rel="blog/ai-for-education-in-namibia.webp")
_p("ai-for-energy-and-utilities-in-namibia", _seed("ai-for-energy-and-utilities-in-namibia"),
   "soft landscape with distant power lines and pastel horizon", w=1200, h=675, rel="blog/ai-for-energy-and-utilities-in-namibia.webp")
_p("ai-for-fishing-and-marine-in-namibia", _seed("ai-for-fishing-and-marine-in-namibia"),
   "soft harbour scene with fishing boats at rest in pale morning light", w=1200, h=675, rel="blog/ai-for-fishing-and-marine-in-namibia.webp")
_p("ai-for-government-in-namibia", _seed("ai-for-government-in-namibia"),
   "soft civic building facade with columns in pale light", w=1200, h=675, rel="blog/ai-for-government-in-namibia.webp")
_p("ai-for-healthcare-in-namibia", _seed("ai-for-healthcare-in-namibia"),
   "soft clinical still life with a stethoscope and folded towel on a pale surface", w=1200, h=675, rel="blog/ai-for-healthcare-in-namibia.webp")
_p("ai-for-hospitality-in-namibia", _seed("ai-for-hospitality-in-namibia"),
   "soft hotel lobby still life with a brass key, linen and flowers", w=1200, h=675, rel="blog/ai-for-hospitality-in-namibia.webp")
_p("ai-for-insurance-in-namibia", _seed("ai-for-insurance-in-namibia"),
   "soft still life with an umbrella, documents and calm neutral tones", w=1200, h=675, rel="blog/ai-for-insurance-in-namibia.webp")
_p("ai-for-legal-services-in-namibia", _seed("ai-for-legal-services-in-namibia"),
   "soft still life with scales of justice, books and a fountain pen", w=1200, h=675, rel="blog/ai-for-legal-services-in-namibia.webp")
_p("ai-for-logistics-and-transport-in-namibia", _seed("ai-for-logistics-and-transport-in-namibia"),
   "soft still life of a toy truck and parcels on cream linen", w=1200, h=675, rel="blog/ai-for-logistics-and-transport-in-namibia.webp")
_p("ai-for-manufacturing-in-namibia", _seed("ai-for-manufacturing-in-namibia"),
   "soft factory interior with quiet machines in gentle light", w=1200, h=675, rel="blog/ai-for-manufacturing-in-namibia.webp")
_p("ai-for-media-and-creative-in-namibia", _seed("ai-for-media-and-creative-in-namibia"),
   "soft studio still life with camera, film rolls and paper", w=1200, h=675, rel="blog/ai-for-media-and-creative-in-namibia.webp")
_p("ai-for-mining-in-namibia", _seed("ai-for-mining-in-namibia"),
   "soft mineral landscape with terraced earth and quiet machinery in dawn haze", w=1200, h=675, rel="blog/ai-for-mining-in-namibia.webp")
_p("ai-for-ngos-and-development-in-namibia", _seed("ai-for-ngos-and-development-in-namibia"),
   "soft hands cupping a seedling over fertile soil in gentle light", w=1200, h=675, rel="blog/ai-for-ngos-and-development-in-namibia.webp")
_p("ai-for-retail-and-commerce-in-namibia", _seed("ai-for-retail-and-commerce-in-namibia"),
   "soft shop counter still life with folded textiles and a small scale", w=1200, h=675, rel="blog/ai-for-retail-and-commerce-in-namibia.webp")
_p("ai-for-sports-and-entertainment-in-namibia", _seed("ai-for-sports-and-entertainment-in-namibia"),
   "soft stadium lights and a resting ball on pale grass", w=1200, h=675, rel="blog/ai-for-sports-and-entertainment-in-namibia.webp")
_p("ai-for-telecom-in-namibia", _seed("ai-for-telecom-in-namibia"),
   "soft still life with a vintage telephone and signal waves motif", w=1200, h=675, rel="blog/ai-for-telecom-in-namibia.webp")
_p("ai-for-tourism-in-namibia", _seed("ai-for-tourism-in-namibia"),
   "soft travel still life with a folded map, camera and sun hat on warm linen", w=1200, h=675, rel="blog/ai-for-tourism-in-namibia.webp")
_p("ai-maturity-framework", _seed("ai-maturity-framework"),
   "soft ascending pastel staircase of geometric steps in gentle light", w=1200, h=675, rel="blog/ai-maturity-framework.webp")
_p("ai-roi-playbook", _seed("ai-roi-playbook"),
   "soft still life with coins, a small plant and a balance on a desk", w=1200, h=675, rel="blog/ai-roi-playbook.webp")
_p("ai-talent-and-skills-roadmap", _seed("ai-talent-and-skills-roadmap"),
   "soft scene of hands passing a glowing orb between people in pastel light", w=1200, h=675, rel="blog/ai-talent-and-skills-roadmap.webp")
_p("ai-vendor-and-tool-landscape", _seed("ai-vendor-and-tool-landscape"),
   "soft landscape of organized pastel tools arranged on shelves", w=1200, h=675, rel="blog/ai-vendor-and-tool-landscape.webp")
_p("brand-identity-vs-logo-what-you-actually-get", _seed("brand-identity-vs-logo-what-you-actually-get"),
   "soft composition of one large pastel circle among a coordinated set of pastel shapes and wooden tiles", w=1200, h=675, rel="blog/brand-identity-vs-logo-what-you-actually-get.webp")
_p("core-web-vitals-explained-for-business-owners", _seed("core-web-vitals-explained-for-business-owners"),
   "Soft analog stopwatch and small gauge resting on a pale surface in gentle light.", w=1200, h=675, rel="blog/core-web-vitals-explained-for-business-owners.webp")
_p("e-commerce-payments-in-namibia", _seed("e-commerce-payments-in-namibia"),
   "Soft still life of a small card reader, coins and a folded receipt on a shop counter.", w=1200, h=675, rel="blog/e-commerce-payments-in-namibia.webp")
_p("from-brief-to-launch-how-tangison-runs-a-project", _seed("from-brief-to-launch-how-tangison-runs-a-project"),
   "Soft sequence of small numbered paper tiles arranged in a gentle arc on cream paper.", w=1200, h=675, rel="blog/from-brief-to-launch-how-tangison-runs-a-project.webp")
_p("how-long-does-a-website-take-to-build", _seed("how-long-does-a-website-take-to-build"),
   "Soft scene of an hourglass and neatly arranged tools on a pale workbench in morning light.", w=1200, h=675, rel="blog/how-long-does-a-website-take-to-build.webp")
_p("how-much-does-a-website-cost-in-namibia", _seed("how-much-does-a-website-cost-in-namibia"),
   "Soft still life of coins, a calculator and folded invoices on a cream desk in gentle light.", w=1200, h=675, rel="blog/how-much-does-a-website-cost-in-namibia.webp")
_p("how-to-choose-a-web-studio-12-questions", _seed("how-to-choose-a-web-studio-12-questions"),
   "Soft scene of two chairs facing each other across a small table in calm pastel light.", w=1200, h=675, rel="blog/how-to-choose-a-web-studio-12-questions.webp")
_p("mobile-first-web-design-namibia", _seed("mobile-first-web-design-namibia"),
   "Soft still life of a phone resting on linen beside a cup in warm morning light.", w=1200, h=675, rel="blog/mobile-first-web-design-namibia.webp")
_p("na-domain-vs-com-for-namibian-businesses", _seed("na-domain-vs-com-for-namibian-businesses"),
   "Soft still life of two small paper tags and string on a warm linen surface in gentle light.", w=1200, h=675, rel="blog/na-domain-vs-com-for-namibian-businesses.webp")
_p("seo-basics-for-namibian-businesses", _seed("seo-basics-for-namibian-businesses"),
   "Soft scene of a small shopfront with a clear sign on a quiet pastel street.", w=1200, h=675, rel="blog/seo-basics-for-namibian-businesses.webp")
_p("the-true-cost-of-a-cheap-website", _seed("the-true-cost-of-a-cheap-website"),
   "Soft still life of a thin paper chain linking small coins on a pale surface.", w=1200, h=675, rel="blog/the-true-cost-of-a-cheap-website.webp")
_p("website-accessibility-wcag-basics", _seed("website-accessibility-wcag-basics"),
   "Soft close-up of hands reading a textured page with large clear type in gentle light.", w=1200, h=675, rel="blog/website-accessibility-wcag-basics.webp")
_p("website-maintenance-what-it-covers", _seed("website-maintenance-what-it-covers"),
   "Soft still life of a small toolbox, folded cloth and oil can on a clean workbench.", w=1200, h=675, rel="blog/website-maintenance-what-it-covers.webp")
_p("website-redesign-checklist-15-steps", _seed("website-redesign-checklist-15-steps"),
   "soft still life of small wooden blocks and a brass paper clip arranged in a neat row on a pale desk", w=1200, h=675, rel="blog/website-redesign-checklist-15-steps.webp")
_p("what-is-a-design-system-and-when-you-need-one", _seed("what-is-a-design-system-and-when-you-need-one"),
   "Soft rows of labeled pastel drawers and swatch cards arranged neatly on a workshop shelf.", w=1200, h=675, rel="blog/what-is-a-design-system-and-when-you-need-one.webp")
_p("why-we-build-on-next-js", _seed("why-we-build-on-next-js"),
   "Soft still life of neatly stacked wooden blocks and a small tool on a workbench in warm light.", w=1200, h=675, rel="blog/why-we-build-on-next-js.webp")
_p("writing-website-copy-that-converts", _seed("writing-website-copy-that-converts"),
   "soft still life of a vintage fountain pen beside a single dried flower on smooth cream fabric", w=1200, h=675, rel="blog/writing-website-copy-that-converts.webp")

def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__,
                                  formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--only", metavar="KEYS",
                    help="comma-separated keys to (re)generate, e.g. "
                         "nalago,mendozer,blog-02 — default: none (dry listing)")
    ap.add_argument("--list", action="store_true", help="print the manifest")
    ap.add_argument("--reseed", action="store_true",
                    help="draw a fresh random seed per selected key")
    ap.add_argument("--seed", action="append", default=[], metavar="KEY=N",
                    help="pin a seed, e.g. --seed proavia=4711 (repeatable)")
    ap.add_argument("--dry-run", action="store_true",
                    help="print the Pollinations URLs without calling")
    args = ap.parse_args()

    if args.list or not args.only:
        existing = sum(1 for s in MANIFEST.values() if s["out"].exists())
        print(f"{len(MANIFEST)} images, {existing} already on disk:\n")
        for key, s in MANIFEST.items():
            mark = "x" if s["out"].exists() else " "
            print(f"  [{mark}] {key:<24} {s['w']}x{s['h']:<5} seed={s['seed']:<6} "
                  f"{s['rel']}")
        print("\nRegenerate with:  python3 scripts/generate_images.py "
              "--only <key>[,<key>...]")
        if not args.only:
            return 0

    keys = [k.strip() for k in args.only.split(",") if k.strip()]
    bad = [k for k in keys if k not in MANIFEST]
    if bad:
        print(f"unknown keys: {', '.join(bad)} (see --list)", file=sys.stderr)
        return 2

    overrides: dict[str, int] = {}
    for pair in args.seed:
        k, _, v = pair.partition("=")
        if k in MANIFEST and v.isdigit():
            overrides[k] = int(v)

    ok = 0
    for key in keys:  # serial — pollinations is 1-concurrent per IP
        spec = MANIFEST[key]
        if key in overrides:
            seed = overrides[key]
        elif args.reseed:
            seed = int(time.time() * 1000) % 100_000
            print(f"[{key}] reseeded -> {seed}")
        else:
            seed = spec["seed"]
        raw = fetch(key, spec, seed, args.dry_run)
        if raw is None and not args.dry_run:
            continue
        if args.dry_run:
            ok += 1
            continue
        backup = None
        if spec["out"].exists():
            backup = spec["out"].with_suffix(".webp.bak")
            shutil.copy2(spec["out"], backup)
        try:
            normalize(key, spec, raw)
            if backup:
                backup.unlink(missing_ok=True)
            ok += 1
        except Exception as exc:  # noqa: BLE001
            print(f"[{key}] normalize failed: {exc} — restoring backup",
                  file=sys.stderr)
            if backup and backup.exists():
                shutil.copy2(backup, spec["out"])
                backup.unlink(missing_ok=True)

    print(f"\ndone: {ok}/{len(keys)} images written")
    return 0 if ok == len(keys) else 1


if __name__ == "__main__":
    raise SystemExit(main())
