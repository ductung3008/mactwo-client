'use client';

import { Button } from '@/components/ui/button';
import DeleteDialog from '@/components/ui/delete-dialog';
import { Order } from '@/types/order';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: 'orderId',
    header: 'ID',
  },
  {
    accessorKey: 'userId',
    header: 'User ID',
  },
  {
    accessorKey: 'addressId',
    header: 'Address ID',
  },
  {
    accessorKey: 'promotionId',
    header: 'Promotion ID',
  },
  {
    accessorKey: 'orderDate',
    header: 'Order Date',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'totalAmount',
    header: 'Total Amount',
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div className='flex items-center gap-2'>
          <Button variant='outline'>Edit</Button>
          <DeleteDialog
            title='Xóa đơn hàng'
            description={`Bạn có chắc muốn xóa đơn hàng "${order.orderId}"? Hành động này không thể hoàn tác.`}
            onDelete={() => {
              console.log('Delete order', order.orderId);
            }}
          />
        </div>
      );
    },
  },
];
