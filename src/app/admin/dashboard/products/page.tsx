'use client';

import { ProductModal } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/table/data-table';
import { categoryApi, productApi } from '@/lib/api';
import { Category } from '@/types/category';
import { Product } from '@/types/product';
import { flattenCategories } from '@/utils';
import { Filter, Plus } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { createColumns } from './columns';

const AdminProductsPage = () => {
  const [data, setData] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [params, setParams] = useState({
    page: 10,
    size: 10,
    sort: null,
  });

  const fetchProducts = async () => {
    setLoading(true);
    const response = await productApi.getProducts(params);
    console.log(response.data.content);
    if (response.success) {
      setData(response.data.content);
    } else {
      setError(response.message || 'Failed to fetch products');
    }
    setLoading(false);
  };

  const fetchCategories = async () => {
    try {
      const response = await categoryApi.getCategories();
      if (response.success) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [params]);

  const handleOpenCreateModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleModalSuccess = () => {
    fetchProducts();
  };

  // Transform categories for dropdown - flatten nested structure
  const categoryOptions = useMemo(() => {
    return flattenCategories(categories).map(cat => ({
      id: cat.id,
      name: `${'　'.repeat(cat.level ?? 0)}${cat.categoryName}`, // Thêm indent để hiển thị cấp độ
    }));
  }, [categories]);

  // Create columns with callbacks
  const columns = useMemo(
    () =>
      createColumns({
        onEdit: handleOpenEditModal,
        onDeleteSuccess: fetchProducts,
      }),
    [fetchProducts]
  );

  return (
    <div>
      <div className='flex items-center justify-between bg-white p-4 shadow-md'>
        <h1 className='text-2xl font-bold'>Sản phẩm</h1>
        <Button
          onClick={handleOpenCreateModal}
          className='flex items-center gap-2'
        >
          <Plus className='h-4 w-4' />
          Thêm sản phẩm
        </Button>
      </div>
      <div className='container mx-auto mt-4 bg-white p-4 shadow-sm'>
        <Filter />
      </div>
      <div className='container mx-auto mt-4 bg-white p-4 shadow-sm'>
        <DataTable columns={columns} data={data} />
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleModalSuccess}
        product={selectedProduct}
        categories={categoryOptions}
      />
    </div>
  );
};

export default AdminProductsPage;
