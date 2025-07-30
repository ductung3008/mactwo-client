'use client';

import {
  AvatarSkeleton,
  BannerSlider,
  Button,
  ButtonLoading,
  CardSkeleton,
  CategoryNotFound,
  Custom404,
  ImageSkeleton,
  InlineLoading,
  Input,
  LaptopCardSkeleton,
  Loading,
  PageLoading,
  ProductNotFound,
  SearchNotFound,
  SectionLoading,
  Skeleton,
  TableRowSkeleton,
  TextSkeleton,
  useToastNotification,
} from '@/components/ui';
import { ProductItem } from '@/components/ui/product-item';
import Link from 'next/link';
import { useState } from 'react';

export default function ComponentsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPageLoading, setShowPageLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const toast = useToastNotification();

  const handleButtonClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  const handlePageLoading = () => {
    setShowPageLoading(true);
    setTimeout(() => setShowPageLoading(false), 3000);
  };

  // Sample banner data
  const sampleBanners = [
    {
      id: '1',
      image: '/auth/login.jpeg',
      alt: 'MacBook Pro Special Offer',
      href: '/products/macbook-pro',
    },
    {
      id: '2',
      image: '/auth/register.jpeg',
      alt: 'Gaming Laptops Collection',
      href: '/products/gaming',
    },
    {
      id: '3',
      image: '/auth/forgot-password.jpeg',
      alt: 'Student Discounts',
      href: '/student-deals',
    },
  ];

  return (
    <div className='min-h-screen bg-gray-50 py-8 text-gray-900'>
      {/* Page Loading */}
      {showPageLoading && <PageLoading text='Loading components...' />}

      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        {/* Header */}
        <div className='mb-12 text-center'>
          <h1 className='mb-4 text-4xl font-bold text-gray-900'>
            UI Components Library
          </h1>
          <p className='text-lg text-gray-600'>
            A comprehensive collection of reusable UI components for the
            LaptopStore project
          </p>
        </div>

        {/* Navigation */}
        <div className='mb-8 flex flex-wrap justify-center gap-2'>
          <a
            href='#banner-slider'
            className='rounded-lg bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 hover:bg-blue-200'
          >
            Banner Slider
          </a>
          <a
            href='#buttons'
            className='rounded-lg bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 hover:bg-blue-200'
          >
            Buttons
          </a>
          <a
            href='#inputs'
            className='rounded-lg bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 hover:bg-blue-200'
          >
            Inputs
          </a>
          <a
            href='#loading'
            className='rounded-lg bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 hover:bg-blue-200'
          >
            Loading
          </a>
          <a
            href='#skeletons'
            className='rounded-lg bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 hover:bg-blue-200'
          >
            Skeletons
          </a>
          <a
            href='#errors'
            className='rounded-lg bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 hover:bg-blue-200'
          >
            Error Pages
          </a>
          <a
            href='#toasts'
            className='rounded-lg bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 hover:bg-blue-200'
          >
            Toasts
          </a>
        </div>

        <div className='space-y-16'>
          <section id='banner-slider' className='scroll-mt-8'>
            <h2 className='mb-6 text-3xl font-bold text-gray-900'>
              Banner Slider
            </h2>
            <div className='space-y-6'>
              <div className='rounded-lg bg-white p-6 shadow-sm'>
                <div className='mb-6'>
                  <h4 className='mb-3 font-medium'>
                    Default Slider (with dots, auto-play)
                  </h4>
                  <BannerSlider
                    banners={sampleBanners}
                    height={300}
                    className='shadow-lg'
                  />
                </div>

                <div className='mb-6'>
                  <h4 className='mb-3 font-medium'>Without Dot Indicators</h4>
                  <BannerSlider
                    banners={sampleBanners}
                    height={250}
                    showDots={false}
                    className='shadow-lg'
                  />
                </div>

                <div className='mb-6'>
                  <h4 className='mb-3 font-medium'>Manual Navigation Only</h4>
                  <BannerSlider
                    banners={sampleBanners}
                    height={250}
                    autoPlay={false}
                    className='shadow-lg'
                  />
                </div>

                <div className='mb-6'>
                  <h4 className='mb-3 font-medium'>With Aspect Ratio (16:9)</h4>
                  <BannerSlider
                    banners={sampleBanners}
                    aspectRatio='16/9'
                    autoPlayInterval={3000}
                    className='shadow-lg'
                  />
                </div>
              </div>

              <div className='rounded-lg border border-blue-200 bg-blue-50 p-6'>
                <div className='mt-6 rounded-lg bg-gray-100 p-4'>
                  <h4 className='mb-2 font-medium'>Usage:</h4>
                  <pre className='overflow-x-auto text-sm'>
                    {`import { BannerSlider } from '@/components/ui';

const banners = [
  {
    id: '1',
    image: '/banner1.jpg',
    alt: 'Product Banner',
    href: '/products/laptop',
  },
  // ... more banners
];

<BannerSlider
  banners={banners}
  height={400}
  showDots={true}
  autoPlay={true}
  autoPlayInterval={5000}
  className="shadow-lg"
/>`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          <section id='product-item' className='scroll-mt-8'>
            <h2 className='mb-6 text-3xl font-bold text-gray-900'>
              Product Item Component
            </h2>
            <div className='grid grid-cols-4 gap-6 rounded-lg'>
              {Array.from({ length: 4 }).map((_, index) => (
                <ProductItem
                  key={index}
                  id='1'
                  name='MacBook Pro 16"'
                  code='macbook-pro-16'
                  categoryName='laptops'
                  oldPrice={26999000}
                  newPrice={25090000}
                  imageUrl='/mactwo-logo-trans.png'
                  promotionPercentage={10}
                  tag={
                    index % 3 === 0
                      ? 'new'
                      : index % 3 === 1
                        ? 'installment'
                        : 'hot'
                  }
                  className='w-full max-w-sm'
                />
              ))}
            </div>
          </section>

          {/* Buttons Section */}
          <section id='buttons' className='scroll-mt-8'>
            <h2 className='mb-6 text-3xl font-bold text-gray-900'>Buttons</h2>
            <div className='rounded-lg bg-white p-6 shadow-sm'>
              <div className='mb-6'>
                <h3 className='mb-4 text-xl font-semibold'>Button Variants</h3>
                <div className='flex flex-wrap gap-4'>
                  <Button>Default</Button>
                  <Button variant='destructive'>Destructive</Button>
                  <Button variant='outline'>Outline</Button>
                  <Button variant='secondary'>Secondary</Button>
                  <Button variant='ghost'>Ghost</Button>
                  <Button variant='link'>Link</Button>
                </div>
              </div>

              <div className='mb-6'>
                <h3 className='mb-4 text-xl font-semibold'>Button Sizes</h3>
                <div className='flex flex-wrap items-center gap-4'>
                  <Button size='sm'>Small</Button>
                  <Button size='default'>Default</Button>
                  <Button size='lg'>Large</Button>
                  <Button size='icon'>🔍</Button>
                </div>
              </div>

              <div className='mb-6'>
                <h3 className='mb-4 text-xl font-semibold'>Button States</h3>
                <div className='flex flex-wrap gap-4'>
                  <Button disabled>Disabled</Button>
                  <Button onClick={handleButtonClick} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <ButtonLoading />
                        <span className='ml-2'>Loading...</span>
                      </>
                    ) : (
                      'Click to Load'
                    )}
                  </Button>
                </div>
              </div>

              <div className='rounded-lg bg-gray-100 p-4'>
                <h4 className='mb-2 font-medium'>Usage:</h4>
                <pre className='text-sm'>
                  {`import { Button } from '@/components/ui';

<Button variant="outline" size="lg">
  My Button
</Button>`}
                </pre>
              </div>
            </div>
          </section>

          {/* Inputs Section */}
          <section id='inputs' className='scroll-mt-8'>
            <h2 className='mb-6 text-3xl font-bold text-gray-900'>Inputs</h2>
            <div className='rounded-lg bg-white p-6 shadow-sm'>
              <div className='mb-6 grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div>
                  <label className='mb-2 block text-sm font-medium'>
                    Default Input
                  </label>
                  <Input
                    placeholder='Enter your email'
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                  />
                </div>
                <div>
                  <label className='mb-2 block text-sm font-medium'>
                    Password Input
                  </label>
                  <Input type='password' placeholder='Enter your password' />
                </div>
                <div>
                  <label className='mb-2 block text-sm font-medium'>
                    Disabled Input
                  </label>
                  <Input placeholder='Disabled input' disabled />
                </div>
                <div>
                  <label className='mb-2 block text-sm font-medium'>
                    Search Input
                  </label>
                  <Input type='search' placeholder='Search laptops...' />
                </div>
              </div>

              <div className='rounded-lg bg-gray-100 p-4'>
                <h4 className='mb-2 font-medium'>Usage:</h4>
                <pre className='text-sm'>
                  {`import { Input } from '@/components/ui';

<Input 
  type="email" 
  placeholder="Enter email"
  value={value}
  onChange={handleChange}
/>`}
                </pre>
              </div>
            </div>
          </section>

          {/* Loading Section */}
          <section id='loading' className='scroll-mt-8'>
            <h2 className='mb-6 text-3xl font-bold text-gray-900'>
              Loading Components
            </h2>
            <div className='space-y-6'>
              {/* Loading Variants */}
              <div className='rounded-lg bg-white p-6 shadow-sm'>
                <h3 className='mb-4 text-xl font-semibold'>Loading Variants</h3>
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
                  <div className='rounded-lg border p-4 text-center'>
                    <h4 className='mb-2 font-medium'>Spinner</h4>
                    <Loading variant='spinner' size='md' text='Loading...' />
                  </div>
                  <div className='rounded-lg border p-4 text-center'>
                    <h4 className='mb-2 font-medium'>Dots</h4>
                    <Loading variant='dots' size='md' text='Processing...' />
                  </div>
                  <div className='rounded-lg border p-4 text-center'>
                    <h4 className='mb-2 font-medium'>Pulse</h4>
                    <Loading variant='pulse' size='md' text='Please wait...' />
                  </div>
                  <div className='rounded-lg border p-4 text-center'>
                    <h4 className='mb-2 font-medium'>Bars</h4>
                    <Loading variant='bars' size='md' text='Analyzing...' />
                  </div>
                </div>
              </div>

              {/* Loading Sizes */}
              <div className='rounded-lg bg-white p-6 shadow-sm'>
                <h3 className='mb-4 text-xl font-semibold'>Loading Sizes</h3>
                <div className='flex items-center justify-center space-x-8'>
                  <div className='text-center'>
                    <p className='mb-2 text-sm text-gray-600'>Small</p>
                    <Loading variant='spinner' size='sm' />
                  </div>
                  <div className='text-center'>
                    <p className='mb-2 text-sm text-gray-600'>Medium</p>
                    <Loading variant='spinner' size='md' />
                  </div>
                  <div className='text-center'>
                    <p className='mb-2 text-sm text-gray-600'>Large</p>
                    <Loading variant='spinner' size='lg' />
                  </div>
                  <div className='text-center'>
                    <p className='mb-2 text-sm text-gray-600'>Extra Large</p>
                    <Loading variant='spinner' size='xl' />
                  </div>
                </div>
              </div>

              {/* Specialized Loading */}
              <div className='rounded-lg bg-white p-6 shadow-sm'>
                <h3 className='mb-4 text-xl font-semibold'>
                  Specialized Loading Components
                </h3>
                <div className='space-y-4'>
                  <div>
                    <h4 className='mb-2 font-medium'>Page Loading</h4>
                    <Button onClick={handlePageLoading}>
                      Show Page Loading
                    </Button>
                  </div>

                  <div>
                    <h4 className='mb-2 font-medium'>Section Loading</h4>
                    <div className='rounded-lg border'>
                      <SectionLoading
                        text='Loading content...'
                        variant='dots'
                      />
                    </div>
                  </div>

                  <div>
                    <h4 className='mb-2 font-medium'>Inline Loading</h4>
                    <p>
                      This is some text with an inline loading indicator{' '}
                      <InlineLoading size='sm' /> that appears in the middle.
                    </p>
                  </div>
                </div>

                <div className='mt-6 rounded-lg bg-gray-100 p-4'>
                  <h4 className='mb-2 font-medium'>Usage:</h4>
                  <pre className='text-sm'>
                    {`import { 
  Loading, 
  PageLoading, 
  SectionLoading, 
  InlineLoading 
} from '@/components/ui';

// Basic loading
<Loading variant="spinner" size="md" text="Loading..." />

// Page overlay
<PageLoading text="Loading page..." />

// In buttons
{isLoading && <ButtonLoading />}`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* Skeletons Section */}
          <section id='skeletons' className='scroll-mt-8'>
            <h2 className='mb-6 text-3xl font-bold text-gray-900'>
              Skeleton Components
            </h2>
            <div className='space-y-6'>
              {/* Basic Skeletons */}
              <div className='rounded-lg bg-white p-6 shadow-sm'>
                <h3 className='mb-4 text-xl font-semibold'>Basic Skeletons</h3>
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
                  <div>
                    <h4 className='mb-2 font-medium'>Text Skeleton</h4>
                    <TextSkeleton lines={3} />
                  </div>
                  <div>
                    <h4 className='mb-2 font-medium'>Avatar Skeleton</h4>
                    <AvatarSkeleton size={64} />
                  </div>
                  <div>
                    <h4 className='mb-2 font-medium'>Image Skeleton</h4>
                    <ImageSkeleton height={120} className='rounded-lg' />
                  </div>
                  <div>
                    <h4 className='mb-2 font-medium'>Custom Skeleton</h4>
                    <Skeleton height={20} width='80%' className='mb-2' />
                    <Skeleton height={16} width='60%' className='mb-2' />
                    <Skeleton height={24} width='100%' />
                  </div>
                </div>
              </div>

              {/* Complex Skeletons */}
              <div className='rounded-lg bg-white p-6 shadow-sm'>
                <h3 className='mb-4 text-xl font-semibold'>
                  Complex Skeletons
                </h3>
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
                  <div>
                    <h4 className='mb-2 font-medium'>Card Skeleton</h4>
                    <CardSkeleton />
                  </div>
                  <div>
                    <h4 className='mb-2 font-medium'>Laptop Card Skeleton</h4>
                    <LaptopCardSkeleton />
                  </div>
                  <div>
                    <h4 className='mb-2 font-medium'>Table Row Skeleton</h4>
                    <div className='overflow-hidden rounded-lg border'>
                      <table className='w-full'>
                        <tbody>
                          <TableRowSkeleton columns={3} />
                          <TableRowSkeleton columns={3} />
                          <TableRowSkeleton columns={3} />
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className='mt-6 rounded-lg bg-gray-100 p-4'>
                  <h4 className='mb-2 font-medium'>Usage:</h4>
                  <pre className='text-sm'>
                    {`import { 
  Skeleton, 
  TextSkeleton, 
  LaptopCardSkeleton 
} from '@/components/ui';

// While loading data
{isLoading ? (
  <LaptopCardSkeleton />
) : (
  <LaptopCard laptop={laptop} />
)}

// Custom skeleton
<Skeleton height={20} width="100%" />`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* Error Pages Section */}
          <section id='errors' className='scroll-mt-8'>
            <h2 className='mb-6 text-3xl font-bold text-gray-900'>
              Error Pages & Components
            </h2>
            <div className='space-y-6'>
              {/* Error Page Examples */}
              <div className='rounded-lg bg-white p-6 shadow-sm'>
                <h3 className='mb-4 text-xl font-semibold'>Error Components</h3>
                <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
                  <div>
                    <h4 className='mb-2 font-medium'>Product Not Found</h4>
                    <div className='rounded-lg border bg-gray-50 p-4'>
                      <ProductNotFound />
                    </div>
                  </div>
                  <div>
                    <h4 className='mb-2 font-medium'>Category Not Found</h4>
                    <div className='rounded-lg border bg-gray-50 p-4'>
                      <CategoryNotFound />
                    </div>
                  </div>
                  <div>
                    <h4 className='mb-2 font-medium'>Search No Results</h4>
                    <div className='rounded-lg border bg-gray-50 p-4'>
                      <SearchNotFound query='gaming laptop' />
                    </div>
                  </div>
                  <div>
                    <h4 className='mb-2 font-medium'>Custom 404</h4>
                    <div className='rounded-lg border bg-gray-50 p-4'>
                      <Custom404
                        title='Custom Error'
                        message='This is a custom error message.'
                        showBackButton={false}
                      />
                    </div>
                  </div>
                </div>

                <div className='mt-6 rounded-lg bg-gray-100 p-4'>
                  <h4 className='mb-2 font-medium'>Usage:</h4>
                  <pre className='text-sm'>
                    {`import { 
  Custom404, 
  ProductNotFound, 
  SearchNotFound 
} from '@/components/ui';

// Global 404 page (automatic)
// File: src/app/not-found.tsx

// Product not found
<ProductNotFound />

// Search results
{results.length === 0 && (
  <SearchNotFound query={searchTerm} />
)}

// Custom error
<Custom404 
  title="Access Denied"
  message="You don't have permission to view this page."
/>`}
                  </pre>
                </div>
              </div>

              {/* Global 404 Info */}
              <div className='rounded-lg border border-blue-200 bg-blue-50 p-6'>
                <h3 className='mb-4 text-xl font-semibold text-blue-900'>
                  Global 404 Page
                </h3>
                <p className='mb-4 text-blue-800'>
                  A beautiful global 404 page is automatically available at any
                  non-existent URL. It includes animated elements, quick
                  navigation, and laptop store branding.
                </p>
                <div className='space-y-2'>
                  <p className='text-sm text-blue-700'>
                    <strong>Features:</strong>
                  </p>
                  <ul className='list-inside list-disc space-y-1 text-sm text-blue-700'>
                    <li>Animated 404 text with floating laptop icons</li>
                    <li>Quick navigation to popular sections</li>
                    <li>Store statistics and branding</li>
                    <li>Responsive design for all devices</li>
                    <li>Smooth animations and hover effects</li>
                  </ul>
                </div>
                <div className='mt-4'>
                  <Button
                    variant='outline'
                    className='border-blue-300 text-blue-700 hover:bg-blue-100'
                  >
                    <a
                      href='/non-existent-page'
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      View Global 404 Page
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Toast Notifications Section */}
          <section id='toasts' className='scroll-mt-8'>
            <h2 className='mb-6 text-3xl font-bold text-gray-900'>
              Toast Notifications
            </h2>
            <div className='space-y-6'>
              {/* Toast Demo */}
              <div className='rounded-lg bg-white p-6 shadow-sm'>
                <h3 className='mb-4 text-xl font-semibold'>
                  Interactive Toast Demo
                </h3>
                <p className='mb-6 text-gray-600'>
                  Click the buttons below to see different types of toast
                  notifications. They will appear in the top-right corner of
                  your screen.
                </p>

                <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
                  <Button
                    onClick={() =>
                      toast.success(
                        'Success!',
                        'Your action was completed successfully.'
                      )
                    }
                    className='bg-green-600 hover:bg-green-700'
                  >
                    Show Success
                  </Button>

                  <Button
                    onClick={() =>
                      toast.error(
                        'Error!',
                        'Something went wrong. Please try again.'
                      )
                    }
                    variant='destructive'
                  >
                    Show Error
                  </Button>

                  <Button
                    onClick={() =>
                      toast.warning(
                        'Warning!',
                        'Please check your input before proceeding.'
                      )
                    }
                    className='bg-yellow-600 hover:bg-yellow-700'
                  >
                    Show Warning
                  </Button>

                  <Button
                    onClick={() =>
                      toast.info(
                        'Info',
                        'Here&apos;s some helpful information for you.'
                      )
                    }
                    className='bg-blue-600 hover:bg-blue-700'
                  >
                    Show Info
                  </Button>
                </div>

                <div className='mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2'>
                  <div>
                    <h4 className='mb-3 font-medium'>Advanced Examples</h4>
                    <div className='space-y-2'>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() =>
                          toast.success(
                            'Item Added to Cart',
                            'MacBook Pro 16" has been added to your cart.',
                            {
                              action: {
                                label: 'View Cart',
                                onClick: () => toast.info('Cart opened!'),
                              },
                            }
                          )
                        }
                        className='w-full justify-start'
                      >
                        Toast with Action Button
                      </Button>

                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() =>
                          toast.error(
                            'Payment Failed',
                            'Your payment could not be processed.',
                            { duration: 10000 }
                          )
                        }
                        className='w-full justify-start'
                      >
                        Long Duration Toast (10s)
                      </Button>

                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() =>
                          toast.info('Quick Message', undefined, {
                            duration: 2000,
                          })
                        }
                        className='w-full justify-start'
                      >
                        Quick Toast (2s)
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h4 className='mb-3 font-medium'>Toast Management</h4>
                    <div className='space-y-2'>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => {
                          toast.success('Toast 1');
                          setTimeout(() => toast.info('Toast 2'), 500);
                          setTimeout(() => toast.warning('Toast 3'), 1000);
                        }}
                        className='w-full justify-start'
                      >
                        Show Multiple Toasts
                      </Button>

                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => toast.clearAll()}
                        className='w-full justify-start'
                      >
                        Clear All Toasts
                      </Button>
                    </div>
                  </div>
                </div>

                <div className='mt-6 rounded-lg bg-gray-100 p-4'>
                  <h4 className='mb-2 font-medium'>Usage:</h4>
                  <pre className='overflow-x-auto text-sm'>
                    {`import { useToastNotification } from '@/components/ui';

function MyComponent() {
  const toast = useToastNotification();

  const handleSuccess = () => {
    toast.success('Success!', 'Operation completed successfully.');
  };

  const handleError = () => {
    toast.error('Error!', 'Something went wrong.');
  };

  const handleWithAction = () => {
    toast.success('Item Added', 'Product added to cart.', {
      action: {
        label: 'View Cart',
        onClick: () => console.log('Cart opened')
      }
    });
  };

  const handleCustomDuration = () => {
    toast.info('Quick message', undefined, { duration: 2000 });
  };

  return (
    <div>
      <button onClick={handleSuccess}>Success</button>
      <button onClick={handleError}>Error</button>
      <button onClick={handleWithAction}>With Action</button>
      <button onClick={handleCustomDuration}>Custom Duration</button>
      <button onClick={() => toast.clearAll()}>Clear All</button>
    </div>
  );
}`}
                  </pre>
                </div>
              </div>

              {/* Toast Features */}
              <div className='rounded-lg border border-blue-200 bg-blue-50 p-6'>
                <h3 className='mb-4 text-xl font-semibold text-blue-900'>
                  Toast Features
                </h3>
                <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
                  <div>
                    <h4 className='mb-2 font-medium text-blue-900'>
                      Toast Types
                    </h4>
                    <ul className='list-inside list-disc space-y-1 text-sm text-blue-700'>
                      <li>
                        <strong>Success:</strong> Green with checkmark icon
                      </li>
                      <li>
                        <strong>Error:</strong> Red with alert circle icon
                      </li>
                      <li>
                        <strong>Warning:</strong> Yellow with warning triangle
                      </li>
                      <li>
                        <strong>Info:</strong> Blue with info circle icon
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className='mb-2 font-medium text-blue-900'>Features</h4>
                    <ul className='list-inside list-disc space-y-1 text-sm text-blue-700'>
                      <li>Smooth slide-in animations</li>
                      <li>Auto-dismiss with configurable duration</li>
                      <li>Manual close button</li>
                      <li>Action buttons for interaction</li>
                      <li>Multiple toasts stacking</li>
                      <li>Global toast management</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <section className='rounded-lg bg-blue-50 p-8 text-center'>
            <h3 className='mb-4 text-2xl font-semibold text-blue-900'>
              Ready to Use These Components?
            </h3>
            <p className='mb-6 text-blue-700'>
              All components are fully typed with TypeScript and ready for
              production use.
            </p>
            <div className='flex flex-wrap justify-center gap-4'>
              <Button variant='outline'>
                <a
                  href='https://github.com/your-repo/components'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  View Source Code
                </a>
              </Button>
              <Link href='/docs'>
                <Button>Read Documentation</Button>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
