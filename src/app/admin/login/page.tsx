'use client';

import { useToastNotification } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Role } from '@/constants';
import { useAuth } from '@/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

export default function AdminLogin() {
  const toast = useToastNotification();
  const router = useRouter();
  const { login, loading, error, setError, isAuthenticated, user, getProfile } =
    useAuth();

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
      .min(3, 'Mật khẩu phải có ít nhất 3 ký tự')
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

  const pathname = usePathname();

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.roleName === Role.Admin) {
        if (pathname !== '/admin/dashboard') {
          router.replace('/admin/dashboard');
        }
      } else {
        setError('Bạn không có quyền truy cập vào trang quản trị');
      }
    }
  }, [isAuthenticated, user, pathname, router, setError]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      const { emailOrPhone, password } = data;
      const success = await login({ emailOrPhone, password });

      if (success) {
        await getProfile();
      }
    } catch (err) {
      console.error(err);
      setError('Đăng nhập thất bại');
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      setError(null);
    }
  }, [error, setError, toast]);

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4'>
      <div className='w-full max-w-md'>
        {/* Login Card */}
        <div className='overflow-hidden rounded-2xl border border-white/20 bg-white/80 shadow-2xl backdrop-blur-md'>
          {/* Header */}
          <div className='bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-8 text-center'>
            <Image
              src='/mactwo-logo-trans-white.png'
              alt='MacTwo Admin'
              width={160}
              height={60}
              className='mx-auto mb-4 drop-shadow-lg'
            />
            <h2 className='mb-2 text-2xl font-bold text-white'>Admin Portal</h2>
            <p className='text-sm text-blue-100'>
              Đăng nhập để truy cập bảng điều khiển quản trị
            </p>
          </div>

          {/* Form */}
          <div className='p-8'>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
              <div>
                <label
                  htmlFor='emailOrPhone'
                  className='mb-2 block text-sm font-semibold text-slate-700'
                >
                  Email hoặc Số điện thoại
                </label>
                <Input
                  id='emailOrPhone'
                  type='text'
                  autoComplete='email'
                  placeholder='Nhập email hoặc số điện thoại'
                  {...register('emailOrPhone')}
                  className={`w-full transition-all duration-200 ${
                    errors.emailOrPhone
                      ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500/20'
                  } rounded-lg bg-white/50 px-4 py-3 backdrop-blur-sm`}
                />
                {errors.emailOrPhone && (
                  <p className='mt-2 flex items-center text-sm text-red-600'>
                    <svg
                      className='mr-1 h-4 w-4'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                        clipRule='evenodd'
                      />
                    </svg>
                    {errors.emailOrPhone.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor='password'
                  className='mb-2 block text-sm font-semibold text-slate-700'
                >
                  Mật khẩu
                </label>
                <Input
                  id='password'
                  type='password'
                  autoComplete='current-password'
                  placeholder='Nhập mật khẩu'
                  {...register('password')}
                  className={`w-full transition-all duration-200 ${
                    errors.password
                      ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500/20'
                  } rounded-lg bg-white/50 px-4 py-3 backdrop-blur-sm`}
                />
                {errors.password && (
                  <p className='mt-2 flex items-center text-sm text-red-600'>
                    <svg
                      className='mr-1 h-4 w-4'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                        clipRule='evenodd'
                      />
                    </svg>
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type='submit'
                disabled={loading}
                className='w-full rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50'
              >
                {loading ? (
                  <div className='flex items-center justify-center'>
                    <svg
                      className='mr-3 -ml-1 h-5 w-5 animate-spin text-white'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      ></circle>
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      ></path>
                    </svg>
                    Đang đăng nhập...
                  </div>
                ) : (
                  <span className='flex items-center justify-center'>
                    <svg
                      className='mr-2 h-5 w-5'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1'
                      />
                    </svg>
                    Đăng nhập
                  </span>
                )}
              </Button>
            </form>

            {/* Security Notice */}
            <div className='mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4'>
              <div className='flex items-start'>
                <svg
                  className='mt-0.5 mr-2 h-4 w-4 flex-shrink-0 text-blue-600'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z'
                    clipRule='evenodd'
                  />
                </svg>
                <div>
                  <h4 className='mb-1 text-sm font-semibold text-blue-900'>
                    Bảo mật
                  </h4>
                  <p className='text-xs text-blue-700'>
                    Trang này chỉ dành cho quản trị viên. Vui lòng đảm bảo thông
                    tin đăng nhập được bảo mật.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className='mt-8 text-center'>
          <p className='text-sm text-slate-600'>
            © 2024 MacTwo Admin Portal. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
