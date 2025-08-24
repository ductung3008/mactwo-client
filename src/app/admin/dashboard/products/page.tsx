'use client';

import { ProductModal, useToastNotification } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/table/data-table';
import { categoryApi, productApi } from '@/lib/api';
import { DataPaginatedResponse } from '@/types';
import { Category } from '@/types/category';
import { Product } from '@/types/product';
import { flattenCategories } from '@/utils';
import { Package, Plus } from 'lucide-react';
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
        categories: categoryOptions,
      }),
    [fetchProducts, categoryOptions]
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      setError(null);
    }
  }, [error, toast]);

  // Calculate product stats
  const stats = useMemo(() => {
    const total = paginationData.totalElements || 0;
    const inStock = data.filter(product =>
      product.variants?.some(variant => (variant.stockQuantity || 0) > 0)
    ).length;
    const outOfStock = data.filter(
      product =>
        !product.variants?.some(variant => (variant.stockQuantity || 0) > 0)
    ).length;

    return {
      total,
      inStock,
      outOfStock,
      lowStock: Math.max(0, total - inStock - outOfStock),
    };
  }, [data, paginationData]);

  return (
    <div className='space-y-6'>
      {/* Modern Page Header */}
      <div className='rounded-xl border border-slate-200 bg-white p-6 shadow-lg'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <div className='rounded-lg bg-gradient-to-r from-purple-500 to-violet-600 p-3 text-white shadow-lg'>
              <Package className='h-6 w-6' />
            </div>
            <div>
              <h1 className='text-2xl font-bold text-slate-900'>
                Quản lý sản phẩm
              </h1>
              <p className='text-slate-600'>
                Quản lý danh mục sản phẩm và kho hàng của bạn
              </p>
            </div>
          </div>
          <Button
            onClick={handleOpenCreateModal}
            className='bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl'
          >
            <Plus className='mr-2 h-4 w-4' />
            Thêm sản phẩm
          </Button>
        </div>
      </div>

      {/* Product Stats */}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
        <div className='rounded-lg border border-slate-200 bg-white p-4 shadow-md'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-slate-600'>Tổng sản phẩm</p>
              <p className='text-2xl font-bold text-slate-900'>{stats.total}</p>
            </div>
            <div className='text-xl text-purple-500'>📦</div>
          </div>
        </div>
        <div className='rounded-lg border border-slate-200 bg-white p-4 shadow-md'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-slate-600'>Còn hàng</p>
              <p className='text-2xl font-bold text-green-600'>
                {stats.inStock}
              </p>
            </div>
            <div className='text-xl text-green-500'>✅</div>
          </div>
        </div>
        <div className='rounded-lg border border-slate-200 bg-white p-4 shadow-md'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-slate-600'>Sắp hết hàng</p>
              <p className='text-2xl font-bold text-yellow-600'>
                {stats.lowStock}
              </p>
            </div>
            <div className='text-xl text-yellow-500'>⚠️</div>
          </div>
        </div>
        <div className='rounded-lg border border-slate-200 bg-white p-4 shadow-md'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-slate-600'>Hết hàng</p>
              <p className='text-2xl font-bold text-red-600'>
                {stats.outOfStock}
              </p>
            </div>
            <div className='text-xl text-red-500'>❌</div>
          </div>
        </div>
      </div>

      {/* Enhanced Table Container */}
      <div className='overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg'>
        <div className='border-b border-slate-200 bg-slate-50 p-6'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold text-slate-900'>
              Danh mục sản phẩm
            </h2>
            <div className='text-sm text-slate-600'>
              Hiển thị{' '}
              <span className='font-semibold text-slate-900'>
                {data.length}
              </span>{' '}
              trong tổng số{' '}
              <span className='font-semibold text-slate-900'>
                {stats.total}
              </span>{' '}
              sản phẩm
            </div>
          </div>
        </div>
        <div className='p-6'>
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
