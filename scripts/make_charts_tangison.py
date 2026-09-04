#!/usr/bin/env python3
"""Generate audit charts for the Tangison copy+design report.
Palette: cascade seed-7 warm neutral family (#504933 deep, #87702a gold accent,
#3a95b4 teal secondary, #cfcab8 pale border)."""
import json
import os

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

BASE = "/home/z/my-project/audit_data"
OUT = "/home/z/my-project/audit_data/charts_tangison"
os.makedirs(OUT, exist_ok=True)

# cascade palette (seed 7)
DEEP = "#504933"      # header_fill  (M)
GOLD = "#87702a"      # accent       (XS)
TEAL = "#3a95b4"      # accent_2     (XS)
PALE = "#cfcab8"      # border       (S)
TEXT = "#1c1c1a"
MUTED = "#78766f"
ERR = "#92453e"

plt.rcParams["font.family"] = "sans-serif"
plt.rcParams["font.sans-serif"] = ["DejaVu Sans"]
plt.rcParams["axes.unicode_minus"] = False
plt.rcParams["text.color"] = TEXT
plt.rcParams["axes.labelcolor"] = TEXT
plt.rcParams["xtick.color"] = MUTED
plt.rcParams["ytick.color"] = MUTED


def style_ax(ax):
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)
    ax.spines["left"].set_color(PALE)
    ax.spines["bottom"].set_color(PALE)


# ------------------------------------------------ Chart 1: motion affordance gap
t = json.load(open(f"{BASE}/tangison/css_metrics.json"))
s = json.load(open(f"{BASE}/studio/css_metrics.json"))
c = json.load(open(f"{BASE}/collins/metrics.json"))["css"]

metrics = [
    ("CSS transition declarations", t["transition_count"], s["transition_count"], c["transition_declarations"]),
    (":hover rules", t["hover_rules"], s["hover_rules"], c["hover_rules"]),
    (":focus-visible rules", t["focus_visible"], s["focus_visible"], c["focus_visible_rules"]),
    ("clip-path declarations", t["clip_path"], s["clip_path"], c["clip_path"]),
    ("@keyframes definitions", t["keyframe_count"], s["keyframe_count"], c["keyframes_count"]),
]
labels = [m[0] for m in metrics]
tv = np.array([m[1] for m in metrics], dtype=float)
sv = np.array([m[2] for m in metrics], dtype=float)
cv = np.array([m[3] for m in metrics], dtype=float)

fig, ax = plt.subplots(figsize=(8.4, 4.2), dpi=200, constrained_layout=True)
y = np.arange(len(labels))[::-1]
h = 0.26
ax.barh(y + h, cv, height=h, color=DEEP, label="COLLINS (benchmark)")
ax.barh(y, sv, height=h, color=TEAL, label="studio.tangison.com")
ax.barh(y - h, tv, height=h, color=GOLD, label="tangison.com")
ax.set_yticks(y)
ax.set_yticklabels(labels, fontsize=10.5)
for yi, v in zip(y + h, cv):
    ax.text(v + 3, yi, str(int(v)), va="center", ha="left", fontsize=9, color=DEEP)
for yi, v in zip(y, sv):
    ax.text(v + 3, yi, str(int(v)), va="center", ha="left", fontsize=9, color=TEAL)
for yi, v in zip(y - h, tv):
    ax.text(v + 3, yi, str(int(v)), va="center", ha="left", fontsize=9, color=GOLD)
ax.set_xlim(0, max(cv) * 1.14)
ax.set_xlabel("count in shipped CSS", fontsize=10, color=MUTED)
ax.xaxis.grid(True, linestyle="--", alpha=0.2, linewidth=0.5)
ax.set_axisbelow(True)
ax.tick_params(axis="x", labelsize=9)
ax.legend(loc="lower right", fontsize=9.5, frameon=False)
style_ax(ax)
fig.savefig(f"{OUT}/motion_gap.png", facecolor="white")
plt.close(fig)

