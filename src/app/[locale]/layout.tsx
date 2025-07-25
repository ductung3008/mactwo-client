import { Layout } from '@/components/layout';
import { ToastProvider } from '@/components/ui';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import '../globals.css';

export const metadata: Metadata = {
  title: 'MacTwo',
  description:
    'Discover the best deals on high-quality laptops from top brands. Quality guaranteed with fast delivery.',
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
