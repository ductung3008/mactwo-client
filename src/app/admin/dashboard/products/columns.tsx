'use client';

import { Button } from '@/components/ui/button';
import DeleteDialog from '@/components/ui/delete-dialog';
import { productApi } from '@/lib/api';
import { Product } from '@/types/product';
import { ColumnDef } from '@tanstack/react-table';
import { Edit } from 'lucide-react';
import Image from 'next/image';

interface ProductColumnProps {
  onEdit: (product: Product) => void;
  onDeleteSuccess: () => void;
}

export const createColumns = ({
  onEdit,
  onDeleteSuccess,
}: ProductColumnProps): ColumnDef<Product>[] => [
  {
    accessorKey: 'productId',
    header: 'ID',
    cell: ({ row }) => {
      return <div>{row.original.id}</div>;
    },
  },
  {
    accessorKey: 'imageUrl',
    header: 'Image',
    cell: ({ row }) => {
      return (
        <Image
          src={row.original.imageUrl}
          alt={row.original.name}
          width={100}
          height={100}
        />
      );
    },
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'categoryId',
    header: 'Category',
  },
  // {
  //   accessorKey: 'description',
  //   header: 'Description',
  // },
  {
    accessorKey: 'productVariants',
    header: 'Variants',
    cell: ({ row }) => {
      const variants = row.original.variants;
      return variants.map(variant => {
        return (
          <div key={variant.product_variant_id} className='flex flex-col gap-2'>
            <div>{variant.color}</div>
            <div>{variant.price}</div>
          </div>
        );
      });
    },
  },
  {
    accessorKey: 'action',
    header: 'Thao tác',
    cell: ({ row }) => {
      const product = row.original;

      const handleDelete = async () => {
        try {
          const response = await productApi.deleteProduct(product.id);
          if (response.success) {
            onDeleteSuccess();
          }
        } catch (error) {
          console.error('Failed to delete product:', error);
        }
      };

      return (
        <div className='flex items-center gap-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => onEdit(product)}
            className='flex items-center gap-1'
          >
            <Edit className='h-3 w-3' />
            Sửa
          </Button>
          <DeleteDialog
            title='Xóa sản phẩm'
            description={`Bạn có chắc muốn xóa sản phẩm "${product.name}"? Hành động này không thể hoàn tác.`}
            onDelete={handleDelete}
          />
        </div>
      );
    },
  },
];
