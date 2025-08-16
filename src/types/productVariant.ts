export interface ProductVariant {
  product_variant_id?: number;
  product_id?: number;
  color: string;
  storage: string;
  ram: string;
  imageUrls: string[];
  price: number;
  stockQuantity: number;
}

export interface CreateProductVariant {
  color: string;
  storage: string;
  ram: string;
  imageUrls: string[];
  price: number;
  stockQuantity: number;
}
