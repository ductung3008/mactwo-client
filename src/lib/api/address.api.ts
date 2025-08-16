import api from '@/lib/axios';
import { CreateAddressFormData } from '@/schemas/address.schema';
import { useAuthStore } from '@/stores/auth.store';

export const addressApi = {
  async createAddress(createAddressData: CreateAddressFormData) {
    const response = await api.post('/addresses/create', {
      ...createAddressData,
      userId: useAuthStore.getState().user?.id,
    });
    return response.data;
  },

  async getAddresses() {
    const response = await api.get(
      `/addresses/user/${useAuthStore.getState().user?.id}`
    );
    return response.data;
  },

  async deleteAddress(addressId: string) {
    const response = await api.delete(`/addresses/delete/${addressId}`);
    return response.data;
  },

  async updateAddress(addressId: string, updateData: CreateAddressFormData) {
    const response = await api.put(`/addresses/update/${addressId}`, {
      ...updateData,
      isDefault: updateData.default || false,
      userId: useAuthStore.getState().user?.id,
    });
    return response.data;
  },
};
