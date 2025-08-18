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
import { useMemo, useState } from 'react';

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
  ]);

  // Determine if pagination should be shown
  const showPagination =
    paginationType === 'server'
      ? Boolean(serverPagination && serverPagination.totalElements > 0)
      : data.length > pageSizeOptions[0];

  return (
    <div className='space-y-4'>
      <div className='overflow-hidden rounded-md border'>
        <Table className='table-auto'>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
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
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id} className='max-w-xs'>
                      <div className='line-clamp-2 text-sm'>
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
                  className='h-24 text-center'
                >
                  Không có dữ liệu.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      {showPagination && <Pagination {...paginationProps} />}
    </div>
  );
}
