export type ResultsProps = {
  searchParams: Promise<{
    q?: string;
    category?: string;
    subCategory?: string;
    brand?: string;
    priceMin?: string;
    priceMax?: string;
    rating?: string;
    isPublished?: string;
    isFeatured?: string;
    freeShipping?: string;
    sort?: string;
    page?: string;
    limit?: string;
  }>;
};

export type Product = {
  _id: string;
  name: string;
  slug: string;
  brand: string;
  description: string;
  category: string[];
  subCategory: string[];
  images: string[];
  price: number;
  listPrice: number;
  colors: string[];
  countInStock: number;
  isPublished: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isDeal?: boolean;
  freeShipping?: boolean;
  deliveryEstimate?: string;
  keywords?: string[];
  features?: { name: string; value: string }[];
  ratingsAverage?: number;
  ratingCount?: number;
  updatedAt: string;
  createdAt: string;
};
