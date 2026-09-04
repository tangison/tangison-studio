#!/usr/bin/env python3
"""Harvest CSS/JS/font assets for tangison + studio sites using Scrapling Fetcher,
then extract design/motion metrics from CSS (tokens, colors, transitions, keyframes)
and scan JS chunks for animation library signatures."""
import json
import os
import re
from collections import Counter
from urllib.parse import urlparse

from scrapling.fetchers import Fetcher

BASE = "/home/z/my-project/audit_data"


def safe_name(url):
    p = urlparse(url)
    base = os.path.basename(p.path) or "root"
    return re.sub(r"[^a-zA-Z0-9._-]", "_", base)[:90]


def fetch_raw(url, timeout=30):
    resp = Fetcher.get(url, timeout=timeout)
    body = getattr(resp, "body", None)
    status = getattr(resp, "status", 0)
    if isinstance(body, bytes):
        raw = body
    else:
        raw = (body or "").encode("utf-8", "replace")
    return status, raw


def harvest(tag):
    inv = json.load(open(f"{BASE}/{tag}/inventory.json"))
    try:
        perf = json.load(open(f"{BASE}/{tag}/home_perf.json"))
    except Exception:
        perf = []
    outdir = f"{BASE}/{tag}/assets"
    os.makedirs(outdir, exist_ok=True)

    targets = []
    for u in inv["stylesheets"]:
        targets.append(("css", u.split("?")[0]))
    for u in inv["font_links"]:
        targets.append(("font", u.split("?")[0]))
    # JS chunks from DOM + perf entries (dedup, cap at 25)
    js_urls = [u for u in inv["scripts"]]
    for e in perf:
        n = e.get("n", "")
        if n.endswith(".js") and n.startswith("https://"):
            js_urls.append(n)
    seen = set()
    for u in js_urls:
        u = u.split("?")[0]
        if u not in seen and u.endswith(".js"):
            seen.add(u)
    for u in list(seen)[:25]:
        targets.append(("js", u))

    manifest = []
    for kind, url in targets:
        name = safe_name(url)
        path = os.path.join(outdir, name)
        if os.path.exists(path) and os.path.getsize(path) > 0:
            manifest.append({"kind": kind, "url": url, "file": name, "cached": True, "bytes": os.path.getsize(path)})
            continue
        try:
            status, raw = fetch_raw(url)
            if status == 200 and raw:
                with open(path, "wb") as f:
                    f.write(raw)
                manifest.append({"kind": kind, "url": url, "file": name, "bytes": len(raw)})
            else:
                manifest.append({"kind": kind, "url": url, "status": status, "error": "empty/non-200"})
        except Exception as e:
            manifest.append({"kind": kind, "url": url, "error": repr(e)[:160]})
    with open(os.path.join(outdir, "manifest.json"), "w") as f:
        json.dump(manifest, f, indent=2)
    print(f"[{tag}] harvested: css={sum(1 for m in manifest if m['kind']=='css')} "
          f"js={sum(1 for m in manifest if m['kind']=='js')} font={sum(1 for m in manifest if m['kind']=='font')}")
    return tag


