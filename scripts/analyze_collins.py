#!/usr/bin/env python3
"""Deconstruct the COLLINS (wearecollins.com) design & motion system.

Inputs : audit_data/collins/{assets/*, index.html, inline_styles.css, inline_scripts.js,
         inventory.json, home_perf.json, home_meta.json, pages/*}
Outputs: audit_data/collins/metrics.json + console digest
"""
import glob
import json
import os
import re
from collections import Counter
from urllib.parse import urlparse

BASE = "/home/z/my-project/audit_data"
TAG = "collins"

# ---------------------------------------------------------------- CSS + JS text
css_text = ""
css_files = sorted(glob.glob(f"{BASE}/{TAG}/assets/*.css"))
for path in css_files:
    css_text += f"\n/* FILE: {os.path.basename(path)} */\n"
    css_text += open(path, encoding="utf-8", errors="replace").read()
css_text += "\n/* INLINE STYLES */\n" + open(
    f"{BASE}/{TAG}/inline_styles.css", encoding="utf-8", errors="replace"
).read()

js_text = ""
js_files = sorted(glob.glob(f"{BASE}/{TAG}/assets/*.js"))
for path in js_files:
    js_text += f"\n/* FILE: {os.path.basename(path)} */\n"
    js_text += open(path, encoding="utf-8", errors="replace").read()
js_text += "\n/* INLINE SCRIPTS */\n" + open(
    f"{BASE}/{TAG}/inline_scripts.js", encoding="utf-8", errors="replace"
).read()

html_main = open(f"{BASE}/{TAG}/index.html", encoding="utf-8", errors="replace").read()

# ---------------------------------------------------------------- CSS metrics
def c(pattern, flags=0):
    return len(re.findall(pattern, css_text, flags))


keyframes = re.findall(r"@keyframes\s+([\w-]+)", css_text)
transition_values = re.findall(r"transition(?:-duration|-delay|-timing-function)?\s*:\s*([^;{}]+)", css_text)
animation_values = re.findall(r"animation(?:-name|-duration|-timing-function|-delay|-iteration-count|-fill-mode)?\s*:\s*([^;{}]+)", css_text)

durations = []
for val in transition_values + animation_values:
    for num, unit in re.findall(r"(\d*\.?\d+)(ms|s)\b", val):
        durations.append(float(num) / 1000.0 if unit == "ms" else float(num))

easing_keywords = ["linear", "ease-in", "ease-out", "ease-in-out", "ease"]
easings = Counter()
bezier = Counter()
for val in transition_values + animation_values:
    for k in easing_keywords:
        if re.search(rf"\b{re.escape(k)}\b", val):
            easings[k] += 1
    for bz in re.findall(r"cubic-bezier\([^)]+\)", val):
        bezier[bz] += 1

fontfaces = re.findall(r"@font-face\s*\{([^}]+)\}", css_text)
font_families = Counter()
font_weights = Counter()
font_display = Counter()
for ff in fontfaces:
    m = re.search(r"font-family\s*:\s*([^;]+)", ff)
    if m:
        font_families[m.group(1).strip().strip("'\"")] += 1
    m = re.search(r"font-weight\s*:\s*([^;]+)", ff)
    if m:
        font_weights[m.group(1).strip()] += 1
    m = re.search(r"font-display\s*:\s*([^;]+)", ff)
    if m:
        font_display[m.group(1).strip()] += 1

font_family_decls = Counter()
for val in re.findall(r"font-family\s*:\s*([^;{}]+)", css_text):
    first = val.split(",")[0].strip().strip("'\"")
    font_family_decls[first] += 1

font_sizes = re.findall(r"font-size\s*:\s*([^;{}]+)", css_text)
font_size_values = Counter(v.strip() for v in font_sizes)
clamp_count = sum(1 for v in font_sizes if "clamp(" in v)
font_weights_used = Counter(v.strip() for v in re.findall(r"font-weight\s*:\s*([^;{}]+)", css_text))
letter_spacing = Counter(v.strip() for v in re.findall(r"letter-spacing\s*:\s*([^;{}]+)", css_text))
line_heights = Counter(v.strip() for v in re.findall(r"line-height\s*:\s*([^;{}]+)", css_text))
text_transform = Counter(v.strip() for v in re.findall(r"text-transform\s*:\s*([^;{}]+)", css_text))

