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
<<<<<<< HEAD
    header: 'Name',
  },
  {
    accessorKey: 'parent_id',
    header: 'Parent ID',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
  },
  {
    accessorKey: 'updatedAt',
    header: 'Updated At',
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => {
      return (
        <div className='flex items-center gap-2'>
          <Button variant='outline'>Edit</Button>
          <Button variant='destructive'>Delete</Button>
=======
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
>>>>>>> 441881f107cef54cfbb1d185479bb70faa22622e
        </div>
      );
    },
  },
];
