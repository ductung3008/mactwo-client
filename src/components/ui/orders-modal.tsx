'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { orderApi } from '@/lib/api/order.api';
import { Order } from '@/types/order';
import {
  Calendar,
  CreditCard,
  MapPin,
  Package,
  ShoppingCart,
  Truck,
  X,
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface OrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  userName: string;
}

export function OrdersModal({
  isOpen,
  onClose,
  userId,
  userName,
}: OrdersModalProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && userId) {
      fetchUserOrders();
    }
  }, [isOpen, userId]);

  const fetchUserOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await orderApi.getUserOrders(userId);
      if (response.status === 'SUCCESS') {
        setOrders(response.data);
      } else {
        setError('Không thể tải đơn hàng');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi');
    } finally {
      setLoading(false);
    }
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
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'CONFIRMED':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'SHIPPING':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'DELIVERED':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'Chờ xử lý';
      case 'CONFIRMED':
        return 'Đã xác nhận';
      case 'SHIPPING':
        return 'Đang giao';
      case 'DELIVERED':
        return 'Đã giao';
      case 'CANCELLED':
        return 'Đã hủy';
      default:
        return status;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-h-[95vh] max-w-6xl overflow-y-auto border-0 bg-white shadow-2xl'>
        <DialogHeader className='-mx-6 -mt-6 rounded-t-lg border-b border-slate-200 bg-white/70 px-6 pt-6 pb-6 backdrop-blur-sm'>
          <DialogTitle className='flex items-center gap-3 text-2xl font-bold text-slate-800'>
            <div className='rounded-lg bg-emerald-500 p-2 text-white shadow-md'>
              <ShoppingCart className='h-6 w-6' />
            </div>
            Đơn hàng của {userName}
          </DialogTitle>
        </DialogHeader>

        <div className='p-2'>
          {error && (
            <div className='relative mb-6 rounded-xl border-l-4 border-l-red-500 bg-gradient-to-r from-red-50 to-red-100/50 p-4 shadow-sm'>
              <div className='flex items-center gap-3'>
                <div className='rounded-full bg-red-500 p-1 text-white'>
                  <X className='h-4 w-4' />
                </div>
                <p className='font-medium text-red-700'>{error}</p>
              </div>
            </div>
          )}

          {loading ? (
            <div className='flex flex-col items-center justify-center py-12'>
              <div className='h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500'></div>
              <p className='mt-4 text-slate-600'>Đang tải đơn hàng...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className='flex flex-col items-center justify-center py-12'>
              <div className='mb-4 rounded-full bg-slate-100 p-4'>
                <Package className='h-12 w-12 text-slate-400' />
              </div>
              <h3 className='mb-2 text-lg font-semibold text-slate-700'>
                Chưa có đơn hàng nào
              </h3>
              <p className='text-slate-500'>
                Người dùng này chưa có đơn hàng nào trong hệ thống.
              </p>
            </div>
          ) : (
            <div className='space-y-6'>
              {orders.map(order => (
                <div
                  key={order.id}
                  className='rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md'
                >
                  {/* Order Header */}
                  <div className='mb-4 flex items-start justify-between'>
                    <div className='flex items-center gap-4'>
                      <div className='rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 p-3 text-white shadow-lg'>
                        <Package className='h-5 w-5' />
                      </div>
                      <div>
                        <h3 className='text-lg font-semibold text-slate-800'>
                          Đơn hàng #{order.id}
                        </h3>
                        <div className='mt-1 flex items-center gap-4'>
                          <div className='flex items-center gap-1 text-sm text-slate-600'>
                            <Calendar className='h-4 w-4' />
                            {formatDate(order.createdDate)}
                          </div>
                          <span
                            className={`rounded-full border px-3 py-1 text-xs font-medium ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {getStatusText(order.status)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className='text-right'>
                      <div className='text-sm text-slate-600'>Tổng tiền</div>
                      <div className='text-xl font-bold text-emerald-600'>
                        {formatPrice(order.totalAmount)}
                      </div>
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className='mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2'>
                    {/* Address Info */}
                    <div className='rounded-lg border border-slate-200 bg-slate-50/50 p-4'>
                      <div className='mb-3 flex items-center gap-2'>
                        <MapPin className='h-4 w-4 text-slate-600' />
                        <h4 className='font-medium text-slate-800'>
                          Địa chỉ giao hàng
                        </h4>
                      </div>
                      <p className='text-slate-700'>
                        {order.address.shippingAddress}
                      </p>
                    </div>

                    {/* Promotion Info */}
                    <div className='rounded-lg border border-slate-200 bg-slate-50/50 p-4'>
                      <div className='mb-3 flex items-center gap-2'>
                        <CreditCard className='h-4 w-4 text-slate-600' />
                        <h4 className='font-medium text-slate-800'>
                          Khuyến mãi
                        </h4>
                      </div>
                      {order.promotion ? (
                        <div>
                          <p className='font-medium text-slate-700'>
                            {order.promotion.name}
                          </p>
                          <p className='text-sm text-emerald-600'>
                            Giảm {order.promotion.discountPercentage}%
                          </p>
                        </div>
                      ) : (
                        <p className='text-slate-500'>Không có khuyến mãi</p>
                      )}
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className='rounded-lg border border-slate-200 bg-slate-50/50 p-4'>
                    <div className='mb-4 flex items-center gap-2'>
                      <Truck className='h-4 w-4 text-slate-600' />
                      <h4 className='font-medium text-slate-800'>
                        Sản phẩm đặt hàng
                      </h4>
                    </div>
                    <div className='space-y-3'>
                      {order.orderItems.map(item => (
                        <div
                          key={item.id}
                          className='flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4'
                        >
                          {/* Product Image */}
                          <div className='flex-shrink-0'>
                            <img
                              src={item.variant.imageUrls[0]}
                              alt={item.name}
                              className='h-16 w-16 rounded-lg object-cover'
                            />
                          </div>

                          {/* Product Info */}
                          <div className='flex-1'>
                            <h5 className='font-medium text-slate-800'>
                              {item.name}
                            </h5>
                            <div className='mt-1 flex gap-4'>
                              <span className='text-sm text-slate-600'>
                                Màu: {item.variant.color}
                              </span>
                              <span className='text-sm text-slate-600'>
                                RAM: {item.variant.ram}
                              </span>
                              <span className='text-sm text-slate-600'>
                                Bộ nhớ: {item.variant.storage}
                              </span>
                            </div>
                          </div>

                          {/* Quantity & Price */}
                          <div className='text-right'>
                            <div className='text-sm text-slate-600'>
                              Số lượng: {item.quantity}
                            </div>
                            <div className='font-medium text-slate-800'>
                              {formatPrice(item.pricePerItem)}
                            </div>
                            <div className='text-sm font-medium text-emerald-600'>
                              = {formatPrice(item.quantity * item.pricePerItem)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Modal Footer */}
          <div className='-mx-6 mt-6 -mb-2 flex justify-end rounded-b-xl border-t border-slate-200 bg-slate-50 px-6 py-4'>
            <Button
              onClick={onClose}
              className='border-slate-300 text-slate-700 transition-all duration-200 hover:bg-slate-50 hover:text-slate-800'
              variant='outline'
            >
              Đóng
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
