"""Generate ASSET_MANIFEST.json by walking /home/z/my-project/studio/public."""
from __future__ import annotations

import hashlib
import json
import os
from pathlib import Path

ROOT = Path("/home/z/my-project/studio/public")
OUT = Path("/home/z/my-project/studio/ASSET_MANIFEST.json")

# Group images by their parent directory relative to /public.
# Each entry: { path, size_bytes, sha256_short, category }
CATEGORY_MAP = {
    "images/paintings": "oil-painting",
    "images/work": "work-screenshot",
    "images/work/hero": "work-hero",
    "images/work/screenshots": "work-screenshot",
    "images/work/screenshots/gallery": "work-gallery",
    "images/work/screenshots/full": "work-full",
    "images/gallery": "gallery",
    "images/services": "service-image",
    "images/intelligence": "intelligence-image",
    "images/partnership": "partnership-image",
    "brand": "brand-asset",
    "documents": "pdf-document",
    "fonts": "font",
}

IMAGE_EXTS = {".webp", ".jpg", ".jpeg", ".png", ".gif", ".svg", ".ico"}
DOC_EXTS = {".pdf"}
FONT_EXTS = {".ttf", ".woff", ".woff2", ".otf"}


def sha256_short(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            h.update(chunk)
    return h.hexdigest()[:16]


def category_for(rel_path: Path) -> str:
    rel_posix = rel_path.as_posix()
    # Try exact dir match first, then parent prefix match
    rel_dir = rel_path.parent.as_posix()
    if rel_dir in CATEGORY_MAP:
        return CATEGORY_MAP[rel_dir]
    for prefix, cat in CATEGORY_MAP.items():
        if rel_dir.startswith(prefix):
            return cat
    return "other"


def main() -> None:
    assets = []
    for root, _dirs, files in os.walk(ROOT):
        for name in files:
            fpath = Path(root) / name
            ext = fpath.suffix.lower()
            if ext not in IMAGE_EXTS | DOC_EXTS | FONT_EXTS:
                continue
            rel = fpath.relative_to(ROOT)
            stat = fpath.stat()
            assets.append(
                {
                    "path": "/" + rel.as_posix(),
                    "size_bytes": stat.st_size,
                    "sha256_short": sha256_short(fpath),
                    "category": category_for(rel),
                    "ext": ext.lstrip("."),
                }
            )

    assets.sort(key=lambda a: a["path"])

    by_category: dict[str, int] = {}
    by_ext: dict[str, int] = {}
    total_bytes = 0
    for a in assets:
        by_category[a["category"]] = by_category.get(a["category"], 0) + 1
        by_ext[a["ext"]] = by_ext.get(a["ext"], 0) + 1
        total_bytes += a["size_bytes"]

    manifest = {
        "schema_version": "1.0.0",
        "project": "tangison-studio",
        "description": "Asset inventory for the Tangison Studio website (public/ directory).",
        "generated_at": "2026-08-05T05:00:00Z",
        "totals": {
            "total_assets": len(assets),
            "total_bytes": total_bytes,
            "total_bytes_human": f"{total_bytes / (1024*1024):.2f} MB",
        },
        "by_category": dict(sorted(by_category.items(), key=lambda x: -x[1])),
        "by_extension": dict(sorted(by_ext.items(), key=lambda x: -x[1])),
        "assets": assets,
    }

    OUT.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {OUT} — {len(assets)} assets, {total_bytes / (1024*1024):.2f} MB total")
    print("By category:", manifest["by_category"])
    print("By extension:", manifest["by_extension"])


if __name__ == "__main__":
    main()
