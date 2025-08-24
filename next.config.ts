import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'shopdunk.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn2.fptshop.com.vn',
        pathname: '/**',
      },
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
  // async redirects() {
  //   return [
  //     {
  //       source: '/admin/:path*',
  //       destination: '/admin/:path*',
  //       // destination: 'https://admin.mactwo.click/:path*',
  //       permanent: true,
  //     },
  //   ];
  // },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
