#!/usr/bin/env bash
# Tangison Studio OS — First-Time Setup
# Author: Tangi Iigonda | Tangison
# Watermark: Tangison Studio — tangison.com

set -euo pipefail

echo ""
echo "╔══════════════════════════════════════════╗"
echo "║        TANGISON STUDIO OS — SETUP        ║"
echo "╚══════════════════════════════════════════╝"
echo ""

# Check for required tools
check_tool() {
  if command -v "$1" &> /dev/null; then
    echo "  ✓ $1 ($(command -v "$1"))"
    return 0
  else
    echo "  ✗ $1 — NOT FOUND"
    return 1
  fi
}

echo "Checking required tools..."
TOOLS_OK=true
for tool in git node bun; do
  if ! check_tool "$tool"; then
    TOOLS_OK=false
  fi
done

if [ "$TOOLS_OK" = false ]; then
  echo ""
  echo "Missing required tools. Install them first:"
  echo "  git: https://git-scm.com"
  echo "  node: https://nodejs.org"
  echo "  bun: https://bun.sh"
  exit 1
fi

echo ""

# Create directories if they don't exist
echo "Creating directory structure..."
mkdir -p memory/clients
mkdir -p memory/projects
mkdir -p skills/local
mkdir -p logs
mkdir -p specs
mkdir -p src
echo "  ✓ Directories ready"

# Initialize git if not already
if [ ! -d .git ]; then
  echo ""
  echo "Initializing git repository..."
  git init
  git add .
  git commit -m "feat: initialize Tangison Studio OS — Tangison Studio"
  echo "  ✓ Git initialized"
fi

# Install default skills
echo ""
echo "Installing default skills..."
if command -v npx &> /dev/null; then
  npx skills add obra/superpowers --dir skills/local/ 2>/dev/null && echo "  ✓ obra/superpowers installed" || echo "  ⚠ obra/superpowers — install manually with: npx skills add obra/superpowers --dir skills/local/"
else
  echo "  ⚠ npx not available — install skills manually after setup"
fi

# Create .gitignore
echo ""
echo "Creating .gitignore..."
cat > .gitignore << 'GITIGNORE'
# Dependencies
node_modules/
.pnp/
.pnp.js

# Build
.next/
out/
dist/
build/

# Environment
.env
.env.local
.env.production
.env.staging

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Debug
npm-debug.log*
bun-debug.log*

# Cache
.cache/
.parcel-cache/
.eslintcache/

# Database
*.db
*.db-journal
prisma/migrations/migration_lock.toml

# Logs
logs/*.log
!logs/.gitkeep

# Temp
tmp/
temp/
GITIGNORE
echo "  ✓ .gitignore created"

# Remind about brief.md
echo ""
echo "═══════════════════════════════════════════"
echo ""
echo "Setup complete. Next steps:"
echo ""
echo "  1. Fill in brief.md — just 4 lines:"
echo "     Client, Industry, Goal, Specifics"
echo ""
echo "  2. Start your first session:"
echo "     Say: Tangison"
echo ""
echo "  ═══════════════════════════════════════"
echo "  Tangison Studio — tangison.com"
echo "  ═══════════════════════════════════════"
echo ""
