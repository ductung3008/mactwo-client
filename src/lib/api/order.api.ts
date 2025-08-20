import { ApiResponse, OrderApiResponse } from '@/types';
import { CreateOrderRequest, Order } from '@/types/order';
import api from '../axios';

export const orderApi = {
  async createOrder(
    orderData: CreateOrderRequest
  ): Promise<ApiResponse<Order>> {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  async getOrders(): Promise<OrderApiResponse<Order[]>> {
    const response = await api.get(`/orders/getAll`);
    return response.data;
  },

  async getOrderById(orderId: number): Promise<ApiResponse<Order>> {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  },

  async updateOrderStatus(
    orderId: number,
    status: string
  ): Promise<OrderApiResponse<Order>> {
    const response = await api.patch(`/orders/${orderId}/status`, { status });
    return response.data;
  },

  async deleteOrder(orderId: number): Promise<ApiResponse<void>> {
    const response = await api.delete(`/orders/${orderId}`);
    return response.data;
  },
};
