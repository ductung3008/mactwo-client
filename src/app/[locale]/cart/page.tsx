'use client';

import { addressApi } from '@/lib/api/address.api';
import { useCartStore } from '@/stores/cart.store';
import { Address } from '@/types/address';
import { useEffect, useState } from 'react';

const CartBox = () => {
  const { items, updateQuantity, removeItem, getTotalItems } = useCartStore();

  const totalPrice = items.reduce((sum, item) => {
    return sum + item.product.newPrice * item.quantity;
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
            key={item.variant}
            className='flex items-center space-x-4 rounded-lg border p-4'
          >
            <img
              src={item.product.imageUrl}
              alt={item.product.name}
              className='h-20 w-20 rounded object-cover'
            />
            <div className='flex-1'>
              <h3 className='font-medium'>{item.product.name}</h3>
              <div className='mt-2 flex items-center space-x-2'>
                <span className='font-semibold text-red-600'>
                  {item.product.newPrice.toLocaleString('vi-VN')}đ
                </span>
                {item.product.oldPrice > 0 && (
                  <span className='text-sm text-gray-400 line-through'>
                    {item.product.oldPrice.toLocaleString('vi-VN')}đ
                  </span>
                )}
                {item.product.promotionPercentage &&
                  item.product.promotionPercentage > 0 && (
                    <span className='rounded bg-red-100 px-2 py-1 text-xs text-red-600'>
                      -{item.product.promotionPercentage}%
                    </span>
                  )}
                {item.product.tag && (
                  <span className='rounded bg-blue-100 px-2 py-1 text-xs text-blue-600'>
                    {item.product.tag}
                  </span>
                )}
              </div>
            </div>

            <div className='flex items-center space-x-2'>
              <button
                onClick={() => updateQuantity(item.variant, item.quantity - 1)}
                className='flex h-8 w-8 items-center justify-center rounded border'
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <span className='w-12 text-center'>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.variant, item.quantity + 1)}
                className='flex h-8 w-8 items-center justify-center rounded border'
              >
                +
              </button>
            </div>

            <button
              onClick={() => removeItem(item.variant)}
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
  const { getOrderItems } = useCartStore();

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setLoading(true);
        const response = await addressApi.getAddresses();
        if (response.success) {
          setAddresses(response.data);
          // Tự động chọn địa chỉ default nếu có
          const defaultAddress = response.data.find(
            (addr: Address) => addr.isDefault
          );
          if (defaultAddress) {
            setSelectedAddress(defaultAddress.addressId);
          }
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

  const handleCreateOrder = () => {
    if (!selectedAddress || !selectedPayment) {
      alert('Vui lòng chọn địa chỉ giao hàng và phương thức thanh toán');
      return;
    }

    const orderData = {
      userId: '1', // Sẽ lấy từ auth store
      addressId: selectedAddress,
      promotionId: 0,
      orderItems: getOrderItems(),
      paymentMethod: selectedPayment,
    };

    console.log('Order data:', orderData);
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
                  key={addr.addressId}
                  className={`flex cursor-pointer items-start space-x-3 rounded border p-3 hover:bg-gray-50 ${
                    selectedAddress === addr.addressId
                      ? 'border-blue-500 bg-blue-50'
                      : ''
                  }`}
                >
                  <input
                    type='radio'
                    name='address'
                    value={addr.addressId}
                    checked={selectedAddress === addr.addressId}
                    onChange={e => setSelectedAddress(e.target.value)}
                    className='mt-1'
                  />
                  <div className='flex-1'>
                    <div className='flex items-center space-x-2'>
                      <span className='font-medium'>Địa chỉ giao hàng</span>
                      {addr.isDefault && (
                        <span className='rounded bg-green-100 px-2 py-1 text-xs text-green-600'>
                          Mặc định
                        </span>
                      )}
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
  const { items } = useCartStore();

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
