'use client';

import { PageLoading } from '@/components/ui';
import { mainBanners } from '@/data/banners';
import { Product, productApi } from '@/lib/api/products.api';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

const BannerSlider = dynamic(() =>
  import('@/components/ui/banner-slider').then(mod => ({
    default: mod.BannerSlider,
  }))
);

const ProductItem = dynamic(() =>
  import('@/components/ui/product-item').then(mod => ({
    default: mod.ProductItem,
  }))
);

export default function SearchPage() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState<
    'default' | 'price-low-high' | 'price-high-low'
  >('default');

  const fetchData = useCallback(async () => {
    if (!keyword) return;
    setLoading(true);

    try {
      const product = await productApi.searchProducts(keyword);
      setProducts(product.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, [keyword]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <PageLoading />;

  const getSortedProducts = () => {
    if (sortBy === 'default') return products;

    return [...products].sort((a, b) => {
      const priceA =
        a.variants?.[0]?.price *
        (1 - (a.variants?.[0]?.percentagePercent ?? 0) / 100);

      const priceB =
        b.variants?.[0]?.price *
        (1 - (b.variants?.[0]?.percentagePercent ?? 0) / 100);

      return sortBy === 'price-low-high' ? priceA - priceB : priceB - priceA;
    });
  };

  const displayedProducts = getSortedProducts();

  return (
    <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
      <BannerSlider
        banners={mainBanners}
        aspectRatio='16 / 9'
        autoPlay={true}
        height={400}
        className='mt-5 mb-6 w-full'
      />

      {products.length > 0 && (
        <div className='mb-6 flex items-center justify-between'>
          <p className='text-gray-600'>
            Tìm thấy {products.length} sản phẩm cho từ khóa `&quot;`{keyword}
            `&quot;`
          </p>
          <div className='flex items-center gap-2'>
            <label htmlFor='sort' className='text-sm font-medium text-gray-700'>
              Sắp xếp theo:
            </label>
            <select
              id='sort'
              value={sortBy}
              onChange={e => setSortBy(e.target.value as typeof sortBy)}
              className='rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none'
            >
              <option value='default'>Mặc định</option>
              <option value='price-low-high'>Giá: Thấp đến Cao</option>
              <option value='price-high-low'>Giá: Cao đến Thấp</option>
            </select>
          </div>
        </div>
      )}

      <div className='my-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4'>
        {displayedProducts?.map(product => (
          <ProductItem key={product.id} {...product} />
        ))}
      </div>

      {!loading && products.length === 0 && keyword && (
        <div className='py-12 text-center'>
          <p className='text-lg text-gray-500'>
            Không tìm thấy sản phẩm nào cho từ khóa `&quot;`{keyword}`&quot;`
          </p>
          <p className='mt-2 text-sm text-gray-400'>
            Vui lòng thử từ khóa khác.
          </p>
        </div>
      )}
    </div>
  );
}
