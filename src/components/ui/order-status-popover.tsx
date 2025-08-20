'use client';

import { useToastNotification } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { orderApi } from '@/lib/api/order.api';
import { Order } from '@/types/order';
import { Check, ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface OrderStatusPopoverProps {
  order: Order;
  onStatusUpdate: () => void;
}

const ORDER_STATUSES = [
  {
    value: 'PENDING',
    label: 'Chờ xử lý',
    color: 'bg-yellow-100 text-yellow-800',
  },
  {
    value: 'CONFIRMED',
    label: 'Đã xác nhận',
    color: 'bg-blue-100 text-blue-800',
  },
  {
    value: 'SHIPPED',
    label: 'Đang giao',
    color: 'bg-purple-100 text-purple-800',
  },
  {
    value: 'DELIVERED',
    label: 'Đã giao',
    color: 'bg-green-100 text-green-800',
  },
  { value: 'CANCELLED', label: 'Đã hủy', color: 'bg-red-100 text-red-800' },
];

const OrderStatusPopover: React.FC<OrderStatusPopoverProps> = ({
  order,
  onStatusUpdate,
}) => {
  const toast = useToastNotification();
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [buttonRect, setButtonRect] = useState<DOMRect | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const currentStatus = ORDER_STATUSES.find(
    s => s.value === order.status.toUpperCase()
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen]);

  const handleStatusUpdate = async (newStatus: string) => {
    if (newStatus === order.status.toUpperCase()) {
      setIsOpen(false);
      return;
    }

    setIsUpdating(true);
    try {
      const response = await orderApi.updateOrderStatus(order.id, newStatus);
      if (response.status === 'SUCCESS') {
        toast.success('Cập nhật trạng thái đơn hàng thành công');
        onStatusUpdate();
        setIsOpen(false);
      } else {
        toast.error('Không thể cập nhật trạng thái đơn hàng');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Có lỗi xảy ra khi cập nhật trạng thái');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Status button clicked, current isOpen:', isOpen);

    if (buttonRef.current) {
      setButtonRect(buttonRef.current.getBoundingClientRect());
    }
    setIsOpen(!isOpen);
  };

  const PopoverContent = () => {
    if (!isOpen || !buttonRect) return null;

    return createPortal(
      <>
        {/* Debug log */}
        {console.log('Popover is rendering via portal, isOpen:', isOpen)}

        {/* Backdrop */}
        <div className='fixed inset-0 z-40' onClick={() => setIsOpen(false)} />

        {/* Popover */}
        <div
          ref={popoverRef}
          className='fixed w-48 rounded-md border border-gray-200 bg-white shadow-xl'
          style={{
            zIndex: 9999,
            top: buttonRect.bottom + window.scrollY + 4,
            left: buttonRect.left + window.scrollX,
          }}
        >
          <div className='p-1'>
            <div className='border-b border-gray-100 px-3 py-2 text-xs font-semibold text-gray-500'>
              Cập nhật trạng thái
            </div>
            {ORDER_STATUSES.map(status => (
              <button
                key={status.value}
                onClick={e => {
                  e.stopPropagation();
                  handleStatusUpdate(status.value);
                }}
                disabled={isUpdating}
                className={`flex w-full items-center justify-between rounded px-3 py-2 text-sm transition-colors hover:bg-gray-50 ${
                  status.value === order.status.toUpperCase()
                    ? 'bg-blue-50'
                    : ''
                } ${isUpdating ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
              >
                <div className='flex items-center gap-2'>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${status.color}`}
                  >
                    {status.label}
                  </span>
                </div>
                {status.value === order.status.toUpperCase() && (
                  <Check className='h-4 w-4 text-blue-600' />
                )}
              </button>
            ))}
          </div>
        </div>
      </>,
      document.body
    );
  };

  return (
    <div className='relative'>
      <Button
        ref={buttonRef}
        variant='outline'
        size='sm'
        onClick={handleButtonClick}
        className='flex items-center gap-2'
        disabled={isUpdating}
      >
        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${
            currentStatus?.color || 'bg-gray-100 text-gray-800'
          }`}
        >
          {currentStatus?.label || order.status}
        </span>
        <ChevronDown
          className={`h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </Button>

      <PopoverContent />

      {isUpdating && (
        <div className='absolute inset-0 flex items-center justify-center rounded bg-white/80'>
          <div className='h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent' />
        </div>
      )}
    </div>
  );
};

export default OrderStatusPopover;
