import { authApi } from './auth.api';
import { categoryApi } from './category.api';
<<<<<<< HEAD
=======
import { customerApi } from './customer.api';
>>>>>>> 441881f107cef54cfbb1d185479bb70faa22622e
import { productApi } from './product.api';
import { promotionApi } from './promotion.api';

export { authApi } from './auth.api';
export { categoryApi } from './category.api';
<<<<<<< HEAD
=======
export { customerApi } from './customer.api';
>>>>>>> 441881f107cef54cfbb1d185479bb70faa22622e
export { productApi } from './product.api';
export { promotionApi } from './promotion.api';

export type { User } from '@/stores/auth.store';
export type { ApiResponse } from '@/types';

export const api = {
  auth: authApi,
  category: categoryApi,
<<<<<<< HEAD
=======
  customer: customerApi,
>>>>>>> 441881f107cef54cfbb1d185479bb70faa22622e
  product: productApi,
  promotion: promotionApi,
} as const;
