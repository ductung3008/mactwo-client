'use client';

import { Button, OtpInput, useToastNotification } from '@/components/ui';
import { useAuth } from '@/hooks';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export default function VerifyPage() {
  const t = useTranslations('auth.verify');
  const router = useRouter();
  const searchParams = useSearchParams();
  const toast = useToastNotification();
  const { verifyOtp, loading, error, setError } = useAuth();

  const [otp, setOtp] = useState('');

  const email = searchParams.get('email') || '';

  useEffect(() => {
    if (!email) {
      router.push('/register');
    }
  }, [email, router]);

  const handleOtpChange = (value: string) => {
    setOtp(value);
  };

  const handleVerify = useCallback(async () => {
    try {
      const success = await verifyOtp(email, otp);

      if (success) {
        toast.success(t('verificationSuccess'));
        router.push('/login');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t('verificationFailed'));
    }
  }, [otp, email, verifyOtp, toast, t, router, setError]);

  if (!email) {
    return null;
  }

  return (
    <div className='flex min-h-fit items-center justify-center px-4 py-12 sm:px-6 lg:px-8'>
      <div className='w-full max-w-6xl'>
        <div className='overflow-hidden rounded-lg'>
          <div className='flex flex-col items-center lg:flex-row lg:*:w-1/2'>
            <div className='flex flex-1 flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-12'>
              <div className='mx-auto w-full max-w-md'>
                <div className='mb-8 text-center'>
                  <div className='mb-4 flex justify-center'>
                    <div className='flex h-16 w-16 items-center justify-center rounded-full bg-blue-100'>
                      <svg
                        className='h-8 w-8 text-blue-600'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                        />
                      </svg>
                    </div>
                  </div>
                  <h1 className='text-3xl font-bold text-gray-900'>
                    {t('title')}
                  </h1>
                  <p className='mt-2 text-gray-600'>{t('subtitle')}</p>
                  <p className='mt-1 text-sm font-medium text-blue-600'>
                    {email}
                  </p>
                </div>

                <div className='mb-6'>
                  <label className='mb-4 block text-center text-sm font-medium text-gray-700'>
                    {t('enterCode')}
                  </label>

                  <div className='mb-4'>
                    <OtpInput
                      length={6}
                      value={otp}
                      onChange={handleOtpChange}
                      error={!!error}
                      disabled={loading}
                      autoFocus
                    />
                  </div>

                  {error && (
                    <div className='flex items-center justify-center'>
                      <p className='animate-shake text-sm text-red-600'>
                        {error}
                      </p>
                    </div>
                  )}
                </div>

                <Button
                  onClick={handleVerify}
                  className='mb-4 w-full'
                  size='lg'
                  disabled={otp.length !== 6 || loading}
                >
                  {loading ? (
                    <div className='flex items-center gap-2'>
                      <div className='h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent' />
                      {t('verifying')}
                    </div>
                  ) : (
                    t('verify')
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          10%,
          30%,
          50%,
          70%,
          90% {
            transform: translateX(-2px);
          }
          20%,
          40%,
          60%,
          80% {
            transform: translateX(2px);
          }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
