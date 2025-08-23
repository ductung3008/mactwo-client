<<<<<<< HEAD
=======
/* eslint-disable */

>>>>>>> 441881f107cef54cfbb1d185479bb70faa22622e
'use client';

import { Button } from '@/components/ui/button';
import { PromotionModal } from '@/components/ui/promotion-modal';
import { DataTable } from '@/components/ui/table/data-table';
import { promotionApi } from '@/lib/api';
<<<<<<< HEAD
import { Promotion } from '@/types/promotion';
import { Filter } from 'lucide-react';
import { useEffect, useState } from 'react';
=======
import { DataPaginatedResponse } from '@/types';
import { Promotion } from '@/types/promotion';
import { Gift, Plus } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
>>>>>>> 441881f107cef54cfbb1d185479bb70faa22622e
import { columns } from './columns';

const AdminPromotionsPage = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(
    null
  );

  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
<<<<<<< HEAD
  const [paginationData, setPaginationData] = useState<any>(null);

  const fetchPromotions = async (
    page: number = currentPage,
    size: number = pageSize
  ) => {
    try {
      setIsLoading(true);
      const response = await promotionApi.getPromotions({
        page,
        size,
        sort: null,
      });

      if (response.success) {
        setPromotions(response.data.content);
        setPaginationData(response.data);
      }
    } catch (error) {
      console.error('Error fetching promotions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);
=======
  const [paginationData, setPaginationData] = useState<
    DataPaginatedResponse<Promotion[]>
  >({} as DataPaginatedResponse<Promotion[]>);

  const fetchPromotions = useCallback(
    async (page: number = currentPage, size: number = pageSize) => {
      try {
        setIsLoading(true);
        const response = await promotionApi.getPromotions({
          page,
          size,
          sort: null,
        });

        if (response.success) {
          setPromotions(response.data.content);
          setPaginationData(response.data);
        }
      } catch (error) {
        console.error('Error fetching promotions:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [currentPage, pageSize]
  );

  useEffect(() => {
    fetchPromotions();
  }, [fetchPromotions]);
>>>>>>> 441881f107cef54cfbb1d185479bb70faa22622e

  // Pagination handlers
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchPromotions(page, pageSize);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(0); // Reset to first page
    fetchPromotions(0, size);
  };

  const handleModalSuccess = () => {
    fetchPromotions(currentPage, pageSize); // Refresh data after create/update
    setSelectedPromotion(null);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPromotion(null);
  };

  const handleAddPromotion = () => {
    setSelectedPromotion(null);
    setIsModalOpen(true);
  };

  const handleEditPromotion = (promotion: Promotion) => {
    setSelectedPromotion(promotion);
    setIsModalOpen(true);
  };

  const handleDeletePromotion = async (id: number) => {
    try {
      const response = await promotionApi.deletePromotion(id);
      if (response.success) {
        fetchPromotions(currentPage, pageSize); // Refresh data after delete
      }
    } catch (error) {
      console.error('Error deleting promotion:', error);
    }
  };

  // Update columns to pass handlers
  const columnsWithHandlers = columns.map((column: any) => {
    if (column.accessorKey === 'action') {
      return {
        ...column,
        cell: ({ row }: { row: any }) => {
          const promotion = row.original;
          return (
            <div className='flex items-center gap-2'>
              <Button
                variant='outline'
<<<<<<< HEAD
                onClick={() => handleEditPromotion(promotion)}
              >
                Sửa
              </Button>
              <Button
                variant='outline'
                onClick={() => handleDeletePromotion(promotion.id)}
                className='text-red-600 hover:text-red-700'
              >
                Xóa
=======
                size='sm'
                onClick={() => handleEditPromotion(promotion)}
                className='hover:bg-blue-50 hover:text-blue-700'
              >
                Edit
              </Button>
              <Button
                variant='outline'
                size='sm'
                onClick={() => handleDeletePromotion(promotion.id)}
                className='text-red-600 hover:bg-red-50 hover:text-red-700'
              >
                Delete
>>>>>>> 441881f107cef54cfbb1d185479bb70faa22622e
              </Button>
            </div>
          );
        },
      };
    }
    return column;
  });

<<<<<<< HEAD
  return (
    <div>
      <div className='flex items-center justify-between bg-white p-4 shadow-md'>
        <h1 className='text-2xl font-bold'>Khuyến mãi</h1>
        <Button onClick={handleAddPromotion}>Thêm khuyến mãi</Button>
      </div>
      <div className='container mx-auto mt-4 bg-white p-4 shadow-sm'>
        <Filter />
      </div>
      <div className='container mx-auto mt-4 bg-white p-4 shadow-sm'>
        <DataTable
          columns={columnsWithHandlers}
          data={promotions}
          isLoading={isLoading}
          paginationType='server'
          serverPagination={paginationData}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
=======
  // Calculate promotion stats
  const stats = useMemo(() => {
    const total = paginationData.totalElements || 0;
    const now = new Date();
    const active = promotions.filter(p => {
      const startDate = new Date(p.startDate);
      const endDate = new Date(p.endDate);
      return startDate <= now && now <= endDate;
    }).length;
    const upcoming = promotions.filter(p => new Date(p.startDate) > now).length;
    const expired = promotions.filter(p => new Date(p.endDate) < now).length;

    return { total, active, upcoming, expired };
  }, [promotions, paginationData]);

  return (
    <div className='space-y-6'>
      {/* Modern Page Header */}
      <div className='rounded-xl border border-slate-200 bg-white p-6 shadow-lg'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <div className='rounded-lg bg-gradient-to-r from-pink-500 to-rose-600 p-3 text-white shadow-lg'>
              <Gift className='h-6 w-6' />
            </div>
            <div>
              <h1 className='text-2xl font-bold text-slate-900'>
                Quản lý khuyến mãi
              </h1>
              <p className='text-slate-600'>
                Tạo và quản lý các chiến dịch khuyến mãi
              </p>
            </div>
          </div>
          <Button
            onClick={handleAddPromotion}
            className='bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl'
          >
            <Plus className='mr-2 h-4 w-4' />
            Thêm khuyến mãi
          </Button>
        </div>
      </div>

      {/* Promotion Stats */}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
        <div className='rounded-lg border border-slate-200 bg-white p-4 shadow-md'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-slate-600'>Tổng khuyến mãi</p>
              <p className='text-2xl font-bold text-slate-900'>{stats.total}</p>
            </div>
            <div className='text-xl text-pink-500'>🎁</div>
          </div>
        </div>
        <div className='rounded-lg border border-slate-200 bg-white p-4 shadow-md'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-slate-600'>Đang hoạt động</p>
              <p className='text-2xl font-bold text-green-600'>
                {stats.active}
              </p>
            </div>
            <div className='text-xl text-green-500'>✨</div>
          </div>
        </div>
        <div className='rounded-lg border border-slate-200 bg-white p-4 shadow-md'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-slate-600'>Sắp diễn ra</p>
              <p className='text-2xl font-bold text-blue-600'>
                {stats.upcoming}
              </p>
            </div>
            <div className='text-xl text-blue-500'>🚀</div>
          </div>
        </div>
        <div className='rounded-lg border border-slate-200 bg-white p-4 shadow-md'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-slate-600'>Đã hết hạn</p>
              <p className='text-2xl font-bold text-gray-600'>
                {stats.expired}
              </p>
            </div>
            <div className='text-xl text-gray-500'>📅</div>
          </div>
        </div>
      </div>

      {/* Enhanced Table Container */}
      <div className='overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg'>
        <div className='border-b border-slate-200 bg-slate-50 p-6'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold text-slate-900'>
              Tất cả khuyến mãi
            </h2>
            <div className='text-sm text-slate-600'>
              Hiển thị{' '}
              <span className='font-semibold text-slate-900'>
                {promotions.length}
              </span>{' '}
              trong tổng số{' '}
              <span className='font-semibold text-slate-900'>
                {stats.total}
              </span>{' '}
              khuyến mãi
            </div>
          </div>
        </div>
        <div className='p-6'>
          <DataTable
            columns={columnsWithHandlers}
            data={promotions}
            isLoading={isLoading}
            paginationType='server'
            serverPagination={paginationData}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </div>
>>>>>>> 441881f107cef54cfbb1d185479bb70faa22622e
      </div>

      <PromotionModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSuccess={handleModalSuccess}
        promotion={selectedPromotion}
      />
    </div>
  );
};

export default AdminPromotionsPage;
