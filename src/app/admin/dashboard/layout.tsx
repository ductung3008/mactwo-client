// app/admin/layout.tsx
'use client';

import MacTwoLogoTransWhite from '@/../public/mactwo-logo-trans-white.png';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: '🏠' },
  { name: 'Products', href: '/admin/products', icon: '💻' },
  { name: 'Orders', href: '/admin/orders', icon: '🧾' },
  { name: 'Reports', href: '/admin/reports', icon: '📊' },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  return (
    <div className='flex min-h-screen bg-gray-100'>
      <div
        className={`fixed inset-y-0 left-0 z-50 flex w-64 transform flex-col overflow-y-auto bg-white shadow-lg transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className='flex h-16 items-center justify-center bg-blue-600 px-4'>
          <Image
            src={MacTwoLogoTransWhite}
            alt='MacTwo Logo'
            width={120}
            height={40}
            className='h-auto w-auto'
          />
        </div>

        <nav className='mt-8 flex flex-1 flex-col justify-between px-4 pb-6'>
          <div className='space-y-2'>
            {navigation.map(item => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={closeSidebar}
                  className={`flex items-center rounded-lg px-4 py-3 transition-colors duration-200 ${
                    isActive
                      ? 'border-r-2 border-blue-600 bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className='mr-3 text-lg'>{item.icon}</span>
                  {item.name}
                </Link>
              );
            })}
          </div>

          <div className='pt-4'>
            <Button
              onClick={handleLogout}
              variant='outline'
              className='w-full'
              aria-label='Logout from admin panel'
            >
              <span className='mr-2' aria-hidden='true'>
                🚪
              </span>
              Logout
            </Button>
          </div>
        </nav>
      </div>

      <div className='flex-1'>
        <header className='flex h-16 items-center justify-between bg-white px-4 shadow-sm lg:hidden'>
          <h1 className='text-lg font-semibold text-gray-800'>Admin Panel</h1>
          <button
            onClick={toggleSidebar}
            className='rounded bg-gray-200 p-2 text-gray-600 hover:bg-gray-300'
            aria-label='Toggle sidebar'
          >
            ☰
          </button>
        </header>

        <main className='p-6'>{children}</main>
      </div>
    </div>
  );
}
