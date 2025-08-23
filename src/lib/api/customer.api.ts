import { ApiResponse } from '@/types';
import { User } from '@/types/user';
import api from '../axios';

export const customerApi = {
  async getCustomers(): Promise<ApiResponse<User[]>> {
    const response = await api.get('/users/get-all');
    return response.data;
  },
<<<<<<< HEAD
=======

  async getUserById(userId: string): Promise<ApiResponse<User>> {
    const response = await api.get(`/users/get-by-id/${userId}`);
    return response.data;
  },
>>>>>>> 441881f107cef54cfbb1d185479bb70faa22622e
};
