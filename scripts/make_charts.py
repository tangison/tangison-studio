#!/usr/bin/env python3
"""Generate the COLLINS reference charts for the audit PDF (Template 07 blue family)."""
import glob
import json
import os
import re

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

BASE = "/home/z/my-project/audit_data/collins"
OUT = "/home/z/my-project/audit_data/charts"
os.makedirs(OUT, exist_ok=True)

# Template 07 Crystal Blue body palette (same hue family, lightness variants)
DEEP = "#1a4a7a"
ACCENT = "#2d7ab3"
LIGHT = "#7fa8cc"
PALE = "#c0d0e2"
TEXT = "#142840"
MUTED = "#5a7a96"

plt.rcParams["font.family"] = "sans-serif"
plt.rcParams["font.sans-serif"] = ["DejaVu Sans"]
plt.rcParams["axes.unicode_minus"] = False
plt.rcParams["text.color"] = TEXT
plt.rcParams["axes.labelcolor"] = TEXT
plt.rcParams["xtick.color"] = MUTED
plt.rcParams["ytick.color"] = MUTED

m = json.load(open(f"{BASE}/metrics.json"))
css = m["css"]
perf = m["perf"]


def style_ax(ax):
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)
    ax.spines["left"].set_color(PALE)
    ax.spines["bottom"].set_color(PALE)


# ---------------------------------------------------------------- Chart 1: motion affordances
labels = [
    "CSS transition declarations",
    ":hover rules",
    ":focus-visible rules",
    "clip-path declarations",
    "animation declarations",
    "@keyframes definitions",
    "will-change hints",
]
values = [
    css["transition_declarations"],
    css["hover_rules"],
    css["focus_visible_rules"],
    css["clip_path"],
    css["animation_declarations"],
    css["keyframes_count"],
    css["will_change"],
]
fig, ax = plt.subplots(figsize=(8.2, 3.4), dpi=200, constrained_layout=True)
y = np.arange(len(labels))[::-1]
bars = ax.barh(y, values, height=0.62, color=[DEEP, ACCENT, ACCENT, LIGHT, LIGHT, PALE, PALE])
ax.set_yticks(y)
ax.set_yticklabels(labels, fontsize=10.5)
for yi, v in zip(y, values):
    ax.text(v + 3, yi, str(v), va="center", ha="left", fontsize=10, color=TEXT)
ax.set_xlim(0, max(values) * 1.12)
ax.set_xlabel("count in shipped CSS", fontsize=10, color=MUTED)
ax.xaxis.grid(True, linestyle="--", alpha=0.2, linewidth=0.5)
ax.set_axisbelow(True)
ax.tick_params(axis="x", labelsize=9)
style_ax(ax)
fig.savefig(f"{OUT}/motion_affordances.png", facecolor="white")
plt.close(fig)

# ---------------------------------------------------------------- Chart 2: transfer donut
kb_by_type = perf["kb_by_type"]
seg_labels = []
seg_values = []
color_map = {"fetch": DEEP, "script": ACCENT, "link": LIGHT}
rename = {"fetch": "Data / API (fetch)", "script": "JavaScript", "link": "CSS + fonts", "other": "Other"}
for k, v in kb_by_type.items():
    seg_labels.append(rename.get(k, k))
    seg_values.append(v)
colors = [color_map.get({"fetch": "fetch", "script": "script", "link": "link"}.get(k, "other"), LIGHT) for k in kb_by_type]

fig, ax = plt.subplots(figsize=(6.6, 3.4), dpi=200, constrained_layout=True)
wedges, _ = ax.pie(
    seg_values,
    colors=colors,
    startangle=90,
    counterclock=False,
    wedgeprops=dict(width=0.35, edgecolor="white", linewidth=1.5),
)
ax.text(0, 0.08, f"{perf['transfer_kb_total']/1024:.2f} MB", ha="center", va="center", fontsize=15, fontweight="bold", color=TEXT)
ax.text(0, -0.16, f"{perf['requests_total']} requests", ha="center", va="center", fontsize=9.5, color=MUTED)
legend_labels = [f"{l}  -  {v/1024:.2f} MB ({v/perf['transfer_kb_total']*100:.0f}%)" for l, v in zip(seg_labels, seg_values)]
ax.legend(wedges, legend_labels, loc="center left", bbox_to_anchor=(1.02, 0.5), frameon=False, fontsize=10)
ax.set_aspect("equal")
fig.savefig(f"{OUT}/transfer_donut.png", facecolor="white")
plt.close(fig)

# ---------------------------------------------------------------- Chart 3: easing curves
css_text = ""
for p in glob.glob(f"{BASE}/assets/*.css"):
    css_text += open(p, encoding="utf-8", errors="replace").read()
