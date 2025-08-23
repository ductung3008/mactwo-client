'use client';

import { Product } from '@/lib/api/products.api';
import Image from 'next/image';
interface ProductDescriptionProps {
  product: Product | null;
}
export default function ProductDescription({
  product,
}: ProductDescriptionProps) {
  console.log('ProductDescriptionProps', product);
  const descriptionImages = [
    'https://shopdunk.com/images/uploaded/icon/ip14plus/iphone-14-plus-l-11%20(1).jpg',
    'https://shopdunk.com/images/uploaded/icon/ip14plus/iphone-14-plus-l-11%20(2).jpg',
    'https://shopdunk.com/images/uploaded/icon/ip14plus/iphone-14-plus-l-11%20(3).jpg',
    'https://shopdunk.com/images/uploaded/icon/ip14plus/iphone-14-plus-l-11%20(4).jpg',
    'https://shopdunk.com/images/uploaded/icon/ip14plus/iphone-14-plus-l-11%20(6).jpg',
    'https://shopdunk.com/images/uploaded/icon/ip14plus/iphone-14-plus-l-11%20(7).jpg',
  ];

  const details = [
    {
      title: 'Pin và Nguồn Điện',
      content:
        'Tất cả các xác nhận về thời lượng pin phụ thuộc vào cấu hình mạng và nhiều yếu tố khác; các kết quả thực tế sẽ khác nhau. Pin có giới hạn chu kỳ sạc và cuối cùng có thể cần được thay thế. Thời lượng pin và chu kỳ sạc khác nhau tùy theo cách sử dụng và cài đặt. Truy cập  và  để biết thêm thông tin.',
    },
    {
      title: 'Chống Nước',
      content:
        'iPhone 14 Pro và iPhone 14 Pro Max có khả năng chống tia nước, chống nước và chống bụi. Sản phẩm đã qua kiểm nghiệm trong điều kiện phòng thí nghiệm có kiểm soát đạt mức IP68 theo tiêu chuẩn IEC 60529 (chống nước ở độ sâu tối đa 6 mét trong vòng tối đa 30 phút). Khả năng chống tia nước, chống nước và chống bụi không phải là các điều kiện vĩnh viễn, và khả năng này có thể giảm do hao mòn thông thường. Không sạc pin khi iPhone đang bị ướt. Vui lòng tham khảo hướng dẫn sử dụng để biết cách lau sạch và làm khô máy. Không bảo hành sản phẩm bị hỏng do thấm chất lỏng.',
    },
    {
      title: 'Phát Hiện Va Chạm',
      content:
        'iPhone 14 và iPhone 14 Pro có thể phát hiện tình huống va chạm xe nghiêm trọng và gọi trợ giúp. Yêu cầu kết nối mạng di động hoặc cuộc gọi Wi-Fi.',
    },
    {
      title: 'Màn Hình',
      content:
        'Màn hình có các góc bo tròn theo đường cong tuyệt đẹp và nằm gọn theo một hình chữ nhật chuẩn. Khi tính theo hình chữ nhật chuẩn, kích thước màn hình theo đường chéo là 5,42 inch (iPhone 13 mini, iPhone 12 mini), 5,85 inch (iPhone 11 Pro, iPhone XS, iPhone X), 6,06 inch (iPhone 14, iPhone 13 Pro, iPhone 13, iPhone 12 Pro, iPhone 12, iPhone 11, iPhone XR), 6,12 inch (iPhone 14 Pro), 6,46 inch (iPhone 11 Pro Max, iPhone XS Max), 6,68 inch (iPhone 14 Plus, iPhone 13 Pro Max, iPhone 12 Pro Max), hoặc 6,69 inch (iPhone 14 Pro Max). Diện tích hiển thị thực tế nhỏ hơn.',
    },
    {
      title: 'Mạng Di Động và Không Dây',
      content:
        'Cần có gói cước dữ liệu. Mạng 5G chỉ khả dụng ở một số thị trường và được cung cấp qua một số nhà mạng. Tốc độ có thể thay đổi tùy địa điểm và nhà mạng. Để biết thông tin về hỗ trợ mạng 5G, vui lòng liên hệ nhà mạng và truy cập.',
    },
    {
      title: 'Phụ Kiện',
      content: 'Phụ kiện được bán riêng.',
    },
    {
      title: 'Tính Năng Khả Dụng',
      content:
        'Một số tính năng không khả dụng tại một số quốc gia hoặc khu vực.',
    },
    {
      title: 'Apple Music',
      content: 'Apple Music yêu cầu đăng ký thuê bao.',
    },
  ];

  return (
    <div className='space-y-8'>
      {/* Hình ảnh sản phẩm */}
      <div className='space-y-4'>
        {product?.variants[0].imageUrls.map((src, idx) => (
          <Image
            key={idx}
            src={src}
            alt={`Mô tả sản phẩm ${idx + 1}`}
            width={1200}
            height={700}
          />
        ))}
      </div>

      {/* Danh sách mô tả sản phẩm */}
      <ul className='space-y-6'>
        {/* {details.map((item, idx) => ( */}
        {/* <li key={idx} className='text-gray-700'> */}
        {/* <span className='font-semibold text-blue-600'>{item.title}:</span> */}
        <span className='mt-1 text-sm leading-relaxed'>
          {product?.description}
        </span>
        {/* </li> */}
        {/* ))} */}
      </ul>
    </div>
  );
}
