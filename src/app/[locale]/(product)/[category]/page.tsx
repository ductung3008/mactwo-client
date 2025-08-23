import { slugify } from '@/components/ui/slugify';
import { mainBanners } from '@/data/banners';
import { Link } from '@/i18n/navigation';
import { categoryApi } from '@/lib/api/categories.api';
import { productApi } from '@/lib/api/products.api';
import DOMPurify from 'dompurify';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import './style.css';

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

export default async function CategoryPage({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) {
  const { id } = await searchParams;

  if (!id) return notFound();

  try {
    const [categoryResponse, productsResponse] = await Promise.all([
      categoryApi.getCategoryById(id),
      productApi.getProductByCategoryId(id),
    ]);

    const category = categoryResponse.data;
    const products = productsResponse.data;

    if (!category || !products) return notFound();

    return (
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <BannerSlider
          banners={mainBanners}
          aspectRatio='16 / 9'
          autoPlay={true}
          height={400}
          className='mt-5 mb-6 w-full'
        />

        <div className='flex flex-row flex-wrap gap-4'>
          {category?.children?.map(category => (
            <Link
              key={category.id}
              className='rounded-xl bg-white px-4 py-2 shadow-md hover:bg-gray-100'
              href={{
                pathname: slugify(category.categoryName),
                query: { id: category.id },
              }}
            >
              <span className='text-sm text-black'>
                {category.categoryName}
              </span>
            </Link>
          ))}
        </div>

        <div className='my-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4'>
          {products?.map(product => (
            <ProductItem key={product.id} {...product} />
          ))}
        </div>

        {category.content && (
          <div
            className='prose prose-lg description my-10 max-w-none rounded-xl bg-white p-6 shadow-md'
            dangerouslySetInnerHTML={{
              __html:
                typeof window !== 'undefined'
                  ? DOMPurify.sanitize(category.content)
                  : category.content,
            }}
          />
        )}
      </div>
    );
  } catch (err) {
    console.error(err);
    return notFound();
  }
}
