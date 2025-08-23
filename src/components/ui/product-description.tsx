'use client';

import { Product } from '@/lib/api/products.api';
import Image from 'next/image';
interface ProductDescriptionProps {
  product: Product | null;
}
export default function ProductDescription({
  product,
}: ProductDescriptionProps) {
  return (
    <div className='space-y-8'>
      {/* Hình ảnh sản phẩm */}
      <div className='space-y-4'>
        {product?.variants[0].imageUrls.map((src, idx) => (
          <Image
            key={idx}
            src={src}
            alt={`Mô tả sản phẩm ${idx + 1}`}
            width={1200}
            height={700}
          />
        ))}
      </div>

      {/* Danh sách mô tả sản phẩm */}
      <ul className='space-y-6'>
        {/* {details.map((item, idx) => ( */}
        {/* <li key={idx} className='text-gray-700'> */}
        {/* <span className='font-semibold text-blue-600'>{item.title}:</span> */}
        <span className='mt-1 text-sm leading-relaxed'>
          {product?.description}
        </span>
        {/* </li> */}
        {/* ))} */}
      </ul>
    </div>
  );
}
