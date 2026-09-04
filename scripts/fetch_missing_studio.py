#!/usr/bin/env python3
"""Fetch the missing studio conversion pages: services, contact, audit, blog."""
import os

from scrapling.fetchers import DynamicFetcher

BASE = "/home/z/my-project/audit_data/studio/pages"
URLS = [
    ("https://studio.tangison.com/services", "services"),
    ("https://studio.tangison.com/contact", "contact"),
    ("https://studio.tangison.com/audit", "audit"),
    ("https://studio.tangison.com/blog/one-studio-instead-of-three-vendors", "blog-one-studio"),
]


def get_body(page):
    for attr in ("body", "html_content", "html", "source"):
        v = getattr(page, attr, None)
        if v:
            return v.decode("utf-8", "replace") if isinstance(v, bytes) else str(v)
    return None


def action(page):
    try:
        page.wait_for_timeout(3000)
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
        page.screenshot(path=os.path.join(BASE, "{NAME}.png"), full_page=True)
    except Exception as e:
        print(f"    [action error] {e!r}")


for url, name in URLS:
    print(f"[studio] {url} -> {name}", flush=True)
    out = os.path.join(BASE, f"{name}.png")
    # build a per-url closure with the correct name
    def make_action(out_path):
        def act(page):
            try:
                page.wait_for_timeout(3000)
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
                page.screenshot(path=out_path, full_page=True)
            except Exception as e:
                print(f"    [action error] {e!r}")
        return act

    try:
        page = DynamicFetcher.fetch(
            url, headless=True, network_idle=True, timeout=90000, wait=4,
            page_action=make_action(out),
        )
        body = get_body(page) or ""
        with open(os.path.join(BASE, f"{name}.html"), "w") as f:
            f.write(body)
        print(f"    ok: {len(body)}B -> {name}.html + {name}.png")
    except Exception as e:
        print(f"    FAILED: {e!r}")
