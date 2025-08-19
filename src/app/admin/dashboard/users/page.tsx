'use client';

import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/table/data-table';
import { customerApi } from '@/lib/api/customer.api';
import { User } from '@/types/user';
import { Filter } from 'lucide-react';
import { useEffect, useState } from 'react';
import { columns } from './columns';

const AdminUsersPage = () => {
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
      </div>
    </div>
  );
};

export default AdminUsersPage;
