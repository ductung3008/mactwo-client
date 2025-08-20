'use client';

import { Order } from '@/types/order';
import { formatCurrency } from '@/utils';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './dialog';

interface OrderDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  isOpen,
  onClose,
  order,
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
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-h-[90vh] max-w-4xl overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Chi tiết đơn hàng #{order.id}</DialogTitle>
        </DialogHeader>

        <div className='space-y-6'>
          {/* Order Summary */}
          <div className='grid grid-cols-1 gap-4 rounded-lg bg-gray-50 p-4 md:grid-cols-2'>
            <div>
              <h3 className='mb-2 text-sm font-semibold text-gray-600'>
                Thông tin đơn hàng
              </h3>
              <div className='space-y-1'>
                <p>
                  <span className='font-medium'>Mã đơn:</span> #{order.id}
                </p>
                <p>
                  <span className='font-medium'>Ngày đặt:</span>{' '}
                  {formatDate(order.createdDate)}
                </p>
                <p>
                  <span className='font-medium'>Khách hàng:</span>{' '}
                  {order.userId}
                </p>
                <p>
                  <span className='font-medium'>Trạng thái:</span>
                  <span
                    className={`ml-2 rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(order.status)}`}
                  >
                    {order.status}
                  </span>
                </p>
              </div>
            </div>

            <div>
              <h3 className='mb-2 text-sm font-semibold text-gray-600'>
                Địa chỉ giao hàng
              </h3>
              <div className='space-y-1'>
                <p className='text-sm'>{order.address.shippingAddress}</p>
                {order.address.default && (
                  <span className='inline-block rounded bg-blue-100 px-2 py-1 text-xs text-blue-800'>
                    Địa chỉ mặc định
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Promotion Info */}
          {order.promotion && (
            <div className='rounded-lg bg-green-50 p-4'>
              <h3 className='mb-2 text-sm font-semibold text-gray-600'>
                Khuyến mãi
              </h3>
              <p className='text-sm'>
                {order.promotion.name || 'Có áp dụng khuyến mãi'}
              </p>
            </div>
          )}

          {/* Order Items */}
          <div>
            <h3 className='mb-4 text-lg font-semibold'>Sản phẩm đã đặt</h3>
            <div className='space-y-4'>
              {order.orderItems.map(item => (
                <div key={item.id} className='flex gap-4 rounded-lg border p-4'>
                  <div className='flex-shrink-0'>
                    <Image
                      width={80}
                      height={80}
                      src={item.variant.imageUrls[0]}
                      alt={`${item.variant.color} ${item.variant.storage}`}
                      className='h-20 w-20 rounded-md object-cover'
                    />
                  </div>

                  <div className='flex-1'>
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                      <div>
                        <h4 className='text-sm font-medium'>
                          Thông tin sản phẩm
                        </h4>
                        <div className='mt-1 space-y-1 text-sm text-gray-600'>
                          <p>
                            <span className='font-medium'>Màu sắc:</span>{' '}
                            {item.variant.color}
                          </p>
                          <p>
                            <span className='font-medium'>Dung lượng:</span>{' '}
                            {item.variant.storage}
                          </p>
                          <p>
                            <span className='font-medium'>RAM:</span>{' '}
                            {item.variant.ram}
                          </p>
                          <p>
                            <span className='font-medium'>Tồn kho:</span>{' '}
                            {item.variant.stockQuantity}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className='text-sm font-medium'>
                          Chi tiết đơn hàng
                        </h4>
                        <div className='mt-1 space-y-1 text-sm text-gray-600'>
                          <p>
                            <span className='font-medium'>Số lượng:</span>{' '}
                            {item.quantity}
                          </p>
                          <p>
                            <span className='font-medium'>Đơn giá:</span>{' '}
                            {formatCurrency(item.pricePerItem)}
                          </p>
                          <p>
                            <span className='font-medium'>Thành tiền:</span>
                            <span className='ml-1 font-semibold text-red-600'>
                              {formatCurrency(
                                item.pricePerItem * item.quantity
                              )}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Total */}
          <div className='border-t pt-4'>
            <div className='flex items-center justify-between'>
              <span className='text-lg font-semibold'>Tổng cộng:</span>
              <span className='text-xl font-bold text-red-600'>
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
