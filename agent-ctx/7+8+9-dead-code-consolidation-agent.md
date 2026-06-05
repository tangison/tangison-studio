# Task 7+8+9 — Dead Code & Consolidation Agent

## Summary
Removed unused imports, dead variables, misleading ARIA attributes, and consolidated all inline keyframes to globals.css.

## Changes Made

### 1. bento-grid.tsx — Removed unused `Activity` import
- Removed `Activity` from lucide-react import line

### 2. narrative.tsx — Removed unused `isInView` and `useInView`
- Deleted `const isInView = useInView(...)` (never used in JSX)
- Changed import from `{ motion, useInView }` to `{ motion }`

### 3. systems-showcase.tsx — Removed unused `isInView`, `useInView`, `useEffect`
- Deleted `const isInView = useInView(...)` (never used in JSX)
- Changed import from `{ motion, useInView }` to `{ motion }`
- Changed import from `React, { useEffect, useRef }` to `React, { useRef }` (no useEffect in component)

### 4. intelligence/page-client.tsx — Fixed IntelModuleCard
- Removed `isExpanded` state and all associated handlers/attributes (no expandable content exists)
- Removed `role="button"`, `tabIndex`, `aria-expanded`, `onClick`, `onKeyDown`
- Changed `bg-[#0A0B0C]` to `bg-terminal-black` (semantic token)
- Removed `cursor-pointer`
- Removed `useState` from React import
- Removed unused `useInView` from framer-motion import

### 5. Inline keyframes consolidated to globals.css
- hero.tsx: `scroll-pulse` → globals.css
- contact/page-client.tsx: `signal-ring-expand` → globals.css
- loading.tsx: `breathe-glow`, `breathe-glow-bg`, `text-cycle` → globals.css (signal-travel already in globals.css)
- All 5 `<style>` blocks removed from components

## Verification
- `bun run lint` passes with zero errors
