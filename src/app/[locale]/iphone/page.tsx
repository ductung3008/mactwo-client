'use client';

import { BannerSlider, ProductItem } from '@/components/ui';
import { mainBanners } from '@/data/banners';
import { products } from '@/data/product-iphone';
export default function IphonePage() {
  return (
    <main className='min-h-screen bg-gray-50'>
      <BannerSlider
        banners={mainBanners}
        aspectRatio='16 / 9'
        autoPlay={true}
        height={600}
        className='mb-12 w-full'
      />

      <div className='mx-auto mb-12 max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div>
          {/* Product List */}
          <h1 className='mb-4 text-2xl font-bold'>Tất cả iPhone</h1>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {products.map(product => (
              <ProductItem key={product.id} {...product} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
