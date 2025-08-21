'use client';

import { addressApi } from '@/lib/api/address.api';
import { orderApi } from '@/lib/api/order.api';
import { useAuthStore } from '@/stores/auth.store';
import { useCartStore } from '@/stores/cart.store';
import { storeManager } from '@/stores/store-manager';
import { Address } from '@/types/address';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const CartBox = () => {
  const { getCurrentUserItems, updateQuantity, removeItem, getTotalItems } =
    useCartStore();
  const items = getCurrentUserItems();

  const totalPrice = items.reduce((sum, item) => {
    return sum + item.variant.price * item.quantity;
  }, 0);

  if (items.length === 0) {
    return (
      <div className='rounded-lg bg-white p-6 text-center shadow'>
        <p className='text-lg text-gray-500'>Giỏ hàng của bạn đang trống</p>
      </div>
    );
  }
  return (
    <div className='rounded-lg bg-white shadow'>
      <div className='border-b p-6'>
        <h2 className='text-xl font-semibold'>
          Giỏ hàng ({getTotalItems()} sản phẩm)
        </h2>
      </div>

      <div className='space-y-4 p-6'>
        {items.map(item => (
          <div
            key={`${item.product.id}-${item.variant.product_variant_id}`}
            className='flex items-center space-x-4 rounded-lg border p-4'
          >
            <Image
              width={80}
              height={80}
              src={item.product.imageUrl}
              alt={item.product.name}
              className='h-20 w-20 rounded object-cover'
            />
            <div className='flex-1'>
              <h3 className='font-medium'>{item.product.name}</h3>
              <div className='mt-1 text-sm text-gray-600'>
                <span>Màu: {item.variant.color}</span>
                <span className='ml-3'>Bộ nhớ: {item.variant.storage}</span>
                <span className='ml-3'>RAM: {item.variant.ram}</span>
              </div>
              <div className='mt-2 flex items-center space-x-2'>
                <span className='font-semibold text-red-600'>
                  {item.variant.price.toLocaleString('vi-VN')}đ
                </span>
              </div>
            </div>

            <div className='flex items-center space-x-2'>
              <button
                onClick={() =>
                  updateQuantity(
                    item.product.id,
                    item.variant.product_variant_id!,
                    item.quantity - 1
                  )
                }
                className='flex h-8 w-8 items-center justify-center rounded border hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50'
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <span className='w-12 text-center font-medium'>
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
                className='flex h-8 w-8 items-center justify-center rounded border hover:bg-gray-50'
              >
                +
              </button>
            </div>

            <button
              onClick={() =>
                removeItem(item.product.id, item.variant.product_variant_id!)
              }
              className='p-2 text-red-500 hover:text-red-700'
            >
              Xóa
            </button>
          </div>
        ))}
      </div>

      <div className='border-t bg-gray-50 p-6'>
        <div className='flex items-center justify-between text-lg font-semibold'>
          <span>Tổng cộng:</span>
          <span className='text-red-600'>
            {totalPrice.toLocaleString('vi-VN')}đ
          </span>
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
    { id: 'cod', label: 'Thanh toán khi nhận hàng (COD)' },
    { id: 'banking', label: 'Chuyển khoản ngân hàng' },
    { id: 'momo', label: 'Ví MoMo' },
    { id: 'vnpay', label: 'VNPay' },
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
      } else {
        console.log(response);
      }
    } catch (err) {
      console.error('Error creating order:', err);
    }

    console.log('Final order data (API format):', orderData);

    alert('Đơn hàng đã được tạo thành công!');
  };

  return (
    <div className='rounded-lg bg-white shadow'>
      <div className='border-b p-6'>
        <h2 className='text-xl font-semibold'>Xác nhận đơn hàng</h2>
      </div>

      <div className='space-y-6 p-6'>
        {/* Chọn địa chỉ */}
        <div>
          <h3 className='mb-3 font-medium'>Chọn địa chỉ giao hàng</h3>

          {loading ? (
            <div className='py-4 text-center'>
              <span className='text-gray-500'>Đang tải địa chỉ...</span>
            </div>
          ) : error ? (
            <div className='py-4 text-center'>
              <span className='text-red-500'>{error}</span>
            </div>
          ) : addresses.length === 0 ? (
            <div className='py-4 text-center'>
              <span className='text-gray-500'>
                Chưa có địa chỉ nào được lưu
              </span>
              <div className='mt-2'>
                <button className='text-blue-600 underline hover:text-blue-700'>
                  Thêm địa chỉ mới
                </button>
              </div>
            </div>
          ) : (
            <div className='space-y-2'>
              {addresses.map(addr => (
                <label
                  key={addr.id}
                  className={`flex cursor-pointer items-start space-x-3 rounded border p-3 hover:bg-gray-50 ${
                    selectedAddress === addr.id
                      ? 'border-blue-500 bg-blue-50'
                      : ''
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
                    className='mt-1'
                  />
                  <div className='flex-1'>
                    <div className='flex items-center space-x-2'>
                      <span className='font-medium'>Địa chỉ giao hàng</span>
                    </div>
                    <div className='mt-1 text-sm text-gray-600'>
                      {addr.shippingAddress}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Chọn phương thức thanh toán */}
        <div>
          <h3 className='mb-3 font-medium'>Chọn phương thức thanh toán</h3>
          <div className='space-y-2'>
            {paymentMethods.map(method => (
              <label
                key={method.id}
                className='flex cursor-pointer items-center space-x-3 rounded border p-3 hover:bg-gray-50'
              >
                <input
                  type='radio'
                  name='payment'
                  value={method.id}
                  checked={selectedPayment === method.id}
                  onChange={e => setSelectedPayment(e.target.value)}
                />
                <span>{method.label}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={handleCreateOrder}
          disabled={!selectedAddress || !selectedPayment}
          className='w-full rounded-lg bg-red-600 px-6 py-3 font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-300'
        >
          Đặt hàng
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
    <div className='container mx-auto px-4 py-8'>
      <h1 className='mb-8 text-2xl font-bold'>Giỏ hàng</h1>

      <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
        <div className='lg:col-span-2'>
          <CartBox />
        </div>

        <div className='lg:col-span-1'>
          {items.length > 0 && <OrderConfirmation />}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
