export interface Category {
  id: number;
  categoryName: string;
  parentId?: number;
  children: Category[];

  createdAt?: Date;
  updatedAt?: Date;
}

// Interface cho category đã flatten
export interface FlatCategory {
  id: number;
  categoryName: string;
  parentId?: number;
  level?: number | undefined; // Cấp độ của category (0 = root, 1 = child, etc.)

  // Thêm các thuộc tính để tương thích với Category interface
  children: Category[];
  createdAt?: Date;
  updatedAt?: Date;
}
