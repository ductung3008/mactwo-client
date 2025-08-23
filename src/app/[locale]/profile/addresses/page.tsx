'use client';

import {
  Button,
  Input,
  PageLoading,
  useToastNotification,
} from '@/components/ui';
import { ConfirmationModal } from '@/components/ui/modal';
import { addressApi } from '@/lib/api/address.api';
import { createCreateAddressSchema } from '@/schemas/address.schema';
import { Address } from '@/types/address.type';
import { zodResolver } from '@hookform/resolvers/zod';
import { Edit3, MapPin, Plus, Star, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function AddressesPage() {
  const t = useTranslations('profile');
  const toast = useToastNotification();

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    addressId: string | null;
    isDeleting: boolean;
  }>({
    isOpen: false,
    addressId: null,
    isDeleting: false,
  });

  const createAddressSchema = createCreateAddressSchema(t);
  type CreateAddressFormData = z.infer<typeof createAddressSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<CreateAddressFormData>({
    resolver: zodResolver(createAddressSchema),
    defaultValues: {
      shippingAddress: '',
      default: false,
    },
  });

  const loadAddresses = useCallback(async () => {
    try {
      setLoading(true);
      const response = await addressApi.getAddresses();
      if (response.success) {
        const sortedAddresses = response.data.sort((a: Address, b: Address) => {
          if (a.default && !b.default) return -1;
          if (!a.default && b.default) return 1;
          return 0;
        });
        setAddresses(sortedAddresses);
      }
    } catch (error) {
      toast.error(t('error'), t('failedToLoadAddresses'));
      console.error('Error loading addresses:', error);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    loadAddresses();
  }, [loadAddresses]);

  const onSubmit = async (data: CreateAddressFormData) => {
    try {
      if (editingAddress) {
        const response = await addressApi.updateAddress(
          editingAddress.id,
          data
        );
        if (response.success) {
          toast.success(t('success'), t('addressUpdatedSuccessfully'));
          await loadAddresses();
          cancelEdit();
        }
      } else {
        const response = await addressApi.createAddress(data);
        if (response.success) {
          toast.success(t('success'), t('addressCreatedSuccessfully'));
          await loadAddresses();
          setIsCreating(false);
          reset();
        }
      }
    } catch (error) {
      toast.error(
        t('error'),
        editingAddress ? t('failedToUpdateAddress') : t('failedToCreateAddress')
      );
      console.error('Error submitting form:', error);
    }
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setIsCreating(true);
    setValue('shippingAddress', address.shippingAddress);
    setValue('default', address.default);
  };

  const cancelEdit = () => {
    setEditingAddress(null);
    setIsCreating(false);
    reset();
  };

  const handleDeleteClick = (addressId: string) => {
    setDeleteModal({
      isOpen: true,
      addressId,
      isDeleting: false,
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModal.addressId) return;

    setDeleteModal(prev => ({ ...prev, isDeleting: true }));

    try {
      const response = await addressApi.deleteAddress(deleteModal.addressId);
      if (response.success) {
        toast.success(t('success'), t('addressDeletedSuccessfully'));
        await loadAddresses();
        setDeleteModal({ isOpen: false, addressId: null, isDeleting: false });
      }
    } catch (error) {
      toast.error(t('error'), 'Failed to delete address');
      console.error('Error deleting address:', error);
      setDeleteModal(prev => ({ ...prev, isDeleting: false }));
    }
  };

  const handleDeleteCancel = () => {
    if (!deleteModal.isDeleting) {
      setDeleteModal({ isOpen: false, addressId: null, isDeleting: false });
    }
  };

  if (loading) {
    return <PageLoading />;
  }

  return (
    <div className='mx-auto max-w-4xl p-4'>
      <div className='mb-6'>
        <div className='mb-4 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <MapPin className='h-6 w-6' />
            <h2 className='text-xl font-bold text-gray-900'>
              {t('shippingAddress')}
            </h2>
          </div>
          {!isCreating && (
            <Button
              onClick={() => setIsCreating(true)}
              className='flex items-center gap-2'
              size='sm'
            >
              <Plus className='h-4 w-4' />
              {t('addNewAddress')}
            </Button>
          )}
        </div>
      </div>

      {/* Create/Edit Address Form */}
      {isCreating && (
        <div className='mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm'>
          <h3 className='mb-4 text-lg font-semibold text-gray-900'>
            {editingAddress ? t('edit') : t('addNewAddress')}
          </h3>

          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div>
              <label
                htmlFor='shippingAddress'
                className='mb-2 block text-sm font-medium text-gray-700'
              >
                {t('shippingAddress')}
              </label>
              <Input
                id='shippingAddress'
                type='text'
                placeholder={t('shippingAddressPlaceholder')}
                {...register('shippingAddress')}
                className={
                  errors.shippingAddress
                    ? 'border-red-500 focus:border-red-500'
                    : ''
                }
              />
              {errors.shippingAddress && (
                <p className='mt-1 text-sm text-red-600'>
                  {errors.shippingAddress.message}
                </p>
              )}
            </div>

            <div className='flex items-center'>
              <input
                id='default'
                type='checkbox'
                {...register('default')}
                className='h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500'
              />
              <label htmlFor='default' className='ml-2 text-sm text-gray-700'>
                {t('setAsDefaultAddress')}
              </label>
            </div>

            <div className='flex gap-3 pt-4'>
              <Button
                type='submit'
                disabled={isSubmitting}
                className='flex items-center gap-2'
              >
                {isSubmitting ? (
                  <>
                    <div className='h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent' />
                    {editingAddress
                      ? t('updatingAddress')
                      : t('creatingAddress')}
                  </>
                ) : (
                  <>
                    {editingAddress ? t('updateAddress') : t('createAddress')}
                  </>
                )}
              </Button>
              <Button type='button' variant='outline' onClick={cancelEdit}>
                {t('cancel')}
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className='space-y-4'>
        {addresses.length === 0 ? (
          <div className='rounded-lg border border-gray-200 bg-white p-8 text-center'>
            <MapPin className='mx-auto h-12 w-12 text-gray-400' />
            <h3 className='mt-4 text-lg font-medium text-gray-900'>
              {t('noAddresses')}
            </h3>
            <p className='mt-2 text-sm text-gray-500'>
              {t('addNewAddressToGetStarted')}
            </p>
          </div>
        ) : (
          addresses.map(address => (
            <div
              key={address.id}
              className={`rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-md ${
                address.default
                  ? 'border-blue-200 bg-blue-50'
                  : 'border-gray-200'
              }`}
            >
              <div className='flex items-center justify-between'>
                <div className='flex-1'>
                  <div className='mb-2 flex items-center gap-2'>
                    {address.default && (
                      <div className='flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800'>
                        <Star className='h-3 w-3' />
                        {t('defaultAddress')}
                      </div>
                    )}
                  </div>
                  <p className='flex items-center gap-2 font-medium text-gray-900'>
                    <MapPin className='h-5 w-5 text-gray-500' />
                    {address.shippingAddress}
                  </p>
                </div>

                <div className='ml-4 flex items-center gap-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => handleEdit(address)}
                    className='flex items-center gap-1'
                  >
                    <Edit3 className='h-4 w-4' />
                    {t('edit')}
                  </Button>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => handleDeleteClick(address.id)}
                    className='flex items-center gap-1 text-red-600 hover:border-red-300 hover:text-red-700'
                  >
                    <Trash2 className='h-4 w-4' />
                    {t('delete')}
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title={t('confirmDelete')}
        message={t('confirmDeleteMessage')}
        confirmText={t('delete')}
        cancelText={t('cancel')}
        confirmVariant='destructive'
        isLoading={deleteModal.isDeleting}
      />
    </div>
  );
}
