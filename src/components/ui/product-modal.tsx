'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { productApi } from '@/lib/api';
import {
  CreateProductFormData,
  createProductSchema,
} from '@/schemas/product.schema';
import { Product } from '@/types/product';
import { zodResolver } from '@hookform/resolvers/zod';
import { Minus, Plus, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  product?: Product | null;
  categories: Array<{ id: number; name: string }>;
}

export function ProductModal({
  isOpen,
  onClose,
  onSuccess,
  product,
  categories,
}: ProductModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: '',
      description: '',
      imageUrl: '',
      categoryId: 0,
      variants: [
        {
          color: '',
          storage: '',
          ram: '',
          imageUrls: [''],
          price: 0,
          stockQuantity: 0,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'variants',
  });

  // Reset form when product changes or modal opens
  useEffect(() => {
    if (product && isOpen) {
      setValue('name', product.name);
      setValue('description', product.description);
      setValue('imageUrl', product.imageUrl);
      setValue('categoryId', product.categoryId);
      setValue(
        'variants',
        product.variants.map(variant => ({
          color: variant.color,
          storage: variant.storage,
          ram: variant.ram,
          imageUrls: variant.imageUrls,
          price: variant.price,
          stockQuantity: variant.stockQuantity,
        }))
      );
    } else if (!product && isOpen) {
      reset();
    }
  }, [product, isOpen, setValue, reset]);

  const onSubmit = async (data: CreateProductFormData) => {
    try {
      setLoading(true);
      setError(null);

      let response;
      if (product) {
        response = await productApi.updateProduct(product.id, data);
      } else {
        response = await productApi.createProduct(data);
      }

      if (response.success) {
        onSuccess();
        onClose();
        reset();
      } else {
        setError(response.message || 'Đã xảy ra lỗi');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi');
    } finally {
      setLoading(false);
    }
  };

  const addVariant = () => {
    append({
      color: '',
      storage: '',
      ram: '',
      imageUrls: [''],
      price: 0,
      stockQuantity: 0,
    });
  };

  const removeVariant = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const addImageUrl = (variantIndex: number) => {
    const currentVariant = watch(`variants.${variantIndex}`);
    setValue(`variants.${variantIndex}.imageUrls`, [
      ...(currentVariant?.imageUrls || []),
      '',
    ]);
  };

  const removeImageUrl = (variantIndex: number, imageIndex: number) => {
    const currentVariant = watch(`variants.${variantIndex}`);
    if (currentVariant)
      if (currentVariant?.imageUrls.length > 1) {
        const newUrls = currentVariant.imageUrls.filter(
          (_, index) => index !== imageIndex
        );
        setValue(`variants.${variantIndex}.imageUrls`, newUrls);
      }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-h-[90vh] max-w-6xl overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>
            {product ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          {error && (
            <div className='rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700'>
              {error}
            </div>
          )}

          {/* Basic Product Info */}
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div>
              <label className='mb-1 block text-sm font-medium text-gray-700'>
                Tên sản phẩm *
              </label>
              <Input
                {...register('name')}
                placeholder='Nhập tên sản phẩm'
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && (
                <p className='mt-1 text-sm text-red-600'>
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className='mb-1 block text-sm font-medium text-gray-700'>
                Danh mục *
              </label>
              <select
                {...register('categoryId', { valueAsNumber: true })}
                className={`w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  errors.categoryId ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value={0}>Chọn danh mục</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <p className='mt-1 text-sm text-red-600'>
                  {errors.categoryId.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className='mb-1 block text-sm font-medium text-gray-700'>
              Mô tả *
            </label>
            <textarea
              {...register('description')}
              rows={3}
              placeholder='Nhập mô tả sản phẩm'
              className={`w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.description && (
              <p className='mt-1 text-sm text-red-600'>
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label className='mb-1 block text-sm font-medium text-gray-700'>
              Hình ảnh chính *
            </label>
            <Input
              {...register('imageUrl')}
              placeholder='Nhập URL hình ảnh chính'
              className={errors.imageUrl ? 'border-red-500' : ''}
            />
            {errors.imageUrl && (
              <p className='mt-1 text-sm text-red-600'>
                {errors.imageUrl.message}
              </p>
            )}
          </div>

          {/* Product Variants */}
          <div>
            <div className='mb-4 flex items-center justify-between'>
              <h3 className='text-lg font-medium text-gray-900'>
                Các phiên bản sản phẩm
              </h3>
              <Button
                type='button'
                onClick={addVariant}
                variant='outline'
                size='sm'
                className='flex items-center gap-2'
              >
                <Plus className='h-4 w-4' />
                Thêm phiên bản
              </Button>
            </div>

            <div className='space-y-6'>
              {fields.map((field, variantIndex) => (
                <div
                  key={field.id}
                  className='rounded-lg border border-gray-200 p-4'
                >
                  <div className='mb-4 flex items-center justify-between'>
                    <h4 className='font-medium text-gray-800'>
                      Phiên bản {variantIndex + 1}
                    </h4>
                    {fields.length > 1 && (
                      <Button
                        type='button'
                        onClick={() => removeVariant(variantIndex)}
                        variant='outline'
                        size='sm'
                        className='text-red-600 hover:text-red-700'
                      >
                        <Minus className='h-4 w-4' />
                      </Button>
                    )}
                  </div>

                  <div className='mb-4 grid grid-cols-1 gap-4 md:grid-cols-3'>
                    <div>
                      <label className='mb-1 block text-sm font-medium text-gray-700'>
                        Màu sắc *
                      </label>
                      <Input
                        {...register(`variants.${variantIndex}.color`)}
                        placeholder='Ví dụ: Đen, Trắng'
                        className={
                          errors.variants?.[variantIndex]?.color
                            ? 'border-red-500'
                            : ''
                        }
                      />
                      {errors.variants?.[variantIndex]?.color && (
                        <p className='mt-1 text-sm text-red-600'>
                          {errors.variants[variantIndex]?.color?.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className='mb-1 block text-sm font-medium text-gray-700'>
                        Dung lượng *
                      </label>
                      <Input
                        {...register(`variants.${variantIndex}.storage`)}
                        placeholder='Ví dụ: 128GB, 256GB'
                        className={
                          errors.variants?.[variantIndex]?.storage
                            ? 'border-red-500'
                            : ''
                        }
                      />
                      {errors.variants?.[variantIndex]?.storage && (
                        <p className='mt-1 text-sm text-red-600'>
                          {errors.variants[variantIndex]?.storage?.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className='mb-1 block text-sm font-medium text-gray-700'>
                        RAM *
                      </label>
                      <Input
                        {...register(`variants.${variantIndex}.ram`)}
                        placeholder='Ví dụ: 6GB, 8GB'
                        className={
                          errors.variants?.[variantIndex]?.ram
                            ? 'border-red-500'
                            : ''
                        }
                      />
                      {errors.variants?.[variantIndex]?.ram && (
                        <p className='mt-1 text-sm text-red-600'>
                          {errors.variants[variantIndex]?.ram?.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className='mb-4 grid grid-cols-1 gap-4 md:grid-cols-2'>
                    <div>
                      <label className='mb-1 block text-sm font-medium text-gray-700'>
                        Giá (VNĐ) *
                      </label>
                      <Input
                        {...register(`variants.${variantIndex}.price`, {
                          valueAsNumber: true,
                        })}
                        type='number'
                        placeholder='0'
                        min='0'
                        className={
                          errors.variants?.[variantIndex]?.price
                            ? 'border-red-500'
                            : ''
                        }
                      />
                      {errors.variants?.[variantIndex]?.price && (
                        <p className='mt-1 text-sm text-red-600'>
                          {errors.variants[variantIndex]?.price?.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className='mb-1 block text-sm font-medium text-gray-700'>
                        Số lượng tồn kho *
                      </label>
                      <Input
                        {...register(`variants.${variantIndex}.stockQuantity`, {
                          valueAsNumber: true,
                        })}
                        type='number'
                        placeholder='0'
                        min='0'
                        className={
                          errors.variants?.[variantIndex]?.stockQuantity
                            ? 'border-red-500'
                            : ''
                        }
                      />
                      {errors.variants?.[variantIndex]?.stockQuantity && (
                        <p className='mt-1 text-sm text-red-600'>
                          {
                            errors.variants[variantIndex]?.stockQuantity
                              ?.message
                          }
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Image URLs */}
                  <div>
                    <div className='mb-2 flex items-center justify-between'>
                      <label className='block text-sm font-medium text-gray-700'>
                        Hình ảnh phiên bản *
                      </label>
                      <Button
                        type='button'
                        onClick={() => addImageUrl(variantIndex)}
                        variant='outline'
                        size='sm'
                        className='text-xs'
                      >
                        <Plus className='mr-1 h-3 w-3' />
                        Thêm ảnh
                      </Button>
                    </div>

                    <div className='space-y-2'>
                      {watch(`variants.${variantIndex}.imageUrls`)?.map(
                        (url, imageIndex) => (
                          <div
                            key={imageIndex}
                            className='flex items-center gap-2'
                          >
                            <Input
                              {...register(
                                `variants.${variantIndex}.imageUrls.${imageIndex}`
                              )}
                              placeholder='Nhập URL hình ảnh'
                              className='flex-1'
                            />
                            {(watch(`variants.${variantIndex}.imageUrls`) || [])
                              .length > 1 && (
                              <Button
                                type='button'
                                onClick={() =>
                                  removeImageUrl(variantIndex, imageIndex)
                                }
                                variant='outline'
                                size='sm'
                                className='text-red-600 hover:text-red-700'
                              >
                                <X className='h-4 w-4' />
                              </Button>
                            )}
                          </div>
                        )
                      )}
                    </div>
                    {errors.variants?.[variantIndex]?.imageUrls && (
                      <p className='mt-1 text-sm text-red-600'>
                        {errors.variants[variantIndex]?.imageUrls?.message}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Actions */}
          <div className='flex justify-end space-x-3 border-t pt-6'>
            <Button type='button' variant='outline' onClick={onClose}>
              Hủy
            </Button>
            <Button type='submit' disabled={loading}>
              {loading
                ? 'Đang xử lý...'
                : product
                  ? 'Cập nhật'
                  : 'Thêm sản phẩm'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
