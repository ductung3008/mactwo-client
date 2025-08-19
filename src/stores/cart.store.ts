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
  userId: string;
  items: CartItem[];
}

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
  initializeFromAuth: () => void;
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
      },

      initializeFromAuth: () => {
        // Import dynamically để tránh circular dependency
        import('./auth.store').then(({ useAuthStore }) => {
          const authState = useAuthStore.getState();
          if (authState.isAuthenticated && authState.user) {
            const state = get();
            if (state.currentUserId !== authState.user.id) {
              set({ currentUserId: authState.user.id });
            }
          } else {
            set({ currentUserId: '' });
          }
        });
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        userCarts: state.userCarts,
        currentUserId: state.currentUserId,
      }),
    }
  )
);
