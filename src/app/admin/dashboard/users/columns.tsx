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
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'gender',
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
    header: 'Action',
    cell: ({ row }) => {
      const customer = row.original;
      return (
        <div className='flex items-center gap-2'>
          <Button>View</Button>
        </div>
      );
    },
  },
];
