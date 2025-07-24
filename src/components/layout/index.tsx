'use client';

import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/auth-store';
import Link from 'next/link';

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
                <Link href='/auth/login'>
                  <Button variant='ghost' size='sm'>
                    Login
                  </Button>
                </Link>
                <Link href='/auth/register'>
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
  return (
    <footer className='bg-gray-900 text-white'>
      <div className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-4'>
          <div>
            <h3 className='mb-4 text-lg font-semibold'>LaptopStore</h3>
            <p className='text-gray-400'>
              Your trusted partner for high-quality laptops at the best prices.
            </p>
          </div>
          <div>
            <h4 className='text-md mb-4 font-semibold'>Quick Links</h4>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='/laptops'
                  className='text-gray-400 hover:text-white'
                >
                  Laptops
                </Link>
              </li>
              <li>
                <Link
                  href='/categories'
                  className='text-gray-400 hover:text-white'
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link href='/deals' className='text-gray-400 hover:text-white'>
                  Deals
                </Link>
              </li>
              <li>
                <Link href='/about' className='text-gray-400 hover:text-white'>
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className='text-md mb-4 font-semibold'>Support</h4>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='/contact'
                  className='text-gray-400 hover:text-white'
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href='/faq' className='text-gray-400 hover:text-white'>
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href='/shipping'
                  className='text-gray-400 hover:text-white'
                >
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link
                  href='/returns'
                  className='text-gray-400 hover:text-white'
                >
                  Returns
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className='text-md mb-4 font-semibold'>Connect</h4>
            <ul className='space-y-2'>
              <li>
                <a href='#' className='text-gray-400 hover:text-white'>
                  Facebook
                </a>
              </li>
              <li>
                <a href='#' className='text-gray-400 hover:text-white'>
                  Twitter
                </a>
              </li>
              <li>
                <a href='#' className='text-gray-400 hover:text-white'>
                  Instagram
                </a>
              </li>
              <li>
                <a href='#' className='text-gray-400 hover:text-white'>
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className='mt-8 border-t border-gray-800 pt-8 text-center'>
          <p className='text-gray-400'>
            © 2025 LaptopStore. All rights reserved.
          </p>
        </div>
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
