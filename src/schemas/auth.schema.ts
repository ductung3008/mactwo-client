import { Gender } from '@/constants';
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

export const createRegisterSchema = (t: (key: string) => string) =>
  z
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

export const createLoginSchema = (t: (key: string) => string) =>
  z.object({
    emailOrPhone: z
      .string()
      .min(1, t('emailOrPhoneRequired'))
      .refine(value => {
        return (
          z.string().email().safeParse(value).success ||
          /^(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(value)
        );
      }, t('emailOrPhoneInvalid')),
    password: z
      .string()
      .min(6, t('passwordMinLength'))
      .max(100, t('passwordMaxLength')),
    rememberMe: z.boolean().optional(),
  });

export type LoginFormData = z.infer<ReturnType<typeof createLoginSchema>>;
export type RegisterFormData = z.infer<ReturnType<typeof createRegisterSchema>>;
