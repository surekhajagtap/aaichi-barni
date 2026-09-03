/**
 * GitHub Pages is static hosting, so the site is exported as plain files.
 *
 * Consequences, all deliberate:
 *  - No API routes. There is no server to run them on.
 *  - Products are read from data/db.seed.json at build time and baked into the
 *    HTML, which is why file tracing is no longer needed.
 *  - Orders are posted straight from the browser to a hosted form endpoint.
 *
 * Pages serves the site under /<repo>/, so every asset and link needs that
 * prefix. It is set from the workflow at build time and left empty locally.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  // Pages has no image optimiser. The site uses inline SVG, so nothing is lost.
  images: { unoptimized: true },
  // Export each route as a directory with index.html so deep links survive a refresh.
  trailingSlash: true,
};

export default nextConfig;