# ------------------------------------------------ Chart 2: studio JS motion patterns
j = json.load(open(f"{BASE}/studio/js_motion_metrics.json"))["counts"]
pats = [
    ("opacity (fade)", j.get("opacity", 0)),
    ("transition prop", j.get("transition prop", 0)),
    ("initial prop", j.get("initial prop", 0)),
    ("motion.div components", j.get("motion.div/component", 0)),
    ("whileInView", j.get("whileInView", 0)),
    ("variants", j.get("variants", 0)),
    ("y translate (rise)", j.get("y translate", 0)),
    ("scale", j.get("scale", 0)),
    ("stagger", j.get("stagger", 0)),
    ("whileHover", j.get("whileHover", 0)),
    ("exit / AnimatePresence", j.get("exit/AnimatePresence", 0)),
    ("useScroll", j.get("useScroll", 0)),
    ("useTransform", j.get("useTransform", 0)),
    ("useSpring", j.get("useSpring", 0)),
]
labels2 = [p[0] for p in pats][::-1]
vals2 = [p[1] for p in pats][::-1]
cols2 = [TEAL if v > 0 else ERR for v in vals2]
fig, ax = plt.subplots(figsize=(8.4, 4.6), dpi=200, constrained_layout=True)
y2 = np.arange(len(labels2))
ax.barh(y2, vals2, height=0.62, color=cols2)
ax.set_yticks(y2)
ax.set_yticklabels(labels2, fontsize=10)
for yi, v in zip(y2, vals2):
    if v > 0:
        ax.text(v + 1.5, yi, str(v), va="center", ha="left", fontsize=9.5, color=TEXT)
    else:
        ax.text(1.5, yi, "0 — absent", va="center", ha="left", fontsize=9.5, color=ERR, style="italic")
ax.set_xlim(0, max(vals2) * 1.2)
ax.set_xlabel("occurrences in shipped JS bundles (1.0 MB corpus)", fontsize=10, color=MUTED)
ax.xaxis.grid(True, linestyle="--", alpha=0.2, linewidth=0.5)
ax.set_axisbelow(True)
ax.tick_params(axis="x", labelsize=9)
style_ax(ax)
fig.savefig(f"{OUT}/studio_js_motion.png", facecolor="white")
plt.close(fig)

# ------------------------------------------------ Chart 3: words per page
tc = json.load(open(f"{BASE}/tangison/copy_inventory.json"))
sc = json.load(open(f"{BASE}/studio/copy_inventory.json"))
rows = []
for k, v in tc.items():
    rows.append((k, v["body_word_count"], GOLD))
for k, v in sc.items():
    rows.append((k, v["body_word_count"], TEAL))
rows.sort(key=lambda r: r[1])
labels3 = [r[0] for r in rows]
vals3 = [r[1] for r in rows]
cols3 = [r[2] for r in rows]
fig, ax = plt.subplots(figsize=(8.4, 5.4), dpi=200, constrained_layout=True)
y3 = np.arange(len(labels3))
ax.barh(y3, vals3, height=0.62, color=cols3)
ax.set_yticks(y3)
ax.set_yticklabels(labels3, fontsize=8.8)
for yi, v in zip(y3, vals3):
    ax.text(v + 18, yi, str(v), va="center", ha="left", fontsize=8.5, color=TEXT)
ax.set_xlim(0, max(vals3) * 1.12)
ax.set_xlabel("body word count per page (rendered DOM text)", fontsize=10, color=MUTED)
ax.xaxis.grid(True, linestyle="--", alpha=0.2, linewidth=0.5)
ax.set_axisbelow(True)
ax.tick_params(axis="x", labelsize=9)
from matplotlib.patches import Patch
ax.legend(handles=[Patch(color=GOLD, label="tangison.com"), Patch(color=TEAL, label="studio.tangison.com")],
          loc="lower right", fontsize=9.5, frameon=False)
style_ax(ax)
fig.savefig(f"{OUT}/copy_volume.png", facecolor="white")
plt.close(fig)

# ------------------------------------------------ Chart 4: duration rhythm
durs = [(".2s", 1), (".3s", 8), (".4s", 1), (".45s", 1), (".5s", 1), (".6s", 28), (".8s", 2), ("1s", 11)]
labels4 = [d[0] for d in durs]
vals4 = [d[1] for d in durs]
fig, ax = plt.subplots(figsize=(8.0, 3.2), dpi=200, constrained_layout=True)
x4 = np.arange(len(labels4))
cols4 = [GOLD if v == max(vals4) else PALE for v in vals4]
ax.bar(x4, vals4, width=0.62, color=cols4)
for xi, v in zip(x4, vals4):
    ax.text(xi, v + 0.5, str(v), ha="center", va="bottom", fontsize=9.5, color=TEXT)
ax.set_xticks(x4)
ax.set_xticklabels(labels4, fontsize=10)
ax.set_ylabel("occurrences in JS", fontsize=10, color=MUTED)
ax.set_ylim(0, max(vals4) * 1.22)
ax.yaxis.grid(True, linestyle="--", alpha=0.2, linewidth=0.5)
ax.set_axisbelow(True)
ax.tick_params(axis="y", labelsize=9)
style_ax(ax)
fig.savefig(f"{OUT}/duration_mix.png", facecolor="white")
plt.close(fig)

for f in sorted(os.listdir(OUT)):
    print(f, os.path.getsize(os.path.join(OUT, f)) // 1024, "KB")
