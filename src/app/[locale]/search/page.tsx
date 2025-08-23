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
  }, [keyword]);

  if (loading) return <PageLoading />;

  const sortedProducts = [...products].sort((a, b) => {
    const priceA =
      a.variants?.[0]?.price *
      (1 - (a.variants?.[0]?.percentagePercent ?? 0) / 100);

    const priceB =
      b.variants?.[0]?.price *
      (1 - (b.variants?.[0]?.percentagePercent ?? 0) / 100);

    return priceB - priceA;
  });

  return (
    <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
      <BannerSlider
        banners={mainBanners}
        aspectRatio='16 / 9'
        autoPlay={true}
        height={400}
        className='mt-5 mb-6 w-full'
      />

      <div className='my-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4'>
        {sortedProducts?.map(product => (
          <ProductItem key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
