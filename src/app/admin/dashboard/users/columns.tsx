'use client';

import { Button } from '@/components/ui/button';

import { User } from '@/types/user';
import { ColumnDef } from '@tanstack/react-table';

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
    cell: () => {
      // cell: ({ row }) => {
      // const customer = row.original;
      return (
        <div className='flex items-center gap-2'>
          <Button>Xem</Button>
        </div>
      );
    },
  },
];
