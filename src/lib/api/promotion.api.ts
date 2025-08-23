import { ApiResponse, PaginatedResponse, PaginationParams } from '@/types';
import {
  CreatePromotionRequest,
  Promotion,
  UpdatePromotionRequest,
} from '@/types/promotion';
import api from '../axios';

export const promotionApi = {
  async getPromotions(
    params: PaginationParams
  ): Promise<PaginatedResponse<Promotion[]>> {
    const response = await api.get('/promotions/getAll', { params });
    return response.data;
  },

  async createPromotion(
    promotionData: CreatePromotionRequest
  ): Promise<ApiResponse<Promotion>> {
    const response = await api.post('/promotions/create', promotionData);
    return response.data;
  },

  async updatePromotion(
    id: number,
    promotionData: UpdatePromotionRequest
  ): Promise<ApiResponse<Promotion>> {
    const response = await api.put(`/promotions/update/${id}`, promotionData);
    return response.data;
  },

  async deletePromotion(id: number): Promise<ApiResponse<null>> {
    const response = await api.delete(`/promotions/delete/${id}`);
    return response.data;
  },

  async getPromotionById(id: number): Promise<ApiResponse<Promotion>> {
    const response = await api.get(`/promotions/getById/${id}`);
    return response.data;
  },
};
