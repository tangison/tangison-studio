#!/usr/bin/env python3
"""Fetch the CORRECT audit targets with Scrapling: rendered HTML, full-page screenshots,
perf entries, asset inventory.

Targets (user-corrected spelling):
  - tangison: https://tangison.com/
  - studio:   https://studio.tangison.com/

Engine: DynamicFetcher (Playwright/Chromium) first — camoufox unavailable in this env.
Usage: python3 fetch_tangison.py [tangison|studio|both]
"""
import json
import os
import re
import sys
from urllib.parse import urljoin, urlparse

from lxml import html as LH
from scrapling.fetchers import DynamicFetcher

BASE = "/home/z/my-project/audit_data"
SITES = {
    "tangison": "https://tangison.com/",
    "studio": "https://studio.tangison.com/",
}

for tag in SITES:
    os.makedirs(os.path.join(BASE, tag, "pages"), exist_ok=True)


def slugify(url):
    p = urlparse(url)
    s = (p.path or "/").strip("/").replace("/", "-") or "home"
    s = re.sub(r"[^a-zA-Z0-9_-]", "", s)[:40]
    return s or "home"


def get_body(page):
    for attr in ("body", "html_content", "html", "source"):
        v = getattr(page, attr, None)
        if v:
            return v.decode("utf-8", "replace") if isinstance(v, bytes) else str(v)
    return None


