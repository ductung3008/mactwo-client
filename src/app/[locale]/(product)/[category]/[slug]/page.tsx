'use client';

import ProductTabs from '@/components/ui/describe-detail';
import ProductCombo from '@/components/ui/product-accompanying';
import { Product as APIProduct, productApi } from '@/lib/api/products.api';
import { ProductVariant, productVariantApi } from '@/lib/api/variants.api';
import { useCartStore } from '@/stores/cart.store';
import { Product } from '@/types/product';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function ProductDetailPage() {
  const [selectedColor, setSelectedColor] = useState('red');
  const [selectedStorage, setSelectedStorage] = useState('128GB');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [product, setProduct] = useState<APIProduct | null>(null);
  const [productVariant, setProductVariant] = useState<ProductVariant | null>(
    null
  );

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
      setProductVariant(productVariants.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id, fetchData]);

  const colors = [
    { name: 'Đen', value: 'black', bg: 'bg-gray-900' },
    { name: 'Đỏ', value: 'red', bg: 'bg-red-500' },
    { name: 'Xanh Dương', value: 'blue', bg: 'bg-blue-400' },
    { name: 'Trắng', value: 'white', bg: 'bg-gray-100 border border-gray-300' },
    { name: 'Vàng', value: 'yellow', bg: 'bg-yellow-300' },
    { name: 'Hồng', value: 'pink', bg: 'bg-pink-300' },
    { name: 'Xanh lá', value: 'green', bg: 'bg-green-300' },
    {
      name: 'Titan Trắng',
      value: 'white-titan',
      bg: 'bg-gray-100 border border-gray-300',
    },
    { name: 'Titan Đen', value: 'black-titan', bg: 'bg-gray-900' },
    { name: 'Titan Sa Mạc', value: 'desert-titan', bg: 'bg-[#BFA48F]' },
    { name: 'Titan Tự nhiên', value: 'natural-titan', bg: 'bg-[#C2BCB2]' },
  ];

  // const availableColors = colors.filter(c =>
  //   productVariant?.color?.some(
  //     colorName => colorName.toLowerCase() === c.name.toLowerCase()
  //   )
  // );

  const availableColors = colors.filter(
    c => c.name.toLowerCase() === productVariant?.color?.toLowerCase()
  );

  // const storageOptions = ['64GB', '128GB', '256GB', '512GB'];

  const productImages = [...(productVariant?.imageUrls ?? [])];

  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -140, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 140, behavior: 'smooth' });
    }
  };
  const locale = 'vi-VN';
  const currency = 'VND';

  const formattedOldPrice = productVariant?.price?.toLocaleString(locale, {
    style: 'currency',
    currency,
  });
  const newPrices =
    (productVariant?.price ?? 0) *
    ((100 - (productVariant?.stockQuantity ?? 0)) / 100);
  const formattedNewPrice = newPrices.toLocaleString(locale, {
    style: 'currency',
    currency,
  });

  const handleAddToCart = () => {
    if (!product || !productVariant) {
      console.warn('Product hoặc productVariant không có');
      return;
    }

    // Convert APIProduct thành Product type cho cart
    const cartProduct: Product = {
      id: parseInt(product.id), // Convert string to number
      categoryId: 1, // Sẽ cần lấy từ API hoặc context
      name: product.name,
      description: '', // Sẽ cần thêm vào APIProduct hoặc lấy từ nguồn khác
      imageUrl: product.imageUrl,
      variants: [], // Không cần thiết cho cart item
    };

    const item = {
      product: cartProduct,
      variant: productVariant,
    };

    // Thêm vào cart store - quantity mặc định là 1
    addItem(item, 1);
    console.log('Đã thêm vào giỏ hàng:', item);
  };

  return (
    <div className='min-h-screen bg-white'>
      <div className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-12 lg:grid-cols-2'>
          {/* Product Images */}
          <div className='space-y-4'>
            <div className='aspect-[4/5] overflow-hidden rounded-2xl bg-gray-50'>
              <Image
                src={productImages[currentImageIndex]}
                alt='iPhone 14 Plus'
                className='h-full w-full object-cover object-top'
                width={200}
                height={300}
              />
            </div>
            <div className='relative flex items-center'>
              {/* Nút trái */}
              <button
                onClick={scrollLeft}
                className='absolute left-0 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow hover:bg-gray-100'
              >
                <i className='ri-arrow-left-s-line text-xl'></i>
              </button>

              {/* Thumbnails slider */}
              <div
                ref={scrollRef}
                className='scrollbar-hide flex max-w-[840px] space-x-3 overflow-x-auto px-10'
              >
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-20 w-20 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg border-2 ${
                      currentImageIndex === index
                        ? 'border-blue-500'
                        : 'border-gray-200'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`View ${index + 1}`}
                      className='h-full w-full object-cover object-top'
                      width={300}
                      height={400}
                    />
                  </button>
                ))}
              </div>

              {/* Nút phải */}
              <button
                onClick={scrollRight}
                className='absolute right-0 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow hover:bg-gray-100'
              >
                <i className='ri-arrow-right-s-line text-xl'></i>
              </button>
            </div>
          </div>

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
                {/* {storageOptions.map(storage => ( */}
                <button
                  key={productVariant?.storage}
                  onClick={() =>
                    setSelectedStorage(productVariant?.storage ?? '')
                  }
                  className={`cursor-pointer rounded-lg border-2 px-4 py-3 text-center whitespace-nowrap ${
                    selectedStorage === productVariant?.storage
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  {productVariant?.storage}
                </button>
                {/* ))} */}
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
                    onClick={() => setSelectedColor(color.value)}
                    className={`h-8 w-8 rounded-full ${color.bg} cursor-pointer border-2 ${
                      selectedColor === color.value
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
            Mua kèm giá sốc
          </h2>
          <ProductCombo />
          {/* <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
            {[
              {
                name: 'iPhone 14 Pro',
                price: '$999',
                image:
                  'https://readdy.ai/api/search-image?query=iPhone%2014%20Pro%20black%20color%20front%20view%20clean%20white%20background%20professional%20product%20photography%20premium%20design&width=300&height=300&seq=iphone-pro-1&orientation=squarish',
              },
              {
                name: 'iPhone 13',
                price: '$699',
                image:
                  'https://readdy.ai/api/search-image?query=iPhone%2013%20blue%20color%20front%20view%20clean%20white%20background%20professional%20product%20photography%20elegant%20design&width=300&height=300&seq=iphone-13-1&orientation=squarish',
              },
              {
                name: 'iPhone SE',
                price: '$429',
                image:
                  'https://readdy.ai/api/search-image?query=iPhone%20SE%20white%20color%20front%20view%20clean%20white%20background%20professional%20product%20photography%20compact%20design&width=300&height=300&seq=iphone-se-1&orientation=squarish',
              },
              {
                name: 'AirPods Pro',
                price: '$249',
                image:
                  'https://readdy.ai/api/search-image?query=AirPods%20Pro%20white%20wireless%20earbuds%20with%20charging%20case%20clean%20white%20background%20professional%20product%20photography&width=300&height=300&seq=airpods-1&orientation=squarish',
              },
            ].map((product, index) => (
              <div
                key={index}
                className='cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-lg'
              >
                <div className='aspect-square bg-gray-50'>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={300}
                    className='h-full w-full object-cover object-top'
                  />
                </div>
                <div className='p-4'>
                  <h3 className='mb-2 font-semibold text-gray-900'>
                    {product.name}
                  </h3>
                  <p className='text-lg font-bold text-red-600'>
                    {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div> */}
        </div>

        {/* Product Description */}
        <ProductTabs />
      </div>
    </div>
  );
}
