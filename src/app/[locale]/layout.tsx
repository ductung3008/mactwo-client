import { Layout } from '@/components/layout';
import { ToastProvider } from '@/components/ui';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter } from 'next/font/google';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'MacTwo',
  description:
    'Discover the best deals on high-quality laptops from top brands. Quality guaranteed with fast delivery.',
};

export default async function LocaleLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { params, children } = await props;
  const locale = await params.locale;

  console.log(locale);

  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body className={`${inter.className} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <ToastProvider>
            <Layout>{children}</Layout>
          </ToastProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
