#!/usr/bin/env node
// Cross-platform stand-in for the shell fallback `${VITE_CONVEX_URL:-$NEXT_PUBLIC_CONVEX_URL}`
// from @convex-dev/static-hosting's Next.js integration notes — that syntax is
// POSIX-only and breaks under Windows' cmd.exe, which runs npm/pnpm scripts here.
// VITE_CONVEX_URL is set by the static-hosting CLI when it drives the build;
// NEXT_PUBLIC_CONVEX_URL is whatever's already in the environment (e.g. from
// .env.local) for a plain `next build` run outside that CLI.
import { spawnSync } from "node:child_process";

process.env.NEXT_PUBLIC_CONVEX_URL =
  process.env.VITE_CONVEX_URL || process.env.NEXT_PUBLIC_CONVEX_URL || "";

const result = spawnSync("next", ["build"], {
  stdio: "inherit",
  shell: true,
  env: process.env,
});

process.exit(result.status ?? 1);
