'use client';

import { DataTable } from '@/components/ui/table/data-table';
import { Promotion } from '@/types/promotion';
import { ColumnDef } from '@tanstack/react-table';

// Mock data for client-side pagination demo
const mockPromotions: Promotion[] = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  promotionName: `Khuyến mãi ${index + 1}`,
  description: `Mô tả cho khuyến mãi số ${index + 1}`,
  discountAmount: (index + 1) * 10000,
  startDate: new Date(2025, 0, 1).toISOString(),
  endDate: new Date(2025, 11, 31).toISOString(),
  products: [],
}));

// Columns for demo
const columns: ColumnDef<Promotion>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'promotionName',
    header: 'Tên khuyến mãi',
  },
  {
    accessorKey: 'description',
    header: 'Mô tả',
  },
  {
    accessorKey: 'discountAmount',
    header: 'Số tiền giảm',
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('discountAmount'));
      const formatted = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(amount);
      return <div className='font-medium'>{formatted}</div>;
    },
  },
];

const ClientPaginationExamplePage = () => {
  return (
    <div>
      <div className='flex items-center justify-between bg-white p-4 shadow-md'>
        <h1 className='text-2xl font-bold'>Client-side Pagination Demo</h1>
        <span className='text-sm text-gray-600'>
          {mockPromotions.length} items total
        </span>
      </div>

      <div className='container mx-auto mt-4 bg-white p-4 shadow-sm'>
        <div className='mb-4'>
          <h2 className='text-lg font-semibold'>
            Client-side Pagination (Frontend)
          </h2>
          <p className='text-sm text-gray-600'>
            Dữ liệu được chia trang trên frontend, tất cả data đã được load từ
            đầu
          </p>
        </div>

        <DataTable
          columns={columns}
          data={mockPromotions}
          paginationType='client'
          clientPageSize={8}
          pageSizeOptions={[5, 8, 10, 20]}
        />
      </div>
    </div>
  );
};

export default ClientPaginationExamplePage;
