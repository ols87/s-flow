/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: { domains: ['app.streamflow.finance', 'streamflow.finance'] },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true,
      },
      {
        source: '/',
        destination: '/stream',
        permanent: true,
      },
      {
        source: '/',
        destination: '/new-payment',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
