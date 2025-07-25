'use client';

import { Button, DatePicker, Input } from '@/components/ui';
import { Gender } from '@/constants';
import { Link } from '@/i18n/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function RegisterPage() {
  const t = useTranslations('auth.register');
  // const toast = useToastNotification();
  // const {
  //   register: registerAccount,
  //   loading,
  //   error,
  //   isAuthenticated,
  // } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Register validation schema
  const registerSchema = z
    .object({
      fullName: z.string().min(1, t('fullNameRequired')),
      email: z.string().min(1, t('emailRequired')).email(t('emailInvalid')),
      password: z
        .string()
        .min(6, t('passwordMinLength'))
        .max(100, t('passwordMaxLength')),
      confirmPassword: z.string().min(6, t('confirmPasswordRequired')),
      gender: z.enum(Gender, {
        message: t('genderRequired'),
      }),
      dateOfBirth: z
        .string()
        .min(1, t('dateOfBirthRequired'))
        .refine(value => !isNaN(Date.parse(value)), {
          message: t('dateOfBirthInvalid'),
          path: ['dateOfBirth'],
        })
        .transform(value => new Date(value).toISOString().split('T')[0]),
      phoneNumber: z
        .string()
        .min(1, t('phoneNumberRequired'))
        .regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, t('phoneNumberInvalid')),
    })
    .refine(data => data.password === data.confirmPassword, {
      message: t('confirmPasswordMismatch'),
      path: ['confirmPassword'],
    });

  type RegisterFormData = z.infer<typeof registerSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      gender: Gender.Male,
      dateOfBirth: '',
      phoneNumber: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    console.log('Registering user:', data);
  };

  return (
    <div className='flex min-h-fit items-center justify-center px-4 py-12 sm:px-6 lg:px-8'>
      <div className='w-full max-w-6xl'>
        <div className='overflow-hidden rounded-lg'>
          <div className='flex flex-col items-center lg:flex-row lg:*:w-1/2'>
            {/* Left side - Image */}
            <div>
              <Image
                src='/auth/register.jpeg'
                alt={t('title')}
                width={900}
                height={600}
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
                  {/* Full Name Field */}
                  <div>
                    <label
                      htmlFor='fullName'
                      className='mb-2 block text-sm font-medium text-gray-700'
                    >
                      {t('fullName')}
                    </label>
                    <Input
                      id='fullName'
                      type='text'
                      placeholder={t('fullName')}
                      {...register('fullName')}
                      className={
                        errors.fullName
                          ? 'border-red-500 focus:border-red-500'
                          : ''
                      }
                    />
                    {errors.fullName && (
                      <p className='mt-1 text-sm text-red-600'>
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>

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

                  {/* Gender Field */}
                  <div>
                    <label
                      htmlFor='gender'
                      className='mb-2 block text-sm font-medium text-gray-700'
                    >
                      {t('gender')}
                    </label>
                    <div className='flex space-x-4'>
                      <div className='flex items-center'>
                        <Input
                          id='gender-male'
                          type='radio'
                          value={Gender.Male}
                          className='size-4'
                          {...register('gender')}
                        />
                        <label
                          htmlFor='gender-male'
                          className='ml-2 block text-sm font-medium text-gray-700'
                        >
                          {t('male')}
                        </label>
                      </div>
                      <div className='flex items-center'>
                        <Input
                          id='gender-female'
                          type='radio'
                          value={Gender.Female}
                          className='size-4'
                          {...register('gender')}
                        />
                        <label
                          htmlFor='gender-female'
                          className='ml-2 block text-sm font-medium text-gray-700'
                        >
                          {t('female')}
                        </label>
                      </div>
                      <div className='flex items-center'>
                        <Input
                          id='gender-other'
                          type='radio'
                          value={Gender.Other}
                          className='size-4'
                          {...register('gender')}
                        />
                        <label
                          htmlFor='gender-other'
                          className='ml-2 block text-sm font-medium text-gray-700'
                        >
                          {t('other')}
                        </label>
                      </div>
                    </div>
                    {errors.gender && (
                      <p className='mt-1 text-sm text-red-600'>
                        {errors.gender.message}
                      </p>
                    )}
                  </div>

                  {/* Date of Birth Field */}
                  <div>
                    <label
                      htmlFor='dateOfBirth'
                      className='mb-2 block text-sm font-medium text-gray-700'
                    >
                      {t('dateOfBirth')}
                    </label>
                    <DatePicker
                      value={
                        watch('dateOfBirth')
                          ? new Date(watch('dateOfBirth')!)
                          : undefined
                      }
                      onChange={date => {
                        if (date) {
                          setValue(
                            'dateOfBirth',
                            date.toISOString().split('T')[0]
                          );
                        } else {
                          setValue('dateOfBirth', '');
                        }
                      }}
                      placeholder={t('dateOfBirth')}
                      maxDate={new Date()}
                      error={!!errors.dateOfBirth}
                      className={
                        errors.dateOfBirth
                          ? 'border-red-500 focus:border-red-500'
                          : ''
                      }
                    />
                    {errors.dateOfBirth && (
                      <p className='mt-1 text-sm text-red-600'>
                        {errors.dateOfBirth.message}
                      </p>
                    )}
                  </div>

                  {/* Phone Number Field */}
                  <div>
                    <label
                      htmlFor='phoneNumber'
                      className='mb-2 block text-sm font-medium text-gray-700'
                    >
                      {t('phoneNumber')}
                    </label>
                    <Input
                      id='phoneNumber'
                      type='tel'
                      placeholder={t('phoneNumber')}
                      {...register('phoneNumber')}
                      className={
                        errors.phoneNumber
                          ? 'border-red-500 focus:border-red-500'
                          : ''
                      }
                    />
                    {errors.phoneNumber && (
                      <p className='mt-1 text-sm text-red-600'>
                        {errors.phoneNumber.message}
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

                  {/* Confirm Password Field */}
                  <div>
                    <label
                      htmlFor='confirmPassword'
                      className='mb-2 block text-sm font-medium text-gray-700'
                    >
                      {t('confirmPassword')}
                    </label>
                    <div className='relative'>
                      <Input
                        id='confirmPassword'
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder={t('confirmPassword')}
                        {...register('confirmPassword')}
                        className={
                          errors.confirmPassword
                            ? 'border-red-500 pr-10 focus:border-red-500'
                            : 'pr-10'
                        }
                      />
                      <button
                        type='button'
                        className='absolute inset-y-0 right-0 flex items-center pr-3'
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className='h-5 w-5 text-gray-400' />
                        ) : (
                          <Eye className='h-5 w-5 text-gray-400' />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className='mt-1 text-sm text-red-600'>
                        {errors.confirmPassword.message}
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
                        {t('signingUp')}
                      </div>
                    ) : (
                      t('signUp')
                    )}
                  </Button>

                  {/* Sign in link */}
                  <div className='text-center'>
                    <p className='text-sm text-gray-600'>
                      {t('hasAccount')}{' '}
                      <Link
                        href='/login'
                        className='font-medium text-blue-600 hover:text-blue-500 hover:underline'
                      >
                        {t('signIn')}
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
