import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  variantId: number;
  quantity: number;
}

interface CartState {
  userId?: string;
  addressId?: number;
  promotionId?: number;
  orderItems: CartItem[];
}

interface CartStore extends CartState {
  // Actions
  setUserId: (userId: string) => void;
  setAddressId: (addressId: number) => void;
  setPromotionId: (promotionId: number) => void;
  addItem: (item: CartItem) => void;
  removeItem: (variantId: number) => void;
  updateQuantity: (variantId: number, quantity: number) => void;
  clearCart: () => void;
  getOrderPayload: () => {
    userId: string;
    addressId: number;
    promotionId: number;
    orderItems: CartItem[];
  };
}

const initialState: CartState = {
  userId: undefined,
  addressId: undefined,
  promotionId: undefined,
  orderItems: [],
};

export const useCartStore = create<CartStore>(
  (persist as any)(
    (set: any, get: any) => ({
      ...initialState,

      setUserId: (userId: string) => set({ userId }),

      setAddressId: (addressId: number) => set({ addressId }),

      setPromotionId: (promotionId: number) => set({ promotionId }),

      addItem: (item: CartItem) =>
        set((state: CartStore) => {
          const existingItemIndex = state.orderItems.findIndex(
            (existingItem: CartItem) =>
              existingItem.variantId === item.variantId
          );

          if (existingItemIndex >= 0) {
            // Nếu item đã tồn tại, cập nhật quantity
            const updatedItems = [...state.orderItems];
            updatedItems[existingItemIndex].quantity += item.quantity;
            return { orderItems: updatedItems };
          } else {
            // Nếu item chưa tồn tại, thêm mới
            return { orderItems: [...state.orderItems, item] };
          }
        }),

      removeItem: (variantId: number) =>
        set((state: CartStore) => ({
          orderItems: state.orderItems.filter(
            (item: CartItem) => item.variantId !== variantId
          ),
        })),

      updateQuantity: (variantId: number, quantity: number) =>
        set((state: CartStore) => {
          if (quantity <= 0) {
            // Nếu quantity <= 0, xóa item
            return {
              orderItems: state.orderItems.filter(
                (item: CartItem) => item.variantId !== variantId
              ),
            };
          }

          return {
            orderItems: state.orderItems.map((item: CartItem) =>
              item.variantId === variantId ? { ...item, quantity } : item
            ),
          };
        }),

      clearCart: () => set(initialState),

      getOrderPayload: () => {
        const state = get() as CartStore;
        return {
          userId: state.userId || '',
          addressId: state.addressId || 0,
          promotionId: state.promotionId || 0,
          orderItems: state.orderItems,
        };
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
