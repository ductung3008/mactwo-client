'use client';

import { Product, productApi } from '@/lib/api/products.api';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Loading } from './loading';
import { ProductItem } from './product-item';

export default function ProductCombo({ categoryId }: { categoryId?: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const fetchData = useCallback(async () => {
    if (!categoryId) return;
    setLoading(true);
    try {
      const res = await productApi.getProductByCategoryId(categoryId);
      setProducts(res.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const scrollByCard = (direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (!container) return;

    const firstCard = container.querySelector<HTMLElement>('div');
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth + 16; // 16px gap-4
    container.scrollBy({
      left: direction === 'right' ? cardWidth : -cardWidth,
      behavior: 'smooth',
    });
  };

  if (!categoryId) return null; // ❌ không cần render gì nếu chưa có categoryId
  if (loading) return <Loading />;

  if (!products.length) {
    return (
      <p className='py-4 text-center text-gray-500'>Không có sản phẩm nào</p>
    );
  }

  return (
    <div className='relative mt-4'>
      {/* Nút scroll left */}
      <button
        onClick={() => scrollByCard('left')}
        className='group absolute top-1/2 left-2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/90 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white hover:shadow-xl'
        aria-label='Scroll left'
      >
        <i className='ri-arrow-left-s-line text-xl text-gray-700 transition-colors group-hover:text-gray-900'></i>
      </button>

      {/* Danh sách sản phẩm */}
      <div
        ref={scrollRef}
        className='scrollbar-hide flex gap-4 overflow-x-auto scroll-smooth py-4'
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map(p => (
          <ProductItem key={p.id} {...p} />
        ))}
      </div>

      {/* Nút scroll right */}
      <button
        onClick={() => scrollByCard('right')}
        className='group absolute top-1/2 right-2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/90 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white hover:shadow-xl'
        aria-label='Scroll right'
      >
        <i className='ri-arrow-right-s-line text-xl text-gray-700 transition-colors group-hover:text-gray-900'></i>
      </button>
    </div>
  );
}
