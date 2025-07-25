import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

export default function HomePage() {
  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Hero Section */}
      <section className='bg-gradient-to-r from-blue-600 to-purple-700 text-white'>
        <div className='mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h1 className='mb-6 text-4xl font-bold md:text-6xl'>
              Find Your Perfect Laptop
            </h1>
            <p className='mb-8 text-xl text-blue-100 md:text-2xl'>
              Discover the best deals on high-quality laptops from top brands
            </p>
            <div className='space-x-4'>
              <Link href='/laptops'>
                <Button
                  size='lg'
                  className='bg-white text-blue-600 hover:bg-gray-100'
                >
                  Shop Now
                </Button>
              </Link>
              <Link href='/deals'>
                <Button
                  size='lg'
                  variant='outline'
                  className='border-white text-white hover:bg-white hover:text-blue-600'
                >
                  View Deals
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-16'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='mb-12 text-center'>
            <h2 className='mb-4 text-3xl font-bold text-gray-900 md:text-4xl'>
              Why Choose LaptopStore?
            </h2>
            <p className='text-lg text-gray-600'>
              We provide the best laptop shopping experience with quality
              guarantees
            </p>
          </div>

          <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
            <div className='text-center'>
              <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100'>
                <svg
                  className='h-8 w-8 text-blue-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </div>
              <h3 className='mb-2 text-xl font-semibold'>Quality Guaranteed</h3>
              <p className='text-gray-600'>
                All our laptops are tested and certified for quality assurance
              </p>
            </div>

            <div className='text-center'>
              <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100'>
                <svg
                  className='h-8 w-8 text-green-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1'
                  />
                </svg>
              </div>
              <h3 className='mb-2 text-xl font-semibold'>Best Prices</h3>
              <p className='text-gray-600'>
                Competitive pricing with regular deals and discounts
              </p>
            </div>

            <div className='text-center'>
              <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100'>
                <svg
                  className='h-8 w-8 text-purple-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 3H5.4m0 0l-2 13m2-13h10m0 0l4 8m-4-8L17 3m-2 10a2 2 0 11-4 0 2 2 0 014 0zm-10 0a2 2 0 11-4 0 2 2 0 014 0z'
                  />
                </svg>
              </div>
              <h3 className='mb-2 text-xl font-semibold'>Fast Delivery</h3>
              <p className='text-gray-600'>
                Quick and secure shipping to your doorstep
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='bg-gray-900 py-16 text-white'>
        <div className='mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8'>
          <h2 className='mb-4 text-3xl font-bold md:text-4xl'>
            Ready to Find Your Perfect Laptop?
          </h2>
          <p className='mb-8 text-xl text-gray-300'>
            Browse our extensive collection of laptops from top brands
          </p>
          <div className='flex flex-wrap justify-center gap-4'>
            <Link href='/laptops'>
              <Button size='lg' className='bg-blue-600 hover:bg-blue-700'>
                Start Shopping
              </Button>
            </Link>
            <Link href='/components'>
              <Button
                size='lg'
                variant='outline'
                className='border-white text-white hover:bg-white hover:text-gray-900'
              >
                View Components
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
