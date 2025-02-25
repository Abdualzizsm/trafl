/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.join(__dirname, 'src');
    config.resolve.fallback = {
      "fs": false,
      "net": false,
      "tls": false,
    };
    return config;
  },
};

module.exports = nextConfig; 