// next.config.js
const { i18n } = require('./next-i18next.config');

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  i18n,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // fs modülünü tarayıcıda devre dışı bırak
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};
