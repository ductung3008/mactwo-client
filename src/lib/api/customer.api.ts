import { ApiResponse } from '@/types';
import { User } from '@/types/user';
import api from '../axios';

export const customerApi = {
  async getCustomers(): Promise<ApiResponse<User[]>> {
    const response = await api.get('/users/get-all');
    return response.data;
  },
};
