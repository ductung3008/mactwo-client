import { cn } from '@/utils';
import * as React from 'react';

export interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'spinner' | 'dots' | 'pulse' | 'bars';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'white' | 'gray';
  text?: string;
  fullScreen?: boolean;
}

const Loading = React.forwardRef<HTMLDivElement, LoadingProps>(
  (
    {
      className,
      variant = 'spinner',
      size = 'md',
      color = 'primary',
      text,
      fullScreen = false,
      ...props
    },
    ref
  ) => {
    const sizes = {
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
      xl: 'w-12 h-12',
    };

    const colors = {
      primary: 'text-blue-600',
      secondary: 'text-gray-600',
      white: 'text-white',
      gray: 'text-gray-400',
    };

    const textSizes = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
      xl: 'text-lg',
    };

    const containerClasses = cn(
      'flex flex-col items-center justify-center gap-2',
      fullScreen &&
        'fixed inset-0 bg-white/80 backdrop-blur-sm z-50 min-h-screen',
      !fullScreen && 'py-4',
      className
    );

    const renderSpinner = () => (
      <div
        className={cn(
          'animate-spin rounded-full border-2 border-current border-t-transparent',
          sizes[size],
          colors[color]
        )}
      />
    );

    const renderDots = () => (
      <div className={cn('flex space-x-1', colors[color])}>
        <div
          className={cn(
            'animate-bounce rounded-full bg-current',
            size === 'sm' && 'h-1 w-1',
            size === 'md' && 'h-1.5 w-1.5',
            size === 'lg' && 'h-2 w-2',
            size === 'xl' && 'h-3 w-3'
          )}
          style={{ animationDelay: '0ms' }}
        />
        <div
          className={cn(
            'animate-bounce rounded-full bg-current',
            size === 'sm' && 'h-1 w-1',
            size === 'md' && 'h-1.5 w-1.5',
            size === 'lg' && 'h-2 w-2',
            size === 'xl' && 'h-3 w-3'
          )}
          style={{ animationDelay: '150ms' }}
        />
        <div
          className={cn(
            'animate-bounce rounded-full bg-current',
            size === 'sm' && 'h-1 w-1',
            size === 'md' && 'h-1.5 w-1.5',
            size === 'lg' && 'h-2 w-2',
            size === 'xl' && 'h-3 w-3'
          )}
          style={{ animationDelay: '300ms' }}
        />
      </div>
    );

    const renderPulse = () => (
      <div
        className={cn(
          'animate-pulse rounded-full bg-current',
          sizes[size],
          colors[color]
        )}
      />
    );

    const renderBars = () => (
      <div className={cn('flex items-end space-x-1', colors[color])}>
        <div
          className={cn(
            'animate-pulse bg-current',
            size === 'sm' && 'h-2 w-0.5',
            size === 'md' && 'h-3 w-1',
            size === 'lg' && 'h-4 w-1',
            size === 'xl' && 'h-6 w-1.5'
          )}
          style={{ animationDelay: '0ms' }}
        />
        <div
          className={cn(
            'animate-pulse bg-current',
            size === 'sm' && 'h-3 w-0.5',
            size === 'md' && 'h-4 w-1',
            size === 'lg' && 'h-6 w-1',
            size === 'xl' && 'h-8 w-1.5'
          )}
          style={{ animationDelay: '150ms' }}
        />
        <div
          className={cn(
            'animate-pulse bg-current',
            size === 'sm' && 'h-4 w-0.5',
            size === 'md' && 'h-5 w-1',
            size === 'lg' && 'h-7 w-1',
            size === 'xl' && 'h-10 w-1.5'
          )}
          style={{ animationDelay: '300ms' }}
        />
        <div
          className={cn(
            'animate-pulse bg-current',
            size === 'sm' && 'h-3 w-0.5',
            size === 'md' && 'h-4 w-1',
            size === 'lg' && 'h-6 w-1',
            size === 'xl' && 'h-8 w-1.5'
          )}
          style={{ animationDelay: '450ms' }}
        />
        <div
          className={cn(
            'animate-pulse bg-current',
            size === 'sm' && 'h-2 w-0.5',
            size === 'md' && 'h-3 w-1',
            size === 'lg' && 'h-4 w-1',
            size === 'xl' && 'h-6 w-1.5'
          )}
          style={{ animationDelay: '600ms' }}
        />
      </div>
    );

    const renderLoader = () => {
      switch (variant) {
        case 'dots':
          return renderDots();
        case 'pulse':
          return renderPulse();
        case 'bars':
          return renderBars();
        default:
          return renderSpinner();
      }
    };

    return (
      <div ref={ref} className={containerClasses} {...props}>
        {renderLoader()}
        {text && (
          <p
            className={cn(
              'font-medium',
              textSizes[size],
              colors[color],
              'animate-pulse'
            )}
          >
            {text}
          </p>
        )}
      </div>
    );
  }
);

Loading.displayName = 'Loading';

// Additional utility components for common use cases
export const PageLoading = ({ text = 'Loading...' }: { text?: string }) => (
  <Loading variant='spinner' size='lg' text={text} fullScreen />
);

export const ButtonLoading = ({ size = 'sm' }: { size?: 'sm' | 'md' }) => (
  <Loading variant='spinner' size={size} color='white' />
);

export const SectionLoading = ({
  text = 'Loading...',
  variant = 'spinner',
}: {
  text?: string;
  variant?: 'spinner' | 'dots' | 'pulse' | 'bars';
}) => (
  <div className='flex items-center justify-center py-12'>
    <Loading variant={variant} size='md' text={text} color='primary' />
  </div>
);

export const InlineLoading = ({ size = 'sm' }: { size?: 'sm' | 'md' }) => (
  <Loading variant='spinner' size={size} color='gray' />
);

export { Loading };
