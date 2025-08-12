'use client';

import { Button } from '@/components/ui/button';
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
      return (
        <div className='flex items-center gap-2'>
          <Button variant='outline'>Edit</Button>
          <Button variant='destructive'>Delete</Button>
        </div>
      );
    },
  },
];
