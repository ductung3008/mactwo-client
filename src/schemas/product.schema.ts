import { z } from 'zod';

export const productVariantSchema = z.object({
  color: z.string().min(1, 'Màu sắc là bắt buộc'),
  storage: z.string().min(1, 'Dung lượng là bắt buộc'),
  ram: z.string().min(1, 'RAM là bắt buộc'),
  imageUrls: z
    .array(z.string().url('URL hình ảnh không hợp lệ'))
    .min(1, 'Ít nhất một hình ảnh là bắt buộc'),
  price: z.number().min(0, 'Giá phải lớn hơn hoặc bằng 0'),
  stockQuantity: z.number().min(0, 'Số lượng tồn kho phải lớn hơn hoặc bằng 0'),
});

export const createProductSchema = z.object({
  name: z.string().min(1, 'Tên sản phẩm là bắt buộc'),
  description: z.string().min(1, 'Mô tả sản phẩm là bắt buộc'),
  imageUrl: z.string().url('URL hình ảnh không hợp lệ'),
  categoryId: z.number().min(1, 'Danh mục là bắt buộc'),
  variants: z
    .array(productVariantSchema)
    .min(1, 'Ít nhất một phiên bản sản phẩm là bắt buộc'),
});

export const updateProductSchema = createProductSchema;

export type CreateProductFormData = z.infer<typeof createProductSchema>;
export type UpdateProductFormData = z.infer<typeof updateProductSchema>;
export type ProductVariantFormData = z.infer<typeof productVariantSchema>;
