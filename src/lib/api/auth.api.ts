import api from '@/lib/axios';
import { LoginFormData, RegisterFormData } from '@/schemas/auth.schema';
import { User } from '@/stores/auth.store';
import { ApiResponse } from '@/types';

export const authApi = {
  async login(
    credentials: LoginFormData
  ): Promise<ApiResponse<{ user: User; accessToken: string }>> {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  async register(
    userData: RegisterFormData
  ): Promise<ApiResponse<{ status: string; message: string }>> {
    const response = await api.post('/auth/signup', { ...userData, roleId: 2 });
    return response.data;
  },

  async verifyRegister(
    email: string,
    token: string
  ): Promise<ApiResponse<{ status: string; message: string }>> {
    const response = await api.post(
      `/auth/signup/verify?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`
    );
    return response.data;
  },

  async getProfile(): Promise<ApiResponse<User>> {
    const response = await api.get('/user/me');
    return response.data;
  },

  async forgotPassword(email: string): Promise<ApiResponse<null>> {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  },

  async resetPassword(data: {
    token: string;
    newPassword: string;
  }): Promise<ApiResponse<null>> {
    const response = await api.post('/auth/reset-password', data);
    return response.data;
  },
};
