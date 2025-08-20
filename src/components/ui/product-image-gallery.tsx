'use client';

import Image from 'next/image';
import { useCallback, useState } from 'react';

export interface ProductImageGalleryProps {
  images: string[];
  productName?: string;
  className?: string;
  mainImageClassName?: string;
  thumbnailClassName?: string;
  currentIndex?: number;
}

export default function ProductImageGallery({
  images = [],
  productName = 'Product',
  className,
  mainImageClassName,
  thumbnailClassName,
}: ProductImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageChange = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % images.length);
  }, [images.length]);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-4 ${className || ''}`}>
      <div
        className={`flex aspect-[4/5] items-center justify-center overflow-hidden rounded-2xl ${mainImageClassName || ''}`}
      >
        <Image
          src={images[currentIndex] || images[0]}
          alt={`${productName} - View ${currentIndex + 1}`}
          width={550}
          height={550}
          className='object-contain'
          priority
        />
      </div>

      {images.length > 1 && (
        <div className='relative flex items-center'>
          <button
            onClick={goToPrevious}
            className='absolute left-0 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white shadow transition-colors hover:bg-gray-100'
          >
            <i className='ri-arrow-left-s-line text-xl'></i>
          </button>

          <div className='scrollbar-hide flex max-w-[840px] space-x-3 overflow-x-auto px-10'>
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => handleImageChange(index)}
                className={`h-20 w-20 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg border-2 transition-colors ${
                  currentIndex === index
                    ? 'border-blue-500'
                    : 'border-gray-200 hover:border-gray-300'
                } ${thumbnailClassName || ''}`}
              >
                <Image
                  src={image}
                  alt={`${productName} - Thumbnail ${index + 1}`}
                  className='h-full w-full object-cover object-top'
                  width={300}
                  height={400}
                />
              </button>
            ))}
          </div>

          <button
            onClick={goToNext}
            className='absolute right-0 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white shadow transition-colors hover:bg-gray-100'
          >
            <i className='ri-arrow-right-s-line text-xl'></i>
          </button>
        </div>
      )}
    </div>
  );
}