custom_props = dict(re.findall(r"(--[\w-]+)\s*:\s*([^;{}]+)", css_text))
color_custom_props = {k: v.strip() for k, v in custom_props.items() if re.search(r"#\w{3,8}|rgb|hsl", v)}
hex_colors = Counter(h.lower() for h in re.findall(r"#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b", css_text))

media_queries = re.findall(r"@media[^{]+", css_text)
mq_features = Counter()
for mq in media_queries:
    for f in re.findall(r"\(([\w-]+)\s*:", mq):
        mq_features[f] += 1

metrics_css = {
    "css_files": len(css_files),
    "css_total_kb": round(len(css_text) / 1024, 1),
    "keyframes_count": len(keyframes),
    "keyframes_names": keyframes[:40],
    "transition_declarations": len(transition_values),
    "animation_declarations": len(animation_values),
    "durations_count": len(durations),
    "durations_dist": dict(Counter(round(d, 2) for d in sorted(durations)).most_common(20)),
    "durations_mean_s": round(sum(durations) / len(durations), 3) if durations else 0,
    "durations_max_s": round(max(durations), 2) if durations else 0,
    "easing_keywords": dict(easings),
    "cubic_bezier": dict(bezier.most_common(12)),
    "font_faces": len(fontfaces),
    "font_face_families": dict(font_families),
    "font_face_weights": dict(font_weights),
    "font_display": dict(font_display),
    "font_family_usage": dict(font_family_decls.most_common(10)),
    "font_size_values": dict(font_size_values.most_common(25)),
    "clamp_count": clamp_count,
    "font_weights_used": dict(font_weights_used.most_common(10)),
    "letter_spacing": dict(letter_spacing.most_common(12)),
    "line_heights": dict(line_heights.most_common(12)),
    "text_transform": dict(text_transform),
    "custom_props_count": len(custom_props),
    "color_custom_props": dict(list(color_custom_props.items())[:40]),
    "top_hex_colors": dict(hex_colors.most_common(25)),
    "media_queries_count": len(media_queries),
    "mq_features": dict(mq_features.most_common(12)),
    "display_grid": c(r"display\s*:\s*grid"),
    "display_flex": c(r"display\s*:\s*flex"),
    "position_sticky": c(r"position\s*:\s*sticky"),
    "position_fixed": c(r"position\s*:\s*fixed"),
    "aspect_ratio": c(r"aspect-ratio"),
    "object_fit": c(r"object-fit"),
    "hover_rules": c(r":hover"),
    "focus_visible_rules": c(r":focus-visible"),
    "focus_rules": c(r":focus\b"),
    "active_rules": c(r":active\b"),
    "prefers_reduced_motion": c(r"prefers-reduced-motion"),
    "prefers_color_scheme": c(r"prefers-color-scheme"),
    "scroll_behavior": c(r"scroll-behavior"),
    "scroll_snap": c(r"scroll-snap"),
    "overscroll_behavior": c(r"overscroll-behavior"),
    "will_change": c(r"will-change"),
    "will_change_values": dict(Counter(v.strip() for v in re.findall(r"will-change\s*:\s*([^;{}]+)", css_text)).most_common(12)),
    "transform_decls": c(r"transform\s*:"),
    "translate3d_or_z": c(r"translate(3d|Z|z)"),
    "scale_usage": c(r"scale\("),
    "rotate_usage": c(r"rotate\("),
    "backface_visibility": c(r"backface-visibility"),
    "perspective": c(r"perspective\s*:"),
    "clip_path": c(r"clip-path"),
    "mask_usage": c(r"-?webkit-?mask"),
    "mix_blend_mode": c(r"mix-blend-mode"),
    "filter_usage": c(r"filter\s*:"),
    "backdrop_filter": c(r"backdrop-filter"),
    "content_visibility": c(r"content-visibility"),
    "contain_usage": c(r"contain\s*:"),
    "variable_fonts": c(r"font-variation-settings"),
    "cubic_bezier_count": sum(bezier.values()),
    "unique_bezier_count": len(bezier),
}

