import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <div className='flex min-h-screen w-full flex-col items-center justify-center bg-gray-50 px-4'>
      <div className='text-center'>
        <Image
          priority={true}
          src='/404.png'
          alt='404 Not Found'
          width={500}
          height={500}
          className='mx-auto mb-6 size-full'
        />
        <h1 className='mb-4 text-4xl font-bold text-gray-900'>{t('title')}</h1>
        <p className='mb-8 text-lg text-gray-600'>{t('description')}</p>
        <Link
          href='/'
          className='inline-block rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700'
        >
          {t('goBackHome')}
        </Link>
      </div>
    </div>
  );
}
