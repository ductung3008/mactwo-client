'use client';

import { Button } from '@/components/ui';
import { localeNames, locales, type Locale } from '@/i18n/config';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  let currentLocale: Locale = 'vi';
  if (params.locale && locales.includes(params.locale as Locale)) {
    currentLocale = params.locale as Locale;
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const switchLanguage = (locale: Locale) => {
    // Remove current locale from pathname if it exists
    const pathWithoutLocale = locales.includes(pathname.split('/')[1] as Locale)
      ? pathname.replace(/^\/[a-z]{2}/, '') || '/'
      : pathname;

    // Add new locale to the path
    const newPath = `/${locale}${pathWithoutLocale}`;

    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className='relative' ref={dropdownRef}>
      <Button
        variant='outline'
        size='sm'
        onClick={() => setIsOpen(!isOpen)}
        className='flex min-w-[120px] items-center justify-between gap-2 text-white hover:bg-white/10'
      >
        <div className='flex items-center gap-2'>
          <Image
            src={`/locales/${currentLocale}.png`}
            alt={`${currentLocale} flag`}
            width={20}
            height={20}
            className='hidden sm:inline'
          />
          {localeNames[currentLocale]}
          <span className='sm:hidden'>
            <Image
              src={`/locales/${currentLocale}.png`}
              alt={`${currentLocale} flag`}
              width={20}
              height={20}
              className='inline-block'
            />
          </span>
        </div>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </Button>

      {isOpen && (
        <div className='absolute top-full right-0 z-50 mt-1 min-w-[140px] rounded-md border bg-white shadow-lg'>
          <div className='py-1'>
            {locales.map(locale => (
              <Button
                key={locale}
                onClick={() => switchLanguage(locale)}
                className={`flex w-full items-center justify-start gap-3 bg-white px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                  currentLocale === locale
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700'
                }`}
              >
                <Image
                  src={`/locales/${locale}.png`}
                  alt={`${locale} flag`}
                  width={20}
                  height={20}
                  className='inline-block'
                />
                <span>{localeNames[locale]}</span>
                {currentLocale === locale && (
                  <span className='ml-auto text-blue-600'>✓</span>
                )}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
