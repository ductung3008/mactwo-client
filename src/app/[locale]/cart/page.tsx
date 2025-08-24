'use client';

import { addressApi } from '@/lib/api/address.api';
import { orderApi } from '@/lib/api/order.api';
import { useAuthStore } from '@/stores/auth.store';
import { useCartStore } from '@/stores/cart.store';
import { storeManager } from '@/stores/store-manager';
import { Address } from '@/types/address';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const CartBox = () => {
  const router = useRouter();
  const { getCurrentUserItems, updateQuantity, removeItem, getTotalItems } =
    useCartStore();
  const items = getCurrentUserItems();

  const totalPrice = items.reduce((sum, item) => {
    return sum + item.variant.price * item.quantity;
  }, 0);

  if (items.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-12 text-center shadow-lg'>
        <div className='mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-200'>
          <svg
            className='h-12 w-12 text-gray-400'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={1.5}
              d='M3 3h2l.4 2M7 13h10l4-8H5.4m-.4-2L3 3m4 10v6a1 1 0 001 1h8a1 1 0 001-1v-6m-9 0V9a1 1 0 011-1h2a1 1 0 011 1v4'
            />
          </svg>
        </div>
        <h3 className='mb-2 text-xl font-semibold text-gray-700'>
          Giỏ hàng của bạn đang trống
        </h3>
        <p className='mb-6 text-gray-500'>
          Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm
        </p>
        <button
          onClick={() => router.push('/')}
          className='rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-blue-700'
        >
          Tiếp tục mua sắm
        </button>
      </div>
    );
  }

  return (
    <div className='overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl'>
      <div className='bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white'>
        <div className='flex items-center justify-between'>
          <h2 className='flex items-center text-2xl font-bold'>
            <svg
              className='mr-3 h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M3 3h2l.4 2M7 13h10l4-8H5.4m-.4-2L3 3m4 10v6a1 1 0 001 1h8a1 1 0 001-1v-6m-9 0V9a1 1 0 011-1h2a1 1 0 011 1v4'
              />
            </svg>
            Giỏ hàng
          </h2>
          <div className='rounded-full bg-white/20 px-4 py-2'>
            <span className='text-sm font-medium'>
              {getTotalItems()} sản phẩm
            </span>
          </div>
        </div>
      </div>

      <div className='space-y-4 p-6'>
        {items.map((item, index) => (
          <div
            key={`${item.product.id}-${item.variant.product_variant_id}`}
            className={`group flex items-center space-x-4 rounded-xl border-2 border-gray-100 p-5 transition-all duration-200 hover:border-blue-200 hover:shadow-md ${
              index !== items.length - 1 ? 'border-b' : ''
            }`}
          >
            <div className='relative overflow-hidden rounded-lg'>
              <Image
                width={90}
                height={90}
                src={item.product.imageUrl}
                alt={item.product.name}
                className='h-24 w-24 rounded-lg object-cover transition-transform duration-200 group-hover:scale-105'
              />
              <div className='absolute inset-0 rounded-lg bg-black/0 transition-colors duration-200 group-hover:bg-black/5'></div>
            </div>

            <div className='min-w-0 flex-1'>
              <h3 className='truncate text-lg font-semibold text-gray-900'>
                {item.product.name}
              </h3>
              <div className='mt-2 flex flex-wrap gap-2 text-sm'>
                {!!item.variant.color && (
                  <span className='inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800'>
                    Màu: {item.variant.color}
                  </span>
                )}
                {!!item.variant.storage && (
                  <span className='inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800'>
                    Bộ nhớ: {item.variant.storage}
                  </span>
                )}
                {!!item.variant.ram && (
                  <span className='inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800'>
                    RAM: {item.variant.ram}
                  </span>
                )}
              </div>
              <div className='mt-3 flex items-center'>
                <span className='text-2xl font-bold text-red-600'>
                  {item.variant.price.toLocaleString('vi-VN')}đ
                </span>
                <span className='ml-2 text-sm text-gray-500'>/ sản phẩm</span>
              </div>
            </div>

            <div className='flex flex-col items-center space-y-4'>
              <div className='flex items-center space-x-1 rounded-lg bg-gray-50 p-1'>
                <button
                  onClick={() =>
                    updateQuantity(
                      item.product.id,
                      item.variant.product_variant_id!,
                      item.quantity - 1
                    )
                  }
                  className='flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-white transition-colors duration-200 hover:border-red-200 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50'
                  disabled={item.quantity <= 1}
                >
                  <svg
                    className='h-4 w-4'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M20 12H4'
                    />
                  </svg>
                </button>
                <span className='w-12 rounded-md border border-gray-200 bg-white px-3 py-1 text-center text-lg font-semibold'>
                  {item.quantity}
                </span>
                <button
                  onClick={() =>
                    updateQuantity(
                      item.product.id,
                      item.variant.product_variant_id!,
                      item.quantity + 1
                    )
                  }
                  className='flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 bg-white transition-colors duration-200 hover:border-green-200 hover:bg-green-50'
                >
                  <svg
                    className='h-4 w-4'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                    />
                  </svg>
                </button>
              </div>

              <button
                onClick={() =>
                  removeItem(item.product.id, item.variant.product_variant_id!)
                }
                className='group flex items-center justify-center rounded-lg p-2 text-red-500 transition-all duration-200 hover:bg-red-50 hover:text-red-700'
              >
                <svg
                  className='h-5 w-5 transition-transform duration-200 group-hover:scale-110'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className='border-t-2 border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 p-6'>
        <div className='flex items-center justify-between'>
          <div className='text-left'>
            <p className='text-sm text-gray-600'>Tổng cộng</p>
            <p className='text-3xl font-bold text-red-600'>
              {totalPrice.toLocaleString('vi-VN')}đ
            </p>
          </div>
          <div className='text-right text-sm text-gray-600'>
            <p>Đã bao gồm VAT</p>
            <p>Miễn phí vận chuyển</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderConfirmation = () => {
  const [selectedAddress, setSelectedAddress] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('');
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const { getCurrentUserItems } = useCartStore();

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setLoading(true);
        const response = await addressApi.getAddresses();
        if (response.success) {
          setAddresses(response.data);
        } else {
          setError('Không thể tải danh sách địa chỉ');
        }
      } catch (err) {
        setError('Lỗi khi tải địa chỉ');
        console.error('Error fetching addresses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  const paymentMethods = [
    {
      id: 'cod',
      label: 'Thanh toán khi nhận hàng (COD)',
      icon: '💰',
      description: 'Thanh toán bằng tiền mặt khi nhận hàng',
    },
    // {
    //   id: 'banking',
    //   label: 'Chuyển khoản ngân hàng',
    //   icon: '🏦',
    //   description: 'Chuyển khoản qua ngân hàng',
    // },
    // {
    //   id: 'momo',
    //   label: 'Ví MoMo',
    //   icon: '📱',
    //   description: 'Thanh toán qua ví điện tử MoMo',
    // },
    // {
    //   id: 'vnpay',
    //   label: 'VNPay',
    //   icon: '💳',
    //   description: 'Thanh toán qua cổng VNPay',
    // },
  ];

  // Transform cart items thành format API
  const transformOrderItems = () => {
    const cartItems = getCurrentUserItems();
    return cartItems.map(item => ({
      variantId: item.variant.id || 0,
      quantity: item.quantity,
    }));
  };

  const handleCreateOrder = async () => {
    if (!selectedAddress || !selectedPayment) {
      alert('Vui lòng chọn địa chỉ giao hàng và phương thức thanh toán');
      return;
    }

    setIsCreatingOrder(true);

    // Transform orderItems theo format API
    const transformedOrderItems = transformOrderItems();

    const orderData = {
      userId: useAuthStore.getState().user?.id || '',
      addressId: parseInt(selectedAddress) || 0,
      promotionId: null,
      orderItems: transformedOrderItems,
    };

    try {
      const response = await orderApi.createOrder(orderData);
      if (response.success) {
        useCartStore.getState().clearCart();
        alert('🎉 Đơn hàng đã được tạo thành công!');
      } else {
        alert('❌ Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại!');
      }
    } catch (err) {
      console.error('Error creating order:', err);
      alert('❌ Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại!');
    } finally {
      setIsCreatingOrder(false);
    }
  };

  return (
    <div className='overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl'>
      <div className='bg-gradient-to-r from-green-600 to-green-700 p-6 text-white'>
        <h2 className='flex items-center text-2xl font-bold'>
          <svg
            className='mr-3 h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          Xác nhận đơn hàng
        </h2>
        <p className='mt-1 text-green-100'>
          Vui lòng kiểm tra thông tin trước khi đặt hàng
        </p>
      </div>

      <div className='space-y-8 p-6'>
        {/* Chọn địa chỉ */}
        <div>
          <h3 className='mb-4 flex items-center text-lg font-semibold text-gray-800'>
            <svg
              className='mr-2 h-5 w-5 text-blue-600'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
              />
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
              />
            </svg>
            Chọn địa chỉ giao hàng
          </h3>

          {loading ? (
            <div className='flex items-center justify-center rounded-lg bg-gray-50 py-8'>
              <div className='h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600'></div>
              <span className='ml-3 text-gray-500'>Đang tải địa chỉ...</span>
            </div>
          ) : error ? (
            <div className='flex items-center justify-center rounded-lg border border-red-200 bg-red-50 py-8'>
              <svg
                className='mr-2 h-6 w-6 text-red-500'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
              <span className='font-medium text-red-600'>{error}</span>
            </div>
          ) : addresses.length === 0 ? (
            <div className='rounded-lg border border-yellow-200 bg-yellow-50 py-8 text-center'>
              <svg
                className='mx-auto mb-3 h-12 w-12 text-yellow-500'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z'
                />
              </svg>
              <p className='mb-2 font-medium text-yellow-800'>
                Chưa có địa chỉ nào được lưu
              </p>
              <button className='inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-blue-700'>
                <svg
                  className='mr-2 h-4 w-4'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 4v16m8-8H4'
                  />
                </svg>
                Thêm địa chỉ mới
              </button>
            </div>
          ) : (
            <div className='space-y-3'>
              {addresses.map(addr => (
                <label
                  key={addr.id}
                  className={`flex cursor-pointer items-start space-x-4 rounded-lg border-2 p-4 transition-all duration-200 hover:shadow-md ${
                    selectedAddress === addr.id.toString()
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type='radio'
                    name='address'
                    value={addr.id}
                    checked={selectedAddress === addr.id.toString()}
                    onChange={e => {
                      setSelectedAddress(e.target.value);
                    }}
                    className='mt-1 h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500'
                  />
                  <div className='flex-1'>
                    <div className='mb-1 flex items-center space-x-2'>
                      <svg
                        className='h-4 w-4 text-blue-600'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                        />
                      </svg>
                      <span className='font-semibold text-gray-900'>
                        Địa chỉ giao hàng
                      </span>
                      {selectedAddress === addr.id.toString() && (
                        <span className='inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800'>
                          Đã chọn
                        </span>
                      )}
                    </div>
                    <p className='leading-relaxed text-gray-700'>
                      {addr.shippingAddress}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Chọn phương thức thanh toán */}
        <div>
          <h3 className='mb-4 flex items-center text-lg font-semibold text-gray-800'>
            <svg
              className='mr-2 h-5 w-5 text-green-600'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'
              />
            </svg>
            Chọn phương thức thanh toán
          </h3>
          <div className='grid grid-cols-1 gap-3'>
            {paymentMethods.map(method => (
              <label
                key={method.id}
                className={`flex cursor-pointer items-center space-x-4 rounded-lg border-2 p-4 transition-all duration-200 hover:shadow-md ${
                  selectedPayment === method.id
                    ? 'border-green-500 bg-green-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type='radio'
                  name='payment'
                  value={method.id}
                  checked={selectedPayment === method.id}
                  onChange={e => setSelectedPayment(e.target.value)}
                  className='h-4 w-4 border-gray-300 text-green-600 focus:ring-green-500'
                />
                <div className='flex items-center space-x-3'>
                  <span className='text-2xl'>{method.icon}</span>
                  <div>
                    <div className='font-semibold text-gray-900'>
                      {method.label}
                    </div>
                    <div className='text-sm text-gray-600'>
                      {method.description}
                    </div>
                  </div>
                </div>
                {selectedPayment === method.id && (
                  <div className='ml-auto'>
                    <span className='inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800'>
                      Đã chọn
                    </span>
                  </div>
                )}
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={handleCreateOrder}
          disabled={!selectedAddress || !selectedPayment || isCreatingOrder}
          className='flex w-full transform items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 px-8 py-4 font-bold text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:from-red-700 hover:to-red-800 disabled:cursor-not-allowed disabled:from-gray-300 disabled:to-gray-400 disabled:hover:scale-100'
        >
          {isCreatingOrder ? (
            <>
              <div className='h-5 w-5 animate-spin rounded-full border-b-2 border-white'></div>
              <span>Đang xử lý...</span>
            </>
          ) : (
            <>
              <svg
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
                />
              </svg>
              <span>Đặt hàng ngay</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

const CartPage = () => {
  const { getCurrentUserItems } = useCartStore();
  const { initializeCartFromAuth } = storeManager;

  const items = getCurrentUserItems();

  // Khởi tạo cart store từ auth state
  React.useEffect(() => {
    initializeCartFromAuth();
  }, [initializeCartFromAuth]);

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50'>
      <div className='container mx-auto px-4 py-8'>
        <div className='mb-8 text-center'>
          <h1 className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent'>
            Giỏ hàng của tôi
          </h1>
          <p className='mt-2 text-gray-600'>
            Kiểm tra và xác nhận đơn hàng của bạn
          </p>
        </div>

        <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
          <div className='lg:col-span-2'>
            <CartBox />
          </div>

          <div className='lg:col-span-1'>
            {items.length > 0 && <OrderConfirmation />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
