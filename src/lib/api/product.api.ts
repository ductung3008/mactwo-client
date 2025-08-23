import { ApiResponse, PaginatedResponse, PaginationParams } from '@/types';
import {
  CreateProductRequest,
  Product,
  UpdateProductRequest,
} from '@/types/product';
import api from '../axios';

export const productApi = {
  async getProducts(
    params: PaginationParams
  ): Promise<PaginatedResponse<Product[]>> {
    const response = await api.get('/products/getAll', { params });
    return response.data;
  },

  async createProduct(
    productData: CreateProductRequest
  ): Promise<ApiResponse<Product>> {
    const response = await api.post('/products/create', productData);
    return response.data;
  },

  async updateProduct(
    id: number,
    productData: UpdateProductRequest
  ): Promise<ApiResponse<Product>> {
    const response = await api.put(`/products/update/${id}`, productData);
    return response.data;
  },

  async deleteProduct(id: number): Promise<ApiResponse<null>> {
    const response = await api.delete(`/products/delete/${id}`);
    return response.data;
  },

  async getProductById(id: number): Promise<ApiResponse<Product>> {
    const response = await api.get(`/products/getById/${id}`);
    return response.data;
  },
};
