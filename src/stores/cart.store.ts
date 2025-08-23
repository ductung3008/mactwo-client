<<<<<<< HEAD
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
=======
import { Product } from '@/types/product';
import { ProductVariant } from '@/types/productVariant';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface CartItem {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

interface UserCart {
>>>>>>> 441881f107cef54cfbb1d185479bb70faa22622e
  userId: string;
  items: CartItem[];
}

<<<<<<< HEAD
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
=======
interface CartStore {
  userCarts: UserCart[];
  currentUserId: string;

  // Actions
  setCurrentUserId: (userId: string) => void;
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (productId: number, variantId: number) => void;
  updateQuantity: (
    productId: number,
    variantId: number,
    quantity: number
  ) => void;
  clearCart: (userId?: string) => void;
  getCurrentUserItems: () => CartItem[];
  getTotalItems: () => number;
  getUserCart: (userId: string) => UserCart | undefined;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      userCarts: [],
      currentUserId: '',

      setCurrentUserId: (userId: string) => {
        set({ currentUserId: userId });
      },

      addItem: (item: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
        const state = get();
        const userId = state.currentUserId;

        if (!userId) {
          console.warn('Không có userId hiện tại để thêm item vào giỏ hàng');
          return;
        }

        const userCartIndex = state.userCarts.findIndex(
          cart => cart.userId === userId
        );
        const cartItem: CartItem = { ...item, quantity };

        if (userCartIndex === -1) {
          // Tạo giỏ hàng mới cho user nếu chưa có
          const newUserCart: UserCart = {
            userId,
            items: [cartItem],
          };
          set({
            userCarts: [...state.userCarts, newUserCart],
          });
        } else {
          // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
          const existingItemIndex = state.userCarts[
            userCartIndex
          ].items.findIndex(
            existingItem =>
              existingItem.product.id === item.product.id &&
              existingItem.variant.product_variant_id ===
                item.variant.product_variant_id
          );

          const updatedUserCarts = [...state.userCarts];

          if (existingItemIndex === -1) {
            // Thêm sản phẩm mới vào giỏ hàng
            updatedUserCarts[userCartIndex].items.push(cartItem);
          } else {
            // Cập nhật số lượng sản phẩm đã có
            updatedUserCarts[userCartIndex].items[existingItemIndex].quantity +=
              quantity;
          }

          set({ userCarts: updatedUserCarts });
        }
      },

      removeItem: (productId: number, variantId: number) => {
        const state = get();
        const userId = state.currentUserId;

        if (!userId) return;

        const userCartIndex = state.userCarts.findIndex(
          cart => cart.userId === userId
        );
        if (userCartIndex === -1) return;

        const updatedUserCarts = [...state.userCarts];
        updatedUserCarts[userCartIndex].items = updatedUserCarts[
          userCartIndex
        ].items.filter(
          item =>
            !(
              item.product.id === productId &&
              item.variant.product_variant_id === variantId
            )
        );

        set({ userCarts: updatedUserCarts });
      },

      updateQuantity: (
        productId: number,
        variantId: number,
        quantity: number
      ) => {
        const state = get();
        const userId = state.currentUserId;

        if (!userId) return;

        const userCartIndex = state.userCarts.findIndex(
          cart => cart.userId === userId
        );
        if (userCartIndex === -1) return;

        const updatedUserCarts = [...state.userCarts];
        const itemIndex = updatedUserCarts[userCartIndex].items.findIndex(
          item =>
            item.product.id === productId &&
            item.variant.product_variant_id === variantId
        );

        if (itemIndex !== -1) {
          if (quantity <= 0) {
            // Xóa item nếu quantity <= 0
            updatedUserCarts[userCartIndex].items.splice(itemIndex, 1);
          } else {
            updatedUserCarts[userCartIndex].items[itemIndex].quantity =
              quantity;
          }
          set({ userCarts: updatedUserCarts });
        }
      },

      clearCart: (userId?: string) => {
        const state = get();
        const targetUserId = userId || state.currentUserId;

        if (!targetUserId) return;

        const updatedUserCarts = state.userCarts.map(cart =>
          cart.userId === targetUserId ? { ...cart, items: [] } : cart
        );

        set({ userCarts: updatedUserCarts });
      },

      getCurrentUserItems: () => {
        const state = get();
        const userId = state.currentUserId;

        if (!userId) return [];

        const userCart = state.userCarts.find(cart => cart.userId === userId);
        return userCart ? userCart.items : [];
      },

      getTotalItems: () => {
        const state = get();
        const currentItems = state.getCurrentUserItems();
        return currentItems.reduce(
          (acc: number, item: CartItem) => acc + item.quantity,
          0
        );
      },

      getUserCart: (userId: string) => {
        const state = get();
        return state.userCarts.find(cart => cart.userId === userId);
>>>>>>> 441881f107cef54cfbb1d185479bb70faa22622e
      },
    }),
    {
      name: 'cart-storage',
<<<<<<< HEAD
=======
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        userCarts: state.userCarts,
        currentUserId: state.currentUserId,
      }),
>>>>>>> 441881f107cef54cfbb1d185479bb70faa22622e
    }
  )
);
