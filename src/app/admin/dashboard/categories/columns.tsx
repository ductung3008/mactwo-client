'use client';

import { Button } from '@/components/ui/button';
import DeleteDialog from '@/components/ui/delete-dialog';
import { categoryApi } from '@/lib/api';
import { FlatCategory } from '@/types/category';
import { ColumnDef } from '@tanstack/react-table';

interface CreateColumnsProps {
  onEdit: (category: FlatCategory) => void;
  onDeleteSuccess: () => void;
}

export const createColumns = ({
  onEdit,
  onDeleteSuccess,
}: CreateColumnsProps): ColumnDef<FlatCategory>[] => [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => {
      return <div>{row.original.id}</div>;
    },
  },
  {
    accessorKey: 'categoryName',
    header: 'Tên danh mục',
    cell: ({ row }) => {
      const category = row.original;
      const indent = '　'.repeat(category.level || 0);
      return (
        <div className='flex items-center'>
          <span className='mr-1 text-slate-400'>{indent}</span>
          {!!category.level && category.level > 0 && (
            <span className='mr-2 text-slate-400'>└─</span>
          )}
          <span>{category.categoryName}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'parentId',
    header: 'Danh mục cha',
    cell: ({ row }) => {
      return <div>{row.original.parentId ? row.original.parentId : 'Gốc'}</div>;
    },
  },
  {
    accessorKey: 'level',
    header: 'Cấp độ',
    cell: ({ row }) => {
      const level = row.original.level || 0;
      return (
        <span className='inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800'>
          Cấp {level + 1}
        </span>
      );
    },
  },
  {
    accessorKey: 'action',
    header: 'Thao tác',
    cell: ({ row }) => {
      const category = row.original;

      const handleDelete = async () => {
        try {
          const response = await categoryApi.deleteCategory(
            category.id.toString()
          );
          if (response.success) {
            onDeleteSuccess();
          }
        } catch (error) {
          console.error('Failed to delete category:', error);
        }
      };

      return (
        <div className='flex items-center gap-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => onEdit(category)}
            className='flex items-center gap-1'
          >
            Sửa
          </Button>
          <DeleteDialog
            title='Xóa danh mục'
            description={`Bạn có chắc muốn xóa danh mục "${category.categoryName}"? Hành động này không thể hoàn tác.`}
            onDelete={handleDelete}
          />
        </div>
      );
    },
  },
];