tokens = dict(re.findall(r"(--[\w-]*)\s*:\s*([^;{}]+)", css_text))


def cubic_bezier(p1x, p1y, p2x, p2y, n=240):
    t = np.linspace(0, 1, n)
    x = 3 * (1 - t) ** 2 * t * p1x + 3 * (1 - t) * t**2 * p2x + t**3
    y = 3 * (1 - t) ** 2 * t * p1y + 3 * (1 - t) * t**2 * p2y + t**3
    return x, y


def parse_linear(spec):
    pts = re.findall(r"(-?[\d.]+)\s*(-?[\d.]+)%?", spec)
    pts = [(float(a), float(b)) for a, b in pts]
    if not pts:
        return None, None
    xs = [p[0] for p in pts]
    # two-column format: (progress, position%) or single values
    if pts[0][1] == 0 and pts[-1][1] in (0, 100):
        ys = [p[0] for p in pts]
        xs = [p[1] / 100 for p in pts]
    else:
        ys = [p[0] for p in pts]
        xs = [p[1] / 100 for p in pts]
    return np.array(xs), np.array(ys)


curves = []
name = "--ease-out-expo"
bz = tokens.get(name, "")
nums = re.findall(r"(-?[\d.]+)", bz)
if len(nums) >= 4:
    x, y = cubic_bezier(*[float(v) for v in nums[:4]])
    curves.append(("ease-out-expo  cubic-bezier(.19,1,.22,1)", x, y, DEEP, "-"))
name = "--ease-in-out-quart"
bz = tokens.get(name, "")
nums = re.findall(r"(-?[\d.]+)", bz)
if len(nums) >= 4:
    x, y = cubic_bezier(*[float(v) for v in nums[:4]])
    curves.append(("ease-in-out-quart  cubic-bezier(.77,0,.175,1)", x, y, ACCENT, "-"))
name = "--ease-out-quint"
bz = tokens.get(name, "")
nums = re.findall(r"(-?[\d.]+)", bz)
if len(nums) >= 4:
    x, y = cubic_bezier(*[float(v) for v in nums[:4]])
    curves.append(("ease-out-quint  cubic-bezier(.23,1,.32,1)", x, y, LIGHT, "-"))
spring = tokens.get("--easing-spring-elegant", "")
xs, ys = parse_linear(spring)
if xs is not None:
    curves.append(("easing-spring-elegant  linear()  d=0.58s", xs, ys, MUTED, "--"))

fig, ax = plt.subplots(figsize=(7.4, 3.9), dpi=200, constrained_layout=True)
ax.plot([0, 1], [0, 1], color=PALE, linewidth=1, linestyle=":", alpha=0.9)
ax.text(0.86, 0.80, "linear", fontsize=8.5, color=MUTED, alpha=0.8)
for label, x, y, color, ls in curves:
    ax.plot(x, y, color=color, linewidth=2.2, linestyle=ls, label=label)
ax.set_xlim(0, 1)
ax.set_ylim(0, 1.05)
ax.set_xlabel("time (normalized)", fontsize=10, color=MUTED)
ax.set_ylabel("progress", fontsize=10, color=MUTED)
ax.grid(True, linestyle="--", alpha=0.2, linewidth=0.5)
ax.set_axisbelow(True)
leg = ax.legend(loc="upper left", bbox_to_anchor=(0.02, 1.0), frameon=False, fontsize=8.8)
style_ax(ax)
fig.savefig(f"{OUT}/easing_curves.png", facecolor="white")
plt.close(fig)

# ---------------------------------------------------------------- Chart 4: duration discipline
dist = css["durations_dist"]
items = [(float(k), v) for k, v in dist.items() if float(k) > 0]
items.sort()
xs = [f"{k:g}" for k, _ in items]
ys = [v for _, v in items]
fig, ax = plt.subplots(figsize=(7.6, 3.0), dpi=200, constrained_layout=True)
bars = ax.bar(xs, ys, width=0.62, color=ACCENT)
for xi, v in enumerate(ys):
    ax.text(xi, v + 0.3, str(v), ha="center", va="bottom", fontsize=9, color=TEXT)
ax.set_xlabel("transition / animation duration (seconds)", fontsize=10, color=MUTED)
ax.set_ylabel("declarations", fontsize=10, color=MUTED)
ax.yaxis.grid(True, linestyle="--", alpha=0.2, linewidth=0.5)
ax.set_axisbelow(True)
ax.spines["top"].set_visible(False)
ax.spines["right"].set_visible(False)
ax.spines["left"].set_color(PALE)
ax.spines["bottom"].set_color(PALE)
ax.tick_params(labelsize=9)
fig.savefig(f"{OUT}/duration_dist.png", facecolor="white")
plt.close(fig)

print("charts written:", os.listdir(OUT))
