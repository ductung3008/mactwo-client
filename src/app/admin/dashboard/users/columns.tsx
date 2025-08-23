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
<<<<<<< HEAD
    header: 'Name',
=======
    header: 'Tên',
>>>>>>> 441881f107cef54cfbb1d185479bb70faa22622e
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'gender',
<<<<<<< HEAD
    header: 'Gender',
  },
  {
    accessorKey: 'dateOfBirth',
    header: 'Date of Birth',
  },
  {
    accessorKey: 'active',
    header: 'Active',
  },
  {
    accessorKey: 'roleName',
    header: 'Role',
=======
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
>>>>>>> 441881f107cef54cfbb1d185479bb70faa22622e
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
<<<<<<< HEAD
    header: 'Action',
    cell: ({ row }) => {
      const customer = row.original;
      return (
        <div className='flex items-center gap-2'>
          <Button>View</Button>
=======
    header: 'Thao tác',
    cell: () => {
      // cell: ({ row }) => {
      // const customer = row.original;
      return (
        <div className='flex items-center gap-2'>
          <Button>Xem</Button>
>>>>>>> 441881f107cef54cfbb1d185479bb70faa22622e
        </div>
      );
    },
  },
];
