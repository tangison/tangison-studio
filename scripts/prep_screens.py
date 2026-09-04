#!/usr/bin/env python3
"""Downscale full-page screenshots for VLM critique + PDF embedding."""
import os

from PIL import Image

BASE = "/home/z/my-project/audit_data"
JOBS = [
    (f"{BASE}/collins/home.png", f"{BASE}/collins/home_small.jpg", 1200),
    (f"{BASE}/collins/pages/case-studies.png", f"{BASE}/collins/case-studies_small.jpg", 1200),
    (f"{BASE}/collins/pages/case-studies-arcane.png", f"{BASE}/collins/arcane_small.jpg", 1200),
]

for src, dst, max_w in JOBS:
    if not os.path.exists(src):
        print("missing:", src)
        continue
    im = Image.open(src)
    w, h = im.size
    ratio = max_w / w if w > max_w else 1.0
    im2 = im.resize((int(w * ratio), int(h * ratio)), Image.LANCZOS)
    # For extremely tall pages, also cap height by slicing into segments
    if im2.height > 8000:
        im2 = im2.crop((0, 0, im2.width, 8000))
    im2.convert("RGB").save(dst, "JPEG", quality=82, optimize=True)
    print(f"{os.path.basename(src)} {w}x{h} -> {dst} {im2.size} {os.path.getsize(dst)//1024} KB")

# Viewport hero crops (top 1600px) for sharper hero analysis
for src, dst in [
    (f"{BASE}/collins/home.png", f"{BASE}/collins/home_hero.jpg"),
    (f"{BASE}/collins/pages/case-studies-arcane.png", f"{BASE}/collins/arcane_hero.jpg"),
]:
    if not os.path.exists(src):
        continue
    im = Image.open(src)
    im2 = im.crop((0, 0, im.width, min(im.height, 2200)))
    if im2.width > 1400:
        r = 1400 / im2.width
        im2 = im2.resize((1400, int(im2.height * r)), Image.LANCZOS)
    im2.convert("RGB").save(dst, "JPEG", quality=85, optimize=True)
    print(f"hero: {dst} {im2.size} {os.path.getsize(dst)//1024} KB")
