import { Button, ProductItem } from '@/components/ui';
import { Link } from '@/i18n/navigation';
import { Category } from '@/lib/api/categories.api';
import { ChevronRight } from 'lucide-react';
import { memo } from 'react';

interface CategorySectionProps {
  category: Category;
  viewAllText: string;
}

const CategorySection = memo(
  ({ category, viewAllText }: CategorySectionProps) => {
    return (
      <section className='mb-12'>
        <h2 className='mb-4 text-center text-3xl font-bold'>{category.name}</h2>
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          {category.products?.map(product => (
            <ProductItem key={product.id} {...product} />
          ))}
        </div>
        <div className='mt-6 flex justify-center'>
          <Link href={`/${category.slug}?id=${category.id}`}>
            <Button className='border bg-transparent text-blue-600 hover:text-white'>
              {viewAllText} {category.name}
              <ChevronRight />
            </Button>
          </Link>
        </div>
      </section>
    );
  }
);

CategorySection.displayName = 'CategorySection';

export default CategorySection;
