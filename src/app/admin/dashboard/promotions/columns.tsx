'use client';

import { Button } from '@/components/ui/button';
import { Promotion } from '@/types/promotion';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Promotion>[] = [
  {
    accessorKey: 'promotionId',
    header: 'ID',
  },
  {
    accessorKey: 'promotionName',
    header: 'Name',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'discountAmount',
    header: 'Discount Amount',
  },
  {
    accessorKey: 'startDate',
    header: 'Start Date',
  },
  {
    accessorKey: 'endDate',
    header: 'End Date',
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
