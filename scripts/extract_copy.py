#!/usr/bin/env python3
"""Extract structured copy inventory from crawled HTML: headings, paragraphs, CTAs,
nav labels, footer, meta — per page, per site. Output: JSON + readable TXT."""
import json
import os
import re
from urllib.parse import urlparse

from lxml import html as LH

BASE = "/home/z/my-project/audit_data"

PAGES = {
    "tangison": ["index.html"] + [
        f"pages/{f}" for f in sorted(os.listdir(os.path.join(BASE, "tangison", "pages"))) if f.endswith(".html")
    ],
    "studio": ["index.html"] + [
        f"pages/{f}" for f in sorted(os.listdir(os.path.join(BASE, "studio", "pages"))) if f.endswith(".html")
    ],
}


def clean_text(s):
    if not s:
        return ""
    s = re.sub(r"\s+", " ", s).strip()
    return s


def extract_visible_text(el):
    """Get own text of an element (not descendants' tags), preserving inline flow."""
    parts = []
    if el.text:
        parts.append(el.text)
    for child in el:
        if child.tag in ("br",):
            parts.append(" ")
        t = extract_visible_text(child)
        if t:
            parts.append(t)
        if child.tail:
            parts.append(child.tail)
    return clean_text(" ".join(parts))


def extract_copy(html_path):
    with open(html_path, encoding="utf-8", errors="replace") as f:
        html = f.read()
    doc = LH.fromstring(html)
    # drop script/style/noscript/svg
    for bad in doc.xpath("//script|//style|//noscript|//svg|//template"):
        parent = bad.getparent()
        if parent is not None:
            parent.remove(bad)

    out = {}
    title = doc.xpath("//title/text()")
    out["title"] = clean_text(title[0]) if title else ""
    md = doc.xpath('//meta[@name="description"]/@content')
    out["meta_description"] = clean_text(md[0]) if md else ""
    og = doc.xpath('//meta[@property="og:title"]/@content') + doc.xpath('//meta[@property="og:description"]/@content')
    out["og"] = [clean_text(x) for x in og]

    # headings in document order
    heads = []
    for el in doc.xpath("//h1|//h2|//h3|//h4|//h5|//h6"):
        txt = extract_visible_text(el)
        if txt:
            heads.append({"tag": el.tag, "text": txt})
    out["headings"] = heads

    # paragraphs & list items
    paras = []
    for el in doc.xpath("//p"):
        txt = extract_visible_text(el)
        if txt and len(txt) > 2:
            paras.append(txt)
    out["paragraphs"] = paras
    lis = []
    for el in doc.xpath("//li"):
        txt = extract_visible_text(el)
        if txt and len(txt) > 2 and len(txt) < 300:
            lis.append(txt)
    out["list_items"] = lis

    # nav labels
    nav_labels = []
    for el in doc.xpath("//nav//a|//header//a"):
        txt = extract_visible_text(el)
        if txt:
            nav_labels.append(txt)
    out["nav_labels"] = sorted(set(nav_labels))

    # buttons & CTAs
    buttons = []
    for el in doc.xpath("//button|//a[contains(@class,'button') or contains(@class,'btn') or contains(@class,'cta') or contains(@data-,'cta')]"):
        txt = extract_visible_text(el)
        if txt:
            buttons.append(txt)
    out["buttons"] = buttons
    # links that look like actions
    action_links = []
    for el in doc.xpath("//a"):
        txt = extract_visible_text(el)
        href = el.get("href") or ""
        if txt and re.match(r"^(get|start|book|schedule|contact|let|view|see|explore|learn|read|download|apply|request|reach|discover|find|launch|begin|claim|reserve|talk|request|visit|connect|submit|send|browse|check|show|watch)", txt.strip().lower()) and len(txt) < 80:
            action_links.append({"text": txt, "href": href})
    out["action_links"] = action_links

    # footer text
    footers = []
    for el in doc.xpath("//footer"):
        txt = extract_visible_text(el)
        if txt:
            footers.append(txt[:1500])
    out["footer"] = footers

    # form fields
    inputs = []
    for el in doc.xpath("//input|//textarea|//select|//label"):
        inputs.append({
            "tag": el.tag,
            "type": el.get("type") or "",
            "name": el.get("name") or el.get("id") or "",
            "placeholder": el.get("placeholder") or "",
            "label_text": extract_visible_text(el) if el.tag == "label" else "",
        })
    out["form_fields"] = inputs

    # email/phone links
    out["contact_points"] = [h for h in doc.xpath("//a/@href") if h.startswith(("mailto:", "tel:"))]

    # word count of body text
    body_text = clean_text(" ".join(extract_visible_text(el) for el in doc.xpath("//main|//body")))
    # crude dedup: collapse repeated whitespace
    out["body_word_count"] = len(body_text.split())

    # all link texts (for sitemap-level view)
    all_links = []
    for el in doc.xpath("//a"):
        txt = extract_visible_text(el)
        href = el.get("href") or ""
        if txt and href and not href.startswith(("mailto:", "tel:", "javascript:")):
            all_links.append(f"{txt} -> {href}")
    out["all_links"] = all_links[:200]

    return out


