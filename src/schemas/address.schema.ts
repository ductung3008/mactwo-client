import { z } from 'zod';

export const createCreateAddressSchema = (t: (key: string) => string) =>
  z.object({
    shippingAddress: z.string().min(1, t('shippingAddressRequired')),
    default: z.boolean().optional(),
  });

export type CreateAddressFormData = z.infer<
  ReturnType<typeof createCreateAddressSchema>
>;