# ---------------------------------------------------------------- JS metrics
lib_patterns = {
    "gsap": r"\bgsap\b",
    "ScrollTrigger": r"ScrollTrigger",
    "ScrollSmoother": r"ScrollSmoother",
    "SplitText": r"SplitText",
    "split_type": r"split-type|Splitting",
    "lenis": r"\blenis\b|Lenis",
    "locomotive": r"locomotive|Locomotive",
    "three_js": r"THREE\.|WebGLRenderer|PerspectiveCamera",
    "webgl_raw": r"getContext\(['\"]webgl|gl_FragColor|vertexShader",
    "pixi": r"PIXI",
    "ogl": r"\bogl\b",
    "curtains": r"curtainsjs|Curtains",
    "barba": r"@barba|barba\.js",
    "howler": r"Howl\b|howler",
    "swiper": r"Swiper\b",
    "embla": r"embla",
    "framer": r"framer",
    "motion_one": r"animate\(|\bMotion\b",
    "matter_js": r"Matter\.",
    "mux": r"Mux|mux-player|mux\.video",
    "clarity": r"clarity\.ms",
    "vue_nuxt": r"createSSRApp|__NUXT__|defineComponent",
    "intersection_observer": r"IntersectionObserver",
    "resize_observer": r"ResizeObserver",
    "mutation_observer": r"MutationObserver",
    "request_animation_frame": r"requestAnimationFrame",
    "match_media": r"matchMedia\(",
    "history_api": r"pushState|replaceState",
    "custom_cursor": r"cursor",
    "audio": r"\bAudio\b|howler",
    "canvas_2d": r"getContext\(['\"]2d",
    "video_element": r"createElement\(['\"]video|<video",
    "worker": r"new Worker|importScripts",
}
libs = {name: len(re.findall(pat, js_text)) for name, pat in lib_patterns.items()}

gsap_eases = Counter(re.findall(r"(power[1-4]\.(?:in|out|inOut)|expo\.(?:in|out|inOut)|circ\.(?:in|out|inOut)|back\.(?:in|out|inOut)|elastic\.(?:in|out|inOut)|sine\.(?:in|out|inOut)|none|steps\([^)]*\))", js_text))
gsap_eases_named = Counter(re.findall(r"ease\s*:\s*[\"']([\w.]+)[\"']", js_text))
gsap_durations = [float(x) for x in re.findall(r"duration\s*:\s*([\d.]+)", js_text)]
gsap_staggers = [float(x) for x in re.findall(r"stagger\s*:\s*([\d.]+)", js_text)]
gsap_scrub = len(re.findall(r"scrub\s*:", js_text))
gsap_timelines = len(re.findall(r"gsap\.timeline|timeline\(", js_text))
gsap_fromTo = len(re.findall(r"\.fromTo\(|\.from\(|\.to\(", js_text))
gsap_clipPath = len(re.findall(r"clipPath\s*:|clip-path", js_text))
gsap_scrolltrigger_create = len(re.findall(r"ScrollTrigger\.create|ScrollTrigger", js_text))
js_bezier = Counter(re.findall(r"cubic-bezier\([^)]+\)", js_text))
js_parallax = len(re.findall(r"data-speed|data-lag|parallax|Parallax", js_text))

metrics_js = {
    "js_files": len(js_files),
    "js_total_kb": round(len(js_text) / 1024, 1),
    "libs_detected": {k: v for k, v in libs.items() if v > 0},
    "gsap_eases": dict(gsap_eases.most_common(15)),
    "gsap_named_eases": dict(gsap_eases_named.most_common(15)),
    "gsap_duration_count": len(gsap_durations),
    "gsap_durations_dist": dict(Counter(round(d, 2) for d in sorted(gsap_durations)).most_common(20)),
    "gsap_durations_mean": round(sum(gsap_durations) / len(gsap_durations), 2) if gsap_durations else 0,
    "gsap_staggers": gsap_staggers[:20],
    "gsap_scrub_count": gsap_scrub,
    "gsap_timeline_count": gsap_timelines,
    "gsap_tween_count": gsap_fromTo,
    "js_clippath_refs": gsap_clipPath,
    "js_scrolltrigger_refs": gsap_scrolltrigger_create,
    "js_cubic_bezier": dict(js_bezier.most_common(10)),
    "js_parallax_refs": js_parallax,
}

