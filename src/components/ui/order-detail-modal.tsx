'use client';

import { Order } from '@/types/order';
import { formatCurrency } from '@/utils';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './dialog';

interface OrderDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  orderBy: string;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  isOpen,
  onClose,
  order,
  orderBy,
}) => {
  if (!order) return null;

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
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-amber-50 text-amber-700 border border-amber-200';
      case 'confirmed':
        return 'bg-sky-50 text-sky-700 border border-sky-200';
      case 'processing':
        return 'bg-indigo-50 text-indigo-700 border border-indigo-200';
      case 'shipped':
        return 'bg-violet-50 text-violet-700 border border-violet-200';
      case 'delivered':
        return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      case 'cancelled':
        return 'bg-rose-50 text-rose-700 border border-rose-200';
      default:
        return 'bg-slate-50 text-slate-700 border border-slate-200';
    }
  };

  const statusLabels: Record<string, string> = {
    PENDING: 'Chờ xử lý',
    CONFIRMED: 'Đã xác nhận',
    PROCESSING: 'Đang xử lý',
    SHIPPED: 'Đang giao hàng',
    DELIVERED: 'Đã giao hàng',
    CANCELLED: 'Đã hủy',
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-h-[90vh] max-w-5xl overflow-y-auto bg-white shadow-2xl'>
        <DialogHeader className='border-b border-gray-100 pb-4'>
          <DialogTitle className='text-2xl font-bold text-gray-900'>
            Chi tiết đơn hàng <span className='text-blue-600'>#{order.id}</span>
          </DialogTitle>
        </DialogHeader>

        <div className='space-y-8 py-6'>
          {/* Order Summary */}
          <div className='grid grid-cols-1 gap-6 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-6 shadow-sm md:grid-cols-2'>
            <div className='space-y-4'>
              <div className='flex items-center gap-2'>
                <div className='h-8 w-1 rounded-full bg-blue-500'></div>
                <h3 className='text-lg font-semibold text-gray-800'>
                  Thông tin đơn hàng
                </h3>
              </div>
              <div className='space-y-3 pl-3'>
                <div className='flex items-center gap-2'>
                  <span className='min-w-[90px] text-sm font-medium text-gray-600'>
                    Mã đơn:
                  </span>
                  <span className='font-semibold text-blue-600'>
                    #{order.id}
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='min-w-[90px] text-sm font-medium text-gray-600'>
                    Ngày đặt:
                  </span>
                  <span className='text-sm text-gray-800'>
                    {formatDate(order.createdDate)}
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='min-w-[90px] text-sm font-medium text-gray-600'>
                    Khách hàng:
                  </span>
                  <span className='font-medium text-gray-800'>{orderBy}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='min-w-[90px] text-sm font-medium text-gray-600'>
                    Trạng thái:
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(order.status)}`}
                  >
                    {statusLabels[order.status]}
                  </span>
                </div>
              </div>
            </div>

            <div className='space-y-4'>
              <div className='flex items-center gap-2'>
                <div className='h-8 w-1 rounded-full bg-green-500'></div>
                <h3 className='text-lg font-semibold text-gray-800'>
                  Địa chỉ giao hàng
                </h3>
              </div>
              <div className='space-y-3 pl-3'>
                <p className='text-sm leading-relaxed text-gray-700'>
                  {order.address.shippingAddress}
                </p>
                {order.address.default && (
                  <span className='inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800'>
                    <svg
                      className='mr-1 h-3 w-3'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                        clipRule='evenodd'
                      />
                    </svg>
                    Địa chỉ mặc định
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Promotion Info */}
          {order.promotion && (
            <div className='rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6 shadow-sm'>
              <div className='mb-3 flex items-center gap-2'>
                <div className='h-8 w-1 rounded-full bg-green-500'></div>
                <h3 className='text-lg font-semibold text-gray-800'>
                  Khuyến mãi
                </h3>
              </div>
              <p className='pl-3 text-sm font-medium text-green-700'>
                {order.promotion.name || 'Có áp dụng khuyến mãi'}
              </p>
            </div>
          )}

          {/* Order Items */}
          <div className='space-y-6'>
            <div className='flex items-center gap-2'>
              <div className='h-8 w-1 rounded-full bg-purple-500'></div>
              <h3 className='text-xl font-bold text-gray-900'>
                Sản phẩm đã đặt
              </h3>
            </div>

            <div className='space-y-4'>
              {order.orderItems.map((item, index) => (
                <div
                  key={item.id}
                  className='group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-gray-300 hover:shadow-md'
                >
                  <div className='flex gap-6'>
                    <div className='flex-shrink-0'>
                      <div className='relative overflow-hidden rounded-lg bg-gray-50 p-2'>
                        <Image
                          width={100}
                          height={100}
                          src={item.variant.imageUrls[0]}
                          alt={`${item.variant.color} ${item.variant.storage}`}
                          className='h-24 w-24 rounded-md object-cover transition-transform group-hover:scale-105'
                        />
                        <div className='absolute top-2 right-2 rounded-full bg-blue-500 px-2 py-1 text-xs font-bold text-white'>
                          {index + 1}
                        </div>
                      </div>
                    </div>

                    <div className='flex-1'>
                      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
                        <div className='space-y-4'>
                          <div className='flex items-center gap-2'>
                            <div className='h-6 w-1 rounded-full bg-blue-500'></div>
                            <h4 className='font-semibold text-gray-800'>
                              Thông tin sản phẩm
                            </h4>
                          </div>
                          <div className='grid grid-cols-2 gap-3 pl-3'>
                            <div className='space-y-2'>
                              <div>
                                <span className='block text-xs font-medium text-gray-500 uppercase'>
                                  Màu sắc
                                </span>
                                <span className='text-sm font-medium text-gray-800'>
                                  {item.variant.color}
                                </span>
                              </div>
                              <div>
                                <span className='block text-xs font-medium text-gray-500 uppercase'>
                                  Dung lượng
                                </span>
                                <span className='text-sm font-medium text-gray-800'>
                                  {item.variant.storage}
                                </span>
                              </div>
                            </div>
                            <div className='space-y-2'>
                              <div>
                                <span className='block text-xs font-medium text-gray-500 uppercase'>
                                  RAM
                                </span>
                                <span className='text-sm font-medium text-gray-800'>
                                  {item.variant.ram}
                                </span>
                              </div>
                              <div>
                                <span className='block text-xs font-medium text-gray-500 uppercase'>
                                  Tồn kho
                                </span>
                                <span className='text-sm font-medium text-gray-800'>
                                  {item.variant.stockQuantity}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className='space-y-4'>
                          <div className='flex items-center gap-2'>
                            <div className='h-6 w-1 rounded-full bg-green-500'></div>
                            <h4 className='font-semibold text-gray-800'>
                              Chi tiết đơn hàng
                            </h4>
                          </div>
                          <div className='space-y-3 pl-3'>
                            <div className='flex items-center justify-between'>
                              <span className='text-sm font-medium text-gray-600'>
                                Số lượng:
                              </span>
                              <span className='rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700'>
                                {item.quantity}
                              </span>
                            </div>
                            <div className='flex items-center justify-between'>
                              <span className='text-sm font-medium text-gray-600'>
                                Đơn giá:
                              </span>
                              <span className='text-sm font-semibold text-gray-800'>
                                {formatCurrency(item.pricePerItem)}
                              </span>
                            </div>
                            <div className='flex items-center justify-between rounded-lg bg-red-50 px-3 py-2'>
                              <span className='text-sm font-semibold text-gray-700'>
                                Thành tiền:
                              </span>
                              <span className='text-lg font-bold text-red-600'>
                                {formatCurrency(
                                  item.pricePerItem * item.quantity
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Total */}
          <div className='rounded-xl border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <div className='rounded-full bg-blue-500 p-2'>
                  <svg
                    className='h-5 w-5 text-white'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <span className='text-xl font-bold text-gray-800'>
                  Tổng cộng:
                </span>
              </div>
              <span className='text-3xl font-bold text-red-600'>
                {formatCurrency(order.totalAmount)}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailModal;
