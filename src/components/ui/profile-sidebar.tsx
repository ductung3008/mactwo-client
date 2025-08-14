'use client';

import { Link } from '@/i18n/navigation';
import clsx from 'clsx';
import { MapPin, ShoppingBag, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

export default function ProfileSidebar({ locale }: { locale: string }) {
  const t = useTranslations('profile');
  const currentPath = usePathname();

  const linkClasses = (path: string, isExact: boolean = false) => {
    let isActive = false;

    if (isExact) {
      isActive =
        currentPath === path || currentPath === path.replace(`/${locale}`, '');
    } else {
      isActive =
        currentPath.startsWith(path) ||
        currentPath.startsWith(path.replace(`/${locale}`, ''));
    }

    return clsx(
      'flex gap-2 rounded-xl p-4 transition-all duration-200 hover:bg-[#e5effa] hover:text-[#0066cc]',
      isActive && 'bg-[#e5effa] text-[#0066cc]'
    );
  };

  return (
    <nav className='h-full rounded-xl bg-white p-4 shadow-xl lg:w-1/3'>
      <Link href='/profile' className={linkClasses(`/${locale}/profile`, true)}>
        <User />
        {t('profile')}
      </Link>
      <Link
        href={`/profile/addresses`}
        className={linkClasses(`/${locale}/profile/addresses`)}
      >
        <MapPin />
        {t('addresses')}
      </Link>
      <Link
        href={`/profile/orders`}
        className={linkClasses(`/${locale}/profile/orders`)}
      >
        <ShoppingBag />
        {t('orders')}
      </Link>
    </nav>
  );
}
