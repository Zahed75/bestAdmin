export interface Product {
  productName: string;
  productDescription: string;
  productShortDescription: string;
  productSlug: string;
  productCode: string;
  productBrand: string;
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
  seo: {
    productTitle: string;
    prodDescription: string;
    productTags: string[];
    productNotes: string;
  };
  productImage: string;
  productGallery: string[];
  productVideos: string[];
  categoryId: string[];
  productStatus: string;
  date: string;
  updatedAt: string;
  productSpecification: {
    key: string;
    value: string;
    _id?: string; // Make _id optional
  }[];
  _id?: string; // Make _id optional for new products
  __v: number;
}



export interface GetAllProductsResponse {
  message: string;
  products: Product[];
}
