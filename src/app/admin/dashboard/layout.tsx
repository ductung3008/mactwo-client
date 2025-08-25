// app/admin/layout.tsx
'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const navigation = [
  { name: 'Tổng quan', href: '/admin/dashboard', icon: '📊' },
  { name: 'Sản phẩm', href: '/admin/dashboard/products', icon: '🛍️' },
  { name: 'Danh mục', href: '/admin/dashboard/categories', icon: '📋' },
  { name: 'Đơn hàng', href: '/admin/dashboard/orders', icon: '📦' },
  // { name: 'Khuyến mãi', href: '/admin/dashboard/promotions', icon: '🎯' },
  { name: 'Người dùng', href: '/admin/dashboard/users', icon: '👥' },
  // { name: 'Báo cáo', href: '/admin/dashboard/reports', icon: '📈' },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAuth();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  return (
    <div className='flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'>
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 flex w-72 transform flex-col bg-white shadow-2xl transition-all duration-300 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } border-r border-slate-200`}
      >
        {/* Logo Header */}
        <div className='flex h-20 items-center justify-center bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 px-6 shadow-lg'>
          <Image
            src='/mactwo-logo-trans-white.png'
            alt='MacTwo Admin'
            width={140}
            height={50}
            className='h-auto w-auto drop-shadow-md'
          />
        </div>

        {/* Navigation */}
        <nav className='flex flex-1 flex-col px-4 py-8'>
          <div>
            {navigation.map(item => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={closeSidebar}
                  className={`group relative flex items-center rounded-xl px-4 py-4 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'scale-[1.02] transform bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                      : 'text-slate-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700 hover:shadow-md'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div className='absolute top-1/2 left-0 h-8 w-1 -translate-y-1/2 rounded-r-full bg-white'></div>
                  )}

                  <span className='mr-4 text-lg'>{item.icon}</span>
                  <span className='flex-1'>{item.name}</span>

                  {/* Hover effect */}
                  <div
                    className={`absolute inset-0 rounded-xl transition-opacity duration-200 ${
                      isActive
                        ? 'opacity-0'
                        : 'opacity-0 group-hover:opacity-100'
                    } bg-gradient-to-r from-blue-500/5 to-indigo-600/5`}
                  ></div>
                </Link>
              );
            })}
          </div>

          {/* Logout Button */}
          <div className='mt-auto pt-8'>
            <Button
              onClick={handleLogout}
              variant='outline'
              className='w-full border-slate-300 bg-white text-slate-700 transition-all duration-200 hover:border-red-300 hover:bg-red-50 hover:text-red-700 hover:shadow-md'
              aria-label='Logout from admin panel'
            >
              <span className='mr-2 text-lg' aria-hidden='true'>
                🚪
              </span>
              Đăng xuất
            </Button>
          </div>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className='flex flex-1 flex-col'>
        {/* Mobile Header */}
        <header className='flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-6 shadow-sm backdrop-blur-md lg:hidden'>
          <h1 className='bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-xl font-bold text-transparent'>
            MacTwo Admin
          </h1>
          <button
            onClick={toggleSidebar}
            className='rounded-lg bg-slate-100 p-3 text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-800'
            aria-label='Toggle sidebar'
          >
            <svg
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          </button>
        </header>

        {/* Main Content */}
        <main className='flex-1 p-8'>
          <div className='mx-auto'>{children}</div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className='fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden'
          onClick={closeSidebar}
        />
      )}
    </div>
  );
}
