#!/usr/bin/env python3
"""Quantitative copy audit: score both sites' copy against conversion-copywriting
frameworks (AIDA/PAS coverage, CTA strength, specificity, you/we ratio, passive
voice, jargon, proof elements, objection handling)."""
import json
import os
import re
from collections import Counter

BASE = "/home/z/my-project/audit_data"

# --- reference word lists ---
JARGON = [
    "synergy", "synergies", "leverage", "leveraging", "optimize", "optimization",
    "streamline", "innovative", "cutting-edge", "best-in-class", "world-class",
    "solution", "solutions", "holistic", "paradigm", "ecosystem", "empower",
    "seamless", "robust", "scalable", "next-generation", "transformative",
    "game-changer", "disrupt", "revolutionary", "value-add", "ninja", "rockstar",
]
HEDGES = ["almost", "very", "really", "quite", "fairly", "somewhat", "perhaps",
          "maybe", "possibly", "arguably", "generally", "basically", "actually"]
WEAK_CTAS = ["submit", "sign up", "learn more", "click here", "get started",
             "contact us", "read more", "more info", "inquire", "enquire here"]
PROOF_MARKERS = re.compile(
    r"\b(?:\d{2,}|N\$|percent|%|since \d{4}|years?\b.{0,14}\b(?:of|since)|\+\d)\b", re.I)


def load_copy(tag):
    with open(f"{BASE}/{tag}/copy_inventory.json") as f:
        return json.load(f)


def page_text(cp):
    parts = [cp.get("title", ""), cp.get("meta_description", "")]
    parts += [h["text"] for h in cp.get("headings", [])]
    parts += cp.get("paragraphs", [])
    parts += cp.get("list_items", [])[:40]
    return " ".join(parts)


def analyze(tag):
    copy = load_copy(tag)
    agg = {
        "pages": 0, "words": 0, "sentences": 0, "h1s": [], "ctas": [],
        "you": 0, "we": 0, "jargon_hits": [], "hedge_hits": [],
        "passive": 0, "proof_sentences": 0, "numbers": 0, "questions": 0,
        "avg_sentence_len": 0, "long_paragraphs": 0, "paragraphs": 0,
    }
    sent_lens = []
    for key, cp in copy.items():
        agg["pages"] += 1
        agg["words"] += cp.get("body_word_count", 0)
        h1 = [h["text"] for h in cp.get("headings", []) if h["tag"] == "h1"]
        agg["h1s"] += [f"{key}: {t}" for t in h1]
        agg["ctas"] += cp.get("buttons", []) + [a["text"] for a in cp.get("action_links", [])]
        text = page_text(cp)
        # you/we ratio
        agg["you"] += len(re.findall(r"\byou\b|\byour\b", text, re.I))
        agg["we"] += len(re.findall(r"\bwe\b|\bour\b|\bus\b", text, re.I))
        # jargon & hedges
        low = text.lower()
        for j in JARGON:
            n = low.count(j)
            if n:
                agg["jargon_hits"] += [j] * n
        for h in HEDGES:
            n = low.count(" " + h + " ")
            if n:
                agg["hedge_hits"] += [h] * n
        # sentences
        sentences = [s.strip() for s in re.split(r"[.!?]+\s", text) if len(s.strip()) > 3]
        agg["sentences"] += len(sentences)
        for s in sentences:
            sent_lens.append(len(s.split()))
            if PROOF_MARKERS.search(s):
                agg["proof_sentences"] += 1
        agg["questions"] += text.count("?")
        agg["numbers"] += len(re.findall(r"\b\d[\d.,]*\b", text))
        # passive voice (crude: was/were/been/is being + past participle guess)
        agg["passive"] += len(re.findall(r"\b(?:is|are|was|were|been|being)\s+\w+(?:ed|en)\b", text, re.I))
        # paragraph length
        for p in cp.get("paragraphs", []):
            agg["paragraphs"] += 1
            if len(p.split()) > 60:
                agg["long_paragraphs"] += 1
    agg["avg_sentence_len"] = round(sum(sent_lens) / max(len(sent_lens), 1), 1)
    agg["jargon_top"] = Counter(agg.pop("jargon_hits")).most_common(10)
    agg["hedge_top"] = Counter(agg.pop("hedge_hits")).most_common(8)
    agg["cta_top"] = Counter([c.strip() for c in agg["ctas"]]).most_common(18)
    # weak CTA check
    weak = []
    for c in agg["ctas"]:
        cl = c.strip().lower()
        for w in WEAK_CTAS:
            if cl == w or (w in cl and len(cl) < len(w) + 6):
                weak.append(c.strip())
    agg["weak_cta_count"] = len(weak)
    agg["you_we_ratio"] = round(agg["you"] / max(agg["we"], 1), 2)
    with open(f"{BASE}/{tag}/copy_metrics.json", "w") as f:
        json.dump(agg, f, indent=2)
    print(f"===== {tag.upper()} =====")
    for k in ["pages", "words", "sentences", "avg_sentence_len", "paragraphs",
              "long_paragraphs", "you", "we", "you_we_ratio", "questions", "numbers",
              "proof_sentences", "passive", "weak_cta_count"]:
        print(f"  {k:20s} {agg[k]}")
    print("  H1s:", *[f"    {h}" for h in agg["h1s"]], sep="\n")
    print("  TOP CTAs:", agg["cta_top"][:10])
    print("  jargon:", agg["jargon_top"])
    print("  hedges:", agg["hedge_top"])
    return agg


for tag in ("tangison", "studio"):
    analyze(tag)
