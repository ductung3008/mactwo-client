import { z } from 'zod';

// Schema cho tạo danh mục mới
export const createCategorySchema = z.object({
  categoryName: z
    .string()
    .min(1, 'Tên danh mục không được để trống')
    .max(100, 'Tên danh mục không được vượt quá 100 ký tự'),
  parentId: z.number().optional(),
});

// Schema cho cập nhật danh mục
export const updateCategorySchema = z.object({
  categoryName: z
    .string()
    .min(1, 'Tên danh mục không được để trống')
    .max(100, 'Tên danh mục không được vượt quá 100 ký tự'),
});

export type CreateCategoryFormData = z.infer<typeof createCategorySchema>;
export type UpdateCategoryFormData = z.infer<typeof updateCategorySchema>;
