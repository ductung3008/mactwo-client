'use client';

import ProductTabs from '@/components/ui/describe-detail';
import ProductCombo from '@/components/ui/product-accompanying';
import ProductImageGallery from '@/components/ui/product-image-gallery';
import { Product, productApi } from '@/lib/api/products.api';
import { ProductVariant, productVariantApi } from '@/lib/api/variants.api';
import { useCartStore } from '@/stores/cart.store';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export default function ProductDetailPage() {
  const [selectedColor, setSelectedColor] = useState('red');
  const [selectedStorage, setSelectedStorage] = useState('128GB');
  const [product, setProduct] = useState<Product | null>(null);

  // const [productVariant, setProductVariant] = useState<ProductVariant | null>(
  //   null
  // );
  const [productVariant, setProductVariants] = useState<ProductVariant[]>([]);

  const { addItem } = useCartStore();

  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const fetchData = useCallback(async () => {
    try {
      const product = await productApi.getProductById(id || '');

      const productVariants = await productVariantApi.getProductVariantById(
        id || ''
      );

      setProduct(product.data);
      // setProductVariant(productVariants.data[0]);
      setProductVariants(productVariants.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [id, fetchData]);
  console.log('ádasdasdasdasdasd', product);
  const colors = [
    { name: 'Đen', value: 'black', bg: 'bg-gray-900' },
    { name: 'Đỏ', value: 'red', bg: 'bg-red-500' },
    { name: 'Xanh Dương', value: 'blue', bg: 'bg-blue-400' },
    { name: 'Trắng', value: 'white', bg: 'bg-gray-100 border border-gray-300' },
    { name: 'Vàng', value: 'yellow', bg: 'bg-yellow-300' },
    { name: 'Hồng', value: 'pink', bg: 'bg-pink-300' },
    { name: 'Xanh lá', value: 'green', bg: 'bg-green-300' },
    { name: 'Xanh Mòng Két', value: 'green', bg: 'bg-green-300' },
    {
      name: 'Titan Trắng',
      value: 'white-titan',
      bg: 'bg-gray-100 border border-gray-300',
    },
    { name: 'Titan Đen', value: 'black-titan', bg: 'bg-gray-900' },
    { name: 'Titan Sa Mạc', value: 'desert-titan', bg: 'bg-[#BFA48F]' },
    { name: 'Titan Tự nhiên', value: 'natural-titan', bg: 'bg-[#C2BCB2]' },
    {
      name: 'Default',
      value: 'white',
      bg: 'bg-gray-100 border border-gray-300',
    },
  ];

  // const availableColors = colors.filter(
  //   c => c.name.toLowerCase() === productVariant?.color?.toLowerCase()
  // );

  // lấy ra danh sách màu từ productVariant (mảng)
  const variantColors = productVariant.map(v => v.color?.toLowerCase());

  // lọc trong danh sách colors những màu nào có trong variantColors
  const availableColors = colors.filter(c =>
    variantColors.includes(c.name.toLowerCase())
  );
  const productImages = [...(productVariant[0]?.imageUrls ?? [])];

  const locale = 'vi-VN';
  const currency = 'VND';

  const formattedOldPrice = productVariant[0]?.price?.toLocaleString(locale, {
    style: 'currency',
    currency,
  });
  const newPrices =
    (productVariant[0]?.price ?? 0) *
    ((100 - (productVariant[0]?.percentagePercent ?? 0)) / 100);
  const formattedNewPrice = newPrices.toLocaleString(locale, {
    style: 'currency',
    currency,
  });

  const handleAddToCart = () => {
    if (!product) {
      console.warn('Product không có');
      return;
    }

    const selectedVariant = productVariant.find(
      v =>
        v.color?.toLowerCase() === selectedColor.toLowerCase() &&
        v.storage === selectedStorage
    );
    console.log('selectedVariant', selectedVariant);

    if (!selectedVariant) {
      console.warn('Không tìm thấy variant phù hợp');
      return;
    }

    // Convert APIProduct thành Product type cho cart
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cartProduct: any = {
      id: parseInt(product.id), // Convert string to number
      categoryId: product.categoryId ?? 1,
      name: product.name,
      description: product.description ?? '',
      imageUrl: product.imageUrl,
      variants: [], // không cần cho cart item
    };

    const item = {
      product: cartProduct,
      variant: selectedVariant, //  chỉ 1 variant
    };

    addItem(item, 1);
    console.log('Đã thêm vào giỏ hàng:', item);
  };

  return (
    <div className='min-h-screen bg-white'>
      <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-12 lg:grid-cols-2'>
          {/* Product Images */}
          <ProductImageGallery
            images={productImages}
            productName={product?.name}
          />

          {/* Product Details */}
          <div className='space-y-8'>
            <div>
              <h1 className='mb-2 text-3xl font-bold text-gray-900'>
                {product?.name}
              </h1>
              <div className='mb-4 flex items-center space-x-4'>
                <div className='flex items-center'>
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className='ri-star-fill flex h-5 w-5 items-center justify-center text-yellow-400'
                    ></i>
                  ))}
                </div>
              </div>
              <div className='flex items-center gap-x-8'>
                <span className='text-2xl font-bold text-[#0066cc]'>
                  {formattedNewPrice}
                </span>
                <br />
                <span className='text-2xl text-gray-500 line-through'>
                  {formattedOldPrice}
                </span>
              </div>
              <p className='text-0.3xl text-gray-400'>(Đã bao gồm VAT)</p>
            </div>

            {/* Storage Selection */}
            <div>
              <h3 className='text-0.3xl mb-4 font-semibold text-gray-500'>
                Dung lượng
              </h3>
              <div className='flex flex-wrap gap-2'>
                {productVariant.map(variant => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedStorage(variant.storage)}
                    className={`cursor-pointer rounded-lg border-2 px-4 py-3 text-center whitespace-nowrap ${
                      selectedStorage === variant.storage
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {variant.storage}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className='text-0.3xl mb-4 font-semibold text-gray-500'>
                Màu sắc
              </h3>
              <div className='flex space-x-3'>
                {availableColors.map(color => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.name)}
                    className={`h-8 w-8 rounded-full ${color.bg} cursor-pointer border-2 ${
                      selectedColor === color.name
                        ? 'border-gray-800 shadow-lg'
                        : 'border-gray-300'
                    }`}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div className='rounded-lg border border-gray-200 p-4'>
              <h3 className='mb-2 flex items-center text-lg font-semibold text-gray-900'>
                <i className='ri-gift-line mr-2 text-xl'></i> Ưu đãi
              </h3>
              <div className='mb-2 rounded-lg border border-gray-200 bg-gray-100 p-2'>
                <p className='text-sm text-gray-500'>
                  ( Khuyến mãi dự kiến áp dụng{' '}
                  <b className='text-black'>đến 23h59 | 31/08/2025</b> )
                </p>
              </div>

              {/* Ưu đãi thanh toán */}
              <div className='mb-4'>
                <h4 className='mb-2 font-semibold text-red-600'>
                  I. Ưu đãi thanh toán
                </h4>
                <ul className='space-y-1 text-sm text-gray-800'>
                  <li className='flex'>
                    <i className='ri-check-line mt-0.5 mr-2 text-green-500'></i>
                    Giảm đến <b>200.000đ</b> khi thanh toán qua Kredivo
                  </li>
                  <li className='flex'>
                    <i className='ri-check-line mt-0.5 mr-2 text-green-500'></i>
                    Hỗ trợ trả góp 0% lãi suất{' '}
                    <a href='#' className='text-blue-600'>
                      (xem chi tiết)
                    </a>
                  </li>
                </ul>
              </div>

              {/* Ưu đãi mua kèm */}
              <div className='mb-4'>
                <h4 className='mb-2 font-semibold text-red-600'>
                  II. Ưu đãi mua kèm
                </h4>
                <ul className='space-y-1 text-sm text-gray-800'>
                  <li className='flex'>
                    <i className='ri-check-line mt-0.5 mr-2 text-green-500'></i>
                    <b>Ốp chính hãng Apple iPhone 14 series</b> đồng giá{' '}
                    <b>990.000đ</b>
                  </li>
                  <li className='flex'>
                    <i className='ri-check-line mt-0.5 mr-2 text-green-500'></i>
                    Mua combo phụ kiện chính hãng giảm đến <b>200.000đ</b>{' '}
                    <a href='#' className='text-blue-600'>
                      (xem chi tiết)
                    </a>
                  </li>
                  <li className='flex'>
                    <i className='ri-check-line mt-0.5 mr-2 text-green-500'></i>
                    <b>Tai nghe Sony giảm đến 1.000.000đ</b>{' '}
                    <a href='#' className='text-blue-600'>
                      (xem chi tiết)
                    </a>
                  </li>
                  <li className='flex'>
                    <i className='ri-check-line mt-0.5 mr-2 text-green-500'></i>
                    Giảm đến <b>20%</b> khi mua các gói bảo hành{' '}
                    <a href='#' className='text-blue-600'>
                      (xem chi tiết)
                    </a>
                  </li>
                </ul>
              </div>

              {/* Ưu đãi khác */}
              <div>
                <h4 className='mb-2 font-semibold text-red-600'>
                  III. Ưu đãi khác
                </h4>
                <ul className='space-y-1 text-sm text-gray-800'>
                  <li className='flex'>
                    <i className='ri-check-line mt-0.5 mr-2 text-green-500'></i>
                    Thu cũ lên đời iPhone - trợ giá lên đến <b>
                      1.000.000đ
                    </b>{' '}
                    <a href='#' className='text-blue-600'>
                      (xem chi tiết)
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='space-y-4'>
              <button className='w-full cursor-pointer rounded-lg bg-blue-600 px-6 py-4 font-semibold whitespace-nowrap text-white transition-colors hover:bg-blue-700'>
                Mua ngay
              </button>
              <button
                onClick={() => handleAddToCart()}
                className='w-full cursor-pointer rounded-lg border-2 border-blue-600 px-6 py-4 font-semibold whitespace-nowrap text-blue-600 transition-colors hover:bg-blue-50'
              >
                Thêm vào giỏ hàng
              </button>
            </div>

            {/* Additional Info */}
            <div className='rounded-lg border border-gray-200 p-4'>
              <ul className='space-y-2 text-sm text-gray-800'>
                <li className='flex items-start'>
                  <i className='ri-check-fill mt-1 mr-2 text-blue-600'></i>
                  Bộ sản phẩm gồm: Hộp, Sách hướng dẫn, Cây lấy sim, Cáp
                  Lightning - Type C
                </li>
                <li className='flex items-start'>
                  <i className='ri-check-fill mt-1 mr-2 text-blue-600'></i>
                  Bảo hành chính hãng 1 năm{' '}
                  <a href='#' className='text-blue-600'>
                    (chi tiết)
                  </a>
                </li>
                <li className='flex items-start'>
                  <i className='ri-check-fill mt-1 mr-2 text-blue-600'></i>
                  Giao hàng nhanh toàn quốc{' '}
                  <a href='#' className='text-blue-600'>
                    (chi tiết)
                  </a>
                </li>
                <li className='flex items-start'>
                  <i className='ri-check-fill mt-1 mr-2 text-blue-600'></i>
                  Hoàn thuế cho người nước ngoài{' '}
                  <a href='#' className='text-blue-600'>
                    (chi tiết)
                  </a>
                </li>
                <li className='flex items-start'>
                  <i className='ri-check-fill mt-1 mr-2 text-blue-600'></i>
                  Gọi đặt mua{' '}
                  <span className='font-semibold text-blue-700'>
                    1900.6626
                  </span>{' '}
                  (8:00 - 22:00)
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className='mt-16 border-t border-gray-200'>
          <h2 className='mt-8 mb-8 text-2xl font-bold text-gray-900'>
            Sản phẩm tương tự
          </h2>
          <ProductCombo categoryId={product?.categoryId} />
        </div>

        {/* Product Description */}
        <ProductTabs product={product} />
      </div>
    </div>
  );
}
