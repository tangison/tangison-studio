# Tangison Studio

Creative digital agency site for the studio arm of Tangison Technologies.

**Live:** [studio.tangison.com](https://studio.tangison.com)  
**Status:** Production site  
**Visibility:** Public

## What this is

The studio property. Presents services, process, work case studies, a blog, careers and the studio legal pack. All imagery is a single commissioned painted style held under `public/images/paintings`.

## Stack

- Next.js (App Router)
- TypeScript
- Framer Motion
- lucide-react icons
- Astryx design system

## Getting started

```bash
git clone https://github.com/tangison/tangison-studio.git
cd tangison-studio
npm install
npm run dev
```

The dev server runs on http://localhost:3000.

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Start the development server. |
| `npm run build` | Production build. |
| `npm run start` | Serve the production build. |
| `npm run lint` | Run ESLint. |
| `npm run typecheck` | Run the TypeScript compiler with no emit. |
| `npm run test` | Run the test suite. |
| `npm run audit` | Run the in-repo audit checks. |
| `npm run agent:audit` | Run the agent-driven audit pass. |
| `npm run astryx` | Astryx design system CLI. |

## Routes

18 page routes.

```
/
/about
/blog
/blog/[slug]
/brand
/careers
/contact
/faq
/legal/cookies
/legal/privacy
/legal/terms
/partnership
/process
/resources
/resources/[slug]
/services
/studio
/work
/work/[slug]
```

## Resources library

`/resources` is a 20-guide library backed by `src/lib/resources.ts`. There is no CMS and no
markdown loader: the data lives in that one typed file and both routes read from it.

- `resources` — the array. Each entry carries `accent`, `accentInk` and `motif`, which
  together give every guide its own visual identity on a shared template. `accent` is for
  large decorative use only; `accentInk` is the AA-passing variant and is the only one that
  may sit under text.
- `sections[]` is polymorphic. A section may carry any of `heading`, `body[]`,
  `steps[]`, `checks[]`, `table{}` or `callout`. The detail route branches on which keys are
  present, so adding a section type means editing both `ResourceSection` and the `Section`
  renderer in `src/app/resources/[slug]/page.tsx`.
- Covers live in `public/images/paintings/resources/`. Regenerate with
  `python3 /home/user/phase6/gen_resource_paintings.py`. That script reuses the canonical
  `MASTER` and `NEGATIVE` prompt constants from `scripts/generate-unique-paintings.ts`;
  do not hand-write a replacement style string, it drifts to photorealism.

Adding a resource: append to `resources`, add its cover, and point three existing entries'
`related` arrays at it. The sitemap picks it up automatically.

## Environment

Copy `.env.example` to `.env.local` and fill in the values. Never commit a populated env file.

## Deployment

Deployed on Vercel. Production domains:

- `studio.tangison.com`

## Maintainer

Built and maintained by **Tangison Technologies**, Windhoek, Namibia.

| | |
|---|---|
| Studio line | [+264 85 341 1522](tel:+264853411522) (`0853411522`) |
| Email | studio@tangison.com |
| Web | https://tangison.com |

## Licence

Proprietary. Copyright Tangison Technologies. All rights reserved.
