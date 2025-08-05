'use client';

import MacTwoLogoTransWhite from '@/../public/mactwo-logo-trans-white.png';
import MacTwoLogo from '@/../public/mactwo-logo.png';
import { Link } from '@/i18n/navigation';
import { useAuthStore } from '@/stores/auth-store';
import {
  ChevronDown,
  ChevronUp,
  Facebook,
  Instagram,
  Menu,
  Search,
  ShoppingCart,
  Twitter,
  User,
  X,
  Youtube,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FormEvent, memo, useCallback, useMemo, useState } from 'react';
import { Button, Input, LanguageSwitcher } from '../ui';

const CATEGORIES = [
  { name: 'iPhone', link: '/iphone' },
  { name: 'iPad', link: '/ipad' },
  { name: 'Mac', link: '/mac' },
  { name: 'Watch', link: '/watch' },
  { name: 'Phụ kiện', link: '/accessories' },
  { name: 'Âm thanh', link: '/sound' },
  { name: 'Camera', link: '/camera' },
  { name: 'Gia dụng', link: '/home-appliances' },
  { name: 'Máy lướt', link: '/refurbished' },
  { name: 'Tin tức', link: '/news' },
  { name: 'Liên hệ', link: '/contact' },
] as const;

const SOCIAL_LINKS = [
  {
    name: 'Facebook',
    href: 'https://facebook.com',
    icon: <Facebook className='text-[#1877F2]' />,
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com',
    icon: <Twitter className='text-[#1DA1F2]' />,
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com',
    icon: <Instagram className='text-[#C13584]' />,
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com',
    icon: <Youtube className='text-[#CD201F]' />,
  },
] as const;

const MemoizedCartButton = memo(
  ({
    cartItemCount,
    cartText,
  }: {
    cartItemCount: number;
    cartText: string;
  }) => (
    <Link
      href='/cart'
      className='relative flex items-center space-x-2 text-white transition-colors hover:text-white/80'
      aria-label={`${cartText} (${cartItemCount} items)`}
    >
      <div className='relative'>
        <ShoppingCart className='h-5 w-5' />
        {cartItemCount > 0 && (
          <span className='absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white'>
            {cartItemCount > 99 ? '99+' : cartItemCount}
          </span>
        )}
      </div>
      <span className='text-sm font-medium'>{cartText}</span>
    </Link>
  )
);

MemoizedCartButton.displayName = 'MemoizedCartButton';

const MemoizedUserDropdown = memo(
  ({
    user,
    onLogout,
    profileText,
    logoutText,
    accountText,
  }: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user: any;
    onLogout: () => void;
    profileText: string;
    logoutText: string;
    accountText: string;
  }) => (
    <div className='group relative'>
      <button className='flex items-center space-x-2 text-white transition-colors hover:text-white/80'>
        <User className='h-5 w-5' />
        <span className='text-sm font-medium'>{user?.name || accountText}</span>
        <ChevronDown className='h-4 w-4' />
      </button>
      <div className='invisible absolute top-full right-0 mt-2 w-48 rounded-lg bg-white py-2 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:opacity-100'>
        <Link
          href='/profile'
          className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
        >
          {profileText}
        </Link>
        <Button
          onClick={onLogout}
          className='block w-full bg-white px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100'
        >
          {logoutText}
        </Button>
      </div>
    </div>
  )
);

MemoizedUserDropdown.displayName = 'MemoizedUserDropdown';

const MemoizedNavigation = memo(
  ({ categories }: { categories: typeof CATEGORIES }) => (
    <nav className='hidden lg:block'>
      <div className='flex items-center justify-center gap-8'>
        {categories.map(category => (
          <Link
            key={category.name}
            href={category.link}
            className='py-3 text-center text-sm font-medium text-white/80 transition-all duration-200 hover:text-white hover:underline lg:min-w-20'
          >
            {category.name}
          </Link>
        ))}
      </div>
    </nav>
  )
);

MemoizedNavigation.displayName = 'MemoizedNavigation';

