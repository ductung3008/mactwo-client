export interface OrderAddress {
  id: number;
  shippingAddress: string;
  userId: string;
  createdDate: string;
  lastModifiedDate: string;
  default: boolean;
}

export interface OrderVariant {
  id: number;
  productId: number;
  color: string;
  storage: string;
  ram: string;
  imageUrls: string[];
  price: number;
  stockQuantity: number;
}

export interface OrderItem {
  id: number;
  variant: OrderVariant;
  quantity: number;
  pricePerItem: number;
}

export interface Promotion {
  id: number;
  name: string;
  discountPercentage: number;
}

export interface Order {
  id: number;
  userId: string;
  address: OrderAddress;
  promotion: Promotion | null;
  status: string;
  totalAmount: number;
  createdDate: string;
  orderItems: OrderItem[];
}

export interface CreateOrderItem {
  variantId: number;
  quantity: number;
}

export interface CreateOrderRequest {
  userId: string;
  addressId: number;
  promotionId: number | null;
  orderItems: CreateOrderItem[];
}
