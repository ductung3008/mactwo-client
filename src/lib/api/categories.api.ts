import { ApiResponse } from '@/types';
import api from '../axios';

export interface Category {
  id: string | null;
  categoryName: string;
  children?: Category[];
  link: string;
}

export const categoryApi = {
  async getAllCategory(): Promise<ApiResponse<Category[]>> {
    const response = await api.get('/categories/getAll');
    return response.data;
  },

  async getCategoryById(id: string): Promise<ApiResponse<Category>> {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  },
};
