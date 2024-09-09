/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['firebasestorage.googleapis.com', 'images.pexels.com','tiens.com.tr', 'img.freepik.com', 'obsjtmm.jtmm.com','encrypted-tbn0.gstatic.com'],
  },
};

module.exports = nextConfig;
