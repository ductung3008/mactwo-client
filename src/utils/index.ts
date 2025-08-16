import { Category, FlatCategory } from '@/types/category';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility function for merging Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format currency
export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

// Format date
export function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj);
}

// Generate slug from string
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Truncate text
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

// Debounce function
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

// Calculate discount percentage
export function calculateDiscount(
  originalPrice: number,
  currentPrice: number
): number {
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}

// Format laptop specifications for display
export function formatLaptopSpecs(laptop: {
  processor: string;
  ram: string;
  storage: string;
  gpu?: string;
  screenSize: string;
}): string[] {
  const specs = [
    laptop.processor,
    laptop.ram,
    laptop.storage,
    laptop.screenSize,
  ];

  if (laptop.gpu) {
    specs.push(laptop.gpu);
  }

  return specs;
}

// Generate image URL with fallback
export function getImageUrl(
  imagePath: string,
  fallback = '/images/laptop-placeholder.jpg'
): string {
  if (!imagePath) return fallback;

  // If it's already a full URL, return as is
  if (imagePath.startsWith('http')) return imagePath;

  // If it's a relative path, prepend the base URL
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
  return `${baseUrl}/images/${imagePath}`;
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Get file extension
export function getFileExtension(filename: string): string {
  return filename.slice(filename.lastIndexOf('.') + 1).toLowerCase();
}

// Format file size
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Flatten nested categories
export function flattenCategories(
  categories: Category[],
  level: number = 0
): FlatCategory[] {
  const result: FlatCategory[] = [];

  categories.forEach(category => {
    // Thêm category hiện tại
    result.push({
      id: category.id,
      parentId: category.parentId,
      level: level,

      // Các thuộc tính để tương thích với Category interface
      categoryName: category.categoryName,
      children: [], // Flatten sẽ không có children
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    });

    // Nếu có children, đệ quy flatten các children
    if (category.children && category.children.length > 0) {
      const flattenedChildren = flattenCategories(category.children, level + 1);
      result.push(...flattenedChildren);
    }
  });

  return result;
}
