'use client';

import ProductTabs from '@/components/ui/describe-detail';
import ProductCombo from '@/components/ui/product-accompanying';
import Image from 'next/image';
import { useRef, useState } from 'react';

export default function ProductDetailPage() {
  const [selectedColor, setSelectedColor] = useState('red');
  const [selectedStorage, setSelectedStorage] = useState('128GB');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const colors = [
    { name: 'Black', value: 'black', bg: 'bg-gray-900' },
    { name: 'Red', value: 'red', bg: 'bg-red-500' },
    { name: 'Blue', value: 'blue', bg: 'bg-blue-500' },
    { name: 'White', value: 'white', bg: 'bg-gray-100 border border-gray-300' },
    { name: 'Yellow', value: 'yellow', bg: 'bg-yellow-400' },
  ];

  const storageOptions = ['64GB', '128GB', '256GB', '512GB'];

  const productImages = [
    'https://shopdunk.com/images/thumbs/0009514_iphone-14-plus-128gb_550.png',
    'https://shopdunk.com/images/thumbs/0009515_iphone-14-plus-128gb_550.webp',
    'https://shopdunk.com/images/thumbs/0009516_iphone-14-plus-128gb_550.webp',
    'https://shopdunk.com/images/thumbs/0009517_iphone-14-plus-128gb_550.webp',
    'https://shopdunk.com/images/thumbs/0009518_iphone-14-plus-128gb_550.webp',
    'https://shopdunk.com/images/thumbs/0009519_iphone-14-plus-128gb_550.webp',
    'https://shopdunk.com/images/thumbs/0009520_iphone-14-plus-128gb_550.webp',
    'https://shopdunk.com/images/thumbs/0009521_iphone-14-plus-128gb_550.webp',
    'https://shopdunk.com/images/thumbs/0009522_iphone-14-plus-128gb_550.webp',
  ];

  const thumbnailImages = [
    'https://shopdunk.com/images/thumbs/0009514_iphone-14-plus-128gb_550.png',
    'https://shopdunk.com/images/thumbs/0009515_iphone-14-plus-128gb_550.webp',
    'https://shopdunk.com/images/thumbs/0009516_iphone-14-plus-128gb_550.webp',
    'https://shopdunk.com/images/thumbs/0009517_iphone-14-plus-128gb_550.webp',
    'https://shopdunk.com/images/thumbs/0009518_iphone-14-plus-128gb_550.webp',
    'https://shopdunk.com/images/thumbs/0009519_iphone-14-plus-128gb_550.webp',
    'https://shopdunk.com/images/thumbs/0009520_iphone-14-plus-128gb_550.webp',
    'https://shopdunk.com/images/thumbs/0009521_iphone-14-plus-128gb_550.webp',
    'https://shopdunk.com/images/thumbs/0009522_iphone-14-plus-128gb_550.webp',
  ];

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
                {thumbnailImages.map((image, index) => (
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
                iPhone 14 Plus
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
                  17.490.000 ₫
                </span>
                <br />
                <span className='text-2xl text-gray-500 line-through'>
                  27.990.000 ₫
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
                {storageOptions.map(storage => (
                  <button
                    key={storage}
                    onClick={() => setSelectedStorage(storage)}
                    className={`cursor-pointer rounded-lg border-2 px-4 py-3 text-center whitespace-nowrap ${
                      selectedStorage === storage
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {storage}
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
                {colors.map(color => (
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
              <button className='w-full cursor-pointer rounded-lg border-2 border-blue-600 px-6 py-4 font-semibold whitespace-nowrap text-blue-600 transition-colors hover:bg-blue-50'>
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
