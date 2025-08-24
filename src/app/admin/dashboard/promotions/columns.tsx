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
    accessorKey: 'discountValue',
    header: 'Giá trị giảm',
  },
  {
    accessorKey: 'discountType',
    header: 'Loại giảm giá',
  },
  {
    accessorKey: 'startDate',
    header: 'Ngày bắt đầu',
  },
  {
    accessorKey: 'endDate',
    header: 'Ngày kết thúc',
  },
  {
    accessorKey: 'isActive',
    header: 'Trạng thái',
  },
  {
    accessorKey: 'action',
    header: 'Thao tác',
    cell: ({ row }) => {
      const promotion = row.original;
      return (
        <div className='flex items-center gap-2'>
          <Button variant='outline'>Sửa</Button>
          <DeleteDialog
            title='Xóa khuyến mãi'
            description={`Bạn có chắc muốn xóa khuyến mãi "${promotion.promotionName}"? Hành động này không thể hoàn tác.`}
            onDelete={() => {}}
          />
        </div>
      );
    },
  },
];
