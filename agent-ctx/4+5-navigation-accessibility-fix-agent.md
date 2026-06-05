# Task 4+5: Navigation & Accessibility Fix Agent

## Summary
Replaced internal `<a>` tags with Next.js `<Link>` components and added keyboard accessibility to architecture layer expandables.

## Changes Made

### 1. hero.tsx
- Added `import Link from "next/link"`
- `<a href="/contact">` → `<Link href="/contact">` 
- `<a href="/manifesto">` → `<Link href="/manifesto">`
- All className, children, and icons preserved exactly

### 2. cta.tsx
- Added `import Link from "next/link"`
- `<a href="/contact">` → `<Link href="/contact">`
- All className and children preserved exactly

### 3. page-client.tsx (Architecture)
- Added `role="button"` for semantic role
- Added `tabIndex={0}` for keyboard focusability
- Added `aria-expanded` for state communication
- Added `aria-label` for screen reader description
- Added `onKeyDown` handler for Enter/Space key toggling

## Verification
- `bun run lint` passes clean with zero errors
