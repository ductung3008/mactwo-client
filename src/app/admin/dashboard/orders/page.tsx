import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/table/data-table';
import { Filter } from 'lucide-react';
import { columns } from './columns';

const AdminOrdersPage = () => {
  const data = [
    {
      orderId: '1',
      userId: '1',
      addressId: 1,
      promotionId: '1',
      orderDate: new Date(),
      status: 'pending',
      totalAmount: 100,
    },
  ];
  return (
    <div>
      <div className='flex items-center justify-between bg-white p-4 shadow-md'>
        <h1 className='text-2xl font-bold'>Orders</h1>
        <Button>Add Order</Button>
      </div>
      <div className='container mx-auto mt-4 bg-white p-4 shadow-sm'>
        <Filter />
      </div>
      <div className='container mx-auto mt-4 bg-white p-4 shadow-sm'>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default AdminOrdersPage;
