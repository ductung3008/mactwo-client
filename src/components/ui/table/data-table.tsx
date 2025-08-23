'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Pagination } from '@/components/ui/pagination';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DataPaginatedResponse } from '@/types';
<<<<<<< HEAD
import { useMemo, useState } from 'react';
=======
import { useCallback, useMemo, useState } from 'react';
>>>>>>> 441881f107cef54cfbb1d185479bb70faa22622e

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  // Server-side pagination props
  paginationType?: 'server' | 'client';
  serverPagination?: DataPaginatedResponse<TData[]>;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  // Client-side pagination props
  clientPageSize?: number;
  pageSizeOptions?: number[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading = false,
  paginationType = 'server',
  serverPagination,
  onPageChange,
  onPageSizeChange,
  clientPageSize = 10,
  pageSizeOptions = [5, 10, 20, 50],
}: DataTableProps<TData, TValue>) {
  // Client-side pagination state
  const [clientCurrentPage, setClientCurrentPage] = useState(0);
  const [currentPageSize, setCurrentPageSize] = useState(clientPageSize);

  // Memoized data for client-side pagination
  const paginatedData = useMemo(() => {
    if (paginationType === 'server') {
      return data;
    }

    const startIndex = clientCurrentPage * currentPageSize;
    const endIndex = startIndex + currentPageSize;
    return data.slice(startIndex, endIndex);
  }, [data, clientCurrentPage, currentPageSize, paginationType]);

  // Table configuration
  const table = useReactTable({
    data: paginatedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    ...(paginationType === 'client' && {
      getPaginationRowModel: getPaginationRowModel(),
    }),
  });

  // Pagination handlers
<<<<<<< HEAD
  const handlePageChange = (page: number) => {
    if (paginationType === 'server' && onPageChange) {
      onPageChange(page);
    } else {
      setClientCurrentPage(page);
    }
  };

  const handlePageSizeChange = (pageSize: number) => {
    if (paginationType === 'server' && onPageSizeChange) {
      onPageSizeChange(pageSize);
    } else {
      setCurrentPageSize(pageSize);
      setClientCurrentPage(0); // Reset to first page when page size changes
    }
  };
=======
  const handlePageChange = useCallback(
    (page: number) => {
      if (paginationType === 'server' && onPageChange) {
        onPageChange(page);
      } else {
        setClientCurrentPage(page);
      }
    },
    [paginationType, onPageChange]
  );

  const handlePageSizeChange = useCallback(
    (pageSize: number) => {
      if (paginationType === 'server' && onPageSizeChange) {
        onPageSizeChange(pageSize);
      } else {
        setCurrentPageSize(pageSize);
        setClientCurrentPage(0); // Reset to first page when page size changes
      }
    },
    [paginationType, onPageSizeChange]
  );
>>>>>>> 441881f107cef54cfbb1d185479bb70faa22622e

  // Calculate pagination props
  const paginationProps = useMemo(() => {
    if (paginationType === 'server') {
      // Server-side pagination - use default values if serverPagination is not available yet
      return {
        currentPage: serverPagination?.number ?? 0,
        totalPages: serverPagination?.totalPages ?? 1,
        pageSize: serverPagination?.size ?? 10,
        totalElements: serverPagination?.totalElements ?? 0,
        onPageChange: handlePageChange,
        onPageSizeChange: handlePageSizeChange,
        pageSizeOptions,
        isLoading,
      };
    } else {
      // Client-side pagination
      const totalElements = data.length;
      const totalPages = Math.ceil(totalElements / currentPageSize);

      return {
        currentPage: clientCurrentPage,
        totalPages,
        pageSize: currentPageSize,
        totalElements,
        onPageChange: handlePageChange,
        onPageSizeChange: handlePageSizeChange,
        pageSizeOptions,
        isLoading,
      };
    }
  }, [
    paginationType,
    serverPagination,
    clientCurrentPage,
    currentPageSize,
    data.length,
    pageSizeOptions,
    isLoading,
<<<<<<< HEAD
=======
    handlePageChange,
    handlePageSizeChange,
>>>>>>> 441881f107cef54cfbb1d185479bb70faa22622e
  ]);

  // Determine if pagination should be shown
  const showPagination =
    paginationType === 'server'
      ? Boolean(serverPagination && serverPagination.totalElements > 0)
      : data.length > pageSizeOptions[0];

  return (
<<<<<<< HEAD
    <div className='space-y-4'>
      <div className='overflow-hidden rounded-md border'>
        <Table className='table-auto'>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
=======
    <div className='w-full space-y-6'>
      <div className='overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm'>
        <Table className='w-full table-auto'>
          <TableHeader className='bg-gray-50/80'>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow
                key={headerGroup.id}
                className='border-b border-gray-200'
              >
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead
                      key={header.id}
                      className='bg-gray-50 px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-700 uppercase first:rounded-tl-lg last:rounded-tr-lg'
                    >
>>>>>>> 441881f107cef54cfbb1d185479bb70faa22622e
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
<<<<<<< HEAD
          <TableBody>
            {isLoading ? (
              // Skeleton loading rows
              Array.from({ length: 5 }, (_, index) => (
                <TableRow key={`skeleton-${index}`}>
                  {columns.map((_, colIndex) => (
                    <TableCell
                      key={`skeleton-cell-${colIndex}`}
                      className='px-4 py-3'
                    >
                      <Skeleton height={16} width='80%' />
=======
          <TableBody className='divide-y divide-gray-100 bg-white'>
            {isLoading ? (
              // Skeleton loading rows
              Array.from({ length: 5 }, (_, index) => (
                <TableRow
                  key={`skeleton-${index}`}
                  className='transition-colors duration-150 hover:bg-gray-50/50'
                >
                  {columns.map((_, colIndex) => (
                    <TableCell
                      key={`skeleton-cell-${colIndex}`}
                      className='px-6 py-4 whitespace-nowrap'
                    >
                      <Skeleton
                        height={20}
                        width='80%'
                        className='rounded-md bg-gray-200'
                      />
>>>>>>> 441881f107cef54cfbb1d185479bb70faa22622e
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
<<<<<<< HEAD
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id} className='max-w-xs'>
                      <div className='line-clamp-2 text-sm'>
=======
                  className='group transition-all duration-200 ease-in-out hover:bg-gray-50/70'
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell
                      key={cell.id}
                      className='max-w-xs px-6 py-4 transition-colors duration-150 group-hover:text-gray-900'
                    >
                      <div className='line-clamp-2 text-sm leading-relaxed text-gray-700'>
>>>>>>> 441881f107cef54cfbb1d185479bb70faa22622e
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
<<<<<<< HEAD
                  className='h-24 text-center'
                >
                  Không có dữ liệu.
=======
                  className='h-32 bg-gray-50/30 text-center'
                >
                  <div className='flex flex-col items-center justify-center space-y-3'>
                    <div className='flex h-16 w-16 items-center justify-center rounded-full bg-gray-100'>
                      <svg
                        className='h-8 w-8 text-gray-400'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                        />
                      </svg>
                    </div>
                    <p className='text-sm font-medium text-gray-500'>
                      Không có dữ liệu
                    </p>
                    <p className='text-xs text-gray-400'>
                      Dữ liệu sẽ xuất hiện ở đây khi có sẵn
                    </p>
                  </div>
>>>>>>> 441881f107cef54cfbb1d185479bb70faa22622e
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
<<<<<<< HEAD
      {showPagination && <Pagination {...paginationProps} />}
=======
      {showPagination && (
        <div className='flex items-center justify-center pt-2'>
          <Pagination {...paginationProps} />
        </div>
      )}
>>>>>>> 441881f107cef54cfbb1d185479bb70faa22622e
    </div>
  );
}
