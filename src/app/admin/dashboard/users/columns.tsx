'use client';

import { OrdersModal } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { User } from '@/types/user';
import { ColumnDef } from '@tanstack/react-table';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'fullName',
    header: 'Tên',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'gender',
    header: 'Giới tính',
  },
  {
    accessorKey: 'dateOfBirth',
    header: 'Ngày sinh',
  },
  {
    accessorKey: 'active',
    header: 'Hoạt động',
  },
  {
    accessorKey: 'roleName',
    header: 'Vai trò',
  },
  // {
  //   accessorKey: 'createdDate',
  //   header: 'Created Date',
  // },
  // {
  //   accessorKey: 'lastModifiedDate',
  //   header: 'Last Modified Date',
  // },
  {
    accessorKey: 'action',
    header: 'Thao tác',
    cell: ({ row }) => {
      const user = row.original;
      const [ordersModalOpen, setOrdersModalOpen] = useState(false);

      return (
        <div className='flex items-center gap-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => setOrdersModalOpen(true)}
            className='flex items-center gap-2 border-emerald-300 text-emerald-600 transition-all duration-200 hover:border-emerald-400 hover:bg-emerald-50'
          >
            <ShoppingCart className='h-4 w-4' />
            Xem đơn hàng
          </Button>

          <OrdersModal
            isOpen={ordersModalOpen}
            onClose={() => setOrdersModalOpen(false)}
            userId={user.id.toString()}
            userName={user.fullName}
          />
        </div>
      );
    },
  },
];
