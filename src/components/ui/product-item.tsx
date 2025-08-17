'use client';

import { Link } from '@/i18n/navigation';
import { ProductVariant } from '@/lib/api/variants.api';
import { cn } from '@/utils';
import { Flame, Tag } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ReactNode, useState } from 'react';
import { ImageSkeleton, Skeleton } from './skeleton';
import { slugify } from './slugify';

export interface ProductItemProps {
  id?: string;
  name: string;
  code?: string;
  categoryName?: string;
  newPrice?: number;
  oldPrice?: number;
  imageUrl: string;
  promotionPercentage?: number;
  tag?: 'new' | 'installment' | 'hot' | string;
  className?: string;
  href?: string;
  customTag?: ReactNode;
  imageClassName?: string;
  contentClassName?: string;
  priceClassName?: string;
  titleClassName?: string;
  currency?: string;
  locale?: string;
  loading?: boolean;
  lazy?: boolean;
  priority?: boolean;
  variants?: ProductVariant[];
}

export function ProductItem({
  id,
  name,
  code,
  categoryName,
  newPrice,
  oldPrice,
  imageUrl,
  promotionPercentage,
  tag,
  className,
  href,
  customTag,
  imageClassName,
  contentClassName,
  priceClassName,
  titleClassName,
  currency = 'VND',
  locale = 'vi-VN',
  loading = false,
  lazy = true,
  priority = false,
  variants,
}: ProductItemProps) {
  const t = useTranslations('productItem');
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  // const linkHref =
  //   href || (categoryName && code ? `/${categoryName}/${code}` : '#');
  const linkHref = `/iphone/${slugify(categoryName || '')}?id=${id}`;

  // const formattedOldPrice = oldPrice?.toLocaleString(locale, {
  //   style: 'currency',
  //   currency,
  // });
  const formattedOldPrice = variants?.[0]?.price?.toLocaleString(locale, {
    style: 'currency',
    currency,
  });
  const newPrices =
    (variants?.[0]?.price ?? 0) *
    ((100 - (variants?.[0]?.stockQuantity ?? 0)) / 100);
  const formattedNewPrice = newPrices.toLocaleString(locale, {
    style: 'currency',
    currency,
  });

  const renderTag = () => {
    if (loading) return null;
    if (customTag) return customTag;
    if (!tag) return null;

    const tagConfig = {
      new: {
        icon: <Tag className='size-4' />,
        className: 'border-green-700 text-green-700',
        text: t('new'),
      },
      installment: {
        icon: null,
        className: 'border-blue-700 text-blue-700',
        text: t('installment'),
      },
      hot: {
        icon: <Flame className='size-4' />,
        className: 'border-red-700 text-red-700',
        text: t('hot'),
      },
    };

    const config = tagConfig[tag as keyof typeof tagConfig];
    if (!config) {
      return (
        <span className='absolute top-2 right-2 flex gap-1 rounded-lg border border-gray-700 px-3 py-1.5 text-xs font-bold text-gray-700'>
          {tag}
        </span>
      );
    }

    return (
      <span
        className={cn(
          'absolute top-2 right-2 flex gap-1 rounded-lg border px-3 py-1.5 text-xs font-bold',
          config.className
        )}
      >
        {config.icon}
        {config.text}
      </span>
    );
  };

  const renderImage = () => {
    if (loading) {
      return (
        <ImageSkeleton
          height={240}
          className={cn('rounded-lg', imageClassName)}
        />
      );
    }

    return (
      <div className='relative'>
        {imageLoading && (
          <ImageSkeleton
            height={240}
            className={cn('absolute inset-0 rounded-lg', imageClassName)}
          />
        )}
        <Image
          src={imageUrl}
          alt={name}
          width={240}
          height={240}
          loading={lazy ? 'lazy' : priority ? 'eager' : undefined}
          priority={priority}
          className={cn(
            'size-full rounded-lg object-cover transition-opacity duration-300',
            imageLoading ? 'opacity-0' : 'opacity-100',
            imageClassName
          )}
          onLoad={() => setImageLoading(false)}
          onError={() => {
            setImageLoading(false);
            setImageError(true);
          }}
        />
        {imageError && (
          <div className='absolute inset-0 flex items-center justify-center rounded-lg bg-gray-100'>
            <span className='text-sm text-gray-400'>Failed to load</span>
          </div>
        )}
      </div>
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className={cn('space-y-3', contentClassName)}>
          <div className='space-y-2'>
            <Skeleton height={20} width='90%' />
            <Skeleton height={20} width='75%' />
          </div>
          <div className='flex items-center justify-between'>
            <Skeleton height={18} width={80} />
            <Skeleton height={16} width={60} />
          </div>
        </div>
      );
    }

    return (
      <div className={cn(contentClassName)}>
        <h3
          className={cn(
            'line-clamp-2 max-h-14 min-h-14 overflow-hidden text-lg leading-7 font-bold text-ellipsis',
            titleClassName
          )}
          title={name}
        >
          {name}
        </h3>
        <div
          className={cn(
            'mt-1 flex items-center justify-between',
            priceClassName
          )}
        >
          <span className='mr-1 text-base font-bold text-[#0066cc]'>
            {formattedNewPrice}
          </span>
          {/* {!!oldPrice && oldPrice > 0 && oldPrice !== newPrice && (
            <span className='mx-1 text-sm text-gray-500 line-through'>
              {formattedOldPrice}
            </span>
          )} */}
          {!!variants?.[0]?.price && variants?.[0]?.price > 0 && (
            <span className='mx-1 text-sm text-gray-500 line-through'>
              {formattedOldPrice}
            </span>
          )}
        </div>
      </div>
    );
  };

  const content = (
    <>
      <div className={cn('mx-2 my-3 size-60', imageClassName)}>
        {renderImage()}
      </div>

      <div>
        {/* {!!promotionPercentage && promotionPercentage > 0 && (
          <span className='absolute top-0 -left-1 flex h-8 w-21 justify-center bg-[url("/price-ratio.png")] bg-cover bg-no-repeat pt-1.5 text-xs font-bold text-white'>
            {loading ? '' : t('promotion', { percentage: promotionPercentage })}
          </span>
        )} */}
        {!!variants?.[0]?.stockQuantity && variants?.[0]?.stockQuantity > 0 && (
          <span className='absolute top-0 -left-1 flex h-8 w-21 justify-center bg-[url("/price-ratio.png")] bg-cover bg-no-repeat pt-1.5 text-xs font-bold text-white'>
            {loading
              ? ''
              : t('promotion', { percentage: variants?.[0]?.stockQuantity })}
          </span>
        )}
        {renderTag()}
      </div>

      {renderContent()}
    </>
  );

  return (
    <Link
      href={linkHref}
      data-product-id={id}
      className={cn(
        'relative size-full rounded-xl bg-white px-5 pt-6 pb-4 shadow-lg transition-shadow duration-300 hover:shadow-2xl',
        loading && 'pointer-events-none',
        className
      )}
    >
      {content}
    </Link>
  );
}

export function ProductItemSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'relative size-full rounded-xl px-5 pt-6 pb-4 shadow-lg',
        className
      )}
    >
      <div className='mx-2 my-3 size-60'>
        <ImageSkeleton height={240} className='rounded-lg' />
      </div>

      <div className='relative'>
        <Skeleton
          width={60}
          height={32}
          className='absolute top-0 -left-1 rounded-r-lg'
        />
        <Skeleton
          width={50}
          height={28}
          className='absolute top-2 right-2 rounded-lg'
        />
      </div>

      <div className='space-y-3'>
        <div className='space-y-2'>
          <Skeleton height={20} width='90%' />
          <Skeleton height={20} width='75%' />
        </div>
        <div className='flex items-center justify-between'>
          <Skeleton height={18} width={80} />
          <Skeleton height={16} width={60} />
        </div>
      </div>
    </div>
  );
}
