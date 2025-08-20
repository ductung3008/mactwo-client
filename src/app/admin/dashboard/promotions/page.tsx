/* eslint-disable */

'use client';

import { Button } from '@/components/ui/button';
import { PromotionModal } from '@/components/ui/promotion-modal';
import { DataTable } from '@/components/ui/table/data-table';
import { promotionApi } from '@/lib/api';
import { DataPaginatedResponse } from '@/types';
import { Promotion } from '@/types/promotion';
import { Filter } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
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
  //
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
              </Button>
            </div>
          );
        },
      };
    }
    return column;
  });

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