def fetch_page(url, out_dir, name, timeout_ms=90000):
    """Fetch one URL, save full-page screenshot + perf entries + doc meta via page_action."""
    shot = os.path.join(out_dir, f"{name}.png")
    perf_path = os.path.join(out_dir, f"{name}_perf.json")
    meta_path = os.path.join(out_dir, f"{name}_meta.json")
    md_path = os.path.join(out_dir, f"{name}.md")

    # NOTE: scrapling 0.4's sync sessions call page_action(page) WITHOUT await —
    # the callback must be a SYNC function using the sync Playwright API.
    def action(page):
        try:
            page.wait_for_timeout(3000)
            # Progressive scroll to trigger lazy content / scroll-reveal animations
            height = page.evaluate("document.body.scrollHeight")
            step = max(height // 12, 500)
            y = 0
            while y < min(height, 30000):
                page.evaluate(f"window.scrollTo(0, {y})")
                page.wait_for_timeout(350)
                y += step
                height = page.evaluate("document.body.scrollHeight")
            page.evaluate("window.scrollTo(0, 0)")
            page.wait_for_timeout(1200)
            page.screenshot(path=shot, full_page=True)
            perf = page.evaluate(
                "JSON.stringify(performance.getEntriesByType('resource').map("
                "e=>({n:e.name,t:e.transferSize,d:Math.round(e.duration),it:e.initiatorType})))"
            )
            with open(perf_path, "w") as f:
                f.write(perf)
            meta = page.evaluate(
                "JSON.stringify({title: document.title, "
                "docHeight: document.body.scrollHeight, "
                "docWidth: document.documentElement.scrollWidth, "
                "h1: Array.from(document.querySelectorAll('h1')).map(h=>h.innerText).join(' | '), "
                "fonts: Array.from(document.fonts).map(f=>f.family+'|'+(f.style||'')+'|'+(f.weight||'')).filter((v,i,a)=>a.indexOf(v)===i)})"
            )
            with open(meta_path, "w") as f:
                f.write(meta)
            print("    [action] screenshot + perf + meta saved")
        except Exception as e:
            print(f"    [action error] {e!r}")

    last_err = None
    try:
        page = DynamicFetcher.fetch(
            url,
            headless=True,
            network_idle=True,
            timeout=timeout_ms,
            wait=4,
            page_action=action,
        )
        status = getattr(page, "status", None) or 0
        body_len = len(get_body(page) or "")
        print(f"    engine=dynamic status={status} body_len={body_len}")
        if page and body_len > 500 and (status == 0 or status < 400):
            # best-effort markdown export for copy analysis
            try:
                md = getattr(page, "markdown", None)
                if md:
                    md = md() if callable(md) else md
                    with open(md_path, "w") as f:
                        f.write(str(md))
                    print("    [action] markdown saved")
            except Exception as e:
                print(f"    [markdown error] {e!r}")
            return page, "dynamic"
        last_err = f"dynamic: status={status} body_len={body_len}"
    except Exception as e:
        last_err = f"dynamic: {e!r}"
        print(f"    dynamic failed: {e!r}")
    return None, last_err


def build_inventory(tag, base_url, html, fname="inventory.json"):
    doc = LH.fromstring(html)

    def absolute(u):
        try:
            return urljoin(base_url, u) if u else u
        except Exception:
            return u

    scripts = [absolute(s) for s in doc.xpath("//script[@src]/@src")]
    styles = [absolute(s) for s in doc.xpath('//link[@rel="stylesheet"]/@href')]
    preloads = [absolute(s) for s in doc.xpath('//link[@rel="preload" or @rel="prefetch" or @rel="preconnect"]/@href')]
    imgs = [absolute(s) for s in doc.xpath("//img/@src")]
    imgs += [absolute(s) for s in doc.xpath("//img/@data-src")]
    srcsets = doc.xpath("//img/@srcset") + doc.xpath("//source/@srcset")
    videos = [absolute(s) for s in doc.xpath("//video/@src")] + [absolute(s) for s in doc.xpath("//source/@src")]
    fonts = [absolute(h) for h in doc.xpath("//link/@href") if any(ext in (h or "") for ext in (".woff", ".woff2", ".ttf", ".otf"))]
    links = [absolute(h) for h in doc.xpath("//a/@href")]
    metas = {
        (m.get("name") or m.get("property") or m.get("http-equiv") or ""): (m.get("content") or "")
        for m in doc.xpath("//meta")
    }
    title = (doc.xpath("//title/text()") or [""])[0].strip()
    all_imgs = doc.xpath("//img")
    alt_total = len(all_imgs)
    alt_with = sum(1 for i in all_imgs if (i.get("alt") or "").strip())
    semantic = {t: len(doc.xpath(f"//{t}")) for t in ("header", "nav", "main", "footer", "section", "article", "h1", "h2", "h3", "h4", "button", "form", "input", "canvas", "svg", "video", "iframe")}
    inline_styles = "\n\n/* ===== INLINE STYLE BLOCK ===== */\n\n".join(t for t in doc.xpath("//style/text()") if t and t.strip())
    inline_scripts = "\n;\n".join(t for t in doc.xpath("//script[not(@src)]/text()") if t and t.strip())

    inv = {
        "url": base_url,
        "title": title,
        "metas": metas,
        "scripts": scripts,
        "stylesheets": styles,
        "preloads": preloads,
        "font_links": fonts,
        "images": imgs,
        "srcsets": srcsets,
        "videos": videos,
        "links": links,
        "alt_coverage": {"with_alt": alt_with, "total": alt_total},
        "semantic": semantic,
        "inline_style_bytes": len(inline_styles),
        "inline_script_bytes": len(inline_scripts),
        "html_bytes": len(html),
    }
    with open(os.path.join(BASE, tag, fname), "w") as f:
        json.dump(inv, f, indent=2)
    with open(os.path.join(BASE, tag, "inline_styles.css"), "w") as f:
        f.write(inline_styles)
    with open(os.path.join(BASE, tag, "inline_scripts.js"), "w") as f:
        f.write(inline_scripts)
    return inv


def pick_subpages(base_url, links, limit=7):
    host = urlparse(base_url).netloc
    seen = set()
    scored = []
    priority = ("work", "about", "project", "portfolio", "service", "studio", "contact", "case", "journal", "news", "team", "services", "blog")
    for href in links or []:
        if not href or href.startswith(("mailto:", "tel:", "javascript:", "#")):
            continue
        try:
            full = urljoin(base_url, href)
        except Exception:
            continue
        p = urlparse(full)
        if p.netloc != host or not p.path or p.path == "/":
            continue
        low = p.path.lower()
        if low in seen:
            continue
        seen.add(low)
        score = 0
        for i, kw in enumerate(priority):
            if kw in low:
                score += 100 - i * 10
        if re.fullmatch(r"/[a-z0-9_-]{2,24}/?", low):
            score += 20
        if score > 0:
            scored.append((score, full))
    scored.sort(key=lambda x: (-x[0], x[1]))
    return [u for _, u in scored[:limit]]


def main():
    which = sys.argv[1] if len(sys.argv) > 1 else "both"
    tags = list(SITES.keys()) if which == "both" else [which]
    summary = {}
    for tag in tags:
        url = SITES[tag]
        print(f"[{tag}] homepage: {url}", flush=True)
        page, engine = fetch_page(url, os.path.join(BASE, tag), "home")
        if not page:
            print(f"[{tag}] HOMEPAGE FETCH FAILED: {engine}")
            summary[tag] = {"error": str(engine)}
            continue
        html = get_body(page) or ""
        with open(os.path.join(BASE, tag, "index.html"), "w") as f:
            f.write(html)
        inv = build_inventory(tag, url, html)
        subs = pick_subpages(url, inv["links"])
        print(f"[{tag}] engine={engine} html={len(html)}B scripts={len(inv['scripts'])} css={len(inv['stylesheets'])} subpages={subs}")
        sub_results = []
        for sub in subs:
            slug = slugify(sub)
            print(f"[{tag}] subpage: {sub} -> {slug}", flush=True)
            page2, engine2 = fetch_page(sub, os.path.join(BASE, tag, "pages"), slug, timeout_ms=60000)
            if page2:
                h2 = get_body(page2) or ""
                with open(os.path.join(BASE, tag, "pages", f"{slug}.html"), "w") as f:
                    f.write(h2)
                build_inventory(tag, sub, h2, fname=f"inventory_{slug}.json")
                sub_results.append({"url": sub, "slug": slug, "engine": engine2, "bytes": len(h2)})
                print(f"    ok: {len(h2)}B")
            else:
                sub_results.append({"url": sub, "slug": slug, "error": str(engine2)})
        summary[tag] = {
            "homepage": {"url": url, "engine": engine, "bytes": len(html), "title": inv["title"]},
            "subpages": sub_results,
        }
    out = os.path.join(BASE, "fetch_tangison_summary.json")
    existing = {}
    if os.path.exists(out):
        try:
            with open(out) as f:
                existing = json.load(f)
        except Exception:
            existing = {}
    existing.update(summary)
    with open(out, "w") as f:
        json.dump(existing, f, indent=2)
    print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    main()
