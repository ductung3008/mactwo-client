'use client';

import { CategoryModal, useToastNotification } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/table/data-table';
import { categoryApi } from '@/lib/api';
import { Category, FlatCategory } from '@/types/category';
import { flattenCategories } from '@/utils';
import { FolderTree, Plus } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { createColumns } from './columns';

const AdminCategoriesPage = () => {
  const toast = useToastNotification();
  const [data, setData] = useState<FlatCategory[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<FlatCategory | null>(
    null
  );

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const response = await categoryApi.getCategories();
      if (response.success) {
        // Lưu categories gốc để dùng cho dropdown
        setCategories(response.data);
        // Flatten categories before setting to data
        const flattenedCategories = flattenCategories(response.data);
        setData(flattenedCategories);
      } else {
        setError(response.message || 'Failed to fetch categories');
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      setError('Failed to fetch categories');
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleOpenCreateModal = () => {
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (category: FlatCategory) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  const handleModalSuccess = () => {
    fetchCategories();
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
        onDeleteSuccess: fetchCategories,
      }),
    [fetchCategories]
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      setError(null);
    }
  }, [error, toast]);

  // Calculate category stats
  const stats = useMemo(() => {
    const total = data.length;
    const rootCategories = data.filter(
      cat => !cat.parentId || cat.parentId === null
    ).length;
    const subCategories = data.filter(
      cat => cat.parentId && cat.parentId !== null
    ).length;
    const maxLevel = Math.max(...data.map(cat => cat.level || 0), 0);

    return { total, rootCategories, subCategories, maxLevel };
  }, [data]);

  return (
    <div className='space-y-6'>
      {/* Modern Page Header */}
      <div className='rounded-xl border border-slate-200 bg-white p-6 shadow-lg'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <div className='rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 p-3 text-white shadow-lg'>
              <FolderTree className='h-6 w-6' />
            </div>
            <div>
              <h1 className='text-2xl font-bold text-slate-900'>
                Quản lý danh mục
              </h1>
              <p className='text-slate-600'>
                Tổ chức và cấu trúc danh mục sản phẩm của bạn
              </p>
            </div>
          </div>
          <Button
            onClick={handleOpenCreateModal}
            className='bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl'
          >
            <Plus className='mr-2 h-4 w-4' />
            Thêm danh mục
          </Button>
        </div>
      </div>

      {/* Category Stats */}
      <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
        <div className='rounded-lg border border-slate-200 bg-white p-4 shadow-md'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-slate-600'>Tổng danh mục</p>
              <p className='text-2xl font-bold text-slate-900'>{stats.total}</p>
            </div>
            <div className='text-xl text-emerald-500'>📁</div>
          </div>
        </div>
        <div className='rounded-lg border border-slate-200 bg-white p-4 shadow-md'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-slate-600'>Danh mục gốc</p>
              <p className='text-2xl font-bold text-blue-600'>
                {stats.rootCategories}
              </p>
            </div>
            <div className='text-xl text-blue-500'>🏠</div>
          </div>
        </div>
        <div className='rounded-lg border border-slate-200 bg-white p-4 shadow-md'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-slate-600'>Danh mục con</p>
              <p className='text-2xl font-bold text-purple-600'>
                {stats.subCategories}
              </p>
            </div>
            <div className='text-xl text-purple-500'>📂</div>
          </div>
        </div>
        <div className='rounded-lg border border-slate-200 bg-white p-4 shadow-md'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='text-sm text-slate-600'>Độ sâu tối đa</p>
              <p className='text-2xl font-bold text-orange-600'>
                {stats.maxLevel + 1}
              </p>
            </div>
            <div className='text-xl text-orange-500'>📊</div>
          </div>
        </div>
      </div>

      {/* Enhanced Table Container */}
      <div className='overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg'>
        <div className='border-b border-slate-200 bg-slate-50 p-6'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold text-slate-900'>
              Cấu trúc danh mục
            </h2>
            <div className='text-sm text-slate-600'>
              Quản lý{' '}
              <span className='font-semibold text-slate-900'>
                {data.length}
              </span>{' '}
              danh mục
            </div>
          </div>
        </div>
        <div className='p-6'>
          <DataTable
            columns={columns}
            data={data}
            isLoading={loading}
            paginationType='client'
            clientPageSize={8}
            pageSizeOptions={[5, 8, 10, 15]}
          />
        </div>
      </div>

      <CategoryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleModalSuccess}
        category={selectedCategory}
        categories={categoryOptions}
      />
    </div>
  );
};

export default AdminCategoriesPage;
