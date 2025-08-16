import { getTranslations } from 'next-intl/server';
import ProfileWrapper from './wrapper';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  return {
    title: t('profile.title'),
    description: t('profile.description'),
  };
}

export default async function ProfileLayout({
  params,
  children,
}: {
  params: Promise<{ locale: string }>;
  children: React.ReactNode;
}) {
  const { locale } = await params;

  return (
    <div className='mx-auto flex min-h-full max-w-6xl grid-cols-2 flex-col gap-10 px-4 py-8 sm:px-6 lg:flex-row lg:px-8'>
      <ProfileWrapper locale={locale}>{children}</ProfileWrapper>
    </div>
  );
}
