/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
    STRIPE_PRIVATE_KEY: process.env.STRIPE_PRIVATE_KEY,
    BASE_URL: process.env.BASE_URL,
  },
  swcMinify: false,
};
