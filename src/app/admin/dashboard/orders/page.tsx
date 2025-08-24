'use client';

import { useToastNotification } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/table/data-table';
import { orderApi } from '@/lib/api/order.api';
import { Order } from '@/types/order';
import { Plus, ShoppingBag } from 'lucide-react';
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

  // Calculate stats
  const stats = useMemo(() => {
    const total = data.length;
    const completed = data.filter(order => order.status === 'DELIVERED').length;
    const pending = data.filter(order => order.status === 'PENDING').length;
    const processing = data.filter(order =>
      ['CONFIRMED', 'PROCESSING', 'SHIPPED'].includes(order.status)
    ).length;

    return { total, completed, pending, processing };
  }, [data]);

  return (
    <div className='space-y-6'>
      {/* Modern Page Header */}
      <div className='rounded-xl border border-slate-200 bg-white p-6 shadow-lg'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <div className='rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 p-3 text-white shadow-lg'>
              <ShoppingBag className='h-6 w-6' />
            </div>
            <div>
              <h1 className='text-2xl font-bold text-slate-900'>
                Quản lý đơn hàng
              </h1>
              <p className='text-slate-600'>
                Theo dõi và quản lý đơn hàng khách hàng
              </p>
            </div>
          </div>
          <Button
            onClick={handleOpenCreateModal}
            className='bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl'
          >
            <Plus className='mr-2 h-4 w-4' />
            Đơn hàng mới
          </Button>
        </div>
      </div>

      {/* Order Stats */}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
        <div className='rounded-lg border border-slate-200 bg-white p-4 shadow-md'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-slate-600'>Tổng đơn hàng</p>
              <p className='text-2xl font-bold text-slate-900'>{stats.total}</p>
            </div>
            <div className='text-xl text-blue-500'>📦</div>
          </div>
        </div>
        <div className='rounded-lg border border-slate-200 bg-white p-4 shadow-md'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-slate-600'>Đã hoàn thành</p>
              <p className='text-2xl font-bold text-green-600'>
                {stats.completed}
              </p>
            </div>
            <div className='text-xl text-green-500'>✅</div>
          </div>
        </div>
        <div className='rounded-lg border border-slate-200 bg-white p-4 shadow-md'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-slate-600'>Đang xử lý</p>
              <p className='text-2xl font-bold text-blue-600'>
                {stats.processing}
              </p>
            </div>
            <div className='text-xl text-blue-500'>⚡</div>
          </div>
        </div>
        <div className='rounded-lg border border-slate-200 bg-white p-4 shadow-md'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-slate-600'>Chờ xử lý</p>
              <p className='text-2xl font-bold text-yellow-600'>
                {stats.pending}
              </p>
            </div>
            <div className='text-xl text-yellow-500'>⏳</div>
          </div>
        </div>
      </div>

      {/* Enhanced Table Container */}
      <div className='overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg'>
        <div className='border-b border-slate-200 bg-slate-50 p-6'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold text-slate-900'>
              Tất cả đơn hàng
            </h2>
            <div className='text-sm text-slate-600'>
              Hiển thị{' '}
              <span className='font-semibold text-slate-900'>
                {data.length}
              </span>{' '}
              đơn hàng
            </div>
          </div>
        </div>
        <div className='p-6'>
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
    </div>
  );
};

export default AdminOrdersPage;
