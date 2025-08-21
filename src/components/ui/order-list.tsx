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
    PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    CONFIRMED: 'bg-blue-100 text-blue-800 border-blue-200',
    PROCESSING: 'bg-purple-100 text-purple-800 border-purple-200',
    SHIPPED: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    DELIVERED: 'bg-green-100 text-green-800 border-green-200',
    CANCELLED: 'bg-red-100 text-red-800 border-red-200',
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
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        statusColors[status as keyof typeof statusColors] ||
          'border-gray-200 bg-gray-100 text-gray-800'
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
          'flex min-h-[400px] items-center justify-center',
          className
        )}
      >
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn('py-8 text-center', className)}>
        <p className='mb-4 text-red-600'>{error}</p>
        <Button onClick={() => window.location.reload()}>Thử lại</Button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className={cn('py-12 text-center', className)}>
        <div className='mx-auto max-w-md'>
          <div className='mb-4'>
            <svg
              className='mx-auto h-12 w-12 text-gray-400'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
              />
            </svg>
          </div>
          <h3 className='mb-2 text-lg font-medium text-gray-900'>
            Chưa có đơn hàng nào
          </h3>
          <p className='mb-6 text-gray-600'>
            Bạn chưa có đơn hàng nào. Hãy bắt đầu mua sắm ngay!
          </p>
          <Button onClick={() => (window.location.href = '/')}>
            Tiếp tục mua sắm
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-6', className)}>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-bold text-gray-900'>Đơn hàng của tôi</h2>
        <p className='text-sm text-gray-600'>{orders.length} đơn hàng</p>
      </div>

      <div className='space-y-4'>
        {orders.map(order => (
          <div
            key={order.id}
            className='rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md'
          >
            {/* Order Header */}
            <div className='mb-4 flex items-center justify-between'>
              <div className='flex items-center space-x-4'>
                <h3 className='text-lg font-semibold text-gray-900'>
                  Đơn hàng #{order.id}
                </h3>
                <OrderStatusBadge status={order.status} />
              </div>
              <div className='text-right'>
                <p className='text-lg font-bold text-gray-900'>
                  {formatPrice(order.totalAmount)}
                </p>
                <p className='text-sm text-gray-600'>
                  {formatDate(order.createdDate)}
                </p>
              </div>
            </div>

            {/* Order Items */}
            <div className='mb-4 space-y-3'>
              {order.orderItems.map(item => (
                <div
                  key={item.id}
                  className='flex items-center space-x-4 rounded-lg bg-gray-50 p-3'
                >
                  <div className='flex-shrink-0'>
                    <Image
                      width={64}
                      height={64}
                      src={item.variant.imageUrls[0]}
                      alt={`${item.variant.color} ${item.variant.storage}`}
                      className='h-16 w-16 rounded-md object-cover'
                    />
                  </div>
                  <div className='flex-grow'>
                    <div className='flex items-center justify-between'>
                      <div>
                        <p className='font-medium text-gray-900'>
                          {item.variant.color} - {item.variant.storage}
                        </p>
                        <p className='text-sm text-gray-600'>
                          RAM: {item.variant.ram}
                        </p>
                        <p className='text-sm text-gray-600'>
                          Số lượng: {item.quantity}
                        </p>
                      </div>
                      <div className='text-right'>
                        <p className='font-semibold text-gray-900'>
                          {formatPrice(item.pricePerItem)}
                        </p>
                        <p className='text-sm text-gray-600'>
                          Tổng: {formatPrice(item.pricePerItem * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Shipping Address */}
            <div className='border-t pt-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-gray-900'>
                    Địa chỉ giao hàng:
                  </p>
                  <p className='text-sm text-gray-600'>
                    {order.address.shippingAddress}
                  </p>
                </div>

                {/* Promotion if exists */}
                {order.promotion && (
                  <div className='text-right'>
                    <p className='text-sm font-medium text-green-600'>
                      Khuyến mãi: {order.promotion.name}
                    </p>
                    <p className='text-sm text-green-600'>
                      Giảm {order.promotion.discountPercentage}%
                    </p>
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
