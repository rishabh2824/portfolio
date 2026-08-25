# 3D Portfolio

A developer portfolio built with Next.js, React, TypeScript, Tailwind CSS, GSAP, Motion, and Spline. It includes an interactive 3D keyboard, smooth scroll-driven animations, project detail dialogs, and a resume page — statically exported and served by Convex.

## Features

- Interactive 3D keyboard with skill keycaps (Spline)
- GSAP and Motion animations, including scroll-triggered reveals
- Particle background, adaptive to device performance
- Project detail dialogs with tech-stack pills and screenshot carousels
- Resume page with an embedded, downloadable PDF
- Nyan Cat easter egg

## Tech Stack

| Layer | Technologies |
|---|---|
| Framework | Next.js 16 (static export), React 19, TypeScript |
| Styling | Tailwind CSS, Shadcn UI, Aceternity UI |
| Animation | GSAP, Motion |
| 3D | Spline Runtime |
| Carousel | Embla Carousel |
| Backend / Hosting | Convex, `@convex-dev/static-hosting` |
| Analytics | Google Analytics (`@next/third-parties`), optional |
| Tooling | pnpm, Biome (lint/format), ESLint (`eslint-plugin-react-hooks`) |

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm
- A [Convex](https://convex.dev) account (free tier is enough)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/rishabh2824/portfolio.git
   cd portfolio
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

   This also applies the patch in `patches/` — see [Dependency patch](#dependency-patch) below.

3. Link a Convex deployment (creates `.env.local` with `CONVEX_DEPLOYMENT`, `NEXT_PUBLIC_CONVEX_URL`, and `NEXT_PUBLIC_CONVEX_SITE_URL`):

   ```bash
   npx convex dev --once
   ```

4. Run the dev server:

   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000).

Optional: set `NEXT_PUBLIC_GA_ID` in `.env.local` to enable Google Analytics — it's skipped entirely if unset.

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start the Next.js dev server |
| `pnpm build` | Static-export the site to `out/` (`next build` under the hood) |
| `pnpm start` | Serve the built `out/` folder locally, for a pre-deploy sanity check |
| `pnpm run deploy` | Upload `out/` to the Convex static-hosting deployment |
| `pnpm lint` | Biome lint |
| `pnpm run lint:react` | ESLint (React Hooks / Compiler rules) |
| `pnpm run format` | Biome format, writes changes |
| `pnpm run format:check` | Biome format, check only |

## Deployment

This project deploys to [Convex static hosting](https://github.com/get-convex/static-hosting), not Vercel — `next.config.mjs` sets `output: "export"` specifically so the whole site can ship as static files with no Next.js server at runtime.

```bash
pnpm run build && pnpm run deploy
```

Always run both together: `deploy` only uploads whatever is currently in `out/`, it does not build first.

The custom domain sits behind Cloudflare. Non-hashed static files (e.g. `Resume.pdf`, `robots.txt`, `sitemap.xml`) can get cached at Cloudflare's edge past what the origin's own `Cache-Control` intends — after deploying a change to one of those, purge it in the Cloudflare dashboard (Caching → Configuration → Purge Everything, or a custom purge for the specific URL) if it doesn't show up right away.

### Dependency patch

`patches/@convex-dev__static-hosting.patch` (applied automatically via `pnpm-workspace.yaml`'s `patchedDependencies`) adds `.pdf` to the package's MIME type table. Upstream doesn't map it, so `Resume.pdf` was served as `application/octet-stream` — browsers can't render that inline, so they silently downloaded the file instead of showing it on `/resume`. Drop the patch once upstream ships a fix.

### Project screenshots

Screenshot masters live in `assets-src/`, not `public/` — see [assets-src/README.md](assets-src/README.md). Only the optimized WebP output is deployed; `output: "export"` disables Next's image optimizer, so anything left in `public/` ships to visitors byte-for-byte.
