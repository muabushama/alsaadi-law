/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  // Hostinger Node images ship an older glibc than native Next SWC needs.
  experimental: {
    useWasmBinary: true,
  },
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
