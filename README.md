# 3D Portfolio

A developer portfolio built with Next.js, React, TypeScript, Tailwind CSS, GSAP, Motion, and Spline. It includes an interactive 3D keyboard, smooth scroll-driven animations, theme switching, project details, a resume page, and a Resend-powered contact form.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Naresh-Khatri/3d-portfolio)

![Portfolio Preview](https://github.com/Naresh-Khatri/Portfolio/blob/main/public/assets/projects-screenshots/portfolio/landing.png?raw=true)

## Features

- Interactive 3D keyboard with skill keycaps
- GSAP and Motion animations
- Particle background and decorative cursor effects
- Light and dark mode
- Responsive layout
- Project detail dialogs
- Resume page
- Contact form with Resend email delivery

## Tech Stack

| Layer | Technologies |
|---|---|
| Framework | Next.js 16, React 19, TypeScript |
| Styling | Tailwind CSS, Shadcn UI, Aceternity UI |
| Animation | GSAP, Motion |
| 3D | Spline Runtime |
| Email | Resend |
| Misc | Lenis, Zod, next-themes |

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Naresh-Khatri/3d-portfolio.git
   cd 3d-portfolio
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:

   Copy `.env.example` to `.env.local` and fill in the values:

   ```bash
   cp .env.example .env.local
   ```

   | Variable | Required | Description |
   |---|---|---|
   | `RESEND_API_KEY` | Yes | API key from [Resend](https://resend.com) for the contact form |

4. Run the development server:

   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000).

## Customization

Most personal information is centralized in [`src/data/config.ts`](src/data/config.ts):

```ts
const config = {
  title: "Your Name | Your Title",
  description: {
    long: "Your long description for SEO...",
    short: "Your short description...",
  },
  keywords: ["your", "keywords"],
  author: "Your Name",
  email: "you@example.com",
  site: "https://yoursite.com",
  githubUsername: "your-github-username",
  githubRepo: "your-repo-name",
  social: {
    twitter: "https://x.com/you",
    linkedin: "https://linkedin.com/in/you",
    instagram: "https://instagram.com/you",
    facebook: "https://facebook.com/you",
    github: "https://github.com/you",
  },
};
```

Other files you may want to customize:

| File | What to change |
|---|---|
| `src/data/projects.tsx` | Projects, screenshots, descriptions, and tech stacks |
| `src/data/constants.ts` | Skills list and work experience |
| `public/assets/` | Images, OG image, and project screenshots |

## Updating The 3D Keyboard Skills

The 3D keyboard keycaps are baked into a Spline file. To update the skills displayed on the keyboard:

1. Import `public/assets/skills-keyboard.spline` into [Spline](https://spline.design/).
2. Unhide the keycap objects you want to edit.
3. Update the logo images on each keycap.
4. Rename each keycap object to match the skill `name` field in `src/data/constants.ts`.
5. Hide all keycap objects again.
6. Export the scene and overwrite `public/assets/skills-keyboard.spline`.

After updating the Spline file, make sure `src/data/constants.ts` has matching entries for every skill on the keyboard:

```ts
export const SKILLS: Record<SkillNames, Skill> = {
  js: { name: "js", label: "JavaScript", shortDescription: "...", ... },
  react: { name: "react", label: "React", shortDescription: "...", ... },
};
```

The `SkillNames` enum, `SKILLS` record, and Spline keycap names must stay in sync.

## Deployment

This site is ready for Vercel deployment:

1. Push your code to GitHub.
2. Connect the repository to [Vercel](https://vercel.com).
3. Add `RESEND_API_KEY` in the Vercel dashboard.
4. Deploy.

## License

This project is open source and available under the [MIT License](LICENSE).
