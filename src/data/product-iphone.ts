export interface Product {
  id: string;
  name: string;
  newPrice: number;
  oldPrice: number;
  imageUrl: string;
  promotionPercentage: number;
  tag: 'new' | 'installment';
}

export const products: Product[] = [
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
  {
    id: '5',
    name: 'iPhone 16 256GB',
    newPrice: 21690000,
    oldPrice: 25990000,
    imageUrl:
      'https://shopdunk.com/images/thumbs/0030443_iphone-16-256gb_240.png',
    promotionPercentage: 16,
    tag: 'installment',
  },
  {
    id: '6',
    name: 'iPhone 16 Plus 128GB',
    newPrice: 21790000,
    oldPrice: 25990000,
    imageUrl:
      'https://shopdunk.com/images/thumbs/0030772_iphone-16-plus-128gb_240.png',
    promotionPercentage: 16,
    tag: 'installment',
  },
  {
    id: '7',
    name: 'iPhone 15 2128GB',
    newPrice: 15190000,
    oldPrice: 24990000,
    imageUrl:
      'https://shopdunk.com/images/thumbs/0024431_iphone-15-128gb_240.png',
    promotionPercentage: 2939,
    tag: 'installment',
  },
  {
    id: '8',
    name: 'iPhone 15 Plus 2128GB',
    newPrice: 18690000,
    oldPrice: 27990000,
    imageUrl:
      'https://shopdunk.com/images/thumbs/0024431_iphone-15-128gb_240.png',
    promotionPercentage: 3,
    tag: 'installment',
  },
];
