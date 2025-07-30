'use client';

import { Link } from '@/i18n/navigation';
import { cn } from '@/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import React, { useCallback, useEffect, useRef, useState } from 'react';

export interface BannerItem {
  id: string;
  image: string;
  href: string;
  alt?: string;
}

export interface BannerSliderProps {
  banners: BannerItem[];
  showDots?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
  height?: string | number;
  aspectRatio?: string;
}

export const BannerSlider = React.forwardRef<HTMLDivElement, BannerSliderProps>(
  (
    {
      banners,
      showDots = true,
      autoPlay = true,
      autoPlayInterval = 5000,
      className,
      height = 400,
      aspectRatio,
      ...props
    },
    ref
  ) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState(0);
    const [dragCurrent, setDragCurrent] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);
    const [hasDragged, setHasDragged] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

    const goToPrevious = useCallback(() => {
      setCurrentIndex(prev => (prev - 1 + banners.length) % banners.length);
    }, [banners.length]);

    const goToNext = useCallback(() => {
      setCurrentIndex(prev => (prev + 1) % banners.length);
    }, [banners.length]);

    const goToSlide = useCallback((index: number) => {
      setCurrentIndex(index);
    }, []);

    useEffect(() => {
      if (autoPlay && !isHovered && !isDragging && banners.length > 1) {
        autoPlayRef.current = setInterval(() => {
          setCurrentIndex(prev => (prev + 1) % banners.length);
        }, autoPlayInterval);
      } else {
        if (autoPlayRef.current) {
          clearInterval(autoPlayRef.current);
          autoPlayRef.current = null;
        }
      }

      return () => {
        if (autoPlayRef.current) {
          clearInterval(autoPlayRef.current);
        }
      };
    }, [autoPlay, isHovered, isDragging, banners.length, autoPlayInterval]);

    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        const currentX = e.clientX;
        setDragCurrent(currentX);
        setDragOffset(currentX - dragStart);

        if (Math.abs(currentX - dragStart) > 5) {
          setHasDragged(true);
        }
      };

      const handleMouseUp = () => {
        if (!isDragging) return;

        const dragDistance = dragCurrent - dragStart;
        const threshold = 50;

        if (Math.abs(dragDistance) > threshold) {
          if (dragDistance > 0) {
            goToPrevious();
          } else {
            goToNext();
          }
        }

        setIsDragging(false);
        setDragStart(0);
        setDragCurrent(0);
        setDragOffset(0);

        setTimeout(() => setHasDragged(false), 100);
      };

      if (isDragging) {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        document.body.style.userSelect = 'none';
      }

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.userSelect = '';
      };
    }, [isDragging, dragStart, dragCurrent, goToPrevious, goToNext]);

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
      setDragStart(e.clientX);
      setDragCurrent(e.clientX);
      setDragOffset(0);
      setHasDragged(false);
    }, []);

    const handleTouchStart = useCallback((e: React.TouchEvent) => {
      setIsDragging(true);
      setDragStart(e.touches[0].clientX);
      setDragCurrent(e.touches[0].clientX);
      setDragOffset(0);
      setHasDragged(false);
    }, []);

    const handleTouchMove = useCallback(
      (e: React.TouchEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        const currentX = e.touches[0].clientX;
        setDragCurrent(currentX);
        setDragOffset(currentX - dragStart);

        if (Math.abs(currentX - dragStart) > 5) {
          setHasDragged(true);
        }
      },
      [isDragging, dragStart]
    );

    const handleTouchEnd = useCallback(() => {
      if (!isDragging) return;

      const dragDistance = dragCurrent - dragStart;
      const threshold = 50;

      if (Math.abs(dragDistance) > threshold) {
        if (dragDistance > 0) {
          goToPrevious();
        } else {
          goToNext();
        }
      }

      setIsDragging(false);
      setDragStart(0);
      setDragCurrent(0);
      setDragOffset(0);

      setTimeout(() => setHasDragged(false), 100);
    }, [isDragging, dragCurrent, dragStart, goToPrevious, goToNext]);

    if (!banners || banners.length === 0) {
      return null;
    }

    const containerStyle = {
      height: typeof height === 'number' ? `${height}px` : height,
      aspectRatio: aspectRatio,
    };

    const transformX =
      -currentIndex * 100 +
      (isDragging
        ? (dragOffset / (containerRef.current?.offsetWidth || 1)) * 100
        : 0);

    return (
      <div
        ref={ref}
        className={cn('group relative overflow-hidden rounded-lg', className)}
        style={containerStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        <div
          ref={containerRef}
          className={cn(
            'flex h-full',
            isDragging
              ? 'cursor-grabbing transition-none'
              : 'cursor-grab transition-transform duration-500 ease-in-out'
          )}
          style={{
            transform: `translateX(${transformX}%)`,
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className='relative h-full min-w-full'
              style={{ userSelect: 'none' }}
            >
              <Link
                href={banner.href}
                className='relative block size-full'
                onClick={e => {
                  if (hasDragged || isDragging || Math.abs(dragOffset) > 5) {
                    e.preventDefault();
                  }
                }}
              >
                <Image
                  src={banner.image}
                  alt={banner.alt || 'Banner Image'}
                  fill
                  className='pointer-events-none object-cover transition-transform duration-300'
                  priority={index === 0}
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw'
                  draggable={false}
                />
              </Link>
            </div>
          ))}
        </div>

        {banners.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className={cn(
                'absolute top-1/2 left-4 z-10 -translate-y-1/2',
                'flex h-12 w-12 items-center justify-center rounded-full',
                'bg-black/30 text-white backdrop-blur-sm',
                'cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-black/70',
                'focus:ring-2 focus:ring-white/50 focus:outline-none'
              )}
              aria-label='Previous banner'
            >
              <ChevronLeft className='h-6 w-6' />
            </button>

            <button
              onClick={goToNext}
              className={cn(
                'absolute top-1/2 right-4 z-10 -translate-y-1/2',
                'flex h-12 w-12 items-center justify-center rounded-full',
                'bg-black/30 text-white backdrop-blur-sm',
                'cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-black/70',
                'focus:ring-2 focus:ring-white/50 focus:outline-none'
              )}
              aria-label='Next banner'
            >
              <ChevronRight className='h-6 w-6' />
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {showDots && banners.length > 1 && (
          <div className='absolute bottom-4 left-1/2 z-10 -translate-x-1/2'>
            <div className='flex space-x-2'>
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    'size-1.5 rounded-full transition-all duration-300',
                    index === currentIndex
                      ? 'scale-125 bg-black'
                      : 'bg-black/30 hover:bg-black'
                  )}
                  aria-label={`Go to banner ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
);

BannerSlider.displayName = 'BannerSlider';
