import { ApiResponse } from '@/types';
import api from '../axios';

export interface ProductVariant {
  id: number;
  productId: number;
  color: string;
  storage: string;
  ram: string;
  imageUrls: string[];
  price: number;
  stockQuantity: number;
}
export const productVariantApi = {
  async getProductVariantById(
    id: string
  ): Promise<ApiResponse<ProductVariant>> {
    const response = await api.get(
      `/products/get-by-id/product-variants/${id}`
    );
    return response.data;
  },
};
