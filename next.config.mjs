/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
  },
  // Hostinger's glibc is older than native Next SWC; skip on Windows where native works.
  ...(process.platform === "linux"
    ? { experimental: { useWasmBinary: true } }
    : {}),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
