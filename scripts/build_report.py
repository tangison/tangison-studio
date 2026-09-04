#!/usr/bin/env python3
"""Build the report body PDF (ReportLab) for the Studio Tanguson vs COLLINS audit.

Route: PDF skill / Report brief. Cover is rendered separately via html2poster.js
(Template 07 Crystal Blue) and merged as page 0 by merge_final.py.
Numbering: cover/TOC unnumbered; body chapters start at 1. Footer: TOC = 'i',
body pages = arabic starting at 1 (displayed = doc.page - 1).
"""
import hashlib
import os
import re
import sys

from PIL import Image as PILImage
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import inch
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.pdfmetrics import registerFontFamily
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (CondPageBreak, Frame, HRFlowable, Image,
                                KeepTogether, PageBreak, PageTemplate,
                                Paragraph, SimpleDocTemplate, Spacer, Table,
                                TableStyle)
from reportlab.platypus.tableofcontents import TableOfContents

sys.path.insert(0, "/home/z/my-project/scripts")
sys.path.insert(0, "/home/z/my-project/skills/pdf/scripts")
from report_content import CHAPTERS, META  # noqa: E402
from pdf import install_font_fallback  # noqa: E402

OUT = "/home/z/my-project/audit_data/report_body.pdf"
CL = "/home/z/my-project/audit_data/collins"

# ------------------------------------------------------------------ fonts
FONT_DIR = "/usr/share/fonts"
pdfmetrics.registerFont(TTFont("FreeSerif", f"{FONT_DIR}/truetype/freefont/FreeSerif.ttf"))
pdfmetrics.registerFont(TTFont("FreeSerif-Bold", f"{FONT_DIR}/truetype/freefont/FreeSerifBold.ttf"))
pdfmetrics.registerFont(TTFont("FreeSerif-Italic", f"{FONT_DIR}/truetype/freefont/FreeSerifItalic.ttf"))
pdfmetrics.registerFont(TTFont("FreeSerif-BoldItalic", f"{FONT_DIR}/truetype/freefont/FreeSerifBoldItalic.ttf"))
pdfmetrics.registerFont(TTFont("DejaVuSans", f"{FONT_DIR}/truetype/dejavu/DejaVuSansMono.ttf"))
pdfmetrics.registerFont(TTFont("NotoSerifSC", f"{FONT_DIR}/truetype/noto-serif-sc/NotoSerifSC-Regular.ttf"))
pdfmetrics.registerFont(TTFont("NotoSerifSC-Bold", f"{FONT_DIR}/truetype/noto-serif-sc/NotoSerifSC-Bold.ttf"))
registerFontFamily("FreeSerif", normal="FreeSerif", bold="FreeSerif-Bold",
                   italic="FreeSerif-Italic", boldItalic="FreeSerif-BoldItalic")
registerFontFamily("DejaVuSans", normal="DejaVuSans", bold="DejaVuSans")
registerFontFamily("NotoSerifSC", normal="NotoSerifSC", bold="NotoSerifSC-Bold")
install_font_fallback()

# ------------------------------------------------------------------ palette (Template 07 Crystal Blue body)
PAGE_BG = colors.HexColor("#f5f8fc")     # XL
SECTION_BG = colors.HexColor("#edf2f9")  # XL
CARD_BG = colors.HexColor("#e4ecf5")     # L
TABLE_STRIPE = colors.HexColor("#eef3fa")  # L
HEADER_FILL = colors.HexColor("#1a4a7a")   # M
BORDER = colors.HexColor("#c0d0e2")        # S
ACCENT = colors.HexColor("#2d7ab3")        # XS
TEXT_PRIMARY = colors.HexColor("#142840")
TEXT_MUTED = colors.HexColor("#5a7a96")

MARGIN = 0.9 * inch
PAGE_W, PAGE_H = A4
AVAIL_W = PAGE_W - 2 * MARGIN
AVAIL_H = PAGE_H - 2 * MARGIN
MAX_KEEP = AVAIL_H * 0.4

# ------------------------------------------------------------------ styles
S_BODY = ParagraphStyle("Body", fontName="FreeSerif", fontSize=10.5, leading=17,
                        alignment=TA_JUSTIFY, textColor=TEXT_PRIMARY, spaceAfter=10)
S_H1 = ParagraphStyle("H1x", fontName="FreeSerif", fontSize=20, leading=25,
                      textColor=TEXT_PRIMARY, spaceBefore=0, spaceAfter=3)
S_H2 = ParagraphStyle("H2x", fontName="FreeSerif", fontSize=14.5, leading=19,
                      textColor=HEADER_FILL, spaceBefore=14, spaceAfter=7)
