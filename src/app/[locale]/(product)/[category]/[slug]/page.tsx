'use client';

import { useToastNotification } from '@/components/ui';
import ProductTabs from '@/components/ui/describe-detail';
import ProductCombo from '@/components/ui/product-accompanying';
import ProductImageGallery from '@/components/ui/product-image-gallery';
import { Product, productApi } from '@/lib/api/products.api';
import { ProductVariant, productVariantApi } from '@/lib/api/variants.api';
import { useCartStore } from '@/stores/cart.store';
import { notFound, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

export default function ProductDetailPage() {
  const toast = useToastNotification();
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedStorage, setSelectedStorage] = useState('');
  const [product, setProduct] = useState<Product | null>(null);

  const [productVariant, setProductVariants] = useState<ProductVariant[]>([]);

  const { addItem } = useCartStore();

  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  if (!id) {
    notFound();
  }

  const fetchData = useCallback(async () => {
    try {
      const product = await productApi.getProductById(id);
      const productVariants = await productVariantApi.getProductVariantById(id);

      setProduct(product.data);
      setProductVariants(productVariants.data);

      if (productVariants.data && productVariants.data.length > 0) {
        const firstVariantWithStorage = productVariants.data.find(
          v => v.storage !== null && v.storage !== undefined
        );
        if (firstVariantWithStorage) {
          setSelectedStorage(firstVariantWithStorage.storage);
        }

        if (productVariants.data[0]?.color) {
          setSelectedColor(productVariants.data[0].color);
        }
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [id, fetchData]);

  const colors = [
    { name: 'Đen', value: 'black', bg: 'bg-gray-900' },
    { name: 'Đỏ', value: 'red', bg: 'bg-red-500' },
    { name: 'Xanh Dương', value: 'blue', bg: 'bg-blue-400' },
    { name: 'Trắng', value: 'white', bg: 'bg-gray-100 border border-gray-300' },
    { name: 'Vàng', value: 'yellow', bg: 'bg-yellow-300' },
    { name: 'Hồng', value: 'pink', bg: 'bg-pink-300' },
    { name: 'Xanh lá', value: 'green', bg: 'bg-green-300' },
    { name: 'Xanh Mòng Két', value: 'green-duck', bg: 'bg-teal-400' },
    {
      name: 'Titan Trắng',
      value: 'white-titan',
      bg: 'bg-gray-100 border border-gray-300',
    },
    { name: 'Titan Đen', value: 'black-titan', bg: 'bg-gray-900' },
    { name: 'Titan Sa Mạc', value: 'desert-titan', bg: 'bg-[#BFA48F]' },
    { name: 'Titan Tự nhiên', value: 'natural-titan', bg: 'bg-[#C2BCB2]' },
    { name: 'Bạc', value: 'silver', bg: 'bg-gray-300' },
    { name: 'Xám', value: 'gray', bg: 'bg-gray-500' },
    { name: 'Cool Grey', value: 'cool-gray', bg: 'bg-gray-400' },
    { name: 'Star Grey', value: 'star-gray', bg: 'bg-[#A9A9A9]' },
    { name: 'Thép Không Gỉ', value: 'stainless-steel', bg: 'bg-slate-400' },
    { name: 'Màu Gỗ Sồi', value: 'oak-wood', bg: 'bg-[#C3A572]' },
    { name: 'Tím', value: 'purple', bg: 'bg-purple-400' },
    { name: 'Cam Sa Mạc', value: 'desert-orange', bg: 'bg-orange-400' },
    { name: 'Starlight (Ánh Sao)', value: 'starlight', bg: 'bg-[#EAE0C8]' },
    { name: 'Nâu', value: 'brown', bg: 'bg-amber-900' },
    {
      name: 'Default',
      value: 'default',
      bg: 'bg-gray-100 border border-gray-300',
    },
  ];

  const variantColors = productVariant.map(v => v.color?.toLowerCase());

  const availableColors = colors.filter(c =>
    variantColors.includes(c.name.toLowerCase())
  );

  const variantsWithStorage = productVariant.filter(
    variant => variant.storage !== null && variant.storage !== undefined
  );

  const uniqueStorages = [...new Set(variantsWithStorage.map(v => v.storage))];

  const currentVariant = useMemo(() => {
    return (
      productVariant.find(
        v =>
          v.color?.toLowerCase() === selectedColor.toLowerCase() &&
          (variantsWithStorage.length > 0
            ? v.storage === selectedStorage
            : true)
      ) || productVariant[0]
    );
  }, [
    productVariant,
    selectedColor,
    selectedStorage,
    variantsWithStorage.length,
  ]);

  const productImages = useMemo(() => {
    return [
      ...(currentVariant?.imageUrls ?? productVariant[0]?.imageUrls ?? []),
    ];
  }, [currentVariant, productVariant]);

  const locale = 'vi-VN';
  const currency = 'VND';

  const formattedOldPrice = currentVariant?.price?.toLocaleString(locale, {
    style: 'currency',
    currency,
  });

  const newPrices =
    (currentVariant?.price ?? 0) *
    ((100 - (currentVariant?.percentagePercent ?? 0)) / 100);

  const formattedNewPrice = newPrices.toLocaleString(locale, {
    style: 'currency',
    currency,
  });

  const handleColorChange = (colorName: string) => {
    setSelectedColor(colorName);

    const colorVariants = productVariant.filter(
      v => v.color?.toLowerCase() === colorName.toLowerCase()
    );

    if (colorVariants.length > 0) {
      const availableStoragesForColor = colorVariants
        .filter(v => v.storage !== null && v.storage !== undefined)
        .map(v => v.storage);

      if (
        availableStoragesForColor.length > 0 &&
        !availableStoragesForColor.includes(selectedStorage)
      ) {
        setSelectedStorage(availableStoragesForColor[0]);
      }
    }
  };

  const handleStorageChange = (storage: string) => {
    setSelectedStorage(storage);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    window.location.href = '/cart';
  };

  const handleAddToCart = () => {
    if (!product) {
      toast.error('Lỗi', 'Sản phẩm không tồn tại.');
      return;
    }

    const selectedVariant = currentVariant;

    if (!selectedVariant) {
      toast.error('Lỗi', 'Vui lòng chọn phiên bản sản phẩm.');
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cartProduct: any = {
      id: parseInt(product.id),
      categoryId: product.categoryId ?? 1,
      name: product.name,
      description: product.description ?? '',
      imageUrl: product.imageUrl,
      variants: [],
    };

    const item = {
      product: cartProduct,
      variant: selectedVariant,
    };

    addItem(item, 1);
    toast.success('Thành công', 'Đã thêm sản phẩm vào giỏ hàng.');
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100'>
      <div className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-16 lg:grid-cols-2'>
          <div className='relative'>
            <ProductImageGallery
              images={productImages}
              productName={product?.name}
            />

            <div className='mt-4 rounded-2xl border border-slate-200/60 bg-slate-50 p-8 shadow-sm'>
              <h3 className='mb-6 flex items-center text-lg font-bold text-slate-800'>
                <i className='ri-information-line mr-3 text-blue-600'></i>
                Thông tin bổ sung
              </h3>
              <ul className='space-y-4 text-sm text-slate-700'>
                <li className='flex items-center rounded-lg bg-white p-3 shadow-sm'>
                  <i className='ri-check-fill mt-1 mr-3 text-blue-600'></i>
                  <span>
                    Bộ sản phẩm gồm: Hộp, Sách hướng dẫn, Cây lấy sim, Cáp
                    Lightning - Type C
                  </span>
                </li>
                <li className='flex items-center rounded-lg bg-white p-3 shadow-sm'>
                  <i className='ri-check-fill mt-1 mr-3 text-blue-600'></i>
                  <span>
                    Bảo hành chính hãng 1 năm{' '}
                    <a
                      href='#'
                      className='font-medium text-blue-600 hover:underline'
                    >
                      (chi tiết)
                    </a>
                  </span>
                </li>
                <li className='flex items-center rounded-lg bg-white p-3 shadow-sm'>
                  <i className='ri-check-fill mt-1 mr-3 text-blue-600'></i>
                  <span>
                    Giao hàng nhanh toàn quốc{' '}
                    <a
                      href='#'
                      className='font-medium text-blue-600 hover:underline'
                    >
                      (chi tiết)
                    </a>
                  </span>
                </li>
                <li className='flex items-center rounded-lg bg-white p-3 shadow-sm'>
                  <i className='ri-check-fill mt-1 mr-3 text-blue-600'></i>
                  <span>
                    Hoàn thuế cho người nước ngoài{' '}
                    <a
                      href='#'
                      className='font-medium text-blue-600 hover:underline'
                    >
                      (chi tiết)
                    </a>
                  </span>
                </li>
                <li className='flex items-center rounded-lg bg-white p-3 shadow-sm'>
                  <i className='ri-check-fill mt-1 mr-3 text-blue-600'></i>
                  <span>
                    Gọi đặt mua{' '}
                    <span className='text-lg font-bold text-blue-700'>
                      1900.6626
                    </span>{' '}
                    (8:00 - 22:00)
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className='space-y-10'>
            <div className='rounded-2xl border border-slate-200/60 bg-white p-8 shadow-sm'>
              <h1 className='mb-2 text-4xl leading-tight font-bold text-slate-800'>
                {product?.name}
              </h1>
              <div className='mb-2 flex items-center space-x-4'>
                <div className='flex items-center space-x-1'>
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className='ri-star-fill text-lg text-amber-400'
                    ></i>
                  ))}
                </div>
              </div>
              <div className='space-y-2'>
                <div className='flex items-center gap-x-6'>
                  <span className='text-3xl font-bold text-emerald-600'>
                    {formattedNewPrice}
                  </span>
                  {currentVariant?.percentagePercent &&
                    currentVariant.percentagePercent > 0 && (
                      <span className='text-xl text-slate-400 line-through'>
                        {formattedOldPrice}
                      </span>
                    )}
                </div>
                <p className='text-sm text-slate-500'>(Đã bao gồm VAT)</p>
                {currentVariant?.percentagePercent &&
                  currentVariant.percentagePercent > 0 && (
                    <p className='text-sm font-medium text-red-600'>
                      Tiết kiệm {currentVariant.percentagePercent}%
                    </p>
                  )}
              </div>

              {uniqueStorages.length > 0 && (
                <div className='mt-4 mb-2'>
                  <h3 className='mb-2 text-lg font-semibold text-slate-800'>
                    Dung lượng
                  </h3>
                  <div className='flex flex-wrap gap-3'>
                    {uniqueStorages.map(storage => {
                      const isAvailable = productVariant.some(
                        v =>
                          v.storage === storage &&
                          v.color?.toLowerCase() === selectedColor.toLowerCase()
                      );

                      return (
                        <button
                          key={storage}
                          onClick={() => handleStorageChange(storage)}
                          disabled={!isAvailable}
                          className={`cursor-pointer rounded-xl border-2 px-4 py-2 text-center font-medium whitespace-nowrap transition-all duration-200 ${
                            selectedStorage === storage
                              ? 'scale-105 border-blue-500 bg-blue-50 text-blue-700 shadow-md'
                              : isAvailable
                                ? 'border-slate-300 text-slate-700 hover:border-slate-400 hover:shadow-sm'
                                : 'cursor-not-allowed border-slate-200 text-slate-400'
                          }`}
                        >
                          {storage}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {variantColors.filter(c => !!c).length > 0 && (
                <div className='mt-4 mb-2'>
                  <h3 className='mb-2 text-lg font-semibold text-slate-800'>
                    Màu sắc
                  </h3>
                  <div className='flex flex-wrap gap-4'>
                    {availableColors.map(color => (
                      <button
                        key={color.value}
                        onClick={() => handleColorChange(color.name)}
                        className={`h-12 w-12 rounded-full ${color.bg} cursor-pointer border-3 transition-all duration-200 hover:scale-110 ${
                          selectedColor === color.name
                            ? 'scale-110 border-slate-800 shadow-lg'
                            : 'border-slate-300 shadow-sm'
                        }`}
                        title={color.name}
                      />
                    ))}
                  </div>
                  <p className='mt-2 text-sm text-slate-600'>
                    Đã chọn:{' '}
                    <span className='font-medium'>{selectedColor}</span>
                    {selectedStorage && <>, {selectedStorage}</>}
                  </p>
                </div>
              )}
            </div>

            <div className='overflow-hidden rounded-2xl border border-red-200/60 bg-gradient-to-r from-red-50 to-orange-50 shadow-sm'>
              <div className='bg-gradient-to-r from-red-600 to-orange-500 p-4'>
                <h3 className='flex items-center text-xl font-bold text-white'>
                  <i className='ri-gift-line mr-3 text-2xl'></i>
                  Ưu đãi đặc biệt
                </h3>
              </div>

              <div className='p-8'>
                <div className='mb-6 rounded-xl border border-amber-300 bg-gradient-to-r from-amber-50 to-yellow-50 p-4'>
                  <p className='text-sm font-medium text-amber-800'>
                    <i className='ri-time-line mr-2'></i>
                    Khuyến mãi dự kiến áp dụng{' '}
                    <b className='text-red-600'>đến 23h59 | 31/08/2025</b>
                  </p>
                </div>

                <div className='mb-8'>
                  <h4 className='mb-4 flex items-center text-lg font-bold text-red-700'>
                    <i className='ri-bank-card-line mr-2'></i>
                    I. Ưu đãi thanh toán
                  </h4>
                  <ul className='space-y-3 text-sm text-slate-700'>
                    <li className='flex items-center rounded-lg bg-white p-3 shadow-sm'>
                      <i className='ri-check-line mt-0.5 mr-3 text-lg text-emerald-500'></i>
                      <p>
                        Giảm đến{' '}
                        <span className='font-bold text-red-600'>200.000đ</span>{' '}
                        khi thanh toán qua Kredivo
                      </p>
                    </li>
                    <li className='flex items-center rounded-lg bg-white p-3 shadow-sm'>
                      <i className='ri-check-line mt-0.5 mr-3 text-lg text-emerald-500'></i>
                      <div>
                        Hỗ trợ trả góp 0% lãi suất
                        <a
                          href='#'
                          className='ml-2 font-medium text-blue-600 hover:underline'
                        >
                          (xem chi tiết)
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className='mb-8'>
                  <h4 className='mb-4 flex items-center text-lg font-bold text-red-700'>
                    <i className='ri-shopping-bag-line mr-2'></i>
                    II. Ưu đãi mua kèm
                  </h4>
                  <ul className='space-y-3 text-sm text-slate-700'>
                    <li className='flex items-center rounded-lg bg-white p-3 shadow-sm'>
                      <i className='ri-check-line mt-0.5 mr-3 text-lg text-emerald-500'></i>
                      <span className='flex flex-wrap gap-1'>
                        <b>Ốp chính hãng Apple iPhone 14 series</b> đồng giá
                        <b className='text-red-600'>990.000đ</b>
                      </span>
                    </li>
                    <li className='flex items-center rounded-lg bg-white p-3 shadow-sm'>
                      <i className='ri-check-line mt-0.5 mr-3 text-lg text-emerald-500'></i>
                      <div className='flex flex-wrap gap-1'>
                        Mua combo phụ kiện chính hãng giảm đến{' '}
                        <b className='text-red-600'>200.000đ</b>
                        <a
                          href='#'
                          className='font-medium text-blue-600 hover:underline'
                        >
                          (xem chi tiết)
                        </a>
                      </div>
                    </li>
                    <li className='flex items-center rounded-lg bg-white p-3 shadow-sm'>
                      <i className='ri-check-line mt-0.5 mr-3 text-lg text-emerald-500'></i>
                      <div className='flex flex-wrap gap-1'>
                        <b>Tai nghe Sony giảm đến 1.000.000đ</b>
                        <a
                          href='#'
                          className='font-medium text-blue-600 hover:underline'
                        >
                          (xem chi tiết)
                        </a>
                      </div>
                    </li>
                    <li className='flex items-center rounded-lg bg-white p-3 shadow-sm'>
                      <i className='ri-check-line mt-0.5 mr-3 text-lg text-emerald-500'></i>
                      <div className='flex flex-wrap gap-1'>
                        Giảm đến <b className='text-red-600'>20%</b> khi mua các
                        gói bảo hành{' '}
                        <a
                          href='#'
                          className='font-medium text-blue-600 hover:underline'
                        >
                          (xem chi tiết)
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className='mb-4 flex items-center text-lg font-bold text-red-700'>
                    <i className='ri-star-line mr-2'></i>
                    III. Ưu đãi khác
                  </h4>
                  <ul className='space-y-3 text-sm text-slate-700'>
                    <li className='flex items-center rounded-lg bg-white p-3 shadow-sm'>
                      <i className='ri-check-line mt-0.5 mr-3 text-lg text-emerald-500'></i>
                      <div className='flex flex-wrap gap-1'>
                        Thu cũ lên đời iPhone - trợ giá lên đến{' '}
                        <b className='text-red-600'>1.000.000đ</b>
                        <a
                          href='#'
                          className='font-medium text-blue-600 hover:underline'
                        >
                          (xem chi tiết)
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className='space-y-4'>
              <button
                onClick={() => handleBuyNow()}
                className='w-full cursor-pointer rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-5 text-lg font-bold whitespace-nowrap text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl'
              >
                <i className='ri-shopping-cart-line mr-2'></i>
                Mua ngay
              </button>
              <button
                onClick={() => handleAddToCart()}
                className='w-full cursor-pointer rounded-2xl border-2 border-blue-600 bg-white px-8 py-5 text-lg font-bold whitespace-nowrap text-blue-600 transition-all duration-200 hover:scale-105 hover:bg-blue-50 hover:shadow-lg'
              >
                <i className='ri-add-line mr-2'></i>
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>

        <div className='mt-10 border-t border-slate-200 pt-8'>
          <h2 className='mb-4 text-center text-3xl font-bold text-slate-800'>
            Sản phẩm tương tự
          </h2>
          <ProductCombo categoryId={product?.categoryId} />
        </div>

        <ProductTabs product={product} />
      </div>
    </div>
  );
}
