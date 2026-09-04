#!/usr/bin/env python3
"""Deep-scan JS chunks for framer-motion/motion usage patterns to quantify
JS-driven motion behavior: triggers, properties, durations, easings, stagger."""
import json
import os
import re
from collections import Counter

BASE = "/home/z/my-project/audit_data"

PATTERNS = {
    # motion API usage
    "motion.div/component": r"motion\.(?:div|span|a|section|header|footer|li|p|h[1-6]|button|nav|article|img)",
    "animate prop": r"animate[:=]",
    "initial prop": r"initial[:=]{1,2}",
    "whileInView": r"whileInView",
    "whileHover": r"whileHover",
    "whileTap": r"whileTap",
    "exit/AnimatePresence": r"(?:exit[:=]|AnimatePresence)",
    "variants": r"variants[:=]{1,2}",
    "transition prop": r"transition[:=]{1,2}",
    "useScroll": r"useScroll",
    "useTransform": r"useTransform",
    "useSpring": r"useSpring",
    "useInView": r"useInView",
    "useMotionValue": r"useMotionValue",
    "useAnimate (mini)": r"useAnimate\b",
    "scroll (useScroll progress)": r"useScroll\([^)]*progress|scrollYProgress",
    "stagger": r"staggerChildren|stagger\(",
    "layout animations": r"\blayout\b.{0,20}(?:transition|animation)|layoutId",
    # animated properties
    "opacity": r"opacity[:=]",
    "y translate": r"\by:\s*[\d.-]+",
    "x translate": r"\bx:\s*[\d.-]+",
    "scale": r"scale[:=]",
    "rotate": r"rotate[:=]",
    "clipPath": r"clipPath[:=]{1,2}",
    "filter/blur": r"filter[:=]|blur\(",
    "width/height anim": r"\b(?:width|height)[:=]\s*[\"']?[\d.]+",
    "letterSpacing/typewriter": r"letterSpacing|typewriter|textCycle",
    # easings & durations in JS
    "ease arrays": r"ease:\s*\[[\d.,\s]+\]",
    "ease names": r"ease:\s*[\"'](?:easeIn|easeOut|easeInOut|linear|circIn|circOut|backIn|backOut|anticipate)[\"']",
    "cubic-bezier str": r"cubic-bezier\(",
    "spring type": r"type:\s*[\"']spring",
    "durations <1s": r"duration:\s*0?\.\d+",
    "durations >=1s": r"duration:\s*[1-9]\.?\d*",
    "delay": r"delay:\s*[\d.]+",
    "viewport once": r"viewport[:=][^}]*once",
    "viewport amount": r"viewport[:=][^}]*amount",
    # scroll behavior
    "lenis instance": r"new\s+Lenis|lenis\(",
    "lenis lerp/duration": r"(?:lerp|duration):\s*[\d.]+",
    "scroll-triggered class": r"scroll-(?:progress|state|reveal|link)",
    "parallax": r"parallax|useScroll\(\{\s*target",
    "marquee/loop": r"marquee|infinite.{0,20}(?:x|translateX|loop)",
    # cursor / pointer
    "custom cursor": r"(?:custom|data)-?cursor|cursorPosition|mousePosition",
    "magnetic hover": r"magnetic|useSpring\(\{[^}]*mouse",
    "hover dist/hover lift": r"hover(?:Dist|Lift|Raise|Grow)",
}

for tag in ("tangison", "studio"):
    outdir = f"{BASE}/{tag}/assets"
    text = ""
    for fn in sorted(os.listdir(outdir)):
        if fn.endswith(".js"):
            try:
                text += open(os.path.join(outdir, fn), encoding="utf-8", errors="replace").read()
            except Exception:
                pass
    inline = f"{BASE}/{tag}/inline_scripts.js"
    if os.path.exists(inline):
        text += open(inline, encoding="utf-8", errors="replace").read()

    found = {}
    for name, pat in PATTERNS.items():
        hits = re.findall(pat, text)
        if hits:
            found[name] = len(hits)

    # sample actual duration values
    durs = re.findall(r"duration:\s*([\d.]+)", text)
    eases = Counter(re.findall(r"ease:\s*\[?([\d.,\s]+|\"[a-zA-Z]+\"|'[^']+')\]?", text)).most_common(12)
    delays = re.findall(r"delay:\s*([\d.]+)", text)
    with open(f"{BASE}/{tag}/js_motion_metrics.json", "w") as f:
        json.dump({"counts": found, "durations_raw": durs[:60], "delays_raw": delays[:40],
                   "ease_values": eases, "text_kb": len(text) // 1024}, f, indent=2)
    print(f"===== {tag.upper()} (JS corpus {len(text)//1024}KB) =====")
    for k, v in sorted(found.items(), key=lambda x: -x[1]):
        print(f"  {k:36s} {v}")
    print(f"  durations: {Counter(durs).most_common(10)}")
    print(f"  delays:    {Counter(delays).most_common(10)}")
    print(f"  eases:     {eases}")
