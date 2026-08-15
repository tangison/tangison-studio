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
/services
/studio
/work
/work/[slug]
```

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
