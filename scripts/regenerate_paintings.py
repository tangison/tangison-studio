"""
Regenerate painting placeholder images for Tangison Studio.

User directive:
- Make painting images MORE painterly, NOT realistic
- Should look like splash painting (visible brush strokes, impasto, paint splashes)
- Less photographic / realistic depiction
- Apply to Dieselman, Enchanted, Weca project paintings + 7 blog covers
- Output as WebP at quality 82

Existing image style was "oil painting, impressionist style, visible thick brushwork,
warm earth-tone palette of ochre umber cream olive and dusty rose, soft Namibian
golden-hour light" — but apparently these came out too realistic. We pivot to a
splash/impasto/abstract-expressionist direction.

The new style suffix is:
    "abstract expressionist splash painting, thick impasto palette knife and brush,
    large blocks of paint, visible paint splashes and drips, no photographic detail,
    no realistic depiction, purely painterly texture, warm earth-tone palette of
    ochre umber cream olive and dusty rose, soft Namibian golden-hour light"

We pair this style suffix with subject-specific prompts that themselves avoid
realistic depictions and instead call for "purely painterly composition inspired by X".

Output dimensions: 1344x768 (matches existing WebP aspect for project paintings
and blog covers).
"""
from __future__ import annotations

import shutil
import subprocess
import sys
from pathlib import Path

from PIL import Image

ROOT = Path("/home/z/my-project/studio")
OUT_TMP = Path("/tmp/paintings-new")
OUT_TMP.mkdir(parents=True, exist_ok=True)

# Splash painting style suffix applied to every prompt
STYLE = (
    "abstract expressionist splash painting, thick impasto palette knife and brush, "
    "large blocks of paint, visible paint splashes and drips, no photographic detail, "
    "no realistic depiction, purely painterly texture, warm earth-tone palette of "
    "ochre umber cream olive and dusty rose, soft Namibian golden-hour light"
)

# Image targets: (filename_under_tmp, final_webp_path, prompt)
TARGETS = [
    # ── Project paintings: 3 case studies ─────────────────────────────────
    (
        "dieselman.png",
        ROOT / "public/images/paintings/projects/dieselman.webp",
        "A purely painterly composition inspired by a Walvis Bay diesel service workshop: "
        "mobile wheel alignment, heavy truck on the side of a desert road, a phone ringing, "
        "industrial tools and HAWEKA equipment. NO realistic depiction. Just blocks of paint, "
        "splashes, and palette-knife strokes that suggest the industrial context abstractly.",
    ),
    (
        "enchanted.png",
        ROOT / "public/images/paintings/projects/enchanted.webp",
        "A purely painterly composition inspired by a Windhoek cosmetology and mentorship "
        "practice: two founders, a beauty studio, soft floral notes, maternal warmth, makeup "
        "brushes and hair, a quiet space for new mothers. NO realistic depiction. Just blocks "
        "of paint, splashes, and palette-knife strokes that suggest the practice abstractly.",
    ),
    (
        "weca.png",
        ROOT / "public/images/paintings/projects/weca.webp",
        "A purely painterly composition inspired by a Swakopmund 4x4 offroad fitment workshop: "
        "a safari vehicle on the edge of the Namib desert, rooftop tents and bull bars, "
        "winches and suspension parts, the Atlantic coast in the distance. NO realistic "
        "depiction. Just blocks of paint, splashes, and palette-knife strokes that suggest "
        "the offroad context abstractly.",
    ),
    # ── Blog covers: 7 newest posts (blog-13 through blog-19) ──────────────
    (
        "blog-13.png",
        ROOT / "public/images/paintings/blog/blog-13.webp",
        "A purely painterly composition inspired by the idea of a website that belongs to "
        "the business itself rather than to a social media platform. Independence, ownership, "
        "a small Namibian shop with its own digital home. NO realistic depiction. Just blocks "
        "of paint, splashes, and palette-knife strokes.",
    ),
    (
        "blog-14.png",
        ROOT / "public/images/paintings/blog/blog-14.webp",
        "A purely painterly composition inspired by the cost of looking like everyone else "
        "online. Sameness, interchangeability, the blur of a thousand identical templates. "
        "NO realistic depiction. Just blocks of paint, splashes, and palette-knife strokes.",
    ),
    (
        "blog-15.png",
        ROOT / "public/images/paintings/blog/blog-15.webp",
        "A purely painterly composition inspired by Windhoek as a working city and the design "
        "decisions that match its market. Warm streets, midday heat, the pace of a real town. "
        "NO realistic depiction. Just blocks of paint, splashes, and palette-knife strokes.",
    ),
    (
        "blog-16.png",
        ROOT / "public/images/paintings/blog/blog-16.webp",
        "A purely painterly composition inspired by oil paint and pixels. The meeting of "
        "canvas and screen, the studio's working method. Paint and code as one material. "
        "NO realistic depiction. Just blocks of paint, splashes, and palette-knife strokes.",
    ),
    (
        "blog-17.png",
        ROOT / "public/images/paintings/blog/blog-17.webp",
        "A purely painterly composition inspired by what a website says before a word is "
        "read. First impression, layout as voice, the silent greeting a page gives. "
        "NO realistic depiction. Just blocks of paint, splashes, and palette-knife strokes.",
    ),
    (
        "blog-18.png",
        ROOT / "public/images/paintings/blog/blog-18.webp",
        "A purely painterly composition inspired by the studio's process: from sketch to "
        "site. Pencil, paper, wireframe, build. The arc from idea to shipped page. "
        "NO realistic depiction. Just blocks of paint, splashes, and palette-knife strokes.",
    ),
    (
        "blog-19.png",
        ROOT / "public/images/paintings/blog/blog-19.webp",
        "A purely painterly composition inspired by Namibia on the screen. Designing for "
        "local realities. The desert, the coast, the city, the village. The country as a "
        "design constraint. NO realistic depiction. Just blocks of paint, splashes, strokes.",
    ),
]


