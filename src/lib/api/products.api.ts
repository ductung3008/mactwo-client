import { ApiResponse } from '@/types';
import api from '../axios';
import { ProductVariant } from './variants.api';

export interface Product {
  id: string;
  name: string;
  price: number;
  stockQuantity: number;
  imageUrl: string;
  variants: ProductVariant[];
  tag: 'new' | 'installment';
  description?: string;
  categoryId?: string;
}

export const productApi = {
  async getProductByCategoryId(id: string): Promise<ApiResponse<Product[]>> {
    const response = await api.get(`/products/by-category-child/${id}`);
    return response.data;
  },

  async getProductById(id: string): Promise<ApiResponse<Product>> {
    const response = await api.get(`/products/getByID/${id}`);
    return response.data;
  },
};
