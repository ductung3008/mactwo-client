import { z } from 'zod';

export const createPromotionSchema = z
  .object({
    promotionName: z.string().min(1, 'Tên khuyến mãi là bắt buộc'),
    description: z.string().min(1, 'Mô tả khuyến mãi là bắt buộc'),
    discountAmount: z.number().min(0, 'Số tiền giảm phải lớn hơn hoặc bằng 0'),
    startDate: z.string().min(1, 'Ngày bắt đầu là bắt buộc'),
    endDate: z.string().min(1, 'Ngày kết thúc là bắt buộc'),
  })
  .refine(
    data => {
      const startDate = new Date(data.startDate);
      const endDate = new Date(data.endDate);
      return endDate > startDate;
    },
    {
      message: 'Ngày kết thúc phải sau ngày bắt đầu',
      path: ['endDate'],
    }
  );

export const updatePromotionSchema = createPromotionSchema;

export type CreatePromotionFormData = z.infer<typeof createPromotionSchema>;
export type UpdatePromotionFormData = z.infer<typeof updatePromotionSchema>;
