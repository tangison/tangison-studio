#!/usr/bin/env python3
"""Merge cover_tangison.pdf + report_body_tangison.pdf into the final deliverable
with A4 normalization and metadata."""
from pypdf import PdfReader, PdfWriter

A4_W, A4_H = 595.28, 841.89

COVER = "/home/z/my-project/audit_data/cover_tangison.pdf"
BODY = "/home/z/my-project/audit_data/report_body_tangison.pdf"
OUT = "/home/z/my-project/download/tangison-copy-design-audit-improvement-plan.pdf"


def normalize_page_to_a4(page):
    box = page.mediabox
    w, h = float(box.width), float(box.height)
    if abs(w - A4_W) > 0.1 or abs(h - A4_H) > 0.1:
        page.scale_to(A4_W, A4_H)
    return page


writer = PdfWriter()
writer.add_page(normalize_page_to_a4(PdfReader(COVER).pages[0]))
for page in PdfReader(BODY).pages:
    writer.add_page(normalize_page_to_a4(page))
writer.add_metadata({
    "/Title": "Tangison Copy and Design Audit: Improvement Plan",
    "/Author": "Z.ai",
    "/Creator": "Z.ai",
    "/Subject": "Copy, design layout, and motion audit of tangison.com and studio.tangison.com, benchmarked against wearecollins.com",
})
with open(OUT, "wb") as f:
    writer.write(f)
import os
print("final:", OUT, os.path.getsize(OUT), "bytes,", len(writer.pages), "pages")
