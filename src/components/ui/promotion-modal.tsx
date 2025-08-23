'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { promotionApi } from '@/lib/api';
import {
  CreatePromotionFormData,
  UpdatePromotionFormData,
  createPromotionSchema,
  updatePromotionSchema,
} from '@/schemas/promotion.schema';
import { Promotion } from '@/types/promotion';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface PromotionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  promotion?: Promotion | null;
}

export function PromotionModal({
  isOpen,
  onClose,
  onSuccess,
  promotion,
}: PromotionModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEditing = Boolean(promotion);

  // Form cho tạo mới
  const createForm = useForm<CreatePromotionFormData>({
    resolver: zodResolver(createPromotionSchema),
    defaultValues: {
      promotionName: '',
      description: '',
      discountAmount: 0,
      startDate: '',
      endDate: '',
    },
  });

  // Form cho cập nhật
  const updateForm = useForm<UpdatePromotionFormData>({
    resolver: zodResolver(updatePromotionSchema),
    defaultValues: {
      promotionName: '',
      description: '',
      discountAmount: 0,
      startDate: '',
      endDate: '',
    },
  });

  // Chọn form phù hợp
  const activeForm = isEditing ? updateForm : createForm;

  // Reset form khi promotion thay đổi hoặc modal mở
  useEffect(() => {
    if (isOpen) {
      setError(null);
      if (promotion) {
        // Editing mode - format dates for datetime-local input
        const startDate = new Date(promotion.startDate);
        const endDate = new Date(promotion.endDate);

        updateForm.reset({
          promotionName: promotion.promotionName,
          description: promotion.description,
          discountAmount: promotion.discountAmount,
          startDate: startDate.toISOString().slice(0, 16), // Format: YYYY-MM-DDTHH:MM
          endDate: endDate.toISOString().slice(0, 16),
        });
      } else {
        // Creating mode
        createForm.reset({
          promotionName: '',
          description: '',
          discountAmount: 0,
          startDate: '',
          endDate: '',
        });
      }
    }
  }, [promotion, isOpen, createForm, updateForm]);

  const onSubmit = async (
    data: CreatePromotionFormData | UpdatePromotionFormData
  ) => {
    try {
      setLoading(true);
      setError(null);

      // Convert datetime-local format to ISO string for API
      const formattedData = {
        ...data,
        startDate: new Date(data.startDate).toISOString(),
        endDate: new Date(data.endDate).toISOString(),
      };

      let response;
      if (isEditing && promotion) {
        // Update promotion
        response = await promotionApi.updatePromotion(
          promotion.id,
          formattedData as UpdatePromotionFormData
        );
      } else {
        // Create new promotion
        response = await promotionApi.createPromotion(
          formattedData as CreatePromotionFormData
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
            {isEditing ? 'Chỉnh sửa khuyến mãi' : 'Thêm khuyến mãi mới'}
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
              Tên khuyến mãi *
            </label>
            <Input
              {...(isEditing
                ? updateForm.register('promotionName')
                : createForm.register('promotionName'))}
              placeholder='Nhập tên khuyến mãi'
              className={
                activeForm.formState.errors.promotionName
                  ? 'border-red-500'
                  : ''
              }
            />
            {activeForm.formState.errors.promotionName && (
              <p className='mt-1 text-sm text-red-600'>
                {activeForm.formState.errors.promotionName.message}
              </p>
            )}
          </div>

          <div>
            <label className='mb-1 block text-sm font-medium text-gray-700'>
              Mô tả *
            </label>
            <textarea
              {...(isEditing
                ? updateForm.register('description')
                : createForm.register('description'))}
              rows={3}
              placeholder='Nhập mô tả khuyến mãi'
              className={`w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                activeForm.formState.errors.description
                  ? 'border-red-500'
                  : 'border-gray-300'
              }`}
            />
            {activeForm.formState.errors.description && (
              <p className='mt-1 text-sm text-red-600'>
                {activeForm.formState.errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label className='mb-1 block text-sm font-medium text-gray-700'>
              Số tiền giảm (VNĐ) *
            </label>
            <Input
              {...(isEditing
                ? updateForm.register('discountAmount', { valueAsNumber: true })
                : createForm.register('discountAmount', {
                    valueAsNumber: true,
                  }))}
              type='number'
              placeholder='0'
              min='0'
              step='1000'
              className={
                activeForm.formState.errors.discountAmount
                  ? 'border-red-500'
                  : ''
              }
            />
            {activeForm.formState.errors.discountAmount && (
              <p className='mt-1 text-sm text-red-600'>
                {activeForm.formState.errors.discountAmount.message}
              </p>
            )}
          </div>

          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div>
              <label className='mb-1 block text-sm font-medium text-gray-700'>
                Ngày bắt đầu *
              </label>
              <Input
                {...(isEditing
                  ? updateForm.register('startDate')
                  : createForm.register('startDate'))}
                type='datetime-local'
                className={
                  activeForm.formState.errors.startDate ? 'border-red-500' : ''
                }
              />
              {activeForm.formState.errors.startDate && (
                <p className='mt-1 text-sm text-red-600'>
                  {activeForm.formState.errors.startDate.message}
                </p>
              )}
            </div>

            <div>
              <label className='mb-1 block text-sm font-medium text-gray-700'>
                Ngày kết thúc *
              </label>
              <Input
                {...(isEditing
                  ? updateForm.register('endDate')
                  : createForm.register('endDate'))}
                type='datetime-local'
                className={
                  activeForm.formState.errors.endDate ? 'border-red-500' : ''
                }
              />
              {activeForm.formState.errors.endDate && (
                <p className='mt-1 text-sm text-red-600'>
                  {activeForm.formState.errors.endDate.message}
                </p>
              )}
            </div>
          </div>

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
                  : 'Thêm khuyến mãi'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
