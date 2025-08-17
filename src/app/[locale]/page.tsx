'use client';
import { BannerSlider } from '@/components/ui';
import CategorySection from '@/components/ui/category-section';
import { mainBanners, secondaryBanners } from '@/data/banners';
import { categories } from '@/data/categories';
import { Category } from '@/lib/api/categories.api';
import { Product, productApi } from '@/lib/api/products.api';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const t = useTranslations('homepage');
  const [productTop, setProductTop] = useState<Category[]>([]);

  const fetchData = async () => {
    try {
      const product = await productApi.getTopProductByCategory();

      setProductTop(product.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log('products', productTop);

  return (
    <main className='min-h-screen'>
      <BannerSlider
        banners={mainBanners}
        aspectRatio='16 / 9'
        autoPlay={true}
        height={600}
        className='mb-12 w-full'
      />

      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <BannerSlider
          banners={secondaryBanners}
          aspectRatio='16 / 9'
          autoPlay={true}
          height={166}
          className='mb-12 w-full'
          showDots={false}
        />

        <div>
          {productTop.map(category => (
            <CategorySection
              key={category.id}
              category={category}
              viewAllText={t('viewAll')}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
