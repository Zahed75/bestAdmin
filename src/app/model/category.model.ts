// category.model.ts

export interface ProductSpecification {
  key: string;
  value: string;
  _id: string;
}

export interface ProductSEO {
  productTitle: string;
  prodDescription: string;
  productTags: string[];
  productNotes: string;
}

export interface ProductGeneral {
  regularPrice: number;
  salePrice: number;
  taxStatus: string;
  taxClass: string;
}

export interface ProductInventory {
  sku: string;
  stockManagement: boolean;
  stockStatus: string;
  soldIndividually: boolean;
  inventoryStatus: string;
}

export interface ProductShippingDimensions {
  length: number;
  width: number;
  height: number;
}

export interface ProductShipping {
  productDimensions: ProductShippingDimensions;
  weight: number;
}

export interface Product {
  seo: ProductSEO;
  general: ProductGeneral;
  inventory: ProductInventory;
  shipping: ProductShipping;
  _id: string;
  categoryId: string[];
  productName: string;
  productSlug: string;
  productBrand: string;
  productCode: string;
  productImage: string;
  productGallery: string[];
  productVideos: string[];
  productStatus: string;
  date: string; // ISO date string
  productDescription: string;
  __v: number;
  updatedAt: string; // ISO date string
  productSpecification: ProductSpecification[];
}

export interface SubCategory {
  _id: string;
  categoryName: string;
  slug: string; // Add the slug property
  selected?: boolean;
}

export interface Category {
  _id?: string;
  slug: string;
  subCategories?: SubCategory[];
  selected?: boolean;
  userId?: string;
  categoryName?: string;
  parentCategory?: string;
  categoryDescription?: string;
  featureImage?: string[];
  title?: string;
  metaDescription?: string;
  __v?: number;
  productCount?: number;
  products?: Product[];
}

// The API response interface for GetAllCategories.
export interface GetAllCategoriesResponse {
  message: string;
  categories: Category[];
}