# ---------------------------------------------------------------- HTML metrics
html_all = html_main
for path in glob.glob(f"{BASE}/{TAG}/pages/*.html"):
    html_all += "\n" + open(path, encoding="utf-8", errors="replace").read()

framework_markers = {
    "nuxt": len(re.findall(r"__NUXT__|/_nuxt/", html_all)),
    "next": len(re.findall(r"__NEXT_DATA__|/_next/", html_all)),
    "webflow": len(re.findall(r"webflow|data-wf-page", html_all, re.I)),
    "framer": len(re.findall(r"data-framer|framer-projects", html_all)),
    "wordpress": len(re.findall(r"wp-content|wp-json", html_all)),
    "squarespace": len(re.findall(r"squarespace", html_all, re.I)),
    "wix": len(re.findall(r"wix\.com|wixstatic", html_all, re.I)),
}
data_attrs = Counter(re.findall(r"(data-[\w-]+)=", html_all))
interactive_markers = {
    "video_tags": len(re.findall(r"<video", html_all)),
    "canvas_tags": len(re.findall(r"<canvas", html_all)),
    "svg_tags": len(re.findall(r"<svg", html_all)),
    "img_tags": len(re.findall(r"<img", html_all)),
    "picture_tags": len(re.findall(r"<picture", html_all)),
    "source_tags": len(re.findall(r"<source", html_all)),
    "iframe_tags": len(re.findall(r"<iframe", html_all)),
    "button_tags": len(re.findall(r"<button", html_all)),
    "link_tags": len(re.findall(r"<a\b", html_all)),
    "aria_label": len(re.findall(r"aria-label", html_all)),
    "role_attr": len(re.findall(r"role=", html_all)),
    "aria_hidden": len(re.findall(r"aria-hidden", html_all)),
    "h1": len(re.findall(r"<h1\b", html_all)),
    "h2": len(re.findall(r"<h2\b", html_all)),
    "h3": len(re.findall(r"<h3\b", html_all)),
    "preload": len(re.findall(r'rel="preload"', html_all)),
    "prefetch": len(re.findall(r'rel="prefetch"', html_all)),
    "preconnect": len(re.findall(r'rel="preconnect"', html_all)),
    "lazy_loading": len(re.findall(r'loading="lazy"', html_all)),
    "fetchpriority": len(re.findall(r"fetchpriority", html_all)),
}
metrics_html = {
    "framework_markers": framework_markers,
    "data_attrs": dict(data_attrs.most_common(25)),
    "interactive": interactive_markers,
}

# ---------------------------------------------------------------- Perf metrics
perf = json.load(open(f"{BASE}/{TAG}/home_perf.json"))
inv = json.load(open(f"{BASE}/{TAG}/inventory.json"))
meta = json.load(open(f"{BASE}/{TAG}/home_meta.json"))

by_type = Counter()
bytes_by_type = Counter()
ext_counter = Counter()
zero_transfer = 0
for e in perf:
    t = e.get("it", "other")
    n = (e.get("n") or "").split("?")[0]
    by_type[t] += 1
    ts = e.get("t", 0)
    if ts:
        bytes_by_type[t] += ts
    else:
        zero_transfer += 1
    ext = os.path.splitext(urlparse(n).path)[1].lower()
    if ext:
        ext_counter[ext] += 1

