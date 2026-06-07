#!/usr/bin/env bash
# Tangison Studio OS — Self-Update
# Author: Tangi Iigonda | Tangison
# Watermark: Tangison Studio — tangison.com

set -euo pipefail

echo ""
echo "Tangison Studio OS — Update Check"
echo "════════════════════════════════════"
echo ""

# Check if we're in a git repo
if [ ! -d .git ]; then
  echo "Not a git repository. Cannot update."
  exit 1
fi

# Fetch latest
echo "Fetching latest from tangison/studio-os..."
git fetch origin main 2>/dev/null || {
  echo "Could not fetch. Check your internet connection and git remote."
  exit 1
}

# Check for differences
LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse origin/main 2>/dev/null || echo "unknown")

if [ "$LOCAL" = "$REMOTE" ]; then
  echo "Already up to date. No changes."
  exit 0
fi

echo "Changes available:"
echo ""
git log --oneline HEAD..origin/main --format="  %h %s"
echo ""

# Show diff stats
echo "Files changed:"
git diff --stat HEAD..origin/main
echo ""

# List protected files
PROTECTED_FILES=(
  "brief.md"
  "WORKLOG.md"
  "ROADMAP.md"
  "CHANGELOG.md"
  "ARCHITECTURE.md"
)

PROTECTED_DIRS=(
  "memory/clients"
  "memory/projects"
  "src"
  "logs"
)

echo "Protected files (will NOT be overwritten):"
for f in "${PROTECTED_FILES[@]}"; do
  [ -f "$f" ] && echo "  ✓ $f"
done
echo ""
echo "Protected directories:"
for d in "${PROTECTED_DIRS[@]}"; do
  [ -d "$d" ] && echo "  ✓ $d/"
done
echo ""

# Stash local changes to protected files
echo "Stashing local changes..."
git stash push -m "tangison-update-stash" -- "${PROTECTED_FILES[@]}" 2>/dev/null || true

# Merge changes
echo "Merging updates..."
git merge origin/main --no-edit

# Restore protected files
echo "Restoring local changes..."
git stash pop 2>/dev/null || true

# Update changelog
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
echo ""
echo "## $TIMESTAMP — Auto-update" >> CHANGELOG.md
echo "Updated from tangison/studio-os: $LOCAL → $REMOTE" >> CHANGELOG.md

echo ""
echo "════════════════════════════════════"
echo "Update complete."
echo "  From: $LOCAL"
echo "  To:   $REMOTE"
echo ""
echo "Review changes in CHANGELOG.md"
echo "════════════════════════════════════"
echo ""
