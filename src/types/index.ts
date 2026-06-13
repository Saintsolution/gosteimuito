export interface Category {
  id: number;
  name: string;
  slug: string;
  created_at: string;
}

export interface Product {
  id: number;
  code: string;
  title: string;
  description: string | null;
  price: number;
  photos: string[];
  category_id: number | null;
  featured: boolean;
  bestseller: boolean;
  offer_of_the_day: boolean;
  link: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProductWithCategory extends Product {
  categories?: Category;
}

export interface AdminUser {
  id: string;
  email: string;
  created_at: string;
}
