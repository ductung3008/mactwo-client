'use client';

import { CategoryModal } from '@/components/ui';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/table/data-table';
import { categoryApi } from '@/lib/api';
import { Category, FlatCategory } from '@/types/category';
import { flattenCategories } from '@/utils';
import { Filter, Plus } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { createColumns } from './columns';

const AdminCategoriesPage = () => {
  const [data, setData] = useState<FlatCategory[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<FlatCategory | null>(
    null
  );

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await categoryApi.getCategories();
      if (response.success) {
        // Lưu categories gốc để dùng cho dropdown
        setCategories(response.data);
        // Flatten categories before setting to data
        const flattenedCategories = flattenCategories(response.data);
        console.log(flattenedCategories);
        setData(flattenedCategories);
      } else {
        setError(response.message || 'Failed to fetch categories');
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      setError('Failed to fetch categories');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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

  return (
    <div>
      <div className='flex items-center justify-between bg-white p-4 shadow-md'>
        <h1 className='text-2xl font-bold'>Danh mục</h1>
        <Button
          onClick={handleOpenCreateModal}
          className='flex items-center gap-2'
        >
          <Plus className='h-4 w-4' />
          Thêm danh mục
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
          paginationType='client'
          clientPageSize={8}
          pageSizeOptions={[5, 8, 10, 15]}
        />
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
