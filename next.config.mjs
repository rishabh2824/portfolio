/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 1. Activated the React Compiler for auto-memoization
  reactCompiler: true,

  pageExtensions: ["js", "jsx", "ts", "tsx"],
  // Static export for Convex static-hosting: no Next.js server at runtime,
  // so `headers()`/middleware/API routes aren't available (headers() was
  // removed — see the deploy notes for the security-header tradeoff), and
  // next/image needs its optimizer disabled since there's no server to run it.
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
