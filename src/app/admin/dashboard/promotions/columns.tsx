'use client';

import { Button } from '@/components/ui/button';
import DeleteDialog from '@/components/ui/delete-dialog';
import { Promotion } from '@/types/promotion';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Promotion>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'promotionName',
    header: 'Tên khuyến mãi',
  },
  {
    accessorKey: 'description',
    header: 'Mô tả',
  },
  {
    accessorKey: 'discountAmount',
    header: 'Số tiền giảm',
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('discountAmount'));
      const formatted = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(amount);
      return <div className='font-medium'>{formatted}</div>;
    },
  },
  {
    accessorKey: 'startDate',
    header: 'Ngày bắt đầu',
    cell: ({ row }) => {
      const date = new Date(row.getValue('startDate'));
      return <div>{date.toLocaleDateString('vi-VN')}</div>;
    },
  },
  {
    accessorKey: 'endDate',
    header: 'Ngày kết thúc',
    cell: ({ row }) => {
      const date = new Date(row.getValue('endDate'));
      return <div>{date.toLocaleDateString('vi-VN')}</div>;
    },
  },
  {
    accessorKey: 'action',
    header: 'Hành động',
    cell: ({ row }) => {
      const promotion = row.original;
      return (
        <div className='flex items-center gap-2'>
          <Button variant='outline'>Sửa</Button>
          <DeleteDialog
            title='Xóa khuyến mãi'
            description={`Bạn có chắc muốn xóa khuyến mãi "${promotion.promotionName}"? Hành động này không thể hoàn tác.`}
            onDelete={() => {
              console.log('Delete promotion', promotion.id);
            }}
          />
        </div>
      );
    },
  },
];
