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
    <div className={`space-y-6 ${className || ''}`}>
      <div
        className={`group relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg ring-1 ring-gray-200/50 transition-all duration-300 ${mainImageClassName || ''}`}
      >
        <Image
          src={images[currentIndex] || images[0]}
          alt={`${productName} - View ${currentIndex + 1}`}
          width={550}
          height={550}
          className='object-contain transition-transform duration-300'
          priority
        />

        {images.length > 1 && (
          <div className='absolute top-4 right-4 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm'>
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className='relative flex items-center justify-center'>
          <button
            onClick={goToPrevious}
            className='absolute left-0 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-all duration-200 hover:bg-gray-50 hover:shadow-lg focus:ring-2 focus:ring-blue-500/50 focus:outline-none'
          >
            <i className='ri-arrow-left-s-line text-lg text-gray-600'></i>
          </button>

          <div className='scrollbar-hide mx-12 flex max-w-[500px] space-x-3 overflow-x-auto px-2 py-2'>
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => handleImageChange(index)}
                className={`group relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200 hover:scale-105 focus:ring-2 focus:ring-offset-2 focus:outline-none ${
                  currentIndex === index
                    ? 'border-blue-500 shadow-md ring-2 ring-blue-200'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                } ${thumbnailClassName || ''}`}
              >
                <Image
                  src={image}
                  alt={`${productName} - Thumbnail ${index + 1}`}
                  className={`h-full w-full object-cover transition-all duration-200 ${
                    currentIndex === index
                      ? 'brightness-100'
                      : 'brightness-90 group-hover:brightness-100'
                  }`}
                  width={300}
                  height={400}
                />

                {currentIndex === index && (
                  <div className='absolute inset-0 rounded-xl bg-blue-500/10 ring-2 ring-blue-500/30 ring-inset'></div>
                )}
              </button>
            ))}
          </div>

          <button
            onClick={goToNext}
            className='absolute right-0 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-all duration-200 hover:bg-gray-50 hover:shadow-lg focus:ring-2 focus:ring-blue-500/50 focus:outline-none'
          >
            <i className='ri-arrow-right-s-line text-lg text-gray-600'></i>
          </button>
        </div>
      )}
    </div>
  );
}