S_H3 = ParagraphStyle("H3x", fontName="FreeSerif", fontSize=11.5, leading=15,
                      textColor=TEXT_PRIMARY, spaceBefore=10, spaceAfter=5)
S_BULLET = ParagraphStyle("Bullet", fontName="FreeSerif", fontSize=10.5, leading=16,
                          alignment=TA_LEFT, textColor=TEXT_PRIMARY,
                          leftIndent=16, bulletIndent=4, spaceAfter=5)
S_CAPTION = ParagraphStyle("Caption", fontName="FreeSerif", fontSize=8.5, leading=12,
                           textColor=TEXT_MUTED, alignment=TA_CENTER,
                           spaceBefore=3, spaceAfter=6)
S_CODE = ParagraphStyle("Code", fontName="DejaVuSans", fontSize=8, leading=11.5,
                        alignment=TA_LEFT, textColor=TEXT_PRIMARY)
S_CODE_TITLE = ParagraphStyle("CodeTitle", fontName="FreeSerif", fontSize=8.5, leading=12,
                              textColor=TEXT_MUTED, spaceBefore=6, spaceAfter=3)
S_TH = ParagraphStyle("TH", fontName="FreeSerif", fontSize=9.5, leading=13,
                      textColor=colors.white, alignment=TA_LEFT)
S_TD = ParagraphStyle("TD", fontName="FreeSerif", fontSize=9, leading=12.5,
                      textColor=TEXT_PRIMARY, alignment=TA_LEFT)
S_STAT = ParagraphStyle("Stat", fontName="FreeSerif", fontSize=15, leading=19,
                        textColor=ACCENT, alignment=TA_CENTER)
S_STAT_LABEL = ParagraphStyle("StatLabel", fontName="FreeSerif", fontSize=7.5, leading=10,
                              textColor=TEXT_MUTED, alignment=TA_CENTER)
S_TOC_TITLE = ParagraphStyle("TocTitle", fontName="FreeSerif", fontSize=20, leading=25,
                             textColor=TEXT_PRIMARY, spaceAfter=14)
S_TOC0 = ParagraphStyle("TOC0", fontName="FreeSerif", fontSize=11, leading=18,
                        textColor=TEXT_PRIMARY, leftIndent=0)
S_TOC1 = ParagraphStyle("TOC1", fontName="FreeSerif", fontSize=9.5, leading=15,
                        textColor=TEXT_MUTED, leftIndent=18)


# ------------------------------------------------------------------ helpers
def content_sanitize(text: str) -> str:
    text = re.sub(r"[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]", "", text)
    text = re.sub(r"[\u200b-\u200f\u2028-\u202f\u2060\ufeff]", "", text)
    text = text.replace("\ufffd", "")
    text = re.sub(r"[\ufe00-\ufe0f]", "", text)
    text = re.sub(r"[\ue000-\uf8ff]", "", text)
    return text


def esc(s: str) -> str:
    return s.replace("&", "&").replace("<", "<").replace(">", ">")


def code_markup(text: str) -> str:
    lines = text.split("\n")
    out = []
    for ln in lines:
        e = esc(content_sanitize(ln))
        stripped = e.lstrip(" ")
        n = len(e) - len(stripped)
        e = " " * n + stripped
        e = re.sub(r"  +", lambda m: " " * len(m.group(0)), e)
        out.append(e if e else " ")
    return "<br/>".join(out)


def safe_keep_together(elements):
    # NEVER nest KeepTogether inside KeepTogether: KT.wrap() returns a 0xffffff
    # sentinel height, and nesting it produces phantom blank pages / broken flow.
    if any(isinstance(el, KeepTogether) for el in elements):
        return list(elements)
    total_h = 0
    for el in elements:
        try:
            _, h = el.wrap(AVAIL_W, AVAIL_H)
        except Exception:
            h = 0
        total_h += h
    if total_h <= MAX_KEEP:
        return [KeepTogether(elements)]
    if len(elements) >= 2:
        return [KeepTogether(elements[:2])] + list(elements[2:])
    return list(elements)


def add_heading(text, style, level=0):
    text = content_sanitize(text)
    key = "h_%s" % hashlib.md5(text.encode()).hexdigest()[:8]
    p = Paragraph('<a name="%s"/><b>%s</b>' % (key, esc(text)), style)
    p.bookmark_name = key
    p.bookmark_level = level
    p.bookmark_text = text
    p.bookmark_key = key
    return p


def embed_image(path, max_w=None, max_h=250):
    if max_w is None:
        max_w = AVAIL_W * 0.94
    im = PILImage.open(path)
    w, h = im.size
    ratio = min(max_w / w, max_h / h)
    return Image(path, width=w * ratio, height=h * ratio)


