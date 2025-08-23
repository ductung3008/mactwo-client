'use client';

import { orderApi } from '@/lib/api/order.api';
import { useAuthStore } from '@/stores/auth.store';
import { Order } from '@/types/order';
import { cn } from '@/utils';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from './button';
import { Loading } from './loading';

interface OrderListProps {
  className?: string;
}

const OrderStatusBadge = ({ status }: { status: string }) => {
  const statusColors = {
    PENDING: 'bg-amber-50 text-amber-700 border-amber-200 ring-amber-200/50',
    CONFIRMED: 'bg-blue-50 text-blue-700 border-blue-200 ring-blue-200/50',
    PROCESSING:
      'bg-purple-50 text-purple-700 border-purple-200 ring-purple-200/50',
    SHIPPED:
      'bg-indigo-50 text-indigo-700 border-indigo-200 ring-indigo-200/50',
    DELIVERED:
      'bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-200/50',
    CANCELLED: 'bg-red-50 text-red-700 border-red-200 ring-red-200/50',
  };

  const statusLabels = {
    PENDING: 'Chờ xử lý',
    CONFIRMED: 'Đã xác nhận',
    PROCESSING: 'Đang xử lý',
    SHIPPED: 'Đang giao hàng',
    DELIVERED: 'Đã giao hàng',
    CANCELLED: 'Đã hủy',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold ring-1',
        statusColors[status as keyof typeof statusColors] ||
          'border-gray-200 bg-gray-50 text-gray-700 ring-gray-200/50'
      )}
    >
      {statusLabels[status as keyof typeof statusLabels] || status}
    </span>
  );
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const OrderList = ({ className }: OrderListProps) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.id) {
        setError('Người dùng chưa đăng nhập');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await orderApi.getUserOrders(user.id);
        if (response.status === 'SUCCESS') {
          setOrders(response.data);
        } else {
          setError('Không thể tải danh sách đơn hàng');
        }
      } catch (err) {
        setError('Có lỗi xảy ra khi tải danh sách đơn hàng');
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user?.id]);

  if (loading) {
    return (
      <div
        className={cn(
          'flex min-h-[500px] items-center justify-center rounded-xl bg-gradient-to-br from-gray-50 to-gray-100',
          className
        )}
      >
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn('py-12 text-center', className)}>
        <div className='mx-auto max-w-md rounded-xl border border-red-200 bg-red-50 p-8'>
          <div className='mb-4'>
            <svg
              className='mx-auto h-12 w-12 text-red-400'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.5}
                d='M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z'
              />
            </svg>
          </div>
          <p className='mb-6 font-medium text-red-700'>{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className='bg-red-600 text-white hover:bg-red-700'
          >
            Thử lại
          </Button>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className={cn('py-16 text-center', className)}>
        <div className='mx-auto max-w-md'>
          <div className='mb-6 inline-block rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 p-6'>
            <svg
              className='h-16 w-16 text-blue-400'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.5}
                d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
              />
            </svg>
          </div>
          <h3 className='mb-3 text-xl font-bold text-gray-900'>
            Chưa có đơn hàng nào
          </h3>
          <p className='mb-8 leading-relaxed text-gray-600'>
            Bạn chưa có đơn hàng nào. Hãy bắt đầu mua sắm ngay!
          </p>
          <Button
            onClick={() => (window.location.href = '/')}
            className='transform rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl'
          >
            Tiếp tục mua sắm
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-8', className)}>
      <div className='flex items-center justify-between border-b border-gray-200 pb-6'>
        <div>
          <h2 className='bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-3xl font-bold text-transparent'>
            Đơn hàng của tôi
          </h2>
          <p className='mt-1 text-gray-600'>
            Quản lý và theo dõi đơn hàng của bạn
          </p>
        </div>
        <div className='text-right'>
          <div className='rounded-full border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2'>
            <p className='text-sm font-semibold text-blue-700'>
              {orders.length} đơn hàng
            </p>
          </div>
        </div>
      </div>

      <div className='grid gap-6'>
        {orders.map(order => (
          <div
            key={order.id}
            className='group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/50'
          >
            {/* Order Header */}
            <div className='mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
              <div className='flex flex-col gap-4 sm:flex-row sm:items-center'>
                <h3 className='text-xl font-bold tracking-tight text-gray-900'>
                  Đơn hàng #{order.id}
                </h3>
                <OrderStatusBadge status={order.status} />
              </div>
              <div className='space-y-1 text-left sm:text-right'>
                <p className='bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-2xl font-bold text-transparent'>
                  {formatPrice(order.totalAmount)}
                </p>
                <p className='text-sm font-medium text-gray-500'>
                  {formatDate(order.createdDate)}
                </p>
              </div>
            </div>

            {/* Order Items */}
            <div className='mb-6 space-y-4'>
              {order.orderItems.map(item => (
                <div
                  key={item.id}
                  className='flex items-center space-x-6 rounded-xl border border-gray-100 bg-gradient-to-r from-gray-50 to-gray-50/50 p-5 transition-all duration-200 hover:from-gray-100 hover:to-gray-100/50'
                >
                  <div className='flex-shrink-0'>
                    <div className='relative overflow-hidden rounded-xl ring-2 ring-gray-200'>
                      <Image
                        width={80}
                        height={80}
                        src={item.variant.imageUrls[0]}
                        alt={`${item.variant.color} ${item.variant.storage}`}
                        className='h-20 w-20 object-cover transition-transform duration-300 group-hover:scale-105'
                      />
                    </div>
                  </div>
                  <div className='flex-grow'>
                    <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
                      <div className='space-y-1'>
                        <p className='text-lg font-bold text-gray-900'>
                          {item?.name} - {item.variant.color}
                        </p>
                        <div className='flex flex-wrap gap-3 text-sm text-gray-600'>
                          <span className='inline-flex items-center gap-1'>
                            <span className='h-2 w-2 rounded-full bg-purple-400'></span>
                            Số lượng: {item.quantity}
                          </span>
                        </div>
                      </div>
                      <div className='space-y-1 text-left sm:text-right'>
                        <p className='text-lg font-bold text-gray-900'>
                          {formatPrice(item.pricePerItem)}
                        </p>
                        <p className='text-sm font-semibold text-green-600'>
                          Tổng: {formatPrice(item.pricePerItem * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Section */}
            <div className='border-t border-gray-100 pt-6'>
              <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
                <div className='space-y-1'>
                  <p className='flex items-center gap-2 text-sm font-semibold text-gray-900'>
                    <svg
                      className='h-4 w-4 text-blue-500'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
                        clipRule='evenodd'
                      />
                    </svg>
                    Địa chỉ giao hàng:
                  </p>
                  <p className='pl-6 text-sm text-gray-600'>
                    {order.address.shippingAddress}
                  </p>
                </div>

                {/* Promotion if exists */}
                {order.promotion && (
                  <div className='text-left sm:text-right'>
                    <div className='inline-flex items-center gap-2 rounded-lg border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2'>
                      <svg
                        className='h-4 w-4 text-green-500'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path
                          fillRule='evenodd'
                          d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                          clipRule='evenodd'
                        />
                      </svg>
                      <div>
                        <p className='text-sm font-semibold text-green-700'>
                          {order.promotion.name}
                        </p>
                        <p className='text-xs text-green-600'>
                          Giảm {order.promotion.discountPercentage}%
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export type { OrderListProps };
