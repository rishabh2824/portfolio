#!/usr/bin/env node
// Converts project screenshots to WebP.
//
// `output: "export"` in next.config.mjs forces `images.unoptimized`, so
// next/image ships whatever bytes are in public/ untouched — a 3 MB PNG
// screenshot is downloaded in full the moment a visitor opens that project's
// modal. Screenshots are flat UI captures, so WebP at q82 is visually
// indistinguishable while typically cutting 80-95% of the payload.
//
// Re-run after adding screenshots:  node scripts/optimize-images.mjs
// Originals are left in place; delete them once references are updated.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const dir = path.resolve("public/assets/projects-screenshots");

const targets = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(png|jpe?g)$/i.test(e.name)) targets.push(p);
  }
})(dir);

let before = 0;
let after = 0;
const rows = [];

for (const src of targets) {
  const out = src.replace(/\.(png|jpe?g)$/i, ".webp");
  const inSize = fs.statSync(src).size;
  await sharp(src).webp({ quality: 82, effort: 6 }).toFile(out);
  const outSize = fs.statSync(out).size;
  before += inSize;
  after += outSize;
  rows.push({
    file: path.relative(dir, src).split(path.sep).join("/"),
    kb: (inSize / 1024).toFixed(0),
    webpKb: (outSize / 1024).toFixed(0),
    saved: `${(100 - (outSize / inSize) * 100).toFixed(0)}%`,
  });
}

rows.sort((a, b) => Number(b.kb) - Number(a.kb));
for (const r of rows) {
  console.log(
    `${r.kb.padStart(6)} KB -> ${r.webpKb.padStart(5)} KB  (-${r.saved.padStart(3)})  ${r.file}`,
  );
}
console.log(
  `\nTOTAL: ${(before / 1024 / 1024).toFixed(2)} MB -> ${(after / 1024 / 1024).toFixed(2)} MB ` +
    `(saved ${((before - after) / 1024 / 1024).toFixed(2)} MB, -${(100 - (after / before) * 100).toFixed(0)}%)`,
);
