import { Product } from '@/lib/api/products.api';

interface Specifications {
  product: Product | null;
}
export default function Specifications({ product }: Specifications) {
  const specs = [
    { label: 'Dung lượng', value: product?.storage },
    { label: 'Màn hình', value: product?.screen },
    { label: 'Độ phân giải màn hình', value: product?.resolution },
    { label: 'Camera sau', value: product?.rearCamera },
    { label: 'Camera trước', value: product?.frontCamera },
    { label: 'Pin và nguồn điện', value: product?.battery },
    { label: 'Sạc', value: product?.charging },
    { label: 'Kết nối mạng', value: product?.network },
    { label: 'Chip', value: product?.chip },
    { label: 'RAM', value: product?.ram },
    { label: 'Bảo mật', value: product?.security },
    { label: 'Chống nước - Chống bụi', value: product?.waterResistance },
  ];

  return (
    <table className='w-full border-separate border-spacing-y-1 text-sm'>
      <tbody>
        {specs.map((item, index) => (
          <tr key={index} className='odd:bg-gray-50'>
            <td className='w-1/3 px-4 py-2 font-medium whitespace-nowrap text-gray-700'>
              {item.label}
            </td>
            <td className='px-4 py-2 text-gray-800'>{item.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
