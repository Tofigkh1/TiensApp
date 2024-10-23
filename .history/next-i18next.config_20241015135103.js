// next.config.js
const { i18n } = require('./next-i18next.config'); // Doğru yolu kontrol edin
const dotenv = require('dotenv');

// Ortam değişkenlerini yükleyin
dotenv.config({ path: `./env.${process.env.NODE_ENV}` });

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'firebasestorage.googleapis.com',
      'images.pexels.com',
      'tiens.com.tr',
      'img.freepik.com',
      'obsjtmm.jtmm.com',
      'encrypted-tbn0.gstatic.com',
      'w0.peakpx.com',
      'www.tianshi.az',
      'www.tiens-so.com',
      'strgimgr.umico.az',
    ],
    formats: ['image/avif', 'image/webp'],
  },
  i18n, // i18n yapılandırmasını ekledik
  env: {
    TEST_VAR: process.env.NEXT_PUBLIC_API_URL, // Ortam değişkeni tanımlandı
  },
};

module.exports = nextConfig;
