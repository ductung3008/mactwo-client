'use client';

import { Button } from '@/components/ui/button';
import DeleteDialog from '@/components/ui/delete-dialog';
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
      const promotion = row.original;
      return (
        <div className='flex items-center gap-2'>
          <Button variant='outline'>Edit</Button>
          <DeleteDialog
            title='Xóa khuyến mãi'
            description={`Bạn có chắc muốn xóa khuyến mãi "${promotion.promotionName}"? Hành động này không thể hoàn tác.`}
            onDelete={() => {
              console.log('Delete promotion', promotion.promotionId);
            }}
          />
        </div>
      );
    },
  },
];
