import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL('https://shopdunk.com/**'),
      new URL('https://cdn2.fptshop.com.vn/**'),
      new URL('https://macone.vn/**'),
    ],
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'admin.mactwo.click',
          },
        ],
        destination: '/admin/:path*',
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/admin/:path*',
        destination: 'https://admin.mactwo.click/:path*',
        permanent: true,
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