def generate_image(prompt: str, out_png: Path, size: str = "1344x768") -> bool:
    """Run z-ai image with the prompt and size."""
    full_prompt = f"{prompt}. {STYLE}"
    cmd = [
        "z-ai", "image",
        "--prompt", full_prompt,
        "--output", str(out_png),
        "--size", size,
    ]
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=180)
        if result.returncode != 0:
            print(f"  FAILED: {out_png.name}")
            print(f"  stderr: {result.stderr[-500:]}")
            return False
        if not out_png.exists():
            print(f"  FAILED (no file): {out_png.name}")
            return False
        print(f"  OK: {out_png.name} ({out_png.stat().st_size // 1024} KB)")
        return True
    except subprocess.TimeoutExpired:
        print(f"  TIMEOUT: {out_png.name}")
        return False
    except Exception as exc:
        print(f"  ERROR: {out_png.name} — {exc}")
        return False


def png_to_webp(png_path: Path, webp_path: Path, quality: int = 82) -> bool:
    """Convert PNG to WebP at the given quality."""
    try:
        img = Image.open(png_path)
        if img.mode != "RGB":
            img = img.convert("RGB")
        webp_path.parent.mkdir(parents=True, exist_ok=True)
        img.save(webp_path, "WEBP", quality=quality, method=6)
        print(f"  WEBP: {webp_path.name} ({webp_path.stat().st_size // 1024} KB)")
        return True
    except Exception as exc:
        print(f"  WEBP FAILED: {webp_path} — {exc}")
        return False


def main() -> int:
    success_count = 0
    for tmp_name, final_webp, prompt in TARGETS:
        print(f"\n=== {final_webp.relative_to(ROOT)} ===")
        tmp_png = OUT_TMP / tmp_name

        # 1. Generate PNG via z-ai
        if not generate_image(prompt, tmp_png):
            continue

        # 2. Convert to WebP
        if not png_to_webp(tmp_png, final_webp):
            continue

        success_count += 1

    print(f"\n=== SUMMARY ===")
    print(f"Generated {success_count}/{len(TARGETS)} painting images successfully.")
    if success_count < len(TARGETS):
        print(f"FAILED: {len(TARGETS) - success_count} images need retry.")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
