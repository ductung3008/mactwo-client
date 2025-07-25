'use client';

import { Button, Input, useToastNotification } from '@/components/ui';
import { useAuth } from '@/hooks';
import { Link } from '@/i18n/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function LoginPage() {
  const t = useTranslations('auth.login');
  const router = useRouter();
  const searchParams = useSearchParams();
  const toast = useToastNotification();
  const { login, loading, error, isAuthenticated } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  // Create dynamic validation schema with translations
  const loginSchema = z.object({
    email: z.string().min(1, t('emailRequired')).email(t('emailInvalid')),
    password: z
      .string()
      .min(6, t('passwordMinLength'))
      .max(100, t('passwordMaxLength')),
    rememberMe: z.boolean().optional(),
  });

  type LoginFormData = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const returnUrl = searchParams.get('returnUrl') || '/';
      router.push(returnUrl);
    }
  }, [isAuthenticated, router, searchParams]);

  // Handle form submission
  const onSubmit = async (data: LoginFormData) => {
    try {
      const success = await login({
        email: data.email,
        password: data.password,
      });

      if (success) {
        toast.success(t('success'), t('successMessage'));

        const returnUrl = searchParams.get('returnUrl') || '/';
        router.push(returnUrl);
      }
    } catch (err) {
      // Handle specific error cases
      if (err instanceof Error) {
        if (err.message.includes('email')) {
          setError('email', { message: t('emailNotFound') });
        } else if (err.message.includes('password')) {
          setError('password', { message: t('passwordIncorrect') });
        } else {
          toast.error(t('failed'), err.message || t('errorMessage'));
        }
      }
    }
  };

  // Show global error from auth hook
  useEffect(() => {
    if (error) {
      toast.error(t('failed'), error);
    }
  }, [error, toast, t]);

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8'>
      <div className='w-full max-w-6xl'>
        <div className='overflow-hidden rounded-lg bg-white shadow-xl'>
          <div className='flex flex-col lg:flex-row'>
            {/* Left side - Image */}
            <div className='relative lg:w-1/2'>
              <Image
                src='/auth/login.jpeg'
                alt={t('title')}
                width={612}
                height={400}
                className='h-64 w-full object-cover lg:h-full'
                priority
              />
              <div className='absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20' />
              <div className='absolute bottom-6 left-6 text-white'>
                <h2 className='text-2xl font-bold'>{t('welcomeBack')}</h2>
                <p className='mt-2 text-blue-100'>{t('welcomeMessage')}</p>
              </div>
            </div>

            {/* Right side - Form */}
            <div className='flex flex-1 flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-12'>
              <div className='mx-auto w-full max-w-md'>
                <div className='mb-8'>
                  <h1 className='text-3xl font-bold text-gray-900'>
                    {t('title')}
                  </h1>
                  <p className='mt-2 text-gray-600'>{t('subtitle')}</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor='email'
                      className='mb-2 block text-sm font-medium text-gray-700'
                    >
                      {t('email')} <span className='text-red-500'>*</span>
                    </label>
                    <Input
                      id='email'
                      type='email'
                      autoComplete='email'
                      placeholder={t('email')}
                      {...register('email')}
                      className={
                        errors.email
                          ? 'border-red-500 focus:border-red-500'
                          : ''
                      }
                    />
                    {errors.email && (
                      <p className='mt-1 text-sm text-red-600'>
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div>
                    <label
                      htmlFor='password'
                      className='mb-2 block text-sm font-medium text-gray-700'
                    >
                      {t('password')} <span className='text-red-500'>*</span>
                    </label>
                    <div className='relative'>
                      <Input
                        id='password'
                        type={showPassword ? 'text' : 'password'}
                        autoComplete='current-password'
                        placeholder={t('password')}
                        {...register('password')}
                        className={
                          errors.password
                            ? 'border-red-500 pr-10 focus:border-red-500'
                            : 'pr-10'
                        }
                      />
                      <button
                        type='button'
                        className='absolute inset-y-0 right-0 flex items-center pr-3'
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className='h-5 w-5 text-gray-400' />
                        ) : (
                          <Eye className='h-5 w-5 text-gray-400' />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className='mt-1 text-sm text-red-600'>
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  {/* Remember me & Forgot password */}
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                      <input
                        id='rememberMe'
                        type='checkbox'
                        className='h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                        {...register('rememberMe')}
                      />
                      <label
                        htmlFor='rememberMe'
                        className='ml-2 block text-sm text-gray-700'
                      >
                        {t('rememberMe')}
                      </label>
                    </div>
                    <Link
                      href='/auth/forgot-password'
                      className='text-sm text-blue-600 hover:text-blue-500 hover:underline'
                    >
                      {t('forgotPassword')}
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type='submit'
                    className='w-full'
                    size='lg'
                    disabled={isSubmitting || loading}
                  >
                    {isSubmitting || loading ? (
                      <div className='flex items-center gap-2'>
                        <div className='h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent' />
                        {t('signingIn')}
                      </div>
                    ) : (
                      t('signIn')
                    )}
                  </Button>

                  {/* Sign up link */}
                  <div className='text-center'>
                    <p className='text-sm text-gray-600'>
                      {t('noAccount')}{' '}
                      <Link
                        href='/auth/register'
                        className='font-medium text-blue-600 hover:text-blue-500 hover:underline'
                      >
                        {t('createAccount')}
                      </Link>
                    </p>
                  </div>
                </form>

                {/* Divider */}
                <div className='mt-6'>
                  <div className='relative'>
                    <div className='absolute inset-0 flex items-center'>
                      <div className='w-full border-t border-gray-300' />
                    </div>
                    <div className='relative flex justify-center text-sm'>
                      <span className='bg-white px-2 text-gray-500'>
                        {t('orContinueWith')}
                      </span>
                    </div>
                  </div>

                  {/* Social Login Options */}
                  <div className='mt-6 grid grid-cols-2 gap-3'>
                    <Button
                      type='button'
                      variant='outline'
                      className='w-full'
                      disabled={isSubmitting || loading}
                    >
                      <svg className='mr-2 h-5 w-5' viewBox='0 0 24 24'>
                        <path
                          fill='currentColor'
                          d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                        />
                        <path
                          fill='currentColor'
                          d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                        />
                        <path
                          fill='currentColor'
                          d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                        />
                        <path
                          fill='currentColor'
                          d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                        />
                      </svg>
                      {t('google')}
                    </Button>
                    <Button
                      type='button'
                      variant='outline'
                      className='w-full'
                      disabled={isSubmitting || loading}
                    >
                      <svg
                        className='mr-2 h-5 w-5'
                        fill='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' />
                      </svg>
                      {t('facebook')}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
