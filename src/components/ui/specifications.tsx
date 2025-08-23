import { Product } from '@/lib/api/products.api';

interface Specifications {
  product: Product | null;
}

export default function Specifications({ product }: Specifications) {
  const specs = [
    { label: 'Chip', value: product?.chip },
    { label: 'RAM', value: product?.ram },
    { label: 'Dung lượng', value: product?.storage },
    { label: 'Màn hình', value: product?.screen },
    { label: 'Độ phân giải màn hình', value: product?.resolution },
    { label: 'Camera sau', value: product?.rearCamera },
    { label: 'Camera trước', value: product?.frontCamera },
    { label: 'Pin và nguồn điện', value: product?.battery },
    { label: 'Sạc', value: product?.charging },
    { label: 'Kết nối mạng', value: product?.network },
    { label: 'Bảo mật', value: product?.security },
    { label: 'Chống nước - Chống bụi', value: product?.waterResistance },
  ];

  const filteredSpecs = specs.filter(
    spec => spec.value && spec.value.trim() !== ''
  );

  if (filteredSpecs.length === 0) {
    return (
      <div className='py-8 text-center text-gray-500'>
        Thông số kỹ thuật không có sẵn
      </div>
    );
  }

  return (
    <div className='mx-auto max-w-6xl space-y-12 p-6'>
      <div className='space-y-2 text-center'>
        <h2 className='mb-2 text-3xl font-bold text-gray-900'>
          Thông số kỹ thuật
        </h2>
        <div className='mx-auto h-1 w-24 rounded-full bg-blue-600'></div>
      </div>

      <div className='overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm'>
        <div className='divide-y divide-gray-100'>
          {filteredSpecs.map((item, index) => (
            <div
              key={index}
              className='flex flex-col px-6 py-4 transition-colors duration-150 hover:bg-gray-50/50 nth-[2n]:bg-gray-100 sm:flex-row'
            >
              <div className='mb-2 sm:mb-0 sm:w-1/3'>
                <span className='text-sm leading-relaxed font-medium text-gray-600'>
                  {item.label}
                </span>
              </div>
              <div className='sm:w-2/3 sm:pl-4'>
                <span className='text-sm leading-relaxed text-gray-900'>
                  {item.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
