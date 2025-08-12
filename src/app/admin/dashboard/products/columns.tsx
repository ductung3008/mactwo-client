'use client';

import { Button } from '@/components/ui/button';
import { Product } from '@/types/product';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'productId',
    header: 'ID',
  },
  {
    accessorKey: 'imageUrl',
    header: 'Image',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'categoryId',
    header: 'Category',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'productVariants',
    header: 'Variants',
    cell: ({ row }) => {
      return <div>{row.original.productVariants.length}</div>;
    },
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
