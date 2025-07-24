'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4'>
      <div className='mx-auto max-w-4xl text-center'>
        {/* Animated 404 */}
        <div className='mb-8'>
          <div className='relative'>
            {/* Main 404 Text */}
            <h1 className='animate-pulse bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-8xl font-black text-transparent md:text-9xl'>
              404
            </h1>

            {/* Floating Laptop Icons */}
            <div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 transform'>
              <div className='animate-bounce delay-100'>
                <svg
                  className='h-12 w-12 text-blue-500 opacity-70'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z' />
                </svg>
              </div>
            </div>

            <div className='absolute top-8 right-1/4 translate-x-8 transform'>
              <div className='animate-bounce delay-300'>
                <svg
                  className='h-8 w-8 text-purple-500 opacity-60'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z' />
                </svg>
              </div>
            </div>

            <div className='absolute top-8 left-1/4 -translate-x-8 transform'>
              <div className='animate-bounce delay-500'>
                <svg
                  className='h-10 w-10 text-blue-400 opacity-50'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z' />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className='mb-8 space-y-4'>
          <h2 className='mb-4 text-3xl font-bold text-gray-800 md:text-4xl'>
            Oops! Page Not Found
          </h2>
          <div className='mx-auto max-w-2xl space-y-2'>
            <p className='text-lg text-gray-600'>
              Looks like this page went missing faster than our laptops go out
              of stock! 📱
            </p>
            <p className='text-gray-500'>
              The page you&apos;re looking for doesn&apos;t exist or has been
              moved to a new location.
            </p>
          </div>
        </div>

        {/* Search Suggestions */}
        <div className='mb-8'>
          <div className='mx-auto max-w-md rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-lg backdrop-blur-sm'>
            <h3 className='mb-4 text-lg font-semibold text-gray-800'>
              What you might be looking for:
            </h3>
            <div className='space-y-2'>
              <Link
                href='/laptops'
                className='block text-blue-600 transition-colors hover:text-blue-800 hover:underline'
              >
                🖥️ Browse All Laptops
              </Link>
              <Link
                href='/categories'
                className='block text-blue-600 transition-colors hover:text-blue-800 hover:underline'
              >
                📂 Laptop Categories
              </Link>
              <Link
                href='/deals'
                className='block text-blue-600 transition-colors hover:text-blue-800 hover:underline'
              >
                🔥 Special Deals
              </Link>
              <Link
                href='/about'
                className='block text-blue-600 transition-colors hover:text-blue-800 hover:underline'
              >
                ℹ️ About Us
              </Link>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='mb-8 flex flex-col items-center justify-center gap-4 sm:flex-row'>
          <Link href='/'>
            <Button
              size='lg'
              className='transform bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl'
            >
              🏠 Go Home
            </Button>
          </Link>

          <Button
            variant='outline'
            size='lg'
            className='border-2 border-blue-200 px-8 py-3 text-lg font-semibold text-blue-700 transition-all hover:border-blue-300 hover:bg-blue-50'
            onClick={() => window.history.back()}
          >
            ← Go Back
          </Button>
        </div>

        {/* Fun Stats */}
        <div className='mx-auto grid max-w-2xl grid-cols-1 gap-6 md:grid-cols-3'>
          <div className='rounded-xl border border-gray-200 bg-white/60 p-4 backdrop-blur-sm'>
            <div className='text-2xl font-bold text-blue-600'>500+</div>
            <div className='text-sm text-gray-600'>Laptops Available</div>
          </div>
          <div className='rounded-xl border border-gray-200 bg-white/60 p-4 backdrop-blur-sm'>
            <div className='text-2xl font-bold text-purple-600'>24/7</div>
            <div className='text-sm text-gray-600'>Customer Support</div>
          </div>
          <div className='rounded-xl border border-gray-200 bg-white/60 p-4 backdrop-blur-sm'>
            <div className='text-2xl font-bold text-green-600'>Fast</div>
            <div className='text-sm text-gray-600'>Free Shipping</div>
          </div>
        </div>

        {/* Contact Support */}
        <div className='mt-12 text-center'>
          <p className='mb-4 text-gray-500'>
            Still can&apos;t find what you&apos;re looking for?
          </p>
          <Link href='/contact'>
            <Button
              variant='ghost'
              className='text-blue-600 hover:bg-blue-50 hover:text-blue-800'
            >
              📧 Contact Support
            </Button>
          </Link>
        </div>

        {/* Decorative Elements */}
        <div className='absolute top-20 left-10 opacity-10'>
          <div className='h-32 w-32 animate-pulse rounded-full bg-blue-500'></div>
        </div>
        <div className='absolute right-10 bottom-20 opacity-10'>
          <div className='h-24 w-24 animate-pulse rounded-full bg-purple-500 delay-700'></div>
        </div>
        <div className='absolute top-1/2 left-5 opacity-5'>
          <div className='h-20 w-20 animate-bounce rounded-full bg-blue-300 delay-1000'></div>
        </div>
      </div>
    </div>
  );
}
