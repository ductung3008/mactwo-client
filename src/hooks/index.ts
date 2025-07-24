'use client';

import { authApi } from '@/lib/api';
import { useAuthStore } from '@/stores/auth-store';
import { useState } from 'react';

// Hook for managing authentication
export function useAuth() {
  const { user, isAuthenticated, login, logout } = useAuthStore();
  const [loading, setLocalLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (credentials: {
    email: string;
    password: string;
  }) => {
    try {
      setLocalLoading(true);
      setError(null);
      const response = await authApi.login(credentials);

      if (response.success) {
        login(response.data.user, response.data.token);
        return true;
      } else {
        setError(response.message || 'Login failed');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      return false;
    } finally {
      setLocalLoading(false);
    }
  };

  const handleRegister = async (userData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      setLocalLoading(true);
      setError(null);
      const response = await authApi.register(userData);

      if (response.success) {
        login(response.data.user, response.data.token);
        return true;
      } else {
        setError(response.message || 'Registration failed');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
      return false;
    } finally {
      setLocalLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    setError(null);
  };

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  };
}
