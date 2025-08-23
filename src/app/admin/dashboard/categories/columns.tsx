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
<<<<<<< HEAD
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
=======
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
>>>>>>> 441881f107cef54cfbb1d185479bb70faa22622e
        </div>
      );
    },
  },
  {
    accessorKey: 'parentId',
    header: 'Danh mục cha',
    cell: ({ row }) => {
<<<<<<< HEAD
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
=======
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
>>>>>>> 441881f107cef54cfbb1d185479bb70faa22622e
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
<<<<<<< HEAD
          } else {
            console.error('Failed to delete category:', response.message);
          }
        } catch (error) {
          console.error('Error deleting category:', error);
=======
          }
        } catch (error) {
          console.error('Failed to delete category:', error);
>>>>>>> 441881f107cef54cfbb1d185479bb70faa22622e
        }
      };

      return (
        <div className='flex items-center gap-2'>
<<<<<<< HEAD
          <Button variant='outline' size='sm' onClick={() => onEdit(category)}>
=======
          <Button
            variant='outline'
            size='sm'
            onClick={() => onEdit(category)}
            className='flex items-center gap-1'
          >
>>>>>>> 441881f107cef54cfbb1d185479bb70faa22622e
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
