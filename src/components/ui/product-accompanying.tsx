'use client';

import { Product, productApi } from '@/lib/api/products.api';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ProductItem } from './product-item';





function formatVND(price: number) {
  return price.toLocaleString('vi-VN') + '₫';
}

export default function ProductCombo({ categoryId }: { categoryId?: string }) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]); // mặc định chưa chọn

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

  const toggleProduct = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };




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
  
    <div className='relative mt-8'>
      {/* nút scroll left */}

      <button
        onClick={scrollLeft}
        className='absolute top-1/2 left-0 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow hover:bg-gray-100'
      >
        <i className='ri-arrow-left-s-line text-xl'></i>
      </button>

      {/* container scroll ngang */}

      <div
        ref={scrollRef}
        // className='mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4'
        className='scrollbar-hide flex gap-3 overflow-x-auto scroll-smooth pr-12'
      >
        {product?.map(product => (
          <ProductItem key={product.id} {...product} />
        ))}
      </div>

      {/* nút scroll right */}
      <button
        onClick={scrollRight}
        className='absolute top-1/2 right-0 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow hover:bg-gray-100'
      >
        <i className='ri-arrow-right-s-line text-xl'></i>
      </button>
    </div>
  );
}
