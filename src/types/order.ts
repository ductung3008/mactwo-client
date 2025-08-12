export interface Order {
  orderId: string;
  userId: string;
  addressId: number;
  promotionId: string;
  orderDate: Date;
  status: string;
  totalAmount: number;
}
