'use client';

import { Product, productApi } from '@/lib/api/products.api';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ProductItem } from './product-item';

export default function ProductCombo({ categoryId }: { categoryId?: string }) {
  const [product, setProduct] = useState<Product[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const product = await productApi.getProductByCategoryId(categoryId || '');
      setProduct(product.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }, [categoryId]);

  useEffect(() => {
    fetchData();
  }, [categoryId, fetchData]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const card = container.querySelector('div'); // lấy card đầu tiên
      if (card) {
        const cardWidth = (card as HTMLElement).offsetWidth + 16; // cộng thêm gap-4 (16px)
        container.scrollBy({
          left: direction === 'right' ? cardWidth : -cardWidth,
          behavior: 'smooth',
        });
      }
    }
  };

  const scrollLeft = () => scrollByCard('left');
  const scrollRight = () => scrollByCard('right');

  return (
    <div className='relative mt-4'>
      <button
        onClick={scrollLeft}
        className='group absolute top-1/2 left-2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/90 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white hover:shadow-xl'
        aria-label='Scroll left'
      >
        <i className='ri-arrow-left-s-line text-xl text-gray-700 transition-colors group-hover:text-gray-900'></i>
      </button>

      <div
        ref={scrollRef}
        className='scrollbar-hide flex gap-4 overflow-x-auto scroll-smooth py-4'
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {product?.map(product => (
          <ProductItem key={product.id} {...product} />
        ))}
      </div>

      <button
        onClick={scrollRight}
        className='group absolute top-1/2 right-2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/90 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white hover:shadow-xl'
        aria-label='Scroll right'
      >
        <i className='ri-arrow-right-s-line text-xl text-gray-700 transition-colors group-hover:text-gray-900'></i>
      </button>
    </div>
  );
}
