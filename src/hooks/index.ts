'use client';

import { authApi } from '@/lib/api';
import { RegisterFormData } from '@/schemas/auth.schema';
import { useAuthStore } from '@/stores/auth.store';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export function useAuth() {
  const t = useTranslations('auth');
  const { user, isAuthenticated, login, logout } = useAuthStore();
  const [loading, setLocalLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (credentials: {
    emailOrPhone: string;
    password: string;
  }) => {
    try {
      setLocalLoading(true);
      setError(null);
      const response = await authApi.login(credentials);

      if (response.success) {
        login(response.data.user, response.data.accessToken);
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

  const handleRegister = async (userData: RegisterFormData) => {
    try {
      setLocalLoading(true);
      setError(null);
      const response = await authApi.register(userData);

      if (response.success) {
        return { success: true, email: userData.email };
      } else {
        setError(response.message || t('registrationFailed'));
        return { success: false };
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t('registrationFailed'));
      return { success: false };
    } finally {
      setLocalLoading(false);
    }
  };

  const handleVerifyOtp = async (email: string, token: string) => {
    try {
      setLocalLoading(true);
      setError(null);
      const response = await authApi.verifyRegister(email, token);

      if (response.success) {
        return true;
      } else {
        setError(response.message || t('verify.verificationFailed'));
        return false;
      }
    } catch (err) {
      console.error('Verification error:', err);
      setError(t('verify.verificationFailed'));
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
    setError,
    login: handleLogin,
    register: handleRegister,
    verifyOtp: handleVerifyOtp,
    logout: handleLogout,
  };
}
