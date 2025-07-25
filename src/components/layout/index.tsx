'use client';

import MacTwoLogo from '@/../public/mactwo-logo.png';
import { LanguageSwitcher } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { useAuthStore } from '@/stores/auth-store';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function Header() {
  const { user, isAuthenticated, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className='border-b bg-white shadow-sm'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between'>
          <div className='flex items-center'>
            <Link href='/' className='text-xl font-bold text-gray-900'>
              LaptopStore
            </Link>
            <nav className='hidden md:ml-8 md:flex md:space-x-8'>
              <Link
                href='/laptops'
                className='text-gray-700 hover:text-gray-900'
              >
                Laptops
              </Link>
              <Link
                href='/categories'
                className='text-gray-700 hover:text-gray-900'
              >
                Categories
              </Link>
              <Link href='/deals' className='text-gray-700 hover:text-gray-900'>
                Deals
              </Link>
              <Link href='/about' className='text-gray-700 hover:text-gray-900'>
                About
              </Link>
              <Link
                href='/components'
                className='text-gray-700 hover:text-gray-900'
              >
                Components
              </Link>
            </nav>
          </div>

          <div className='flex items-center space-x-4'>
            <LanguageSwitcher />
            {isAuthenticated ? (
              <>
                <span className='text-gray-700'>Hello, {user?.name}</span>
                <Link href='/profile'>
                  <Button variant='ghost' size='sm'>
                    Profile
                  </Button>
                </Link>
                <Link href='/cart'>
                  <Button variant='ghost' size='sm'>
                    Cart
                  </Button>
                </Link>
                <Button variant='outline' size='sm' onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link href='/login'>
                  <Button variant='ghost' size='sm'>
                    Login
                  </Button>
                </Link>
                <Link href='/register'>
                  <Button size='sm'>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  const t = useTranslations('layout.footer');

  const socialLinks = [
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
      name: 'LinkedIn',
      href: 'https://youtube.com',
      icon: <Youtube className='text-[#CD201F]' />,
    },
  ];

  const footerLinks = [
    [
      { title: t('information') },
      {
        title: t('newsfeed'),
        href: '/newsfeed',
      },
      {
        title: t('introduction'),
        href: '/introduction',
      },
      {
        title: t('paymentMethods'),
        href: '/paymentMethods',
      },
      {
        title: t('warranty'),
        href: '/warranty',
      },
      {
        title: t('careers'),
        href: '/careers',
      },
      {
        title: t('report'),
        href: '/report',
      },
    ],
    [
      {
        title: t('policy'),
      },
      {
        title: t('buyback'),
        href: '/buyback',
      },
      {
        title: t('shipping'),
        href: '/shipping',
      },
      {
        title: t('shippingZalopay'),
        href: '/shippingZalopay',
      },
      {
        title: t('cancelTransaction'),
        href: '/cancelTransaction',
      },
      {
        title: t('return'),
        href: '/return',
      },
      {
        title: t('informationProtection'),
        href: '/informationProtection',
      },
    ],
    [
      {
        title: t('addressAndContact'),
      },
      {
        title: t('myAccount'),
        href: '/myAccount',
      },
      {
        title: t('myOrders'),
        href: '/myOrders',
      },
      {
        title: t('findStoreInGoogleMaps'),
        href: '/findStoreInGoogleMaps',
      },
      {
        title: t('storeSystem'),
        href: '/storeSystem',
      },
    ],
  ];

  return (
    <footer className='bg-gray-900 text-white'>
      <div className='divide-4 mx-auto grid max-w-7xl grid-cols-1 gap-5 divide-dashed px-4 py-12 sm:px-6 lg:grid-cols-4 lg:gap-16 lg:px-8'>
        <div>
          <Image
            src={MacTwoLogo}
            alt='MacTwo Logo'
            height={50}
            className='mb-4'
          />
          <p>{t('description')}</p>
          <ul className='mt-4 flex space-x-4'>
            {socialLinks.map(link => (
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
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <main className='flex-1'>{children}</main>
      <Footer />
    </div>
  );
}
