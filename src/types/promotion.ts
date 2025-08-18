import { Product } from './product';

export interface Promotion {
  id: number;
  promotionName: string;
  description: string;
  discountAmount: number;
  startDate: string;
  endDate: string;
  products?: Product[];
}

export interface CreatePromotionRequest {
  promotionName: string;
  description: string;
  discountAmount: number;
  startDate: string;
  endDate: string;
}

export interface UpdatePromotionRequest {
  promotionName: string;
  description: string;
  discountAmount: number;
  startDate: string;
  endDate: string;
}
