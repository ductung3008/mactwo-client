export interface ProductVariant {
  product_variant_id?: number;
  product_id?: number;
<<<<<<< HEAD
=======
  id?: number;
>>>>>>> 441881f107cef54cfbb1d185479bb70faa22622e
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