def build_table(headers, rows, ratios, caption_text):
    width = AVAIL_W * 0.96
    col_widths = [r * width for r in ratios]
    assert sum(col_widths) <= AVAIL_W + 0.5, "table exceeds available width"
    data = [[Paragraph("<b>%s</b>" % esc(content_sanitize(h)), S_TH) for h in headers]]
    for row in rows:
        data.append([Paragraph(esc(content_sanitize(c)), S_TD) for c in row])
    t = Table(data, colWidths=col_widths, hAlign="CENTER", repeatRows=1)
    style = [
        ("BACKGROUND", (0, 0), (-1, 0), HEADER_FILL),
        ("GRID", (0, 0), (-1, -1), 0.5, BORDER),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 7),
        ("RIGHTPADDING", (0, 0), (-1, -1), 7),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]
    for i in range(1, len(data)):
        style.append(("BACKGROUND", (0, i), (-1, i), colors.white if i % 2 == 1 else TABLE_STRIPE))
    t.setStyle(TableStyle(style))
    cap = Paragraph(content_sanitize(caption_text), S_CAPTION)
    return [Spacer(1, 16), t, Spacer(1, 4), cap, Spacer(1, 12)]


def build_code(title, text):
    title_p = Paragraph("<b>%s</b>" % esc(content_sanitize(title)), S_CODE_TITLE)
    body = Paragraph(code_markup(text), S_CODE)
    t = Table([[body]], colWidths=[AVAIL_W * 0.96], hAlign="CENTER")
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), SECTION_BG),
        ("LINEBEFORE", (0, 0), (0, -1), 2, ACCENT),
        ("LEFTPADDING", (0, 0), (-1, -1), 10),
        ("RIGHTPADDING", (0, 0), (-1, -1), 10),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]))
    return safe_keep_together([title_p, t]) + [Spacer(1, 10)]


def build_callouts(items):
    n = len(items)
    col_w = (AVAIL_W * 0.96) / n
    row_big = [Paragraph("<b>%s</b>" % esc(content_sanitize(v)), S_STAT) for v, _ in items]
    row_lab = [Paragraph(esc(content_sanitize(l)), S_STAT_LABEL) for _, l in items]
    t = Table([row_big, row_lab], colWidths=[col_w] * n, hAlign="CENTER")
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), CARD_BG),
        ("BOX", (0, 0), (-1, -1), 0.9, ACCENT),
        ("LINEBEFORE", (1, 0), (-1, -1), 0.5, BORDER),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 0), (-1, 0), 10),
        ("BOTTOMPADDING", (0, 1), (-1, 1), 10),
        ("TOPPADDING", (0, 1), (-1, 1), 2),
        ("BOTTOMPADDING", (0, 0), (-1, 0), 2),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
    ]))
    return [Spacer(1, 8), t, Spacer(1, 14)]


def build_image(path, max_h, caption_text):
    img = embed_image(path, max_h=max_h)
    cap = Paragraph(content_sanitize(caption_text), S_CAPTION)
    return [Spacer(1, 14)] + safe_keep_together([img, cap]) + [Spacer(1, 10)]


def block_to_flowables(block):
    kind = block[0]
    if kind == "para":
        return [Paragraph(content_sanitize(block[1]), S_BODY)]
    if kind == "h2":
        return [add_heading(block[1], S_H2, level=1)]
    if kind == "h3":
        return [Paragraph("<b>%s</b>" % esc(content_sanitize(block[1])), S_H3)]
    if kind == "bullets":
        flows = []
        for item in block[1]:
            flows.append(Paragraph(content_sanitize(item), S_BULLET, bulletText="\u2022"))
        flows.append(Spacer(1, 6))
        return flows
    if kind == "callouts":
        return build_callouts(block[1])
    if kind == "image":
        return build_image(block[1], block[2], block[3])
    if kind == "table":
        return build_table(block[1], block[2], block[3], block[4])
    if kind == "code":
        return build_code(block[1], block[2])
    raise ValueError("unknown block kind: %s" % kind)


# ------------------------------------------------------------------ doc template
class TocDocTemplate(SimpleDocTemplate):
    def handle_pageBegin(self):
        # SimpleDocTemplate force-switches to its own bare 'Later' template
        # after page 1 (losing our header/footer). Keep OUR 'main' template
        # (which carries the page decorations) on every page instead.
        self._handle_pageBegin()

    def afterFlowable(self, flowable):
        if hasattr(flowable, "bookmark_name"):
            level = getattr(flowable, "bookmark_level", 0)
            text = getattr(flowable, "bookmark_text", "")
            key = getattr(flowable, "bookmark_key", "")
            # displayed page number = doc.page - 1 (TOC page is roman 'i')
            self.notify("TOCEntry", (level, text, self.page - 1, key))


