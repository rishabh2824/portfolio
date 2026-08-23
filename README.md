# 3D Portfolio

A developer portfolio built with Next.js, React, TypeScript, Tailwind CSS, GSAP, Motion, and Spline. It includes an interactive 3D keyboard, smooth scroll-driven animations, theme switching, project details, and a resume page.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/rishabh2824/portfolio)

## Features

- Interactive 3D keyboard with skill keycaps
- GSAP and Motion animations
- Particle background and decorative cursor effects
- Light and dark mode
- Responsive layout
- Project detail dialogs
- Resume page

## Tech Stack

| Layer | Technologies |
|---|---|
| Framework | Next.js 16, React 19, TypeScript |
| Styling | Tailwind CSS, Shadcn UI, Aceternity UI |
| Animation | GSAP, Motion |
| 3D | Spline Runtime |
| Misc | next-themes |

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm

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

3. Run the development server:

   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

## Customization

Most personal information is centralized in [`src/data/config.ts`](src/data/config.ts):

```ts
const config = {
  title: "Your Name | Your Title",
  description: {
    long: "Your long description for SEO...",
    short: "Your short description...",
  },
  author: "Your Name",
  role: "Your Title",
  site: "https://yoursite.com",
  social: {
    linkedin: "https://linkedin.com/in/you",
    github: "https://github.com/you",
  },
};
```

`site` must be your real production domain before you deploy — it's used to
build the absolute URLs in `metadataBase`, `robots.ts`, and `sitemap.ts`
(social previews and search engines both need absolute, not relative, URLs).

Other files you may want to customize:

| File | What to change |
|---|---|
| `src/data/projects.tsx` | Project tiles — title, category, screenshot, links. The `id` of each entry must have a matching key in `src/data/project-details.tsx` |
| `src/data/project-details.tsx` | Per-project tech stack and write-up shown in the modal |
| `src/data/constants.ts` | Work experience and the skills shown on the experience timeline |
| `src/data/keyboard-skills.ts` | The keycap-only skills that appear exclusively on the 3D keyboard |
| `public/assets/` | Project screenshots, logos, and skill icons |

## Updating The 3D Keyboard Skills

The 3D keyboard scene is hosted on Spline's CDN (see the `scene` prop in
[`src/components/animated-background-scene.tsx`](src/components/animated-background-scene.tsx)),
not loaded from a local file. To update the skills displayed on the keyboard:

1. Open the scene in [Spline](https://spline.design/) (get edit access to the
   hosted project, or start from your own scene and update the `scene` URL).
2. Unhide the keycap objects you want to edit and update their logo images.
3. Rename each keycap object to match a `SkillNames` enum value in
   `src/data/constants.ts`.
4. Hide the keycap objects again and re-publish the scene.

Then make sure every keycap name has a matching entry in either
`EXPERIENCE_SKILLS` (`src/data/constants.ts`, for skills also shown on the
experience timeline) or `KEYBOARD_ONLY_SKILLS` (`src/data/keyboard-skills.ts`,
for skills that only appear on the keyboard) — the two are merged into the
`SKILLS` lookup that `animated-background-scene.tsx` resolves clicked/hovered
keycaps against:

```ts
// src/data/constants.ts
export const EXPERIENCE_SKILLS: Partial<Record<SkillNames, Skill>> = {
  [SkillNames.JS]: { name: "js", label: "JavaScript", shortDescription: "...", icon: "..." },
};
```

The `SkillNames` enum, the two skill records, and the Spline keycap names must stay in sync.

## Deployment

This site is ready for Vercel deployment:

1. Push your code to GitHub.
2. Connect the repository to [Vercel](https://vercel.com).
3. Deploy.

## License

This project is open source and available under the [MIT License](LICENSE).
