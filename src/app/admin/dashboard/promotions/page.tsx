import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/table/data-table';
import { Filter } from 'lucide-react';
import { columns } from './columns';

const AdminPromotionsPage = () => {
  const data = [
    {
      promotionId: 1,
      promotionName: 'Promotion 1',
      description: 'Description 1',
      discountAmount: 100,
      startDate: new Date(),
      endDate: new Date(),
    },
  ];
  return (
    <div>
      <div className='flex items-center justify-between bg-white p-4 shadow-md'>
        <h1 className='text-2xl font-bold'>Promotions</h1>
        <Button>Add Promotion</Button>
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

export default AdminPromotionsPage;
