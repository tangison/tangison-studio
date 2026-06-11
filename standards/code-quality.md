# Code Quality Standards

**Author:** Tangi Iigonda | Tangison  
**Watermark:** Tangison Studio — tangison.com

---

## TypeScript

- Strict mode enabled — no `any` unless explicitly justified with a comment
- All functions have explicit return types on public APIs
- All props/interfaces defined as named types (not inline)
- Enums for fixed value sets, union types for open sets
- Barrel exports (`index.ts`) for every module directory

## React

- Server Components by default — only add `'use client'` when interactivity is required
- Colocate components: `component.tsx` + `component.test.tsx` in same directory
- One component per file — no compound components in a single file
- Props interface named `[Component]Props`
- Custom hooks in `hooks/` directory, prefixed with `use`
- State management: Zustand for global, React state for local, URL state for filters/pagination

## File Structure

```
src/
├── app/           ← Next.js App Router pages
├── components/    ← Shared UI components
│   └── ui/        ← shadcn/ui primitives
├── hooks/         ← Custom React hooks
├── lib/           ← Utilities, configs, constants
├── types/         ← Shared TypeScript types
└── actions/       ← Server actions
```

## Naming

- Files: `kebab-case.tsx` for components, `kebab-case.ts` for utilities
- Components: `PascalCase` exports
- Functions: `camelCase`
- Constants: `UPPER_SNAKE_CASE` for true constants, `camelCase` for config objects
- CSS classes: Tailwind utility classes only, no custom class names unless design tokens

## Imports

- Absolute imports using `@/` prefix
- Import order: React/Next → external packages → internal modules → types
- No `import *` — named imports only

## Error Handling

- Never swallow errors silently
- All async functions wrapped in try/catch
- Error boundaries at layout level
- User-facing errors: friendly message + error code
- Developer errors: full stack trace in development, sanitized in production

## Performance

- Dynamic imports for code splitting on heavy components
- `loading.tsx` for route-level suspense
- Image optimization via `next/image` — always with width, height, and alt
- Font optimization via `next/font` — always with `display: 'swap'`
- No layout shift — reserve space for dynamic content

<!-- Tangison Studio — tangison.com -->
