'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

const mainProduct = {
  name: 'iPhone 14 Plus 128GB',
  price: 17490000,
  oldPrice: 27990000,
  discount: 'Giảm 37%',
  image:
    'https://shopdunk.com/images/thumbs/0009514_iphone-14-plus-128gb_550.png',
};

const extraProducts = [
  {
    id: 1,
    name: 'iPhone 14 Plus Case with MagSafe',
    originalPrice: 1590000,
    comboPrice: 990000,
    image:
      'https://shopdunk.com/images/thumbs/0002535_iphone-14-plus-case-with-magsafe_240.jpeg',
  },
  {
    id: 2,
    name: 'Ốp lưng ZAGG trong suốt Magsafe for iPhone',
    originalPrice: 700000,
    comboPrice: 250000,
    image:
      'https://shopdunk.com/images/thumbs/0034341_op-lung-zagg-trong-suot-magsafe-for-iphone-14-plus_240.jpeg',
  },
  {
    id: 3,
    name: 'Cường lực Zeelot Apple iPhone Solidsleek',
    originalPrice: 390000,
    comboPrice: 190000,
    image:
      'https://shopdunk.com/images/thumbs/0016024_cuong-luc-zeelot-apple-iphone-soildsleek-trong-suot_240.jpeg',
  },
  {
    id: 4,
    name: 'Cường lực Zeelot Apple iPhone Solidsleek',
    originalPrice: 390000,
    comboPrice: 190000,
    image:
      'https://shopdunk.com/images/thumbs/0016024_cuong-luc-zeelot-apple-iphone-soildsleek-trong-suot_240.jpeg',
  },
  {
    id: 5,
    name: 'Cường lực Zeelot Apple iPhone Solidsleek',
    originalPrice: 390000,
    comboPrice: 190000,
    image:
      'https://shopdunk.com/images/thumbs/0016024_cuong-luc-zeelot-apple-iphone-soildsleek-trong-suot_240.jpeg',
  },
];

function formatVND(price: number) {
  return price.toLocaleString('vi-VN') + '₫';
}

export default function ProductCombo() {
  const [selectedIds, setSelectedIds] = useState<number[]>([]); // mặc định chưa chọn
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleProduct = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const selectedProducts = extraProducts.filter(p =>
    selectedIds.includes(p.id)
  );

  const totalPrice =
    mainProduct.price +
    selectedProducts.reduce((sum, p) => sum + p.comboPrice, 0);

  const totalSaved = selectedProducts.reduce(
    (sum, p) => sum + (p.originalPrice - p.comboPrice),
    0
  );

  const scrollByCard = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const card = container.querySelector('div'); // lấy card đầu tiên
      if (card) {
        const cardWidth = (card as HTMLElement).offsetWidth + 16; // cộng thêm gap-4 (16px)
        container.scrollBy({
          left: direction === 'right' ? cardWidth : -cardWidth,
          behavior: 'smooth',
        });
      }
    }
  };

  const scrollLeft = () => scrollByCard('left');
  const scrollRight = () => scrollByCard('right');

  return (
    <div className='p-4'>
      <div className='center flex gap-15'>
        {/* Sản phẩm chính */}
        <div className='w-[180px] text-center'>
          <Image
            src={mainProduct.image}
            alt={mainProduct.name}
            width={180}
            height={180}
            className='mx-auto rounded-lg'
          />
          <p className='mt-2 font-semibold'>{mainProduct.name}</p>
          <p className='text-black-600 font-bold'>
            {formatVND(mainProduct.price)}
          </p>
          <div className='flex items-center gap-2'>
            <p className='text-sm text-gray-400 line-through'>
              {formatVND(mainProduct.oldPrice)}
            </p>
            <p className='text-sm text-green-600'>{mainProduct.discount}</p>
          </div>
        </div>

        {/* Dấu cộng */}
        <div className='mt-20 text-2xl font-bold'>+</div>

        {/* Slider sản phẩm kèm */}
        <div className='relative max-w-[620px]'>
          {/* Nút điều hướng */}
          <button
            onClick={scrollLeft}
            className='absolute top-[50%] left-0 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow hover:bg-gray-100'
          >
            <i className='ri-arrow-left-s-line text-xl'></i>
          </button>
          <button
            onClick={scrollRight}
            className='absolute top-[50%] right-0 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow hover:bg-gray-100'
          >
            <i className='ri-arrow-right-s-line text-xl'></i>
          </button>

          <div
            ref={scrollRef}
            className='scrollbar-hide flex gap-4 overflow-x-auto px-8 whitespace-nowrap'
          >
            {extraProducts.map(product => {
              const isSelected = selectedIds.includes(product.id);
              return (
                <div
                  key={product.id}
                  className='relative inline-flex h-[300px] w-[180px] flex-col justify-between rounded-lg border border-[#e5e5e5] bg-white p-2 text-center shadow-sm'
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={160}
                    height={130} // <== giảm từ 180 xuống 130
                    className='mx-auto rounded object-contain'
                  />

                  <div className='flex flex-1 flex-col'>
                    <p className='mt-2 line-clamp-2 h-[36px] text-sm font-medium'>
                      {product.name}
                    </p>
                    <div className='mt-1 text-xs text-gray-400'>
                      Giá niêm yết: {formatVND(product.originalPrice)}
                    </div>
                    <p className='text-sm text-blue-600'>
                      Giá mua kèm: {formatVND(product.comboPrice)}
                    </p>

                    {/* Nút luôn ở đáy */}
                    <button
                      className={`mt-auto w-full rounded border py-1 text-sm font-medium ${
                        isSelected
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'border-blue-600 bg-white text-blue-600 hover:bg-blue-50'
                      }`}
                      onClick={() => toggleProduct(product.id)}
                    >
                      {isSelected ? 'Bỏ chọn sản phẩm' : 'Chọn sản phẩm'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tổng giá */}
        <div className='ml-4 flex min-w-[200px] flex-col items-center justify-center'>
          <div>
            <p className='text-xl font-bold text-black'>
              {formatVND(totalPrice)}
            </p>
            <p className='text-sm text-green-600'>
              Tiết kiệm: {formatVND(totalSaved)}
            </p>
          </div>
          <button className='mt-4 w-full max-w-[280px] rounded-xl bg-blue-600 p-4 font-semibold text-white hover:bg-blue-700'>
            Mua {selectedIds.length + 1} sản phẩm
          </button>
        </div>
      </div>
    </div>
  );
}
