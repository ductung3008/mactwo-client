import { PageLoading } from '@/components/ui';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <link
          href='https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css'
          rel='stylesheet'
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Store',
              name: 'MacTwo',
              url: 'https://mactwo.click',
              logo: 'https://mactwo.click/mactwo-logo.png',
              description:
                'Cửa hàng Apple chính hãng tại Việt Nam. Mua MacBook, iPhone, iPad và các sản phẩm Apple khác với giá tốt nhất.',
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: [
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday',
                    'Sunday',
                  ],
                  opens: '08:00',
                  closes: '21:00',
                },
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.className} min-h-screen antialiased`}>
        <Suspense fallback={<PageLoading />}>{children}</Suspense>
      </body>
    </html>
  );
}
