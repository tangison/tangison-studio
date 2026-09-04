#!/usr/bin/env python3
"""Quick test: does DynamicFetcher await page_action correctly?"""
from scrapling.fetchers import DynamicFetcher


async def action(page):
    await page.screenshot(path="/home/z/my-project/audit_data/test_shot.png")
    print("ACTION RAN OK")


p = DynamicFetcher.fetch("https://example.com", headless=True, timeout=30000, page_action=action)
print("status:", p.status, "body_len:", len(p.body or ""))
