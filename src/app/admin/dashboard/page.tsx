'use client';

import { useToastNotification } from '@/components/ui';
import { customerApi, productApi } from '@/lib/api';
import { orderApi } from '@/lib/api/order.api';
import { Order } from '@/types/order';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

interface DashboardStats {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  totalProducts: number;
}

export default function AdminDashboard() {
  const toast = useToastNotification();
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
  });
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [usersResponse, ordersResponse, productsResponse] =
          await Promise.all([
            customerApi.getCustomers(),
            orderApi.getOrders(),
            productApi.getProducts({ page: 0, size: 1000, sort: null }),
          ]);

        const totalUsers = usersResponse.success
          ? usersResponse.data.length
          : 0;

        let totalOrders = 0;
        let totalRevenue = 0;
        let orders: Order[] = [];

        if (ordersResponse.status === 'SUCCESS') {
          orders = ordersResponse.data;
          totalOrders = orders.length;
          totalRevenue = orders.reduce(
            (sum, order) => sum + (order.totalAmount || 0),
            0
          );
        }

        const totalProducts = productsResponse.success
          ? productsResponse.data.totalElements ||
            productsResponse.data.content?.length ||
            0
          : 0;

        setStats({
          totalUsers,
          totalOrders,
          totalRevenue,
          totalProducts,
        });

        const sortedOrders = orders
          .sort(
            (a, b) =>
              new Date(b.createdDate).getTime() -
              new Date(a.createdDate).getTime()
          )
          .slice(0, 4);

        setRecentOrders(sortedOrders);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        const errorMessage = 'Không thể tải dữ liệu dashboard';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const statsDisplay = useMemo(
    () => [
      {
        name: 'Tổng số người dùng',
        value: loading ? '...' : stats.totalUsers.toLocaleString('vi-VN'),
        icon: '👥',
        change: '+12%',
        color: 'from-blue-500 to-blue-600',
      },
      {
        name: 'Tổng số đơn hàng',
        value: loading ? '...' : stats.totalOrders.toLocaleString('vi-VN'),
        icon: '🛒',
        change: '+8%',
        color: 'from-green-500 to-green-600',
      },
      {
        name: 'Doanh thu',
        value: loading
          ? '...'
          : `${(stats.totalRevenue / 1000000).toFixed(1)}M VND`,
        icon: '💰',
        change: '+15%',
        color: 'from-purple-500 to-purple-600',
      },
      {
        name: 'Sản phẩm',
        value: loading ? '...' : stats.totalProducts.toLocaleString('vi-VN'),
        icon: '📦',
        change: '+3%',
        color: 'from-orange-500 to-orange-600',
      },
    ],
    [stats, loading]
  );

  const getOrderStatusLabel = (status: string) => {
    const statusLabels: Record<string, string> = {
      PENDING: 'Chờ xử lý',
      CONFIRMED: 'Đã xác nhận',
      PROCESSING: 'Đang xử lý',
      SHIPPED: 'Đang giao',
      DELIVERED: 'Đã giao',
      CANCELLED: 'Đã hủy',
    };
    return statusLabels[status] || status;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Đã giao':
      case 'Hoàn thành':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'Chờ xử lý':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'Đang xử lý':
      case 'Đã xác nhận':
        return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'Đang giao':
        return 'bg-purple-100 text-purple-800 border border-purple-200';
      case 'Đã hủy':
        return 'bg-red-100 text-red-800 border border-red-200';
      case 'Đang tải':
        return 'bg-gray-100 text-gray-800 border border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const displayOrders = useMemo(() => {
    if (loading) {
      return Array(4)
        .fill(null)
        .map((_, index) => ({
          id: `#loading-${index}`,
          customer: 'Đang tải...',
          amount: '...',
          status: 'Đang tải',
        }));
    }

    return recentOrders.map(order => ({
      id: `#${order.id}`,
      customer: `Khách hàng ID: ${order.userId}`,
      amount: `${(order.totalAmount || 0).toLocaleString('vi-VN')} VND`,
      status: getOrderStatusLabel(order.status),
    }));
  }, [recentOrders, loading]);

  const quickActions = [
    {
      title: 'Thêm sản phẩm mới',
      description: 'Tạo danh sách sản phẩm mới',
      href: '/admin/dashboard/products',
      icon: '🛍️',
      color: 'from-blue-500 to-indigo-600',
    },
    {
      title: 'Quản lý người dùng',
      description: 'Xem và quản lý tài khoản người dùng',
      href: '/admin/dashboard/users',
      icon: '👥',
      color: 'from-green-500 to-emerald-600',
    },
    {
      title: 'Xem đơn hàng',
      description: 'Kiểm tra và xử lý đơn hàng',
      href: '/admin/dashboard/orders',
      icon: '📦',
      color: 'from-purple-500 to-violet-600',
    },
    {
      title: 'Xem báo cáo',
      description: 'Kiểm tra doanh số và phân tích',
      href: '/admin/dashboard/reports',
      icon: '📈',
      color: 'from-orange-500 to-red-600',
    },
  ];

  if (error) {
    return (
      <div className='flex min-h-[400px] items-center justify-center'>
        <div className='text-center'>
          <p className='mb-4 text-red-600'>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className='rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-8'>
      {/* Welcome Section */}
      <div className='relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-8 text-white shadow-xl'>
        <div className='relative z-10'>
          <h1 className='text-4xl font-bold'>
            Chào mừng trở lại, Quản trị viên! 👋
          </h1>
          <p className='mt-2 text-blue-100'>
            Đây là những gì đang diễn ra với cửa hàng của bạn hôm nay.
          </p>
        </div>
        <div className='absolute top-0 right-0 -mt-4 -mr-4 h-32 w-32 rounded-full bg-white/10'></div>
        <div className='absolute bottom-0 left-0 -mb-8 -ml-8 h-24 w-24 rounded-full bg-white/5'></div>
      </div>

      {/* Stats Grid */}
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
        {statsDisplay.map(stat => (
          <div
            key={stat.name}
            className='group relative overflow-hidden rounded-xl border border-slate-100 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl'
          >
            <div className='flex items-start justify-between'>
              <div className='flex-1'>
                <p className='text-sm font-medium text-slate-600'>
                  {stat.name}
                </p>
                <p className='mt-2 text-3xl font-bold text-slate-900'>
                  {stat.value}
                </p>
                <div className='mt-4 flex items-center'>
                  <span className='inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800'>
                    <svg
                      className='mr-1 h-3 w-3'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                    {stat.change}
                  </span>
                  <span className='ml-2 text-xs text-slate-500'>
                    so với tháng trước
                  </span>
                </div>
              </div>
              <div
                className={`rounded-full bg-gradient-to-r ${stat.color} p-3 text-white shadow-lg`}
              >
                <span className='text-xl'>{stat.icon}</span>
              </div>
            </div>
            <div
              className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r ${stat.color} scale-x-0 transform transition-transform duration-300 group-hover:scale-x-100`}
            ></div>
          </div>
        ))}
      </div>

      <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
        {/* Recent Orders */}
        <div className='rounded-xl border border-slate-100 bg-white shadow-lg'>
          <div className='border-b border-slate-200 p-6'>
            <div className='flex items-center justify-between'>
              <h3 className='text-xl font-bold text-slate-900'>
                Đơn hàng gần đây
              </h3>
              <Link
                href='/admin/dashboard/orders'
                className='text-sm font-medium text-blue-600 transition-colors hover:text-blue-700'
              >
                Xem tất cả →
              </Link>
            </div>
          </div>
          <div className='p-6'>
            <div className='space-y-4'>
              {displayOrders.map((order, index) => (
                <div
                  key={order.id || index}
                  className='flex items-center justify-between rounded-lg bg-slate-50 p-4 transition-colors hover:bg-slate-100'
                >
                  <div>
                    <p className='font-semibold text-slate-900'>{order.id}</p>
                    <p className='text-sm text-slate-600'>{order.customer}</p>
                  </div>
                  <div className='text-right'>
                    <p className='font-bold text-slate-900'>{order.amount}</p>
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(order.status)}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className='rounded-xl border border-slate-100 bg-white shadow-lg'>
          <div className='border-b border-slate-200 p-6'>
            <h3 className='text-xl font-bold text-slate-900'>Thao tác nhanh</h3>
          </div>
          <div className='p-6'>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              {quickActions.map(action => (
                <Link
                  key={action.title}
                  href={action.href}
                  className={`group relative overflow-hidden rounded-lg bg-gradient-to-r ${action.color} p-4 text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
                >
                  <div className='relative z-10'>
                    <div className='mb-2 text-2xl'>{action.icon}</div>
                    <h4 className='font-bold'>{action.title}</h4>
                    <p className='text-sm opacity-90'>{action.description}</p>
                  </div>
                  <div className='absolute top-0 right-0 -mt-2 -mr-2 h-16 w-16 rounded-full bg-white/10'></div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
