'use client';

import { Button } from '@/components/ui/button';
<<<<<<< HEAD
import DeleteDialog from '@/components/ui/delete-dialog';
import { Order } from '@/types/order';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: 'orderId',
    header: 'ID',
  },
  {
    accessorKey: 'userId',
    header: 'User ID',
  },
  {
    accessorKey: 'addressId',
    header: 'Address ID',
  },
  {
    accessorKey: 'promotionId',
    header: 'Promotion ID',
  },
  {
    accessorKey: 'orderDate',
    header: 'Order Date',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'totalAmount',
    header: 'Total Amount',
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => {
      const order = row.original;
      return (
        <div className='flex items-center gap-2'>
          <Button variant='outline'>Edit</Button>
          <DeleteDialog
            title='Xóa đơn hàng'
            description={`Bạn có chắc muốn xóa đơn hàng "${order.orderId}"? Hành động này không thể hoàn tác.`}
            onDelete={() => {
              console.log('Delete order', order.orderId);
            }}
          />
        </div>
      );
    },
  },
=======
import OrderDetailModal from '@/components/ui/order-detail-modal';
import OrderStatusPopover from '@/components/ui/order-status-popover';
import { customerApi } from '@/lib/api';
import { Order } from '@/types/order';
import { User } from '@/types/user';
import { formatCurrency } from '@/utils';
import { ColumnDef } from '@tanstack/react-table';
import { Eye } from 'lucide-react';
import { useEffect, useState } from 'react';

interface CreateColumnsProps {
  onStatusUpdate: () => void;
}

const userCache = new Map<
  string,
  { data: User | null; loading: boolean; error: boolean }
>();

const UserNameCell = ({ userId }: { userId: string }) => {
  const [userName, setUserName] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserName = async () => {
      if (userCache.has(userId)) {
        const cached = userCache.get(userId)!;
        if (cached.loading) {
          const checkCache = () => {
            const updated = userCache.get(userId)!;
            if (!updated.loading) {
              setUserName(updated.data?.fullName || `ID: ${userId}`);
              setLoading(false);
            } else {
              setTimeout(checkCache, 100);
            }
          };
          checkCache();
          return;
        } else {
          setUserName(cached.data?.fullName || `ID: ${userId}`);
          setLoading(false);
          return;
        }
      }

      userCache.set(userId, { data: null, loading: true, error: false });

      try {
        const response = await customerApi.getUserById(userId);
        if (response.success) {
          const userData = response.data;
          userCache.set(userId, {
            data: userData,
            loading: false,
            error: false,
          });
          setUserName(userData.fullName);
        } else {
          userCache.set(userId, { data: null, loading: false, error: true });
          setUserName(`ID: ${userId}`);
        }
      } catch (error) {
        console.error(error);
        userCache.set(userId, { data: null, loading: false, error: true });
        setUserName(`ID: ${userId}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUserName();
  }, [userId]);

  if (loading) {
    return (
      <div className='max-w-[200px] truncate'>
        <div className='h-4 w-20 animate-pulse rounded bg-gray-200'></div>
      </div>
    );
  }

  return (
    <div className='max-w-[200px] truncate'>{userName || `ID: ${userId}`}</div>
  );
};

const ActionsCell = ({ order }: { order: Order }) => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    const fetchUserName = async () => {
      const userId = order.userId;

      if (userCache.has(userId)) {
        const cached = userCache.get(userId)!;
        if (cached.loading) {
          const checkCache = () => {
            const updated = userCache.get(userId)!;
            if (!updated.loading) {
              setUserName(updated.data?.fullName || `ID: ${userId}`);
            } else {
              setTimeout(checkCache, 100);
            }
          };
          checkCache();
          return;
        } else {
          setUserName(cached.data?.fullName || `ID: ${userId}`);
          return;
        }
      }

      const waitForCache = () => {
        if (userCache.has(userId) && !userCache.get(userId)!.loading) {
          const cached = userCache.get(userId)!;
          setUserName(cached.data?.fullName || `ID: ${userId}`);
        } else {
          setTimeout(waitForCache, 100);
        }
      };
      waitForCache();
    };

    fetchUserName();
  }, [order.userId]);

  return (
    <>
      <div className='flex items-center gap-2'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => setIsDetailModalOpen(true)}
        >
          <Eye className='h-4 w-4' />
        </Button>
      </div>

      <OrderDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        order={order}
        orderBy={userName || `ID: ${order.userId}`}
      />
    </>
  );
};

export const createColumns = ({
  onStatusUpdate,
}: CreateColumnsProps): ColumnDef<Order>[] => [
  {
    accessorKey: 'id',
    header: 'Mã đơn',
    cell: ({ row }) => `#${row.original.id}`,
  },
  {
    accessorKey: 'userId',
    header: 'Khách hàng',
    cell: ({ row }) => <UserNameCell userId={row.original.userId} />,
  },
  {
    accessorKey: 'address.shippingAddress',
    header: 'Địa chỉ',
    cell: ({ row }) => (
      <div className='max-w-[200px] truncate'>
        {row.original.address.shippingAddress}
      </div>
    ),
  },
  {
    accessorKey: 'orderItems',
    header: 'Số sản phẩm',
    cell: ({ row }) => {
      const totalItems = row.original.orderItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      return totalItems;
    },
  },
  {
    accessorKey: 'status',
    header: 'Trạng thái',
    cell: ({ row }) => (
      <OrderStatusPopover
        order={row.original}
        onStatusUpdate={onStatusUpdate}
      />
    ),
  },
  {
    accessorKey: 'totalAmount',
    header: 'Tổng tiền',
    cell: ({ row }) => (
      <span className='font-semibold text-red-600'>
        {formatCurrency(row.original.totalAmount)}
      </span>
    ),
  },
  {
    accessorKey: 'createdDate',
    header: 'Ngày đặt',
    cell: ({ row }) => {
      const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        });
      };
      return formatDate(row.original.createdDate);
    },
  },
  {
    id: 'actions',
    header: 'Thao tác',
    cell: ({ row }) => <ActionsCell order={row.original} />,
  },
>>>>>>> 441881f107cef54cfbb1d185479bb70faa22622e
];
