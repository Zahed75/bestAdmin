export interface Brand {
  _id: string;
  name: string;
  title: string;
  description: string;
  createdAt: string;  // ISO date string
  updatedAt: string;  // ISO date string
  __v?: number; // Optional, version key from MongoDB
}

export interface CreateBrandResponse {
  message: string;
  brand: Brand;
}
