'use client';

import { ProductModal, useToastNotification } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/table/data-table';
import { categoryApi, productApi } from '@/lib/api';
import { DataPaginatedResponse } from '@/types';
import { Category } from '@/types/category';
import { Product } from '@/types/product';
import { flattenCategories } from '@/utils';
import { Filter, Plus } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { createColumns } from './columns';

const AdminProductsPage = () => {
  const toast = useToastNotification();
  const [data, setData] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [paginationData, setPaginationData] = useState<
    DataPaginatedResponse<Product[]>
  >({} as DataPaginatedResponse<Product[]>);

  const fetchProducts = useCallback(
    async (page: number = currentPage, size: number = pageSize) => {
      setLoading(true);
      const params = { page, size, sort: null };
      const response = await productApi.getProducts(params);
      if (response.success) {
        setData(response.data.content);
        setPaginationData(response.data);
      } else {
        setError(response.message || 'Failed to fetch products');
      }
      setLoading(false);
    },
    [currentPage, pageSize]
  );

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
  }, [fetchProducts]);

  // Pagination handlers
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchProducts(page, pageSize);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(0); // Reset to first page
    fetchProducts(0, size);
  };

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
    fetchProducts(currentPage, pageSize);
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

  useEffect(() => {
    if (error) {
      toast.error(error);
      setError(null);
    }
  }, [error, toast]);

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
        <DataTable
          columns={columns}
          data={data}
          isLoading={loading}
          paginationType='server'
          serverPagination={paginationData}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
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