def draw_decorations(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(PAGE_BG)
    canvas.rect(-2, -2, PAGE_W + 4, PAGE_H + 4, fill=1, stroke=0)
    # header
    canvas.setFont("FreeSerif-Italic", 7.5)
    canvas.setFillColor(TEXT_MUTED)
    canvas.drawString(MARGIN, PAGE_H - 42, content_sanitize(META["header_title"]))
    canvas.setStrokeColor(ACCENT)
    canvas.setLineWidth(1.2)
    canvas.line(MARGIN, PAGE_H - 50, PAGE_W - MARGIN, PAGE_H - 50)
    # footer
    canvas.setStrokeColor(BORDER)
    canvas.setLineWidth(0.5)
    canvas.line(MARGIN, 46, PAGE_W - MARGIN, 46)
    canvas.setFont("FreeSerif", 7.5)
    canvas.setFillColor(TEXT_MUTED)
    canvas.drawString(MARGIN, 34, content_sanitize(META["author"]))
    label = "i" if doc.page == 1 else str(doc.page - 1)
    canvas.drawRightString(PAGE_W - MARGIN, 34, label)
    canvas.restoreState()


# ------------------------------------------------------------------ story
def make_cs_hero():
    src = os.path.join(CL, "pages", "case-studies.png")
    dst = os.path.join(CL, "cs_hero.jpg")
    if os.path.exists(dst):
        return
    if not os.path.exists(src):
        return
    im = PILImage.open(src)
    im2 = im.crop((0, 0, im.width, min(im.height, 2400)))
    if im2.width > 1400:
        r = 1400 / im2.width
        im2 = im2.resize((1400, int(im2.height * r)), PILImage.LANCZOS)
    im2.convert("RGB").save(dst, "JPEG", quality=85, optimize=True)


def main():
    make_cs_hero()
    doc = TocDocTemplate(
        OUT,
        pagesize=A4,
        leftMargin=MARGIN,
        rightMargin=MARGIN,
        topMargin=0.95 * inch,
        bottomMargin=0.85 * inch,
        title=META["doc_title"],
        author=META["author"],
        creator="Z.ai",
        subject="Design and motion audit of studio.tanguson.com benchmarked against wearecollins.com (COLLINS)",
    )
    frame = Frame(MARGIN, doc.bottomMargin, doc.width, doc.height, id="normal")
    doc.addPageTemplates([PageTemplate(id="main", frames=[frame], onPage=draw_decorations)])

    story = []
    # ---- TOC page (front matter, roman 'i')
    story.append(Paragraph("<b>Table of Contents</b>", S_TOC_TITLE))
    story.append(HRFlowable(width="100%", thickness=1.2, color=ACCENT, spaceBefore=0, spaceAfter=12))
    toc = TableOfContents()
    toc.levelStyles = [S_TOC0, S_TOC1]
    story.append(toc)
    story.append(PageBreak())

    h1_threshold = AVAIL_H * 0.25
    for ch in CHAPTERS:
        num = ch["num"]
        title = ch["title"] if num is None else "%d.  %s" % (num, ch["title"])
        h1 = add_heading(title, S_H1, level=0)
        hr = HRFlowable(width="100%", thickness=1.2, color=ACCENT, spaceBefore=2, spaceAfter=12)
        flows = []
        pending_h2 = None
        for block in ch["blocks"]:
            f = block_to_flowables(block)
            if block[0] == "h2":
                pending_h2 = f[0]
                continue
            if pending_h2 is not None and f:
                if isinstance(f[0], (Spacer, KeepTogether)):
                    # never merge an h2 into a block that starts with a
                    # KeepTogether (would nest KTs); emit h2 standalone.
                    flows.append(pending_h2)
                    flows.extend(f)
                else:
                    flows.extend(safe_keep_together([pending_h2, f[0]]))
                    flows.extend(f[1:])
                pending_h2 = None
            else:
                if pending_h2 is not None:
                    flows.append(pending_h2)
                    pending_h2 = None
                flows.extend(f)
        if pending_h2 is not None:
            flows.append(pending_h2)

        head_group = [h1, hr]
        body = flows
        # Never nest KeepTogether inside KeepTogether (KT.wrap returns a 0xffffff
        # sentinel height; nesting it produces phantom blank pages).
        first = body[0] if body else None
        if first is not None and not isinstance(first, (Spacer, KeepTogether)):
            head = safe_keep_together(head_group + [first])
            rest = body[1:]
        else:
            head = safe_keep_together(head_group)
            rest = body
        story.append(CondPageBreak(h1_threshold))
        story.append(Spacer(1, 10))
        story.extend(head)
        story.extend(rest)
        story.append(Spacer(1, 14))

    doc.multiBuild(story)
    print("body written:", OUT, os.path.getsize(OUT), "bytes")


if __name__ == "__main__":
    main()
