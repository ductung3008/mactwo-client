export default function Specifications() {
  const specs = [
    { label: 'Dung lượng', value: '128GB / 256GB / 512GB' },
    { label: 'Màn hình', value: "6.7' Super Retina XDR display" },
    { label: 'Độ phân giải màn hình', value: '2778 x 1284 pixel ở 460 ppi' },
    {
      label: 'Camera sau',
      value:
        'Chính: khẩu độ ƒ / 1.78, Chụp xa: khẩu độ ƒ / 2.8, 48MP chính, 12MP siêu rộng, 12MP tele',
    },
    { label: 'Camera trước', value: '12MP, khẩu độ ƒ / 1.9' },
    {
      label: 'Pin và nguồn điện',
      value: 'Phát video lên tới 26 giờ (theo Apple)',
    },
    { label: 'Sạc', value: 'Sạc nhanh 20W, sạc không dây, hỗ trợ Magsafe' },
    {
      label: 'Kết nối mạng',
      value: '2 SIM (1 Nano SIM và 1 eSIM hoặc 2 eSIM), hỗ trợ 5G',
    },
    { label: 'Chip', value: 'Chip A15 Bionic 6 nhân, GPU 5 nhân' },
    { label: 'RAM', value: '6GB' },
    {
      label: 'Bảo mật',
      value: 'Face ID, Camera TrueDepth nhận diện khuôn mặt',
    },
    {
      label: 'Chống nước - Chống bụi',
      value: 'IP68 (độ sâu 6m trong 30 phút) - chuẩn IEC 60529',
    },
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
