export interface OutletQuantity {
  _id: string;
  outletName: string;
  outletLocation: string;
  quantity: number;
}

export interface ProductData {
  product: any | null;
  outletQuantities: OutletQuantity[];
}

export interface GetQuantityResponse {
  message: string;
  data: {
    success: boolean;
    message: string;
    data: ProductData;
  };
}
