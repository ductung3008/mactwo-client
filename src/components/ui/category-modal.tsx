'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { categoryApi } from '@/lib/api';
import {
  CreateCategoryFormData,
  UpdateCategoryFormData,
  createCategorySchema,
  updateCategorySchema,
} from '@/schemas/category.schema';
import { FlatCategory } from '@/types/category';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  category?: FlatCategory | null;
  categories?: Array<{ id: number; name: string }>;
}

export function CategoryModal({
  isOpen,
  onClose,
  onSuccess,
  category,
  categories = [],
}: CategoryModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEditing = Boolean(category);

  // Form cho tạo mới
  const createForm = useForm<CreateCategoryFormData>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      categoryName: '',
      parentId: undefined,
    },
  });

  // Form cho cập nhật
  const updateForm = useForm<UpdateCategoryFormData>({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: {
      categoryName: '',
    },
  });

  // Chọn form phù hợp
  const activeForm = isEditing ? updateForm : createForm;

  // Reset form khi category thay đổi hoặc modal mở
  useEffect(() => {
    if (isOpen) {
      setError(null);
      if (category) {
        // Editing mode
        updateForm.reset({
          categoryName: category.categoryName,
        });
      } else {
        // Creating mode
        createForm.reset({
          categoryName: '',
          parentId: undefined,
        });
      }
    }
  }, [category, isOpen, createForm, updateForm]);

  const onSubmit = async (
    data: CreateCategoryFormData | UpdateCategoryFormData
  ) => {
    try {
      setLoading(true);
      setError(null);

      let response;
      if (isEditing && category) {
        // Update category
        response = await categoryApi.updateCategory(
          category.id.toString(),
          data as UpdateCategoryFormData
        );
      } else {
        // Create new category
        response = await categoryApi.createCategory(
          data as CreateCategoryFormData
        );
      }

      if (response.success) {
        onSuccess();
        onClose();
        activeForm.reset();
      } else {
        setError(response.message || 'Đã xảy ra lỗi');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={activeForm.handleSubmit(onSubmit)}
          className='space-y-4'
        >
          {error && (
            <div className='rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700'>
              {error}
            </div>
          )}

          <div>
            <label className='mb-1 block text-sm font-medium text-gray-700'>
              Tên danh mục *
            </label>
            <Input
              {...(isEditing
                ? updateForm.register('categoryName')
                : createForm.register('categoryName'))}
              placeholder='Nhập tên danh mục'
              className={
                activeForm.formState.errors.categoryName ? 'border-red-500' : ''
              }
            />
            {activeForm.formState.errors.categoryName && (
              <p className='mt-1 text-sm text-red-600'>
                {activeForm.formState.errors.categoryName.message}
              </p>
            )}
          </div>

          {/* Chỉ hiển thị chọn danh mục cha khi tạo mới */}
          {!isEditing && (
            <div>
              <label className='mb-1 block text-sm font-medium text-gray-700'>
                Danh mục cha
              </label>
              <select
                {...createForm.register('parentId', {
                  setValueAs: value =>
                    value === '' || value === '0' ? undefined : Number(value),
                })}
                className={`w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  createForm.formState.errors.parentId
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
              >
                <option value=''>Không có danh mục cha (Danh mục gốc)</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {createForm.formState.errors.parentId && (
                <p className='mt-1 text-sm text-red-600'>
                  {createForm.formState.errors.parentId.message}
                </p>
              )}
            </div>
          )}

          {/* Form Actions */}
          <div className='flex justify-end space-x-3 border-t pt-4'>
            <Button type='button' variant='outline' onClick={onClose}>
              Hủy
            </Button>
            <Button type='submit' disabled={loading}>
              {loading
                ? 'Đang xử lý...'
                : isEditing
                  ? 'Cập nhật'
                  : 'Thêm danh mục'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
