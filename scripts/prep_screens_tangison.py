#!/usr/bin/env python3
"""Downscale full-page screenshots of tangison + studio sites for VLM critique."""
import os

from PIL import Image

BASE = "/home/z/my-project/audit_data"

JOBS = [
    # full-page (capped at 8000px) for layout critique
    (f"{BASE}/tangison/home.png", f"{BASE}/tangison/home_small.jpg", 1100, 8000),
    (f"{BASE}/tangison/pages/capabilities.png", f"{BASE}/tangison/capabilities_small.jpg", 1100, 8000),
    (f"{BASE}/tangison/pages/projects.png", f"{BASE}/tangison/projects_small.jpg", 1100, 8000),
    (f"{BASE}/studio/home.png", f"{BASE}/studio/home_small.jpg", 1100, 8000),
    (f"{BASE}/studio/pages/services.png", f"{BASE}/studio/services_small.jpg", 1100, 8000),
    (f"{BASE}/studio/pages/work.png", f"{BASE}/studio/work_small.jpg", 1100, 8000),
    (f"{BASE}/studio/pages/about.png", f"{BASE}/studio/about_small.jpg", 1100, 8000),
    (f"{BASE}/studio/pages/work-weca.png", f"{BASE}/studio/case-weca_small.jpg", 1100, 9000),
    (f"{BASE}/studio/pages/contact.png", f"{BASE}/studio/contact_small.jpg", 1100, 8000),
    (f"{BASE}/studio/pages/audit.png", f"{BASE}/studio/audit_small.jpg", 1100, 8000),
]
for src, dst, max_w, cap_h in JOBS:
    if not os.path.exists(src):
        print("missing:", src)
        continue
    im = Image.open(src)
    w, h = im.size
    ratio = max_w / w if w > max_w else 1.0
    im2 = im.resize((int(w * ratio), int(h * ratio)), Image.LANCZOS)
    if im2.height > cap_h:
        im2 = im2.crop((0, 0, im2.width, cap_h))
    im2.convert("RGB").save(dst, "JPEG", quality=80, optimize=True)
    print(f"{os.path.basename(src)} {w}x{h} -> {dst} {im2.size} {os.path.getsize(dst)//1024} KB")

# Hero crops (top ~1500px) for above-the-fold critique
HEROES = [
    (f"{BASE}/tangison/home.png", f"{BASE}/tangison/home_hero.jpg"),
    (f"{BASE}/studio/home.png", f"{BASE}/studio/home_hero.jpg"),
    (f"{BASE}/studio/pages/services.png", f"{BASE}/studio/services_hero.jpg"),
    (f"{BASE}/studio/pages/work-weca.png", f"{BASE}/studio/case-weca_hero.jpg"),
]
for src, dst in HEROES:
    if not os.path.exists(src):
        continue
    im = Image.open(src)
    im2 = im.crop((0, 0, im.width, min(im.height, 1500)))
    if im2.width > 1400:
        r = 1400 / im2.width
        im2 = im2.resize((1400, int(im2.height * r)), Image.LANCZOS)
    im2.convert("RGB").save(dst, "JPEG", quality=85, optimize=True)
    print(f"hero: {dst} {im2.size} {os.path.getsize(dst)//1024} KB")
