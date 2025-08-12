import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/table/data-table';
import { Filter } from 'lucide-react';
import { columns } from './columns';

const AdminProductsPage = () => {
  const data = [
    {
      productId: 1,
      categoryId: 1,
      name: 'Product 1',
      description: 'Description 1',
      imageUrl: 'https://via.placeholder.com/150',
      productVariants: [],
    },
  ];
  return (
    <div>
      <div className='flex items-center justify-between bg-white p-4 shadow-md'>
        <h1 className='text-2xl font-bold'>Products</h1>
        <Button>Add Product</Button>
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

export default AdminProductsPage;
