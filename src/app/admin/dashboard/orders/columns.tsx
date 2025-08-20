'use client';

import { Button } from '@/components/ui/button';
import OrderDetailModal from '@/components/ui/order-detail-modal';
import OrderStatusPopover from '@/components/ui/order-status-popover';
import { Order } from '@/types/order';
import { formatCurrency } from '@/utils';
import { ColumnDef } from '@tanstack/react-table';
import { Eye } from 'lucide-react';
import { useState } from 'react';

interface CreateColumnsProps {
  onStatusUpdate: () => void;
}

const ActionsCell = ({ order }: { order: Order }) => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  return (
    <>
      <div className='flex items-center gap-2'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => setIsDetailModalOpen(true)}
        >
          <Eye className='h-4 w-4' />
        </Button>
      </div>

      <OrderDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        order={order}
      />
    </>
  );
};

export const createColumns = ({
  onStatusUpdate,
}: CreateColumnsProps): ColumnDef<Order>[] => [
  {
    accessorKey: 'id',
    header: 'Mã đơn',
    cell: ({ row }) => `#${row.original.id}`,
  },
  {
    accessorKey: 'userId',
    header: 'Khách hàng',
    cell: ({ row }) => (
      <div className='max-w-[200px] truncate'>{row.original.userId}</div>
    ),
  },
  {
    accessorKey: 'address.shippingAddress',
    header: 'Địa chỉ',
    cell: ({ row }) => (
      <div className='max-w-[200px] truncate'>
        {row.original.address.shippingAddress}
      </div>
    ),
  },
  {
    accessorKey: 'orderItems',
    header: 'Số sản phẩm',
    cell: ({ row }) => {
      const totalItems = row.original.orderItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      return totalItems;
    },
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    cell: ({ row }) => (
      <OrderStatusPopover
        order={row.original}
        onStatusUpdate={onStatusUpdate}
      />
    ),
  },
  {
    accessorKey: 'totalAmount',
    header: 'Tổng tiền',
    cell: ({ row }) => (
      <span className='font-semibold text-red-600'>
        {formatCurrency(row.original.totalAmount)}
      </span>
    ),
  },
  {
    accessorKey: 'createdDate',
    header: 'Ngày đặt',
    cell: ({ row }) => {
      const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });
      };
      return formatDate(row.original.createdDate);
    },
  },
  {
    id: 'actions',
    header: 'Thao tác',
    cell: ({ row }) => <ActionsCell order={row.original} />,
  },
];
