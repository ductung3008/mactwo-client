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
      const { email, password } = data;
      const success = await login({ email, password });

      if (success) {
        toast.success(t('success'), t('successMessage'));

        const returnUrl = searchParams.get('returnUrl') || '/';
        router.push(returnUrl);
      }
    } catch (err) {
      // Handle specific error cases
      if (err instanceof Error) {
        if (err.message) {
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
    <div className='flex min-h-fit items-center justify-center px-4 py-12 sm:px-6 lg:px-8'>
      <div className='w-full max-w-6xl'>
        <div className='overflow-hidden rounded-lg'>
          <div className='flex flex-col items-center lg:flex-row lg:*:w-1/2'>
            {/* Left side - Image */}
            <div>
              <Image
                src='/auth/login.jpeg'
                alt={t('title')}
                width={612}
                height={400}
                className='hidden object-cover lg:block'
                priority
              />
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
                      {t('email')}
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
                      {t('password')}
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
                      href='/forgot-password'
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
                        href='/register'
                        className='font-medium text-blue-600 hover:text-blue-500 hover:underline'
                      >
                        {t('createAccount')}
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
