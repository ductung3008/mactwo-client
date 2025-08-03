export interface Product {
  id: string;
  name: string;
  newPrice: number;
  oldPrice: number;
  imageUrl: string;
  promotionPercentage: number;
  tag: 'new' | 'installment';
}

export interface Category {
  id: string;
  title: string;
  products: Product[];
}

export const categories: Category[] = [
  {
    id: '1',
    title: 'iPhone',
    products: [
      {
        id: '1',
        name: 'iPhone 16e 128GB',
        newPrice: 15990000,
        oldPrice: 16999000,
        imageUrl:
          'https://shopdunk.com/images/thumbs/0034910_iphone-16e-128gb_240.png',
        promotionPercentage: 5,
        tag: 'new',
      },
      {
        id: '2',
        name: 'iPhone 16 Pro 128GB',
        newPrice: 24690000,
        oldPrice: 28990000,
        imageUrl:
          'https://shopdunk.com/images/thumbs/0030444_iphone-16-pro-128gb_240.png',
        promotionPercentage: 14,
        tag: 'installment',
      },
      {
        id: '3',
        name: 'iPhone 16 Pro Max 256GB',
        newPrice: 29690000,
        oldPrice: 34990000,
        imageUrl:
          'https://shopdunk.com/images/thumbs/0029155_iphone-16-pro-max-256gb_240.png',
        promotionPercentage: 15,
        tag: 'installment',
      },
      {
        id: '4',
        name: 'iPhone 16 128GB',
        newPrice: 18790000,
        oldPrice: 22990000,
        imageUrl:
          'https://shopdunk.com/images/thumbs/0030771_iphone-16-128gb_240.png',
        promotionPercentage: 18,
        tag: 'installment',
      },
    ],
  },
  {
    id: '2',
    title: 'iPad',
    products: [
      {
        id: '1',
        name: 'iPad Air (M3) 11-inch Wi-Fi',
        newPrice: 16290000,
        oldPrice: 16999000,
        imageUrl:
          'https://shopdunk.com/images/thumbs/0035054_ipad-air-m3-11-inch-wi-fi_240.png',
        promotionPercentage: 4,
        tag: 'new',
      },
      {
        id: '2',
        name: 'iPad (A16) 11 inch Wi-Fi',
        newPrice: 9299000,
        oldPrice: 9999000,
        imageUrl:
          'https://shopdunk.com/images/thumbs/0035754_ipad-a16-11-inch-wi-fi_240.png',
        promotionPercentage: 7,
        tag: 'new',
      },
      {
        id: '3',
        name: 'iPad Air 6 M2 13 inch Wi-Fi',
        newPrice: 16190000,
        oldPrice: 21990000,
        imageUrl:
          'https://shopdunk.com/images/thumbs/0025630_ipad-air-6-m2-13-inch-wi-fi_240.jpeg',
        promotionPercentage: 26,
        tag: 'installment',
      },
      {
        id: '4',
        name: 'iPad Gen 10 th 10.9 inch WiFi 64GB',
        newPrice: 8390000,
        oldPrice: 12990000,
        imageUrl:
          'https://shopdunk.com/images/thumbs/0009725_ipad-gen-10-th-109-inch-wifi-64gb_240.png',
        promotionPercentage: 35,
        tag: 'installment',
      },
    ],
  },
  {
    id: '3',
    title: 'Mac',
    products: [
      {
        id: '1',
        name: 'MacBook Air M4 13 inch (8 core GPU | 16GB RAM | 256GB SSD)',
        newPrice: 25690000,
        oldPrice: 26999000,
        imageUrl:
          'https://shopdunk.com/images/thumbs/0036014_macbook-air-m4-13-inch-8-core-gpu-16gb-ram-256gb-ssd_240.jpeg',
        promotionPercentage: 5,
        tag: 'new',
      },
      {
        id: '2',
        name: 'MacBook Air M2 13 inch (10 core GPU | 16GB RAM | 256GB SSD)',
        newPrice: 24090000,
        oldPrice: 39990000,
        imageUrl:
          'https://shopdunk.com/images/thumbs/0034122_macbook-air-m3-13-inch-8gb-ram-256gb-ssd_240.jpeg',
        promotionPercentage: 40,
        tag: 'installment',
      },
      {
        id: '3',
        name: 'MacBook Air M1 2020 (8GB RAM | 256GB SSD)',
        newPrice: 16890000,
        oldPrice: 28990000,
        imageUrl:
          'https://shopdunk.com/images/thumbs/0034123_macbook-air-m2-13-inch-10-core-gpu-16gb-ram-256gb-ssd_240.jpeg',
        promotionPercentage: 42,
        tag: 'installment',
      },
      {
        id: '4',
        name: 'MacBook Pro M4 14 inch (10 core GPU | 16GB RAM | 512GB SSD)',
        newPrice: 42990000,
        oldPrice: 0,
        imageUrl:
          'https://shopdunk.com/images/thumbs/0034121_macbook-air-m1-2020-8gb-ram-256gb-ssd_240.jpeg',
        promotionPercentage: 0,
        tag: 'new',
      },
    ],
  },
  {
    id: '4',
    title: 'Apple Watch',
    products: [
      {
        id: '1',
        name: 'Apple Watch Series 10 Nhôm (GPS) 42mm | Sport Band',
        newPrice: 10490000,
        oldPrice: 10990000,
        imageUrl:
          'https://shopdunk.com/images/thumbs/0029160_apple-watch-series-10-nhom-gps-42mm-sport-band_240.jpeg',
        promotionPercentage: 5,
        tag: 'new',
      },
      {
        id: '2',
        name: 'Apple Watch Ultra 2 GPS + Cellular 49mm Ocean (2024)',
        newPrice: 22990000,
        oldPrice: 0,
        imageUrl:
          'https://shopdunk.com/images/thumbs/0030238_apple-watch-ultra-2-gps-cellular-49mm-ocean-2024_240.png',
        promotionPercentage: 0,
        tag: 'new',
      },
      {
        id: '3',
        name: 'Apple Watch SE GPS + Cellular 2024 Sport Band size S/M',
        newPrice: 6590000,
        oldPrice: 7299000,
        imageUrl:
          'https://shopdunk.com/images/thumbs/0032869_apple-watch-se-gps-cellular-2024-sport-band-size-sm_240.jpeg',
        promotionPercentage: 10,
        tag: 'installment',
      },
      {
        id: '4',
        name: 'Apple Watch SE GPS 2024 Sport Band size S/M',
        newPrice: 5690000,
        oldPrice: 5999000,
        imageUrl:
          'https://shopdunk.com/images/thumbs/0030450_apple-watch-se-gps-2024-sport-band-size-sm_240.jpeg',
        promotionPercentage: 5,
        tag: 'installment',
      },
    ],
  },
  {
    id: '5',
    title: 'AirPods',
    products: [
      {
        id: '1',
        name: 'AirPods 4',
        newPrice: 3190000,
        oldPrice: 3499000,
        imageUrl:
          'https://shopdunk.com/images/thumbs/0029778_airpods-4_240.jpeg',
        promotionPercentage: 9,
        tag: 'new',
      },
      {
        id: '2',
        name: 'AirPods Max cổng USB C 2024',
        newPrice: 12190000,
        oldPrice: 13990000,
        imageUrl:
          'https://shopdunk.com/images/thumbs/0029786_airpods-max-cong-usb-c-2024_240.jpeg',
        promotionPercentage: 13,
        tag: 'installment',
      },
      {
        id: '3',
        name: 'AirPods Pro 2 (USB-C) 2023',
        newPrice: 5590000,
        oldPrice: 6790000,
        imageUrl:
          'https://shopdunk.com/images/thumbs/0022022_airpods-pro-2-usb-c-2023_240.jpeg',
        promotionPercentage: 18,
        tag: 'installment',
      },
      {
        id: '4',
        name: 'AirPods Pro (2021)',
        newPrice: 4850000,
        oldPrice: 6790000,
        imageUrl:
          'https://shopdunk.com/images/thumbs/0012020_airpods-pro-2021_240.webp',
        promotionPercentage: 29,
        tag: 'installment',
      },
    ],
  },
  {
    id: '6',
    title: 'Phụ kiện',
    products: [
      {
        id: '1',
        name: 'Apple Pencil Pro',
        newPrice: 3190000,
        oldPrice: 3499000,
        imageUrl:
          'https://shopdunk.com/images/thumbs/0026434_apple-pencil-pro_240.jpeg',
        promotionPercentage: 9,
        tag: 'new',
      },
      {
        id: '2',
        name: 'Bàn Phím Smart Keyboard Folio cho iPad Pro 11 inch MXNK2',
        newPrice: 3990000,
        oldPrice: 6990000,
        imageUrl:
          'https://shopdunk.com/images/thumbs/0034293_ban-phim-smart-keyboard-folio-cho-ipad-pro-11-inch-mxnk2-dung-cho-ipad-pro-the-he-thu-1234_240.jpeg',
        promotionPercentage: 43,
        tag: 'installment',
      },
      {
        id: '3',
        name: 'Sạc 20W USB-C Power Adapter',
        newPrice: 590000,
        oldPrice: 690000,
        imageUrl:
          'https://shopdunk.com/images/thumbs/0001395_sac-20w-usb-c-power-adapter_240.png',
        promotionPercentage: 14,
        tag: 'installment',
      },
      {
        id: '4',
        name: 'Magic Mouse',
        newPrice: 2290000,
        oldPrice: 2590000,
        imageUrl:
          'https://shopdunk.com/images/thumbs/0001421_magic-mouse-2_240.jpeg',
        promotionPercentage: 12,
        tag: 'installment',
      },
    ],
  },
  {
    id: '7',
    title: 'Camera',
    products: [
      {
        id: '1',
        name: 'Camera cầm tay DJI Osmo Pocket 3',
        newPrice: 14890000,
        oldPrice: 16990000,
        imageUrl:
          'https://shopdunk.com/images/thumbs/0036485_camera-cam-tay-dji-osmo-pocket-3-creator-combo_240.jpeg',
        promotionPercentage: 12,
        tag: 'new',
      },
      {
        id: '2',
        name: 'Camera cầm tay DJI Osmo Pocket 3 | Creator Combo',
        newPrice: 21890000,
        oldPrice: 24990000,
        imageUrl:
          'https://shopdunk.com/images/thumbs/0034779_camera-hanh-trinh-dji-osmo-action-4-standard-combo_ac003std_240.jpeg',
        promotionPercentage: 12,
        tag: 'installment',
      },
      {
        id: '3',
        name: 'DJI Action 4',
        newPrice: 8990000,
        oldPrice: 10990000,
        imageUrl:
          'https://shopdunk.com/images/thumbs/0034782_camera-hanh-trinh-dji-osmo-action-5-pro-standard-combo_ac004std_240.jpeg',
        promotionPercentage: 18,
        tag: 'installment',
      },
      {
        id: '4',
        name: 'GoPro HERO12 Black',
        newPrice: 9590000,
        oldPrice: 11990000,
        imageUrl:
          'https://shopdunk.com/images/thumbs/0036887_may-anh-fujifilm-x-m5_240.jpeg',
        promotionPercentage: 20,
        tag: 'installment',
      },
    ],
  },
];
