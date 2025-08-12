import { ProductVariant } from './productVariant';

export interface Product {
  productId: number;
  categoryId: number;
  name: string;
  description: string;
  imageUrl: string;
  productVariants: ProductVariant[];
}
