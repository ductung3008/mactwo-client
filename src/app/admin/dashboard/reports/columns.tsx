'use client';

import { Button } from '@/components/ui/button';
import { Category } from '@/types/category';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: 'category_id',
    header: 'ID',
  },
  {
    accessorKey: 'category_name',
    header: 'Tên danh mục',
  },
  {
    accessorKey: 'parent_id',
    header: 'ID danh mục cha',
  },
  {
    accessorKey: 'createdAt',
    header: 'Ngày tạo',
  },
  {
    accessorKey: 'updatedAt',
    header: 'Ngày cập nhật',
  },
  {
    accessorKey: 'action',
    header: 'Thao tác',
    cell: ({}) => {
      return (
        <div className='flex items-center gap-2'>
          <Button variant='outline'>Sửa</Button>
          <Button variant='destructive'>Xóa</Button>
        </div>
      );
    },
  },
];
