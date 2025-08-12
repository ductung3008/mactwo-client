import { Layout } from '@/components/layout';
import { ToastProvider } from '@/components/ui';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import '../globals.css';

export const metadata: Metadata = {
  title: 'MacTwo - Apple Chính Hãng | MacBook, iPhone, iPad Giá Tốt',
  description:
    'MacTwo - Cửa hàng Apple chính hãng tại Việt Nam. Mua MacBook, iPhone, iPad, AirPods và các sản phẩm Apple với giá ưu đãi, bảo hành đầy đủ.',
  authors: [{ name: 'MacTwo Team', url: 'https://mactwo.click' }],
  openGraph: {
    title: 'MacTwo - Apple Chính Hãng | MacBook, iPhone, iPad Giá Tốt',
    description:
      'Mua MacBook, iPhone, iPad và các sản phẩm Apple chính hãng tại MacTwo. Giá tốt, bảo hành uy tín, giao hàng toàn quốc.',
    url: 'https://mactwo.click',
    siteName: 'MacTwo',
    type: 'website',
    locale: 'vi_VN',
    images: [
      {
        url: 'https://mactwo.click/mactwo-logo.png',
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: 'MacTwo - Apple Chính Hãng',
      },
    ],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  alternates: {
    canonical: 'https://mactwo.click',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages}>
      <ToastProvider>
        <Layout>{children}</Layout>
      </ToastProvider>
    </NextIntlClientProvider>
  );
}
