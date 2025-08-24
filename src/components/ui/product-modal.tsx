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
import { Info, Minus, Package, Plus, X } from 'lucide-react';
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
      <DialogContent className='max-h-[95vh] max-w-7xl overflow-y-auto border-0 bg-white shadow-2xl'>
        <DialogHeader className='-mx-6 -mt-6 rounded-t-lg border-b border-slate-200 bg-white/70 px-6 pt-6 pb-6 backdrop-blur-sm'>
          <DialogTitle className='flex items-center gap-3 text-2xl font-bold text-slate-800'>
            <div className='rounded-lg bg-blue-500 p-2 text-white shadow-md'>
              <Package className='h-6 w-6' />
            </div>
            {product ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-8 p-2'>
          {error && (
            <div className='relative rounded-xl border-l-4 border-l-red-500 bg-gradient-to-r from-red-50 to-red-100/50 p-4 shadow-sm'>
              <div className='flex items-center gap-3'>
                <div className='rounded-full bg-red-500 p-1 text-white'>
                  <X className='h-4 w-4' />
                </div>
                <p className='font-medium text-red-700'>{error}</p>
              </div>
            </div>
          )}

          <div className='rounded-xl border border-slate-200 bg-white p-6 shadow-sm'>
            <div className='mb-6 flex items-center gap-3'>
              <div className='rounded-lg bg-emerald-500 p-2 text-white'>
                <Info className='h-5 w-5' />
              </div>
              <h3 className='text-lg font-semibold text-slate-800'>
                Thông tin cơ bản
              </h3>
            </div>

            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <div>
                <label className='mb-2 block text-sm font-semibold text-slate-700'>
                  Tên sản phẩm *
                </label>
                <Input
                  {...register('name')}
                  placeholder='Nhập tên sản phẩm'
                  className={`transition-all duration-200 ${
                    errors.name
                      ? 'border-red-400 bg-red-50 focus:ring-red-200'
                      : 'border-slate-300 bg-white focus:border-blue-400 focus:ring-blue-200'
                  } shadow-sm hover:shadow-md`}
                />
                {errors.name && (
                  <p className='mt-2 text-sm font-medium text-red-600'>
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className='mb-2 block text-sm font-semibold text-slate-700'>
                  Danh mục *
                </label>
                <select
                  {...register('categoryId', { valueAsNumber: true })}
                  className={`w-full rounded-lg border px-4 py-2 shadow-sm transition-all duration-200 hover:shadow-md focus:ring-2 focus:outline-none ${
                    errors.categoryId
                      ? 'border-red-400 bg-red-50 focus:ring-red-200'
                      : 'border-slate-300 bg-white focus:border-blue-400 focus:ring-blue-200'
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
                  <p className='mt-2 text-sm font-medium text-red-600'>
                    {errors.categoryId.message}
                  </p>
                )}
              </div>
            </div>

            <div className='mt-6'>
              <label className='mb-2 block text-sm font-semibold text-slate-700'>
                Mô tả *
              </label>
              <textarea
                {...register('description')}
                rows={4}
                placeholder='Nhập mô tả chi tiết về sản phẩm...'
                className={`w-full resize-none rounded-lg border px-4 py-3 shadow-sm transition-all duration-200 hover:shadow-md focus:ring-2 focus:outline-none ${
                  errors.description
                    ? 'border-red-400 bg-red-50 focus:ring-red-200'
                    : 'border-slate-300 bg-white focus:border-blue-400 focus:ring-blue-200'
                }`}
              />
              {errors.description && (
                <p className='mt-2 text-sm font-medium text-red-600'>
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className='mt-6'>
              <label className='mb-2 block text-sm font-semibold text-slate-700'>
                Hình ảnh chính *
              </label>
              <Input
                {...register('imageUrl')}
                placeholder='Nhập URL hình ảnh chính'
                className={`transition-all duration-200 ${
                  errors.imageUrl
                    ? 'border-red-400 bg-red-50 focus:ring-red-200'
                    : 'border-slate-300 bg-white focus:border-blue-400 focus:ring-blue-200'
                } shadow-sm hover:shadow-md`}
              />
              {errors.imageUrl && (
                <p className='mt-2 text-sm font-medium text-red-600'>
                  {errors.imageUrl.message}
                </p>
              )}
            </div>
          </div>

          <div className='rounded-xl border border-slate-200 bg-white p-6 shadow-sm'>
            <div className='mb-6 flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <div className='rounded-lg bg-purple-500 p-2 text-white'>
                  <Package className='h-5 w-5' />
                </div>
                <h3 className='text-lg font-semibold text-slate-800'>
                  Các phiên bản sản phẩm
                </h3>
              </div>
              <Button
                type='button'
                onClick={addVariant}
                className='flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md transition-all duration-200 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg'
                size='sm'
              >
                <Plus className='h-4 w-4' />
                Thêm phiên bản
              </Button>
            </div>

            <div className='space-y-6'>
              {fields.map((field, variantIndex) => (
                <div
                  key={field.id}
                  className='relative rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm transition-all duration-200 hover:shadow-md'
                >
                  <div className='mb-6 flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                      <div className='flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-sm font-bold text-white'>
                        {variantIndex + 1}
                      </div>
                      <h4 className='text-lg font-semibold text-slate-800'>
                        Phiên bản {variantIndex + 1}
                      </h4>
                    </div>
                    {fields.length > 1 && (
                      <Button
                        type='button'
                        onClick={() => removeVariant(variantIndex)}
                        variant='outline'
                        size='sm'
                        className='border-red-300 text-red-600 transition-all duration-200 hover:border-red-400 hover:bg-red-50 hover:text-red-700'
                      >
                        <Minus className='h-4 w-4' />
                        Xóa
                      </Button>
                    )}
                  </div>

                  <div className='mb-6 grid grid-cols-1 gap-4 md:grid-cols-3'>
                    <div>
                      <label className='mb-2 block text-sm font-semibold text-slate-700'>
                        Màu sắc *
                      </label>
                      <Input
                        {...register(`variants.${variantIndex}.color`)}
                        placeholder='Ví dụ: Đen, Trắng'
                        className={`transition-all duration-200 ${
                          errors.variants?.[variantIndex]?.color
                            ? 'border-red-400 bg-red-50 focus:ring-red-200'
                            : 'border-slate-300 bg-white focus:border-blue-400 focus:ring-blue-200'
                        } shadow-sm hover:shadow-md`}
                      />
                      {errors.variants?.[variantIndex]?.color && (
                        <p className='mt-2 text-sm font-medium text-red-600'>
                          {errors.variants[variantIndex]?.color?.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className='mb-2 block text-sm font-semibold text-slate-700'>
                        Dung lượng *
                      </label>
                      <Input
                        {...register(`variants.${variantIndex}.storage`)}
                        placeholder='Ví dụ: 128GB, 256GB'
                        className={`transition-all duration-200 ${
                          errors.variants?.[variantIndex]?.storage
                            ? 'border-red-400 bg-red-50 focus:ring-red-200'
                            : 'border-slate-300 bg-white focus:border-blue-400 focus:ring-blue-200'
                        } shadow-sm hover:shadow-md`}
                      />
                      {errors.variants?.[variantIndex]?.storage && (
                        <p className='mt-2 text-sm font-medium text-red-600'>
                          {errors.variants[variantIndex]?.storage?.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className='mb-2 block text-sm font-semibold text-slate-700'>
                        RAM *
                      </label>
                      <Input
                        {...register(`variants.${variantIndex}.ram`)}
                        placeholder='Ví dụ: 6GB, 8GB'
                        className={`transition-all duration-200 ${
                          errors.variants?.[variantIndex]?.ram
                            ? 'border-red-400 bg-red-50 focus:ring-red-200'
                            : 'border-slate-300 bg-white focus:border-blue-400 focus:ring-blue-200'
                        } shadow-sm hover:shadow-md`}
                      />
                      {errors.variants?.[variantIndex]?.ram && (
                        <p className='mt-2 text-sm font-medium text-red-600'>
                          {errors.variants[variantIndex]?.ram?.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className='mb-6 grid grid-cols-1 gap-4 md:grid-cols-2'>
                    <div>
                      <label className='mb-2 block text-sm font-semibold text-slate-700'>
                        Giá (VNĐ) *
                      </label>
                      <Input
                        {...register(`variants.${variantIndex}.price`, {
                          valueAsNumber: true,
                        })}
                        type='number'
                        placeholder='0'
                        min='0'
                        className={`transition-all duration-200 ${
                          errors.variants?.[variantIndex]?.price
                            ? 'border-red-400 bg-red-50 focus:ring-red-200'
                            : 'border-slate-300 bg-white focus:border-blue-400 focus:ring-blue-200'
                        } shadow-sm hover:shadow-md`}
                      />
                      {errors.variants?.[variantIndex]?.price && (
                        <p className='mt-2 text-sm font-medium text-red-600'>
                          {errors.variants[variantIndex]?.price?.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className='mb-2 block text-sm font-semibold text-slate-700'>
                        Số lượng tồn kho *
                      </label>
                      <Input
                        {...register(`variants.${variantIndex}.stockQuantity`, {
                          valueAsNumber: true,
                        })}
                        type='number'
                        placeholder='0'
                        min='0'
                        className={`transition-all duration-200 ${
                          errors.variants?.[variantIndex]?.stockQuantity
                            ? 'border-red-400 bg-red-50 focus:ring-red-200'
                            : 'border-slate-300 bg-white focus:border-blue-400 focus:ring-blue-200'
                        } shadow-sm hover:shadow-md`}
                      />
                      {errors.variants?.[variantIndex]?.stockQuantity && (
                        <p className='mt-2 text-sm font-medium text-red-600'>
                          {
                            errors.variants[variantIndex]?.stockQuantity
                              ?.message
                          }
                        </p>
                      )}
                    </div>
                  </div>

                  <div className='rounded-lg border border-slate-200 bg-slate-50/50 p-4'>
                    <div className='mb-4 flex items-center justify-between'>
                      <div className='flex items-center gap-2'>
                        <label className='text-sm font-semibold text-slate-700'>
                          Hình ảnh phiên bản *
                        </label>
                      </div>
                      <Button
                        type='button'
                        onClick={() => addImageUrl(variantIndex)}
                        variant='outline'
                        size='sm'
                        className='border-emerald-300 text-emerald-600 transition-all duration-200 hover:border-emerald-400 hover:bg-emerald-50'
                      >
                        <Plus className='mr-1 h-3 w-3' />
                        Thêm ảnh
                      </Button>
                    </div>

                    <div className='space-y-3'>
                      {watch(`variants.${variantIndex}.imageUrls`)?.map(
                        (url, imageIndex) => (
                          <div
                            key={imageIndex}
                            className='flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 transition-all duration-200 hover:shadow-sm'
                          >
                            <div className='flex h-6 w-6 items-center justify-center rounded bg-slate-100 text-xs font-medium text-slate-600'>
                              {imageIndex + 1}
                            </div>
                            <Input
                              {...register(
                                `variants.${variantIndex}.imageUrls.${imageIndex}`
                              )}
                              placeholder='Nhập URL hình ảnh'
                              className='flex-1 border-slate-300 bg-white focus:border-blue-400 focus:ring-blue-200'
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
                                className='border-red-300 text-red-600 transition-all duration-200 hover:border-red-400 hover:bg-red-50 hover:text-red-700'
                              >
                                <X className='h-4 w-4' />
                              </Button>
                            )}
                          </div>
                        )
                      )}
                    </div>
                    {errors.variants?.[variantIndex]?.imageUrls && (
                      <p className='mt-2 text-sm font-medium text-red-600'>
                        {errors.variants[variantIndex]?.imageUrls?.message}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='-mx-6 -mb-2 flex justify-end space-x-4 rounded-b-xl border-t border-slate-200 bg-slate-50 px-6 py-4'>
            <Button
              type='button'
              variant='outline'
              onClick={onClose}
              className='border-slate-300 text-slate-700 transition-all duration-200 hover:bg-slate-50 hover:text-slate-800'
            >
              Hủy bỏ
            </Button>
            <Button
              type='submit'
              disabled={loading}
              className={`min-w-[120px] transition-all duration-200 ${
                loading
                  ? 'cursor-not-allowed bg-slate-400'
                  : 'bg-gradient-to-r from-blue-500 to-blue-600 shadow-md hover:from-blue-600 hover:to-blue-700 hover:shadow-lg'
              }`}
            >
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
