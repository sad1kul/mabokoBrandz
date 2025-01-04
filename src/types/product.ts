export interface ProductImage {
  id: string;
  url: string;
  isFeatured: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: ProductImage[];
  category: string;
  stock: number;
  quantity?: number;
  createdAt: string;
  updatedAt: string;
} 