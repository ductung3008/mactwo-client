import { Gender } from '@/constants';
import { z } from 'zod';

export const createUpdateProfileSchema = (t: (key: string) => string) =>
  z.object({
    fullName: z.string().min(1, t('fullNameRequired')),
    email: z.string().email(t('emailInvalid')),
    phoneNumber: z
      .string()
      .min(1, t('phoneNumberRequired'))
      .regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, t('phoneNumberInvalid')),
    gender: z.enum(Gender, {
      message: t('genderRequired'),
    }),
    dateOfBirth: z
      .string()
      .refine(value => !value || !isNaN(Date.parse(value)), {
        message: t('dateOfBirthInvalid'),
        path: ['dateOfBirth'],
      })
      .transform(value => new Date(value).toISOString().split('T')[0]),
  });

export type UpdateProfileFormData = z.infer<
  ReturnType<typeof createUpdateProfileSchema>
>;

export const createChangePasswordSchema = (t: (key: string) => string) =>
  z
    .object({
      currentPassword: z.string().min(1, t('currentPasswordRequired')),
      newPassword: z
        .string()
        .min(1, t('newPasswordRequired'))
        .max(100, t('passwordMaxLength')),
      confirmNewPassword: z.string().min(1, t('confirmNewPasswordRequired')),
    })
    .refine(data => data.newPassword === data.confirmNewPassword, {
      message: t('passwordsMustMatch'),
      path: ['confirmNewPassword'],
    });

export type ChangePasswordFormData = z.infer<
  ReturnType<typeof createChangePasswordSchema>
>;
