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
      </head>
      <body className={`${inter.className} min-h-screen antialiased`}>
        <Suspense fallback={<PageLoading />}>{children}</Suspense>
      </body>
    </html>
  );
}
