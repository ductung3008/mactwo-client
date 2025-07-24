'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Custom404Props {
  title?: string;
  message?: string;
  showBackButton?: boolean;
  className?: string;
}

export function Custom404({
  title = 'Page Not Found',
  message = "The page you're looking for doesn't exist or has been moved.",
  showBackButton = true,
  className = '',
}: Custom404Props) {
  return (
    <div
      className={`flex min-h-[60vh] items-center justify-center px-4 ${className}`}
    >
      <div className='mx-auto max-w-2xl text-center'>
        {/* 404 Icon */}
        <div className='mb-8'>
          <div className='relative inline-block'>
            <div className='mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-purple-100'>
              <svg
                className='h-16 w-16 text-blue-500'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={1.5}
                  d='M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47.881-6.084 2.291'
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className='mb-8'>
          <h2 className='mb-4 text-3xl font-bold text-gray-800 md:text-4xl'>
            {title}
          </h2>
          <p className='mb-4 text-lg text-gray-600'>{message}</p>
        </div>

        {/* Action Buttons */}
        <div className='flex flex-col items-center justify-center gap-4 sm:flex-row'>
          <Link href='/'>
            <Button
              size='lg'
              className='bg-blue-600 px-8 text-white hover:bg-blue-700'
            >
              🏠 Go Home
            </Button>
          </Link>

          {showBackButton && (
            <Button
              variant='outline'
              size='lg'
              onClick={() => window.history.back()}
              className='border-blue-200 px-8 text-blue-700 hover:border-blue-300 hover:bg-blue-50'
            >
              ← Go Back
            </Button>
          )}
        </div>

        {/* Quick Links */}
        <div className='mt-8 border-t border-gray-200 pt-8'>
          <p className='mb-4 text-sm text-gray-500'>Popular sections:</p>
          <div className='flex flex-wrap justify-center gap-4'>
            <Link
              href='/laptops'
              className='text-sm text-blue-600 hover:text-blue-800 hover:underline'
            >
              Browse Laptops
            </Link>
            <Link
              href='/deals'
              className='text-sm text-blue-600 hover:text-blue-800 hover:underline'
            >
              Special Deals
            </Link>
            <Link
              href='/contact'
              className='text-sm text-blue-600 hover:text-blue-800 hover:underline'
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// Specific error components for different scenarios
export function ProductNotFound() {
  return (
    <Custom404
      title='Product Not Found'
      message="The laptop you're looking for is no longer available or doesn't exist."
      className='bg-gray-50'
    />
  );
}

export function CategoryNotFound() {
  return (
    <Custom404
      title='Category Not Found'
      message="This category doesn't exist or has been removed from our catalog."
      className='bg-gray-50'
    />
  );
}

export function SearchNotFound({ query }: { query?: string }) {
  return (
    <Custom404
      title='No Results Found'
      message={
        query
          ? `No laptops found matching "${query}". Try different search terms.`
          : 'No results found for your search. Try different keywords.'
      }
      showBackButton={false}
      className='bg-white'
    />
  );
}
