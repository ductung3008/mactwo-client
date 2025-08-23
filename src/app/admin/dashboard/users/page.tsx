'use client';

<<<<<<< HEAD
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/table/data-table';
import { Gender, Role } from '@/constants';
import { customerApi } from '@/lib/api/customer.api';
import { User } from '@/types/user';
import { Filter } from 'lucide-react';
=======
import { useToastNotification } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/table/data-table';
import { customerApi } from '@/lib/api/customer.api';
import { User } from '@/types/user';
import { Plus, Users } from 'lucide-react';
>>>>>>> 441881f107cef54cfbb1d185479bb70faa22622e
import { useEffect, useState } from 'react';
import { columns } from './columns';

const AdminUsersPage = () => {
<<<<<<< HEAD
=======
  const toast = useToastNotification();
>>>>>>> 441881f107cef54cfbb1d185479bb70faa22622e
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const response = await customerApi.getCustomers();
      if (response.success) {
        setData(response.data);
      } else {
        setError(response.message || 'Failed to fetch users');
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);
<<<<<<< HEAD
  const sampleData = [
    {
      id: 1,
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      gender: Gender.Male,
      dateOfBirth: '1990-01-01',
      active: true,
      roleName: Role.Admin,
      createdDate: new Date(),
      lastModifiedDate: new Date(),
    },
  ];

  return (
    <div>
      <div className='flex items-center justify-between bg-white p-4 shadow-md'>
        <h1 className='text-2xl font-bold'>Users</h1>
        <Button>Add User</Button>
      </div>
      <div className='container mx-auto mt-4 bg-white p-4 shadow-sm'>
        <Filter />
      </div>
      <div className='container mx-auto mt-4 bg-white p-4 shadow-sm'>
        <DataTable
          columns={columns}
          data={data}
          isLoading={loading}
          paginationType='client'
          clientPageSize={10}
          pageSizeOptions={[5, 10, 20, 50]}
        />
=======

  useEffect(() => {
    if (error) {
      toast.error(error);
      setError(null);
    }
  }, [error, toast]);

  return (
    <div className='space-y-6'>
      {/* Modern Page Header */}
      <div className='rounded-xl border border-slate-200 bg-white p-6 shadow-lg'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <div className='rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 p-3 text-white shadow-lg'>
              <Users className='h-6 w-6' />
            </div>
            <div>
              <h1 className='text-2xl font-bold text-slate-900'>
                Quản lý người dùng
              </h1>
              <p className='text-slate-600'>
                Quản lý và xem tất cả người dùng đã đăng ký
              </p>
            </div>
          </div>
          <Button className='bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl'>
            <Plus className='mr-2 h-4 w-4' />
            Thêm người dùng
          </Button>
        </div>
      </div>

      {/* Enhanced Table Container */}
      <div className='overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg'>
        <div className='border-b border-slate-200 bg-slate-50 p-6'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold text-slate-900'>
              Tất cả người dùng
            </h2>
            <div className='text-sm text-slate-600'>
              Tổng cộng:{' '}
              <span className='font-semibold text-slate-900'>
                {data.length}
              </span>{' '}
              người dùng
            </div>
          </div>
        </div>
        <div className='p-6'>
          <DataTable
            columns={columns}
            data={data}
            isLoading={loading}
            paginationType='client'
            clientPageSize={10}
            pageSizeOptions={[5, 10, 20, 50]}
          />
        </div>
>>>>>>> 441881f107cef54cfbb1d185479bb70faa22622e
      </div>
    </div>
  );
};

export default AdminUsersPage;