# ---------- CSS ANALYSIS ----------
def analyze_css(tag):
    outdir = f"{BASE}/{tag}/assets"
    css_text = ""
    inline = f"{BASE}/{tag}/inline_styles.css"
    if os.path.exists(inline):
        css_text += open(inline, encoding="utf-8", errors="replace").read() + "\n"
    for fn in os.listdir(outdir):
        if fn.endswith(".css"):
            css_text += open(os.path.join(outdir, fn), encoding="utf-8", errors="replace").read() + "\n"

    m = {}
    # colors
    hexes = Counter(h.lower() for h in re.findall(r"#[0-9a-fA-F]{3,8}\b", css_text))
    rgbas = Counter(re.findall(r"rgba?\([^)]+\)", css_text))
    m["top_colors"] = hexes.most_common(24)
    m["color_count_unique"] = len(hexes)
    # custom properties (design tokens)
    props = re.findall(r"--[a-zA-Z0-9-]+(?=\s*:)", css_text)
    prop_counts = Counter(props)
    m["custom_props_total"] = sum(prop_counts.values())
    m["custom_props_unique"] = len(prop_counts)
    m["custom_props_sample"] = [p for p, _ in prop_counts.most_common(60)]
    # typography
    fonts = Counter(re.findall(r"font-family\s*:\s*([^;}{]+)", css_text))
    m["font_families"] = fonts.most_common(12)
    sizes = Counter(re.findall(r"font-size\s*:\s*([^;}{]+)", css_text))
    m["font_sizes"] = sizes.most_common(30)
    weights = Counter(re.findall(r"font-weight\s*:\s*([^;}{]+)", css_text))
    m["font_weights"] = weights.most_common(12)
    lettersp = Counter(re.findall(r"letter-spacing\s*:\s*([^;}{]+)", css_text))
    m["letter_spacing"] = lettersp.most_common(12)
    # motion
    m["transition_count"] = len(re.findall(r"transition\s*:", css_text))
    m["transition_property_counts"] = Counter(
        re.findall(r"transition(?:-delay|-duration|-timing-function)?\s*:\s*([^;}{]+)", css_text)
    ).most_common(25)
    m["animation_count"] = len(re.findall(r"animation\s*:", css_text))
    m["keyframe_names"] = re.findall(r"@keyframes\s+([a-zA-Z0-9_-]+)", css_text)
    m["keyframe_count"] = len(m["keyframe_names"])
    m["transform_count"] = len(re.findall(r"transform\s*:", css_text))
    m["will_change"] = len(re.findall(r"will-change", css_text))
    m["prefers_reduced_motion"] = len(re.findall(r"prefers-reduced-motion", css_text))
    m["easings"] = Counter(re.findall(r"(?:transition-timing-function|animation-timing-function)\s*:\s*([^;}{]+)", css_text)).most_common(15)
    m["durations"] = Counter(re.findall(r"(?:transition-duration|animation-duration)\s*:\s*([^;}{]+)", css_text)).most_common(15)
    m["transition_shorthand"] = Counter(re.findall(r"transition\s*:\s*([^;}{]+)", css_text)).most_common(25)
    # interaction states
    m["hover_rules"] = len(re.findall(r":hover", css_text))
    m["focus_visible"] = len(re.findall(r":focus-visible", css_text))
    m["active_rules"] = len(re.findall(r":active", css_text))
    # layout
    m["media_queries"] = len(re.findall(r"@media", css_text))
    mq_breaks = Counter(re.findall(r"@media[^{]*?\((?:max|min)-width\s*:\s*(\d+)(?:px|rem|em)?", css_text))
    m["breakpoints"] = mq_breaks.most_common(20)
    m["grid_count"] = len(re.findall(r"display\s*:\s*grid", css_text))
    m["flex_count"] = len(re.findall(r"display\s*:\s*flex", css_text))
    m["clip_path"] = len(re.findall(r"clip-path", css_text))
    m["backdrop_filter"] = len(re.findall(r"backdrop-filter", css_text))
    m["border_radius_values"] = Counter(re.findall(r"border-radius\s*:\s*([^;}{]+)", css_text)).most_common(15)
    # shadows
    m["box_shadows"] = Counter(re.findall(r"box-shadow\s*:\s*([^;}{]+)", css_text)).most_common(12)
    with open(f"{BASE}/{tag}/css_metrics.json", "w") as f:
        json.dump(m, f, indent=2)
    print(f"[{tag}] CSS metrics: colors={m['color_count_unique']} props={m['custom_props_unique']} "
          f"transitions={m['transition_count']} keyframes={m['keyframe_count']} hover={m['hover_rules']} "
          f"mq={m['media_queries']} reduced-motion={m['prefers_reduced_motion']}")
    return m


# ---------- JS LIBRARY SCAN ----------
LIB_SIGS = {
    "framer-motion": [r"framer", r"motion\.js", r"AnimatePresence", r"useReducedMotion"],
    "motion (motion.dev)": [r"motion(?:/|\.min)", r"animate\(.*from", r"\.animate\("],
    "gsap": [r"gsap", r"ScrollTrigger", r"ScrollSmoother", r"gsap\.core"],
    "lenis": [r"lenis", r"smooth.{0,12}scroll"],
    "three.js": [r"THREE\.", r"three\.min", r"webglrenderer"],
    "lottie": [r"lottie", r"bodymovin"],
    "barba/pagetrans": [r"barba", r"@barba"],
    "splitting/splittype": [r"splitting", r"SplitText", r"splittype"],
    "marquee": [r"marquee"],
    "swiper": [r"swiper"],
    "embla": [r"embla"],
    "react-spring": [r"react-spring"],
    "aos": [r"data-aos", r"AOS\b"],
    "intersection-observer": [r"IntersectionObserver"],
    "scroll-driven-anim": [r"scroll-timeline", r"animation-timeline", r"view-timeline"],
    "prefers-reduced-motion": [r"prefers-reduced-motion"],
    "parallax": [r"parallax"],
    "cursor": [r"customCursor|cursor\.(x|y)|mix-blend-mode.{0,30}cursor"],
}


def analyze_js(tag):
    outdir = f"{BASE}/{tag}/assets"
    text = ""
    for fn in os.listdir(outdir):
        if fn.endswith(".js"):
            try:
                text += open(os.path.join(outdir, fn), encoding="utf-8", errors="replace").read()
            except Exception:
                pass
    inline = f"{BASE}/{tag}/inline_scripts.js"
    if os.path.exists(inline):
        text += open(inline, encoding="utf-8", errors="replace").read()
    html = ""
    idx = f"{BASE}/{tag}/index.html"
    if os.path.exists(idx):
        html = open(idx, encoding="utf-8", errors="replace").read()

    found = {}
    for lib, sigs in LIB_SIGS.items():
        hits = []
        for sig in sigs:
            n = len(re.findall(sig, text, re.I)) + len(re.findall(sig, html, re.I))
            if n:
                hits.append((sig, n))
        if hits:
            found[lib] = hits
    with open(f"{BASE}/{tag}/js_libs.json", "w") as f:
        json.dump(found, f, indent=2)
    print(f"[{tag}] JS libs found: {list(found.keys())}")
    return found


for tag in ("tangison", "studio"):
    harvest(tag)
    analyze_css(tag)
    analyze_js(tag)
