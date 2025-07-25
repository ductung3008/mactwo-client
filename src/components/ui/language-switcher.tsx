'use client';

import { Button } from '@/components/ui';
import { localeFlags, localeNames, locales, type Locale } from '@/i18n/config';
import { ChevronDown, Globe } from 'lucide-react';
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
        className='flex min-w-[120px] items-center justify-between gap-2'
      >
        <div className='flex items-center gap-2'>
          <Globe className='h-4 w-4' />
          <span className='hidden sm:inline'>
            {localeFlags[currentLocale]} {localeNames[currentLocale]}
          </span>
          <span className='sm:hidden'>{localeFlags[currentLocale]}</span>
        </div>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </Button>

      {isOpen && (
        <div className='absolute top-full right-0 z-50 mt-1 min-w-[140px] rounded-md border bg-white shadow-lg'>
          <div className='py-1'>
            {locales.map(locale => (
              <button
                key={locale}
                onClick={() => switchLanguage(locale)}
                className={`flex w-full items-center gap-3 px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                  currentLocale === locale
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700'
                }`}
              >
                <span className='text-lg'>{localeFlags[locale]}</span>
                <span>{localeNames[locale]}</span>
                {currentLocale === locale && (
                  <span className='ml-auto text-blue-600'>✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
