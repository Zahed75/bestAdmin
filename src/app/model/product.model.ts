// product.model.ts
export interface Product {
  seo: {
    productTitle: string;
    prodDescription: string;
    productTags: string[];
    productNotes: string;
  };
  general: {
    regularPrice: number;
    salePrice: number;
    taxStatus: string;
    taxClass: string;
  };
  inventory: {
    sku: string;
    stockManagement: boolean;
    stockStatus: string;
    soldIndividually: boolean;
    inventoryStatus: string;
  };
  shipping: {
    productDimensions: {
      length: number;
      width: number;
      height: number;
    };
    weight: number;
  };
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
  date: string;
  productDescription: string;
  productShortDescription: string;
  __v: number;
  updatedAt: string;
  productSpecification: {
    key: string;
    value: string;
    _id: string;
  }[];
}

export interface GetAllProductsResponse {
  message: string;
  products: Product[];
}
