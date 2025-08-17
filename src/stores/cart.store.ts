import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  variant: number;
  quantity: number;
  product: {
    id: string;
    name: string;
    code?: string;
    newPrice: number;
    oldPrice: number;
    imageUrl: string;
    categoryName?: string;
    promotionPercentage?: number;
    tag?: string;
  };
}

interface CartState {
  userId: string;
  items: CartItem[];
}

interface CartStore extends CartState {
  // Actions
  setUserId: (userId: string) => void;
  addItem: (item: CartItem) => void;
  removeItem: (variant: number) => void;
  updateQuantity: (variant: number, quantity: number) => void;
  clearCart: () => void;
  getOrderItems: () => CartItem[];
  getTotalItems: () => number;
}

const initialState: CartState = {
  userId: 'user123',
  items: [
    {
      variant: 1,
      quantity: 1,
      product: {
        id: '1',
        name: 'iPhone 16e 128GB',
        code: 'iphone-16',
        newPrice: 15990000,
        oldPrice: 16999000,
        imageUrl:
          'https://shopdunk.com/images/thumbs/0034910_iphone-16e-128gb_240.png',
        categoryName: 'iphone',
        promotionPercentage: 5,
        tag: 'new',
      },
    },
    {
      variant: 5,
      quantity: 2,
      product: {
        id: '5',
        name: 'iPad Air (M3) 11-inch Wi-Fi',
        newPrice: 16290000,
        oldPrice: 16999000,
        imageUrl:
          'https://shopdunk.com/images/thumbs/0035054_ipad-air-m3-11-inch-wi-fi_240.png',
        promotionPercentage: 4,
        tag: 'new',
      },
    },
    {
      variant: 13,
      quantity: 1,
      product: {
        id: '13',
        name: 'Apple Watch Series 10 Nhôm (GPS) 42mm | Sport Band',
        newPrice: 10490000,
        oldPrice: 10990000,
        imageUrl:
          'https://shopdunk.com/images/thumbs/0029160_apple-watch-series-10-nhom-gps-42mm-sport-band_240.jpeg',
        promotionPercentage: 5,
        tag: 'new',
      },
    },
  ],
};

export const useCartStore = create<CartStore>(
  (persist as any)(
    (set: any, get: any) => ({
      ...initialState,

      setUserId: (userId: string) => set({ userId }),

      addItem: (item: CartItem) =>
        set((state: CartStore) => {
          const existingItemIndex = state.items.findIndex(
            (existingItem: CartItem) => existingItem.variant === item.variant
          );

          if (existingItemIndex >= 0) {
            // Nếu item đã tồn tại, cập nhật quantity
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex].quantity += item.quantity;
            return { items: updatedItems };
          } else {
            // Nếu item chưa tồn tại, thêm mới
            return { items: [...state.items, item] };
          }
        }),

      removeItem: (variant: number) =>
        set((state: CartStore) => ({
          items: state.items.filter(
            (item: CartItem) => item.variant !== variant
          ),
        })),

      updateQuantity: (variant: number, quantity: number) =>
        set((state: CartStore) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter(
                (item: CartItem) => item.variant !== variant
              ),
            };
          }

          return {
            items: state.items.map((item: CartItem) =>
              item.variant === variant ? { ...item, quantity } : item
            ),
          };
        }),

      clearCart: () => set(initialState),

      getOrderItems: () => {
        const state = get() as CartStore;
        return state.items;
      },

      getTotalItems: () => {
        const state = get() as CartStore;
        return state.items.reduce((total, item) => total + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
