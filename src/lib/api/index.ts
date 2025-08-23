import { authApi } from './auth.api';
import { categoryApi } from './category.api';
import { customerApi } from './customer.api';
import { productApi } from './product.api';
import { promotionApi } from './promotion.api';

export { authApi } from './auth.api';
export { categoryApi } from './category.api';
export { customerApi } from './customer.api';
export { productApi } from './product.api';
export { promotionApi } from './promotion.api';

export type { User } from '@/stores/auth.store';
export type { ApiResponse } from '@/types';

export const api = {
  auth: authApi,
  category: categoryApi,
  customer: customerApi,
  product: productApi,
  promotion: promotionApi,
} as const;