total_transfer = sum(e.get("t", 0) for e in perf)
total_duration = sum(e.get("d", 0) for e in perf)
largest = sorted(perf, key=lambda e: -e.get("t", 0))[:12]
metrics_perf = {
    "requests_total": len(perf),
    "transfer_kb_total": round(total_transfer / 1024, 1),
    "zero_transfer_entries": zero_transfer,
    "requests_by_type": dict(by_type.most_common()),
    "kb_by_type": {k: round(v / 1024, 1) for k, v in bytes_by_type.most_common()},
    "ext_counts": dict(ext_counter.most_common(15)),
    "largest_resources": [
        {"url": os.path.basename(urlparse(e["n"]).path) or e["n"], "kb": round(e.get("t", 0) / 1024, 1), "type": e.get("it")}
        for e in largest
    ],
    "html_rendered_kb": round(len(html_main) / 1024, 1),
    "doc_height_px": meta.get("docHeight"),
    "doc_width_px": meta.get("docWidth"),
    "fonts_loaded": meta.get("fonts", []),
    "alt_coverage": inv.get("alt_coverage"),
    "semantic": inv.get("semantic"),
    "title": inv.get("title"),
    "metas": {k: v for k, v in inv.get("metas", {}).items() if k in ("description", "og:title", "og:description", "og:image", "twitter:card", "theme-color", "viewport", "generator")},
}

# ---------------------------------------------------------------- Composite
metrics = {
    "css": metrics_css,
    "js": metrics_js,
    "html": metrics_html,
    "perf": metrics_perf,
}
with open(f"{BASE}/{TAG}/metrics.json", "w") as f:
    json.dump(metrics, f, indent=2)

print("==== COLLINS DESIGN & MOTION PROFILE ====")
print(f"CSS: {metrics_css['css_files']} files, {metrics_css['css_total_kb']} KB | keyframes={metrics_css['keyframes_count']} | transitions={metrics_css['transition_declarations']} | bezier={metrics_css['cubic_bezier_count']} (unique {metrics_css['unique_bezier_count']})")
print(f"  durations mean={metrics_css['durations_mean_s']}s max={metrics_css['durations_max_s']}s")
print(f"  fonts: {metrics_css['font_face_families']} weights={metrics_css['font_face_weights']} display={metrics_css['font_display']}")
print(f"  font sizes: {list(metrics_css['font_size_values'].items())[:12]}")
print(f"  clamp()={metrics_css['clamp_count']} | letter-spacing={metrics_css['letter_spacing']}")
print(f"  colors(top): {list(metrics_css['top_hex_colors'].items())[:10]}")
print(f"  hover={metrics_css['hover_rules']} focus-visible={metrics_css['focus_visible_rules']} reduced-motion={metrics_css['prefers_reduced_motion']}")
print(f"  will-change={metrics_css['will_change']} clip-path={metrics_css['clip_path']} mix-blend={metrics_css['mix_blend_mode']} grid={metrics_css['display_grid']} flex={metrics_css['display_flex']}")
print(f"  media queries={metrics_css['media_queries_count']} features={metrics_css['mq_features']}")
print(f"JS: {metrics_js['js_files']} files, {metrics_js['js_total_kb']} KB")
print(f"  libs: {metrics_js['libs_detected']}")
print(f"  gsap eases: {metrics_js['gsap_eases']}")
print(f"  gsap named eases: {metrics_js['gsap_named_eases']}")
print(f"  gsap durations: n={metrics_js['gsap_duration_count']} mean={metrics_js['gsap_durations_mean']} dist={metrics_js['gsap_durations_dist']}")
print(f"  stagger={metrics_js['gsap_staggers']} scrub={metrics_js['gsap_scrub_count']} timelines={metrics_js['gsap_timeline_count']} tweens={metrics_js['gsap_tween_count']}")
print(f"  bezier-in-js={metrics_js['js_cubic_bezier']} parallax refs={metrics_js['js_parallax_refs']}")
print(f"HTML: framework={framework_markers} data-attrs={list(data_attrs.most_common(12))}")
print(f"  interactive={interactive_markers}")
print(f"Perf: requests={metrics_perf['requests_total']} transfer={metrics_perf['transfer_kb_total']}KB bytype={metrics_perf['kb_by_type']}")
print(f"  largest={metrics_perf['largest_resources'][:6]}")
print(f"  doc height={metrics_perf['doc_height_px']}px fonts={metrics_perf['fonts_loaded']}")
print(f"  alt_coverage={metrics_perf['alt_coverage']} semantic={metrics_perf['semantic']}")
