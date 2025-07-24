import { cn } from '@/utils';
import * as React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  animation?: 'pulse' | 'wave' | 'none';
  width?: string | number;
  height?: string | number;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      className,
      variant = 'text',
      animation = 'pulse',
      width,
      height,
      style,
      ...props
    },
    ref
  ) => {
    const baseClasses = 'bg-gray-200 dark:bg-gray-700';

    const variantClasses = {
      text: 'rounded',
      circular: 'rounded-full',
      rectangular: '',
      rounded: 'rounded-lg',
    };

    const animationClasses = {
      pulse: 'animate-pulse',
      wave: 'animate-pulse', // Could be enhanced with custom wave animation
      none: '',
    };

    const combinedStyle = {
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
      ...style,
    };

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          animationClasses[animation],
          className
        )}
        style={combinedStyle}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

// Predefined skeleton components for common use cases
export const TextSkeleton = ({
  lines = 1,
  className,
  ...props
}: {
  lines?: number;
  className?: string;
} & Omit<SkeletonProps, 'variant'>) => (
  <div className={cn('space-y-2', className)}>
    {Array.from({ length: lines }, (_, i) => (
      <Skeleton
        key={i}
        variant='text'
        height={16}
        width={i === lines - 1 ? '75%' : '100%'}
        {...props}
      />
    ))}
  </div>
);

export const AvatarSkeleton = ({
  size = 40,
  className,
  ...props
}: {
  size?: number;
  className?: string;
} & Omit<SkeletonProps, 'variant'>) => (
  <Skeleton
    variant='circular'
    width={size}
    height={size}
    className={className}
    {...props}
  />
);

export const ImageSkeleton = ({
  width = '100%',
  height = 200,
  className,
  ...props
}: {
  width?: string | number;
  height?: string | number;
  className?: string;
} & Omit<SkeletonProps, 'variant'>) => (
  <Skeleton
    variant='rectangular'
    width={width}
    height={height}
    className={className}
    {...props}
  />
);

export const CardSkeleton = ({ className }: { className?: string }) => (
  <div className={cn('space-y-4 p-4', className)}>
    <ImageSkeleton height={160} className='rounded-lg' />
    <div className='space-y-2'>
      <Skeleton height={20} width='80%' />
      <TextSkeleton lines={2} />
      <Skeleton height={16} width='60%' />
    </div>
  </div>
);

export const LaptopCardSkeleton = ({ className }: { className?: string }) => (
  <div className={cn('space-y-4 rounded-lg border p-4', className)}>
    <ImageSkeleton height={200} className='rounded-lg' />
    <div className='space-y-3'>
      <Skeleton height={24} width='90%' /> {/* Title */}
      <div className='flex items-center space-x-2'>
        <Skeleton height={20} width={80} /> {/* Price */}
        <Skeleton height={16} width={60} /> {/* Original price */}
      </div>
      <TextSkeleton lines={2} /> {/* Description */}
      <div className='flex flex-wrap gap-2'>
        <Skeleton height={20} width={60} /> {/* Spec 1 */}
        <Skeleton height={20} width={70} /> {/* Spec 2 */}
        <Skeleton height={20} width={50} /> {/* Spec 3 */}
      </div>
      <Skeleton height={36} width='100%' className='rounded' /> {/* Button */}
    </div>
  </div>
);

export const TableRowSkeleton = ({
  columns = 4,
  className,
}: {
  columns?: number;
  className?: string;
}) => (
  <tr className={className}>
    {Array.from({ length: columns }, (_, i) => (
      <td key={i} className='px-4 py-3'>
        <Skeleton height={16} width='80%' />
      </td>
    ))}
  </tr>
);

export { Skeleton };
