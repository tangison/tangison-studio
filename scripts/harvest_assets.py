#!/usr/bin/env python3
"""Harvest CSS/JS/font assets for a fetched site tag using Scrapling's Fetcher (HTTP).

JS/CSS/font URLs come from BOTH the DOM inventory and the performance resource
entries (covers lazy-loaded Nuxt chunks). CSS files are then scanned for
additional font url(...) references.
"""
import json
import os
import re
from urllib.parse import urlparse

from scrapling.fetchers import Fetcher

BASE = "/home/z/my-project/audit_data"
TAG = "collins"
SITE_HOST = "wearecollins.com"

inv = json.load(open(f"{BASE}/{TAG}/inventory.json"))
perf = json.load(open(f"{BASE}/{TAG}/home_perf.json"))
outdir = f"{BASE}/{TAG}/assets"
os.makedirs(outdir, exist_ok=True)


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


def download(kind, url):
    name = safe_name(url)
    path = os.path.join(outdir, name)
    if os.path.exists(path) and os.path.getsize(path) > 0:
        return {"kind": kind, "url": url, "file": name, "cached": True, "bytes": os.path.getsize(path)}
    try:
        status, raw = fetch_raw(url)
        if status == 200 and raw:
            with open(path, "wb") as f:
                f.write(raw)
            return {"kind": kind, "url": url, "file": name, "status": status, "bytes": len(raw)}
        return {"kind": kind, "url": url, "status": status, "error": "empty or non-200"}
    except Exception as e:
        return {"kind": kind, "url": url, "error": repr(e)[:160]}


targets = []
for u in inv["stylesheets"]:
    targets.append(("css", u.split("?")[0]))
for e in perf:
    n = (e.get("n") or "").split("?")[0]
    host = urlparse(n).netloc
    if host and SITE_HOST not in host:
        continue
    if n.endswith(".js"):
        targets.append(("js", n))
    elif n.endswith(".css"):
        targets.append(("css", n))
    elif n.endswith((".woff2", ".woff", ".ttf", ".otf")):
        targets.append(("font", n))
for u in inv["preloads"]:
    if u.split("?")[0].endswith((".woff2", ".woff", ".ttf", ".otf")):
        targets.append(("font", u.split("?")[0]))

seen = set()
manifest = []
for kind, url in targets:
    if url in seen:
        continue
    seen.add(url)
    manifest.append(download(kind, url))

# Second pass: fonts referenced inside downloaded CSS
font_re = re.compile(r"url\((['\"]?)([^'\")]+\.woff2?|[^'\")]+\.otf|[^'\")]+\.ttf)\1\)", re.I)
for m in list(manifest):
    if m.get("file") and m["file"].endswith((".css",)):
        path = os.path.join(outdir, m["file"])
        try:
            text = open(path, encoding="utf-8", errors="replace").read()
        except Exception:
            continue
        for _, furl in font_re.findall(text):
            full = f"https://{SITE_HOST}{furl}" if furl.startswith("/") else furl
            if full not in seen:
                seen.add(full)
                manifest.append(download("font", full))

with open(f"{BASE}/{TAG}/assets_manifest.json", "w") as f:
    json.dump(manifest, f, indent=2)

ok = [m for m in manifest if m.get("bytes")]
total = sum(m["bytes"] for m in ok)
print(f"harvested {len(ok)}/{len(manifest)} files, total {total/1024:.0f} KB")
for m in manifest:
    if m.get("bytes"):
        print(f"  OK  {m['kind']:4s} {m['file']:40s} {m['bytes']/1024:8.1f} KB")
    elif m.get("cached"):
        print(f"  CCH {m['kind']:4s} {m['file']}")
    else:
        print(f"  ERR {m.get('kind')} {m['url'][:80]} -> {m.get('error', m.get('status'))}")
