'use client';

import MacTwoLogoTrans from '@/../public/mactwo-logo-trans.png';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useState } from 'react';

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      window.location.href = '/admin/dashboard';
    }, 1000);
  };

  return (
    <div className='-mt-20 flex min-h-screen items-center justify-center bg-gray-50'>
      <div className='w-full max-w-md space-y-8 p-8'>
        <div className='text-center'>
          <Image
            src={MacTwoLogoTrans}
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
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label
                htmlFor='email'
                className='mb-2 block text-sm font-medium text-gray-700'
              >
                Email
              </label>
              <Input
                id='email'
                name='email'
                type='email'
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder='Email'
                className='w-full'
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
                name='password'
                type='password'
                required
                value={formData.password}
                onChange={handleInputChange}
                placeholder='Mật khẩu'
                className='w-full'
              />
            </div>

            <Button type='submit' disabled={isLoading} className='w-full'>
              {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
