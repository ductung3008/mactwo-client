'use client';

import {
  Button,
  DatePicker,
  Input,
  PageLoading,
  useToastNotification,
} from '@/components/ui';
import { Gender } from '@/constants';
import { useAuth } from '@/hooks';
import {
  createChangePasswordSchema,
  createUpdateProfileSchema,
} from '@/schemas/profile.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Lock, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function ProfilePage() {
  const t = useTranslations('profile');
  const toast = useToastNotification();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const {
    isAuthenticated,
    user,
    loading,
    error,
    setError,
    getProfile,
    changePassword,
    updateProfile,
  } = useAuth();

  const updateProfileSchema = createUpdateProfileSchema(t);
  type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;

  const changePasswordSchema = createChangePasswordSchema(t);
  type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

  useEffect(() => {
    if (!user && isAuthenticated) {
      getProfile();
    }
  }, [isAuthenticated, user, getProfile]);

  const {
    register: updateProfileRegister,
    handleSubmit: handleUpdateProfileSubmit,
    formState: {
      errors: updateProfileErrors,
      isSubmitting: isUpdateProfileSubmitting,
    },
    watch,
    setValue,
    reset,
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      fullName: user?.fullName || '',
      email: user?.email || '',
      gender: user?.gender as Gender,
      phoneNumber: user?.phoneNumber || '',
      dateOfBirth: user?.dateOfBirth || '',
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        fullName: user.fullName || '',
        email: user.email || '',
        gender: user.gender as Gender,
        phoneNumber: user.phoneNumber || '',
        dateOfBirth: user.dateOfBirth || '',
      });
    }
  }, [user, reset]);

  const {
    register: changePasswordRegister,
    handleSubmit: handleChangePasswordSubmit,
    formState: {
      errors: changePasswordErrors,
      isSubmitting: isChangePasswordSubmitting,
    },
    reset: resetChangePasswordForm,
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const onUpdateProfile = async (data: UpdateProfileFormData) => {
    try {
      const result = await updateProfile(data);

      if (result.success) {
        toast.success(t('updateProfileSuccess'));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t('updateProfileFailed'));
    }
  };

  const onChangePassword = async (data: ChangePasswordFormData) => {
    try {
      const result = await changePassword(data);

      if (result.success) {
        toast.success(t('changePasswordSuccess'));
        resetChangePasswordForm({
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t('changePasswordFailed'));
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(t('error'), error);
      setError(null);
    }
  }, [error, toast, t, setError]);

  if (loading) {
    return <PageLoading />;
  }

  return (
    <div className='mx-auto max-w-4xl p-4'>
      <div>
        <div className='mb-4'>
          <div className='mb-2 flex items-center gap-3'>
            <User />
            <h2 className='text-xl font-bold text-gray-900'>{t('profile')}</h2>
          </div>
        </div>

        <div className='lg:col-span-2'>
          <form onSubmit={handleUpdateProfileSubmit(onUpdateProfile)}>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
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
                  {...updateProfileRegister('fullName')}
                  className={
                    updateProfileErrors.fullName
                      ? 'border-red-500 focus:border-red-500'
                      : ''
                  }
                />
                {updateProfileErrors.fullName && (
                  <p className='mt-1 text-sm text-red-600'>
                    {updateProfileErrors.fullName.message}
                  </p>
                )}
              </div>

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
                  {...updateProfileRegister('email')}
                  className={
                    updateProfileErrors.email
                      ? 'border-red-500 focus:border-red-500'
                      : ''
                  }
                />
                {updateProfileErrors.email && (
                  <p className='mt-1 text-sm text-red-600'>
                    {updateProfileErrors.email.message}
                  </p>
                )}
              </div>

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
                  {...updateProfileRegister('phoneNumber')}
                  className={
                    updateProfileErrors.phoneNumber
                      ? 'border-red-500 focus:border-red-500'
                      : ''
                  }
                />
                {updateProfileErrors.phoneNumber && (
                  <p className='mt-1 text-sm text-red-600'>
                    {updateProfileErrors.phoneNumber.message}
                  </p>
                )}
              </div>

              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  {t('gender')}
                </label>
                <div className='mt-4 flex space-x-4'>
                  <div className='flex items-center'>
                    <Input
                      id='gender-male'
                      type='radio'
                      value={Gender.Male}
                      className='h-4 w-4'
                      {...updateProfileRegister('gender')}
                    />
                    <label
                      htmlFor='gender-male'
                      className='ml-2 block text-sm text-gray-700'
                    >
                      {t('male')}
                    </label>
                  </div>
                  <div className='flex items-center'>
                    <Input
                      id='gender-female'
                      type='radio'
                      value={Gender.Female}
                      className='h-4 w-4'
                      {...updateProfileRegister('gender')}
                    />
                    <label
                      htmlFor='gender-female'
                      className='ml-2 block text-sm text-gray-700'
                    >
                      {t('female')}
                    </label>
                  </div>
                  <div className='flex items-center'>
                    <Input
                      id='gender-other'
                      type='radio'
                      value={Gender.Other}
                      className='h-4 w-4'
                      {...updateProfileRegister('gender')}
                    />
                    <label
                      htmlFor='gender-other'
                      className='ml-2 block text-sm text-gray-700'
                    >
                      {t('other')}
                    </label>
                  </div>
                </div>
                {updateProfileErrors.gender && (
                  <p className='mt-1 text-sm text-red-600'>
                    {updateProfileErrors.gender.message}
                  </p>
                )}
              </div>

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
                      setValue('dateOfBirth', date.toISOString().split('T')[0]);
                    } else {
                      setValue('dateOfBirth', '');
                    }
                  }}
                  placeholder={t('dateOfBirth')}
                  maxDate={new Date()}
                  error={!!updateProfileErrors.dateOfBirth}
                  className={
                    updateProfileErrors.dateOfBirth
                      ? 'border-red-500 focus:border-red-500'
                      : ''
                  }
                />
                {updateProfileErrors.dateOfBirth && (
                  <p className='mt-1 text-sm text-red-600'>
                    {updateProfileErrors.dateOfBirth.message}
                  </p>
                )}
              </div>
            </div>

            <div className='flex w-full justify-center'>
              <Button
                type='submit'
                className='mt-6 w-1/2'
                size='lg'
                disabled={isUpdateProfileSubmitting || loading}
              >
                {isUpdateProfileSubmitting || loading ? (
                  <div className='flex items-center gap-2'>
                    <div className='h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent' />
                    {t('updatingProfile')}
                  </div>
                ) : (
                  t('updateProfile')
                )}
              </Button>
            </div>
          </form>
        </div>

        <div className='mt-8'>
          <div className='mb-4'>
            <div className='mb-2 flex items-center gap-3'>
              <Lock />
              <h2 className='text-xl font-bold text-gray-900'>
                {t('changePassword')}
              </h2>
            </div>
          </div>

          <form onSubmit={handleChangePasswordSubmit(onChangePassword)}>
            <div className='grid grid-cols-1 gap-4'>
              <div>
                <label
                  htmlFor='currentPassword'
                  className='mb-2 block text-sm font-medium text-gray-700'
                >
                  {t('currentPassword')}
                </label>
                <div className='relative'>
                  <Input
                    id='currentPassword'
                    type={showCurrentPassword ? 'text' : 'password'}
                    placeholder={t('currentPassword')}
                    {...changePasswordRegister('currentPassword')}
                    className={
                      changePasswordErrors.currentPassword
                        ? 'border-red-500 focus:border-red-500'
                        : ''
                    }
                  />
                  <button
                    type='button'
                    className='absolute inset-y-0 right-0 flex items-center pr-3'
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? (
                      <EyeOff className='h-5 w-5 text-gray-400' />
                    ) : (
                      <Eye className='h-5 w-5 text-gray-400' />
                    )}
                  </button>
                </div>
                {changePasswordErrors.currentPassword && (
                  <p className='mt-1 text-sm text-red-600'>
                    {changePasswordErrors.currentPassword.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor='newPassword'
                  className='mb-2 block text-sm font-medium text-gray-700'
                >
                  {t('newPassword')}
                </label>
                <div className='relative'>
                  <Input
                    id='newPassword'
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder={t('newPassword')}
                    {...changePasswordRegister('newPassword')}
                    className={
                      changePasswordErrors.newPassword
                        ? 'border-red-500 focus:border-red-500'
                        : ''
                    }
                  />
                  <button
                    type='button'
                    className='absolute inset-y-0 right-0 flex items-center pr-3'
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <EyeOff className='h-5 w-5 text-gray-400' />
                    ) : (
                      <Eye className='h-5 w-5 text-gray-400' />
                    )}
                  </button>
                </div>
                {changePasswordErrors.newPassword && (
                  <p className='mt-1 text-sm text-red-600'>
                    {changePasswordErrors.newPassword.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor='confirmNewPassword'
                  className='mb-2 block text-sm font-medium text-gray-700'
                >
                  {t('confirmNewPassword')}
                </label>
                <div className='relative'>
                  <Input
                    id='confirmNewPassword'
                    type={showConfirmNewPassword ? 'text' : 'password'}
                    placeholder={t('confirmNewPassword')}
                    {...changePasswordRegister('confirmNewPassword')}
                    className={
                      changePasswordErrors.confirmNewPassword
                        ? 'border-red-500 focus:border-red-500'
                        : ''
                    }
                  />
                  <button
                    type='button'
                    className='absolute inset-y-0 right-0 flex items-center pr-3'
                    onClick={() =>
                      setShowConfirmNewPassword(!showConfirmNewPassword)
                    }
                  >
                    {showConfirmNewPassword ? (
                      <EyeOff className='h-5 w-5 text-gray-400' />
                    ) : (
                      <Eye className='h-5 w-5 text-gray-400' />
                    )}
                  </button>
                </div>
                {changePasswordErrors.confirmNewPassword && (
                  <p className='mt-1 text-sm text-red-600'>
                    {changePasswordErrors.confirmNewPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div className='flex w-full justify-center'>
              <Button
                type='submit'
                className='mt-6 w-1/2 min-w-fit'
                size='lg'
                disabled={isChangePasswordSubmitting || loading}
              >
                {isChangePasswordSubmitting || loading ? (
                  <div className='flex items-center gap-2'>
                    <div className='h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent' />
                    {t('updatingPassword')}
                  </div>
                ) : (
                  t('updatePassword')
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
