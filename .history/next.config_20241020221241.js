/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['firebasestorage.googleapis.com', 'images.pexels.com', /* ... */],
    formats: ['image/avif', 'image/webp'],
  },
  i18n: {
    locales: ['en', 'de'],
    defaultLocale: 'en'
  }
};

module.exports = nextConfig;