#!/usr/bin/env python3
"""Merge the Crystal Blue cover (page 0) with the report body into the final PDF."""
import os

from pypdf import PdfReader, PdfWriter

A4_W, A4_H = 595.28, 841.89

COVER = "/home/z/my-project/audit_data/cover.pdf"
BODY = "/home/z/my-project/audit_data/report_body.pdf"
OUT = "/home/z/my-project/download/studio-tanguson-vs-collins-design-motion-audit.pdf"


def normalize_page_to_a4(page):
    box = page.mediabox
    w, h = float(box.width), float(box.height)
    if abs(w - A4_W) > 0.1 or abs(h - A4_H) > 0.1:
        page.scale_to(A4_W, A4_H)
    return page


def main():
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    writer = PdfWriter()
    cover_page = PdfReader(COVER).pages[0]
    writer.add_page(normalize_page_to_a4(cover_page))
    for page in PdfReader(BODY).pages:
        writer.add_page(normalize_page_to_a4(page))
    writer.add_metadata({
        "/Title": "Studio Tanguson vs. COLLINS - Design & Motion Audit",
        "/Author": "Z.ai",
        "/Creator": "Z.ai",
        "/Subject": "Design and motion audit of studio.tanguson.com benchmarked against wearecollins.com (COLLINS)",
    })
    with open(OUT, "wb") as f:
        writer.write(f)
    print("final written:", OUT, os.path.getsize(OUT), "bytes,", len(writer.pages), "pages")


if __name__ == "__main__":
    main()
