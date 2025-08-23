'use client';

import { Button } from '@/components/ui/button';
import { DataPaginatedResponse } from '@/types';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalElements: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  pageSizeOptions?: number[];
  isLoading?: boolean;
}

export function Pagination({
  currentPage,
  totalPages,
  pageSize,
  totalElements,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 20, 50],
  isLoading = false,
}: PaginationProps) {
  // Safety checks
  if (totalElements <= 0) {
    console.warn('Invalid pagination data:', { totalPages, totalElements });
    return null;
  }

  const startItem = currentPage * pageSize + 1;
  const endItem = Math.min((currentPage + 1) * pageSize, totalElements);

  const canGoPrevious = currentPage > 0;
  const canGoNext = currentPage < totalPages - 1;

  // Generate page numbers to show
  const getVisiblePages = () => {
    const delta = 2; // Number of pages to show before and after current page
    const range = [];
    const rangeWithDots = [];

    // Always show first page
    range.push(0);

    // Calculate range around current page
    for (
      let i = Math.max(1, currentPage - delta);
      i <= Math.min(totalPages - 2, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    // Always show last page if more than 1 page
    if (totalPages > 1) {
      range.push(totalPages - 1);
    }

    // Add dots where there are gaps
    let prev = 0;
    for (const page of range) {
      if (page - prev > 1) {
        rangeWithDots.push('...');
      }
      rangeWithDots.push(page);
      prev = page;
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className='flex flex-col gap-4 px-4 py-3 sm:flex-row sm:items-center sm:justify-between'>
      {/* Info and Page Size Selector */}
      <div className='flex items-center gap-4'>
        <div className='text-sm text-gray-700'>
          Hiển thị {startItem} đến {endItem} trong tổng số {totalElements} kết
          quả
        </div>

        <div className='flex items-center gap-2'>
          <span className='text-sm text-gray-700'>Hiển thị:</span>
          <select
            value={pageSize}
            onChange={e => onPageSizeChange(Number(e.target.value))}
            disabled={isLoading}
            className='rounded border border-gray-300 px-2 py-1 text-sm focus:border-blue-500 focus:outline-none'
          >
            {pageSizeOptions.map(size => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span className='text-sm text-gray-700'>mục</span>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className='flex items-center gap-1'>
        {/* First Page */}
        <Button
          variant='outline'
          size='sm'
          onClick={() => onPageChange(0)}
          disabled={!canGoPrevious || isLoading}
          className='h-8 w-8 p-0'
        >
          <ChevronsLeft className='h-4 w-4' />
        </Button>

        {/* Previous Page */}
        <Button
          variant='outline'
          size='sm'
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!canGoPrevious || isLoading}
          className='h-8 w-8 p-0'
        >
          <ChevronLeft className='h-4 w-4' />
        </Button>

        {/* Page Numbers */}
        <div className='flex items-center gap-1'>
          {visiblePages.map((page, index) => {
            if (page === '...') {
              return (
                <span
                  key={`dots-${index}`}
                  className='flex h-8 w-8 items-center justify-center text-sm text-gray-500'
                >
                  ...
                </span>
              );
            }

            const pageNumber = page as number;
            const isCurrentPage = pageNumber === currentPage;

            return (
              <Button
                key={pageNumber}
                variant={isCurrentPage ? 'default' : 'outline'}
                size='sm'
                onClick={() => onPageChange(pageNumber)}
                disabled={isLoading}
                className='h-8 w-8 p-0'
              >
                {pageNumber + 1}
              </Button>
            );
          })}
        </div>

        {/* Next Page */}
        <Button
          variant='outline'
          size='sm'
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!canGoNext || isLoading}
          className='h-8 w-8 p-0'
        >
          <ChevronRight className='h-4 w-4' />
        </Button>

        {/* Last Page */}
        <Button
          variant='outline'
          size='sm'
          onClick={() => onPageChange(totalPages - 1)}
          disabled={!canGoNext || isLoading}
          className='h-8 w-8 p-0'
        >
          <ChevronsRight className='h-4 w-4' />
        </Button>
      </div>
    </div>
  );
}

// Helper function to create pagination props from API response
export function createServerPaginationProps<T>(
  response: DataPaginatedResponse<T>,
  onPageChange: (page: number) => void,
  onPageSizeChange: (pageSize: number) => void,
  isLoading?: boolean
): PaginationProps {
  return {
    currentPage: response.number,
    totalPages: response.totalPages,
    pageSize: response.size,
    totalElements: response.totalElements,
    onPageChange,
    onPageSizeChange,
    isLoading,
  };
}
