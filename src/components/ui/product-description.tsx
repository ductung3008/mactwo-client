'use client';

import { Product } from '@/lib/api/products.api';
import Image from 'next/image';

interface ProductDescriptionProps {
  product: Product | null;
}

export default function ProductDescription({
  product,
}: ProductDescriptionProps) {
  if (!product) {
    return (
      <div className='flex items-center justify-center p-8'>
        <div className='text-lg text-gray-500'>Không có thông tin sản phẩm</div>
      </div>
    );
  }

  return (
    <div className='mx-auto max-w-6xl space-y-12 p-6'>
      <div className='space-y-2 text-center'>
        <h2 className='mb-2 text-3xl font-bold text-gray-900'>
          Mô tả sản phẩm
        </h2>
        <div className='mx-auto h-1 w-24 rounded-full bg-blue-600'></div>
      </div>

      {product.description && (
        <div className='space-y-4'>
          <h3 className='border-b-2 border-gray-200 pb-2 text-xl font-semibold text-gray-800'>
            Thông tin sản phẩm
          </h3>
          <div className='rounded-lg bg-gray-50 p-6'>
            <p className='text-base leading-relaxed whitespace-pre-wrap text-gray-700'>
              {product.description}
            </p>
          </div>
        </div>
      )}

      {product.variants[0]?.imageUrls &&
        product.variants[0].imageUrls.length > 0 && (
          <div className='space-y-6'>
            <h3 className='border-b-2 border-gray-200 pb-2 text-xl font-semibold text-gray-800'>
              Ảnh sản phẩm
            </h3>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              {product.variants[0].imageUrls.map((src, idx) => (
                <div
                  key={idx}
                  className='relative overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl'
                >
                  <Image
                    src={src}
                    alt={`Mô tả sản phẩm ${idx + 1}`}
                    width={1200}
                    height={700}
                    className='h-auto w-full object-cover transition-transform duration-300 hover:scale-105'
                    priority={idx === 0}
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100'></div>
                </div>
              ))}
            </div>
          </div>
        )}

      {(!product.variants[0]?.imageUrls ||
        product.variants[0].imageUrls.length === 0) &&
        !product.description && (
          <div className='py-12 text-center'>
            <div className='text-lg text-gray-400'>
              Không có thông tin sản phẩm bổ sung
            </div>
          </div>
        )}
    </div>
  );
}
