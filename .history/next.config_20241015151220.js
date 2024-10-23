/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');
require("dotenv").config(`./env.local${process.env.NODE_ENV}`);

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['firebasestorage.googleapis.com', 'images.pexels.com','tiens.com.tr', 'img.freepik.com', 'obsjtmm.jtmm.com','encrypted-tbn0.gstatic.com',"w0.peakpx.com","www.tianshi.az","www.tiens-so.com","strgimgr.umico.az"],
    formats: ['image/avif', 'image/webp'],
  },
  i18n,

};

module.exports = nextConfig;