export const Header = memo(() => {
  const t = useTranslations('layout.header');
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const translations = useMemo(
    () => ({
      search: t('search'),
      cart: t('cart'),
      account: t('account'),
      profile: t('profile'),
      logout: t('logout'),
      login: t('login'),
    }),
    [t]
  );

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const handleSearchSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        console.log('Search query:', searchQuery);
      }
    },
    [searchQuery]
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    []
  );

  const handleSearchFocus = useCallback(() => {
    setIsSearchFocused(true);
  }, []);

  const handleSearchBlur = useCallback(() => {
    setIsSearchFocused(false);
  }, []);

  const cartItemCount = useMemo(() => {
    return 0;
  }, []);

  const handleMobileLogout = useCallback(() => {
    handleLogout();
    closeMobileMenu();
  }, [handleLogout, closeMobileMenu]);

  return (
    <header className='sticky top-0 z-50 bg-[#515154] shadow-md'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between'>
          <div className='flex-shrink-0'>
            <Link href='/' className='block' aria-label='MacTwo Home'>
              <Image
                src={MacTwoLogoTransWhite}
                alt='MacTwo Logo'
                height={60}
                width={120}
                priority
                className='h-10 w-auto lg:h-12'
              />
            </Link>
          </div>

          <div className='mx-14 hidden flex-1 lg:block'>
            <form onSubmit={handleSearchSubmit} className='relative'>
              <div
                className={`relative transition-all duration-200 ${
                  isSearchFocused ? 'ring-2 ring-white/50' : ''
                }`}
              >
                <Input
                  type='search'
                  placeholder={translations.search}
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                  className='w-full rounded-lg border-0 px-4 py-2 pl-10'
                  aria-label={translations.search}
                />
                <Search className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
              </div>
            </form>
          </div>

          <div className='hidden items-center space-x-6 lg:flex'>
            <MemoizedCartButton
              cartItemCount={cartItemCount}
              cartText={translations.cart}
            />

            {isAuthenticated ? (
              <MemoizedUserDropdown
                user={user}
                onLogout={handleLogout}
                profileText={translations.profile}
                logoutText={translations.logout}
                accountText={translations.account}
              />
            ) : (
              <Link
                href='/login'
                className='flex min-w-[100px] items-center space-x-2 text-white transition-colors hover:text-white/80'
              >
                <User className='h-5 w-5' />
                <span className='text-sm font-medium'>
                  {translations.login}
                </span>
              </Link>
            )}
            <LanguageSwitcher />
          </div>

          {/* Mobile */}
          <button
            onClick={toggleMobileMenu}
            className='flex items-center justify-center p-2 text-white lg:hidden'
            aria-label='Toggle mobile menu'
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className='h-6 w-6' />
            ) : (
              <Menu className='h-6 w-6' />
            )}
          </button>
        </div>

        <MemoizedNavigation categories={CATEGORIES} />

        {isMobileMenuOpen && (
          <div className='border-t border-white/20 py-4 lg:hidden'>
            <form onSubmit={handleSearchSubmit} className='mb-4'>
              <div className='relative'>
                <Input
                  type='search'
                  placeholder={translations.search}
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className='w-full rounded-lg border-0 bg-white/10 px-4 py-2 pl-10 text-white placeholder-white/70 focus:bg-white/20 focus:outline-none'
                  aria-label={translations.search}
                />
                <Search className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-white/70' />
              </div>
            </form>

            <div className='space-y-3'>
              <div className='mb-4 border-b border-white/20 pb-4'>
                <div className='grid grid-cols-2 gap-2 border-t border-white/20 pt-4'>
                  {CATEGORIES.map(category => (
                    <Link
                      key={category.name}
                      href={category.link}
                      className='text-sm text-white/80 transition-colors hover:text-white hover:underline'
                      onClick={closeMobileMenu}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href='/cart'
                className='flex items-center space-x-3 text-white hover:text-white/80'
                onClick={closeMobileMenu}
              >
                <div className='relative'>
                  <ShoppingCart className='h-5 w-5' />
                  {cartItemCount > 0 && (
                    <span className='absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white'>
                      {cartItemCount > 99 ? '99+' : cartItemCount}
                    </span>
                  )}
                </div>
                <span>{translations.cart}</span>
              </Link>

              <div className='flex justify-between'>
                {isAuthenticated ? (
                  <>
                    <Link
                      href='/profile'
                      className='flex items-center space-x-3 text-white hover:text-white/80'
                      onClick={closeMobileMenu}
                    >
                      <User className='h-5 w-5' />
                      <span>{user?.name}</span>
                    </Link>
                    <button
                      onClick={handleMobileLogout}
                      className='flex items-center space-x-3 text-white hover:text-white/80'
                    >
                      <span>{translations.logout}</span>
                    </button>
                  </>
                ) : (
                  <Link
                    href='/login'
                    className='flex items-center space-x-3 text-white hover:text-white/80'
                    onClick={closeMobileMenu}
                  >
                    <User className='h-5 w-5' />
                    <span>{translations.login}</span>
                  </Link>
                )}

                <LanguageSwitcher />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export const Footer = memo(() => {
  const t = useTranslations('layout.footer');

  const footerLinks = useMemo(
    () => [
      [
        { title: t('information') },
        { title: t('newsfeed'), href: '/newsfeed' },
        { title: t('introduction'), href: '/introduction' },
        { title: t('paymentMethods'), href: '/paymentMethods' },
        { title: t('warranty'), href: '/warranty' },
        { title: t('careers'), href: '/careers' },
        { title: t('report'), href: '/report' },
      ],
      [
        { title: t('policy') },
        { title: t('buyback'), href: '/buyback' },
        { title: t('shipping'), href: '/shipping' },
        { title: t('shippingZalopay'), href: '/shippingZalopay' },
        { title: t('cancelTransaction'), href: '/cancelTransaction' },
        { title: t('return'), href: '/return' },
        { title: t('informationProtection'), href: '/informationProtection' },
      ],
      [
        { title: t('addressAndContact') },
        { title: t('myAccount'), href: '/myAccount' },
        { title: t('myOrders'), href: '/myOrders' },
        { title: t('findStoreInGoogleMaps'), href: '/findStoreInGoogleMaps' },
        { title: t('storeSystem'), href: '/storeSystem' },
      ],
    ],
    [t]
  );

  return (
    <footer className='bg-gray-900 text-white'>
      <div className='divide-4 mx-auto grid max-w-7xl grid-cols-1 gap-5 divide-dashed px-4 py-12 sm:px-6 lg:grid-cols-4 lg:gap-16 lg:px-8'>
        <div>
          <Image
            src={MacTwoLogo}
            alt='MacTwo Logo'
            height={50}
            className='mb-4'
            loading='lazy'
          />
          <p>{t('description')}</p>
          <ul className='mt-4 flex space-x-4'>
            {SOCIAL_LINKS.map(link => (
              <li key={link.name} className='flex'>
                <a
                  href={link.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='rounded-full border border-gray-500 p-3 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white'
                >
                  {link.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {footerLinks.map((column, colIdx) => (
          <div key={colIdx}>
            {column.map((item, idx) =>
              idx === 0 ? (
                <h4
                  key={idx}
                  className='mb-4 text-lg font-semibold text-gray-300'
                >
                  {item.title}
                </h4>
              ) : (
                <Link
                  key={idx}
                  href={item.href!}
                  className='mb-2 block text-gray-500 hover:text-gray-700'
                >
                  {item.title}
                </Link>
              )
            )}
          </div>
        ))}
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export const FloatingButton = memo(() => {
  const handleScrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <Button
      onClick={handleScrollToTop}
      className='fixed right-4 bottom-4 z-50 flex size-12 items-center justify-center rounded-full bg-gray-400 text-white shadow-lg transition-transform hover:scale-110'
      aria-label='Scroll to top'
    >
      <ChevronUp />
    </Button>
  );
});

FloatingButton.displayName = 'FloatingButton';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <main className='flex-1 bg-gray-50'>{children}</main>
      <FloatingButton />
      <Footer />
    </div>
  );
}
