import { Gender, Role } from '@/constants';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { useCartStore } from './cart.store';

export interface User {
  id: string;
  email: string;
  fullName: string;
  gender: Gender;
  phoneNumber: string;
  dateOfBirth: string;
  roleName: Role;
  addresses?: string[];
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthActions {
  login: (user: User, token: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
  setLoading: (loading: boolean) => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    set => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: (user: User, token: string) => {
        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        });

        // Set currentUserId trong cart store khi login
        useCartStore.getState().setCurrentUserId(user.id);
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });

        // Clear currentUserId trong cart store khi logout
        useCartStore.getState().setCurrentUserId('');
      },

      setUser: (user: User) => {
        set({ user });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
