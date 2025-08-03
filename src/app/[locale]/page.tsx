import { BannerSlider } from '@/components/ui';
import CategorySection from '@/components/ui/category-section';
import { mainBanners, secondaryBanners } from '@/data/banners';
import { categories } from '@/data/categories';
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('homepage');

  return (
    <main className='min-h-screen bg-gray-50'>
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
          {categories.map(category => (
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
