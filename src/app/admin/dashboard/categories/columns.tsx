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
  },
  {
    accessorKey: 'name',
    header: 'Tên danh mục',
    cell: ({ row }) => {
      const category = row.original;
      const level = category.level ?? 0;
      const indent = '　'.repeat(level); // Sử dụng full-width space để indent

      return (
        <div>
          {indent}
          {category.categoryName}
        </div>
      );
    },
  },
  {
    accessorKey: 'parentId',
    header: 'Danh mục cha',
    cell: ({ row }) => {
      const category = row.original;
      return category.parentId || 'Gốc';
    },
  },
  {
    id: 'level',
    header: 'Cấp độ',
    cell: ({ row }) => {
      const category = row.original;
      return category.level ?? 0;
    },
  },
  {
    id: 'action',
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
          } else {
            console.error('Failed to delete category:', response.message);
          }
        } catch (error) {
          console.error('Error deleting category:', error);
        }
      };

      return (
        <div className='flex items-center gap-2'>
          <Button variant='outline' size='sm' onClick={() => onEdit(category)}>
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
