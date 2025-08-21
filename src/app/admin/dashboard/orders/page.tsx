'use client';

import { useToastNotification } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/table/data-table';
import { orderApi } from '@/lib/api/order.api';
import { Order } from '@/types/order';
import { Filter, Plus } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { createColumns } from './columns';

const AdminOrdersPage = () => {
  const toast = useToastNotification();
  const [data, setData] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const response = await orderApi.getOrders();
      if (response.status === 'SUCCESS') {
        setData(response.data);
      } else {
        setError('Failed to fetch orders');
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      setError('Failed to fetch orders');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleOpenCreateModal = () => {
    // TODO: Implement create modal
    console.log('Open create modal');
  };

  const handleStatusUpdate = useCallback(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Create columns with callbacks
  const columns = useMemo(
    () =>
      createColumns({
        onStatusUpdate: handleStatusUpdate,
      }),
    [handleStatusUpdate]
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      setError(null);
    }
  }, [error, toast]);

  return (
    <div>
      <div className='flex items-center justify-between bg-white p-4 shadow-md'>
        <h1 className='text-2xl font-bold'>Đơn hàng</h1>
        <Button
          onClick={handleOpenCreateModal}
          className='flex items-center gap-2'
        >
          <Plus className='h-4 w-4' />
          Thêm đơn hàng
        </Button>
      </div>
      <div className='container mx-auto mt-4 bg-white p-4 shadow-sm'>
        <Filter />
      </div>
      <div className='container mx-auto mt-4 bg-white p-4 shadow-sm'>
        <DataTable
          columns={columns}
          data={data}
          isLoading={loading}
          paginationType='client'
          clientPageSize={10}
          pageSizeOptions={[5, 10, 20, 50]}
        />
      </div>
    </div>
  );
};

export default AdminOrdersPage;