def main():
    result = {}
    for tag, pages in PAGES.items():
        result[tag] = {}
        for rel in pages:
            path = os.path.join(BASE, tag, rel)
            if not os.path.exists(path):
                continue
            key = rel.replace("pages/", "").replace(".html", "").replace("index", "home")
            try:
                result[tag][key] = extract_copy(path)
            except Exception as e:
                result[tag][key] = {"error": repr(e)}
        with open(os.path.join(BASE, tag, "copy_inventory.json"), "w") as f:
            json.dump(result[tag], f, indent=2, ensure_ascii=False)

    # readable digest
    lines = []
    for tag, pages in result.items():
        lines.append("=" * 90)
        lines.append(f"SITE: {tag}")
        lines.append("=" * 90)
        for key, cp in pages.items():
            lines.append("")
            lines.append("-" * 70)
            lines.append(f"PAGE: {key}   (words: {cp.get('body_word_count', '?')})")
            lines.append("-" * 70)
            lines.append(f"TITLE: {cp.get('title','')}")
            lines.append(f"META:  {cp.get('meta_description','')}")
            if cp.get("og"):
                lines.append(f"OG:    {' | '.join(cp['og'])}")
            lines.append(f"NAV:   {', '.join(cp.get('nav_labels', []))}")
            lines.append("")
            lines.append("HEADINGS:")
            for h in cp.get("headings", []):
                lines.append(f"  [{h['tag'].upper()}] {h['text']}")
            lines.append("")
            lines.append("PARAGRAPHS:")
            for p in cp.get("paragraphs", []):
                lines.append(f"  {p}")
            lines.append("")
            lines.append("BUTTONS/CTAS:")
            for b in cp.get("buttons", []):
                lines.append(f"  [BTN] {b}")
            for a in cp.get("action_links", []):
                lines.append(f"  [LINK->ACT] {a['text']}  ({a['href']})")
            if cp.get("list_items"):
                lines.append("LIST ITEMS (first 25):")
                for li in cp.get("list_items", [])[:25]:
                    lines.append(f"  - {li}")
            if cp.get("form_fields"):
                lines.append("FORM FIELDS:")
                for ff in cp["form_fields"]:
                    lines.append(f"  {ff}")
            if cp.get("contact_points"):
                lines.append(f"CONTACT: {cp['contact_points']}")
    with open(os.path.join(BASE, "copy_digest.txt"), "w") as f:
        f.write("\n".join(lines))
    print(f"Extracted {sum(len(v) for v in result.values())} pages. Digest: {os.path.join(BASE, 'copy_digest.txt')}")
    for tag, pages in result.items():
        print(f"  {tag}: {list(pages.keys())}")


if __name__ == "__main__":
    main()
