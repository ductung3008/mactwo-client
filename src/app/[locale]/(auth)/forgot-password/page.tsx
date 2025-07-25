'use client';

import { Button, Input } from '@/components/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function ForgotPasswordPage() {
  const t = useTranslations('auth.forgotPassword');

  const forgotPasswordSchema = z.object({
    email: z.string().min(1, t('emailRequired')).email(t('emailInvalid')),
  });

  type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    console.log('Forgot password data:', data);
  };

  return (
    <div className='flex min-h-fit items-center justify-center px-4 py-12 sm:px-6 lg:px-8'>
      <div className='w-full max-w-6xl'>
        <div className='overflow-hidden rounded-lg'>
          <div className='flex flex-col items-center lg:flex-row lg:*:w-1/2'>
            {/* Left side - Image */}
            <div>
              <Image
                src='/auth/forgot-password.jpeg'
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

                  {/* Submit Button */}
                  <Button
                    type='submit'
                    className='w-full'
                    size='lg'
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className='flex items-center gap-2'>
                        <div className='h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent' />
                        {t('resettingPassword')}
                      </div>
                    ) : (
                      t('resetPassword')
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
