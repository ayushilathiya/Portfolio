/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  webpack: (config, { dev }) => {
    // Prevent corrupt cache on Windows dev (invalid stored block lengths / ENOENT renames)
    if (dev) {
      config.cache = false;
    }
    return config;
  },
};

module.exports = nextConfig;
