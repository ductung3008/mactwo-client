import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/table/data-table';
import { Filter } from 'lucide-react';
import { columns } from './columns';

const AdminCategoriesPage = async () => {
  const data = [
    {
      category_id: '1',
      category_name: 'Category 1',
      parent_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  return (
    <div>
      <div className='flex items-center justify-between bg-white p-4 shadow-md'>
        <h1 className='text-2xl font-bold'>Categories</h1>
        <Button>Add Category</Button>
      </div>
      <div>
        <div className='container mx-auto mt-4 bg-white p-4 shadow-sm'>
          <Filter />
        </div>
      </div>
      <div className='container mx-auto mt-4 bg-white p-4 shadow-sm'>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default AdminCategoriesPage;
