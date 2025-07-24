import { authApi } from './auth.api';

export { authApi } from './auth.api';

export type { User } from '@/stores/auth-store';
export type { ApiResponse } from '@/types';

export const api = {
  auth: authApi,
} as const;
