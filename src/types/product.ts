import { CreateProductVariant, ProductVariant } from './productVariant';

export interface Product {
  id: number;
  categoryId: number;
  name: string;
  description: string;
  imageUrl: string;
  variants: ProductVariant[];
}

export interface CreateProductRequest {
  name: string;
  description: string;
  imageUrl: string;
  categoryId: number;
  variants: CreateProductVariant[];
}

export interface UpdateProductRequest {
  name: string;
  description: string;
  imageUrl: string;
  categoryId: number;
  variants: CreateProductVariant[];
}

export interface ProductResponse {
  content: Product[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
