'use client';

import { useToastNotification } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

export default function AdminLogin() {
  const toast = useToastNotification();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, loading, error, setError, isAuthenticated } = useAuth();

  const loginSchema = z.object({
    emailOrPhone: z
      .string()
      .min(1, 'Email hoặc Số điện thoại là bắt buộc')
      .refine(value => {
        return (
          z.string().email().safeParse(value).success ||
          /^(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(value)
        );
      }, 'Email hoặc Số điện thoại không hợp lệ'),
    password: z
      .string()
      .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
      .max(100, 'Mật khẩu không được vượt quá 100 ký tự'),
  });
  type LoginFormData = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      emailOrPhone: '',
      password: '',
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/admin/dashboard');
    }
  }, [isAuthenticated, router, searchParams]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      const { emailOrPhone, password } = data;
      const success = await login({ emailOrPhone, password });

      if (success) {
        toast.success('Đăng nhập thành công', 'Chào mừng bạn trở lại!');
        router.push('/admin/dashboard');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đăng nhập thất bại');
    }
  };

  useEffect(() => {
    if (error) {
      toast.error('Lỗi', 'Đăng nhập không thành công');
      setError(null);
    }
  }, [error, toast, setError]);

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50'>
      <div className='w-full max-w-md space-y-8 p-8'>
        <div className='text-center'>
          <Image
            src='/mactwo-logo-trans.png'
            alt='MacTwo Logo'
            width={150}
            height={150}
            className='mx-auto mb-4'
          />
          <h2 className='text-3xl font-bold text-gray-900'>Đăng nhập</h2>
          <p className='mt-2 text-sm text-gray-600'>
            Đăng nhập để truy cập bảng điều khiển quản trị
          </p>
        </div>

        <div className='rounded-lg bg-white p-6 shadow-md'>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            <div>
              <label
                htmlFor='emailOrPhone'
                className='mb-2 block text-sm font-medium text-gray-700'
              >
                Email
              </label>
              <Input
                id='emailOrPhone'
                type='text'
                autoComplete='email'
                placeholder='Email hoặc Số điện thoại'
                {...register('emailOrPhone')}
                className={
                  errors.emailOrPhone
                    ? 'border-red-500 focus:border-red-500'
                    : ''
                }
              />
            </div>

            <div>
              <label
                htmlFor='password'
                className='mb-2 block text-sm font-medium text-gray-700'
              >
                Mật khẩu
              </label>
              <Input
                id='password'
                type='password'
                autoComplete='current-password'
                placeholder='Mật khẩu'
                {...register('password')}
                className={
                  errors.password
                    ? 'border-red-500 pr-10 focus:border-red-500'
                    : 'pr-10'
                }
              />
            </div>

            <Button type='submit' disabled={loading} className='w-full'>
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
