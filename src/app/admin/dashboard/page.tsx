import Link from 'next/link';

export default function AdminDashboard() {
  const stats = [
    { name: 'Total Users', value: '1,234', icon: '👥', change: '+12%' },
    { name: 'Total Orders', value: '567', icon: '🛒', change: '+8%' },
    { name: 'Revenue', value: '$12,345', icon: '💰', change: '+15%' },
    { name: 'Products', value: '89', icon: '📦', change: '+3%' },
  ];

  const recentOrders = [
    { id: '#001', customer: 'John Doe', amount: '$299', status: 'Completed' },
    { id: '#002', customer: 'Jane Smith', amount: '$149', status: 'Pending' },
    {
      id: '#003',
      customer: 'Bob Johnson',
      amount: '$599',
      status: 'Processing',
    },
    {
      id: '#004',
      customer: 'Alice Brown',
      amount: '$199',
      status: 'Completed',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className='space-y-6'>
      <div className='rounded-lg bg-white p-6 shadow'>
        <h2 className='mb-2 text-2xl font-bold text-gray-900'>
          Welcome back, Admin!
        </h2>
        <p className='text-gray-600'>Store</p>
      </div>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
        {stats.map(stat => (
          <div key={stat.name} className='rounded-lg bg-white p-6 shadow'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>{stat.name}</p>
                <p className='text-2xl font-bold text-gray-900'>{stat.value}</p>
              </div>
              <div className='text-3xl'>{stat.icon}</div>
            </div>
            <div className='mt-4'>
              <span className='text-sm font-medium text-green-600'>
                {stat.change}
              </span>
              <span className='ml-1 text-sm text-gray-500'>
                from last month
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        <div className='rounded-lg bg-white shadow'>
          <div className='border-b border-gray-200 p-6'>
            <h3 className='text-lg font-semibold text-gray-900'>
              Recent Orders
            </h3>
          </div>
          <div className='p-6'>
            <div className='space-y-4'>
              {recentOrders.map(order => (
                <div
                  key={order.id}
                  className='flex items-center justify-between'
                >
                  <div>
                    <p className='font-medium text-gray-900'>{order.id}</p>
                    <p className='text-sm text-gray-600'>{order.customer}</p>
                  </div>
                  <div className='text-right'>
                    <p className='font-medium text-gray-900'>{order.amount}</p>
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(order.status)}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className='mt-6'>
              <Link
                href='/admin/orders'
                className='text-sm font-medium text-blue-600 hover:text-blue-500'
              ></Link>
            </div>
          </div>
        </div>

        <div className='rounded-lg bg-white shadow'>
          <div className='border-b border-gray-200 p-6'>
            <h3 className='text-lg font-semibold text-gray-900'>
              Quick Actions
            </h3>
          </div>
          <div className='p-6'>
            <div className='space-y-4'>
              <Link
                href='/admin/products/new'
                className='flex items-center rounded-lg bg-blue-50 p-4 transition-colors hover:bg-blue-100'
              >
                <span className='mr-3 text-2xl'>➕</span>
                <div>
                  <p className='font-medium text-gray-900'>Add New Product</p>
                  <p className='text-sm text-gray-600'>
                    Create a new product listing
                  </p>
                </div>
              </Link>

              <Link
                href='/admin/users'
                className='flex items-center rounded-lg bg-green-50 p-4 transition-colors hover:bg-green-100'
              >
                <span className='mr-3 text-2xl'>👥</span>
                <div>
                  <p className='font-medium text-gray-900'>Manage Users</p>
                  <p className='text-sm text-gray-600'>
                    View and manage user accounts
                  </p>
                </div>
              </Link>

              <Link
                href='/admin/reports'
                className='flex items-center rounded-lg bg-purple-50 p-4 transition-colors hover:bg-purple-100'
              >
                <span className='mr-3 text-2xl'>📊</span>
                <div>
                  <p className='font-medium text-gray-900'>View Reports</p>
                  <p className='text-sm text-gray-600'>
                    Check sales and analytics
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
