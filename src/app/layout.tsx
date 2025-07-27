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
      <body className={`${inter.className} min-h-screen antialiased`}>
        <Suspense fallback={<PageLoading />}>{children}</Suspense>
      </body>
    </html>
  );
}
