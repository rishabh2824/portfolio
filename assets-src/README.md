# Image masters

Original, lossless project screenshots (PNG/JPEG).

These are **not** served. `next.config.mjs` uses `output: "export"`, which forces
`images.unoptimized` — anything left under `public/` is shipped to visitors
byte-for-byte, so a 3 MB PNG screenshot would be downloaded in full the moment
someone opens that project's modal. Only the WebP derivatives live under
`public/assets/projects-screenshots/`.

Keeping the masters here means the lossy WebPs can always be regenerated at a
different quality, or re-exported to another format later, without re-taking
screenshots.

## Workflow

1. Drop a new screenshot master in the matching folder here.
2. Copy it into `public/assets/projects-screenshots/<project>/` temporarily.
3. Run the converter:

   ```bash
   node scripts/optimize-images.mjs
   ```

4. Reference the generated `.webp` from `src/data/projects.tsx` (tile image) or
   `src/data/project-details.tsx` (modal slideshow).
5. Move the master back here so only the `.webp` remains under `public/`.

`solarRacing/carousel4.jpg` is deliberately still served as JPEG — it is already
well compressed, and WebP came out ~5% larger.
