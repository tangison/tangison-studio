"""Take a full-page screenshot of wecaoffroad.com and convert to WebP."""
from __future__ import annotations

import subprocess
import sys
from pathlib import Path
from PIL import Image

OUT_PNG = Path("/tmp/weca-screenshot-raw.png")
OUT_WEBP = Path("/home/z/my-project/studio/public/images/work/screenshots/full/weca-full.webp")
FINAL_PNG_COPY = Path("/home/z/my-project/download/weca-screenshot-full.png")


def main() -> int:
    # 1. Open browser, navigate, wait, screenshot
    cmds = [
        ["agent-browser", "open", "https://wecaoffroad.com/"],
        ["agent-browser", "wait", "--load", "networkidle"],
        ["agent-browser", "screenshot", str(OUT_PNG), "--full"],
        ["agent-browser", "close"],
    ]
    for cmd in cmds:
        print(f"$ {' '.join(cmd)}")
        result = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
        if result.returncode != 0:
            print(f"  FAILED: {result.stderr[-300:]}")
            return 1
        if result.stdout.strip():
            print(f"  {result.stdout.strip()[-200:]}")

    if not OUT_PNG.exists():
        print(f"Screenshot not found: {OUT_PNG}")
        return 1

    print(f"\nPNG size: {OUT_PNG.stat().st_size // 1024} KB")

    # 2. Convert to WebP at quality 82
    OUT_WEBP.parent.mkdir(parents=True, exist_ok=True)
    img = Image.open(OUT_PNG)
    if img.mode != "RGB":
        img = img.convert("RGB")
    img.save(OUT_WEBP, "WEBP", quality=82, method=6)
    print(f"WEBP saved: {OUT_WEBP} ({OUT_WEBP.stat().st_size // 1024} KB)")

    # 3. Copy PNG to download/ for inspection
    FINAL_PNG_COPY.parent.mkdir(parents=True, exist_ok=True)
    img.save(FINAL_PNG_COPY, "PNG")
    print(f"PNG copy: {FINAL_PNG_COPY} ({FINAL_PNG_COPY.stat().st_size // 1024} KB)")

    return 0


if __name__ == "__main__":
    sys.exit(main())
