import { ApiResponse } from '@/types';
import { Category } from '@/types/category';
import api from '../axios';

export const categoryApi = {
  async getCategories(): Promise<ApiResponse<Category[]>> {
    const response = await api.get('/categories/getAll');
    return response.data;
  },

  async getCategoryById(id: string): Promise<ApiResponse<Category>> {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  },

  async createCategory(categoryData: {
    categoryName: string;
    parentId?: number;
  }): Promise<ApiResponse<Category>> {
    // Chuyển đổi format để phù hợp với API backend
    const payload = {
      categoryName: categoryData.categoryName,
      parentId: categoryData.parentId,
    };
    const response = await api.post('/categories/create', payload);
    return response.data;
  },

  async updateCategory(
    id: string,
    categoryData: {
      categoryName: string;
    }
  ): Promise<ApiResponse<Category>> {
    // Chuyển đổi format để phù hợp với API backend
    const payload = {
      categoryName: categoryData.categoryName,
    };
    const response = await api.put(`/categories/update/${id}`, payload);
    return response.data;
  },

  async deleteCategory(id: string): Promise<ApiResponse<null>> {
    const response = await api.delete(`/categories/delete/${id}`);
    return response.data;
  },
};
