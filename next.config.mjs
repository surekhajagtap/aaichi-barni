/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // src/lib/db.ts reads its JSON through path.join(process.cwd(), ...), which
    // Next cannot follow statically, so the data directory would be left out of
    // the serverless bundle and every read would fail with ENOENT in production.
    outputFileTracingIncludes: {
      "/api/**": ["./data/**"],
      "/shop/**": ["./data/**"],
      "/": ["./data/**"],
    },
  },
};

export default nextConfig;
