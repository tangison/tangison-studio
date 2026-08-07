"""Regenerate just the 7 blog cover paintings (blog-13 through blog-19)."""
from __future__ import annotations

import subprocess
import sys
from pathlib import Path
from PIL import Image

ROOT = Path("/home/z/my-project/studio")
OUT_TMP = Path("/tmp/paintings-blog-new")
OUT_TMP.mkdir(parents=True, exist_ok=True)

STYLE = (
    "abstract expressionist splash painting, thick impasto palette knife and brush, "
    "large blocks of paint, visible paint splashes and drips, no photographic detail, "
    "no realistic depiction, purely painterly texture, warm earth-tone palette of "
    "ochre umber cream olive and dusty rose, soft Namibian golden-hour light"
)

TARGETS = [
    ("blog-13.png", "A purely painterly composition inspired by the idea of a website that belongs to the business itself rather than to a social media platform. Independence, ownership, a small Namibian shop with its own digital home. NO realistic depiction. Just blocks of paint, splashes, and palette-knife strokes."),
    ("blog-14.png", "A purely painterly composition inspired by the cost of looking like everyone else online. Sameness, interchangeability, the blur of a thousand identical templates. NO realistic depiction. Just blocks of paint, splashes, and palette-knife strokes."),
    ("blog-15.png", "A purely painterly composition inspired by Windhoek as a working city and the design decisions that match its market. Warm streets, midday heat, the pace of a real town. NO realistic depiction. Just blocks of paint, splashes, and palette-knife strokes."),
    ("blog-16.png", "A purely painterly composition inspired by oil paint and pixels. The meeting of canvas and screen, the studio's working method. Paint and code as one material. NO realistic depiction. Just blocks of paint, splashes, and palette-knife strokes."),
    ("blog-17.png", "A purely painterly composition inspired by what a website says before a word is read. First impression, layout as voice, the silent greeting a page gives. NO realistic depiction. Just blocks of paint, splashes, and palette-knife strokes."),
    ("blog-18.png", "A purely painterly composition inspired by the studio's process: from sketch to site. Pencil, paper, wireframe, build. The arc from idea to shipped page. NO realistic depiction. Just blocks of paint, splashes, and palette-knife strokes."),
    ("blog-19.png", "A purely painterly composition inspired by Namibia on the screen. Designing for local realities. The desert, the coast, the city, the village. The country as a design constraint. NO realistic depiction. Just blocks of paint, splashes, strokes."),
]


def generate_one(tmp_name: str, prompt: str) -> bool:
    tmp_png = OUT_TMP / tmp_name
    full_prompt = f"{prompt}. {STYLE}"
    cmd = ["z-ai", "image", "--prompt", full_prompt, "--output", str(tmp_png), "--size", "1344x768"]
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=150)
        if result.returncode != 0 or not tmp_png.exists():
            print(f"  FAILED: {tmp_name} — {result.stderr[-200:]}")
            return False
        print(f"  OK PNG: {tmp_name} ({tmp_png.stat().st_size // 1024} KB)")
        return True
    except subprocess.TimeoutExpired:
        print(f"  TIMEOUT: {tmp_name}")
        return False


def to_webp(tmp_name: str) -> bool:
    tmp_png = OUT_TMP / tmp_name
    final = ROOT / f"public/images/paintings/blog/{tmp_name.replace('.png', '.webp')}"
    try:
        img = Image.open(tmp_png)
        if img.mode != "RGB":
            img = img.convert("RGB")
        img.save(final, "WEBP", quality=82, method=6)
        print(f"  OK WEBP: {final.name} ({final.stat().st_size // 1024} KB)")
        return True
    except Exception as exc:
        print(f"  WEBP FAILED: {final} — {exc}")
        return False


if __name__ == "__main__":
    # Accept which indices to process as CLI args (default: all 7)
    if len(sys.argv) > 1:
        indices = [int(x) for x in sys.argv[1:]]
    else:
        indices = list(range(len(TARGETS)))

    success = 0
    for i in indices:
        tmp_name, prompt = TARGETS[i]
        print(f"\n=== [{i}] {tmp_name} ===")
        if generate_one(tmp_name, prompt) and to_webp(tmp_name):
            success += 1

    print(f"\n=== DONE: {success}/{len(indices)} ===")
    sys.exit(0 if success == len(indices) else 1)
