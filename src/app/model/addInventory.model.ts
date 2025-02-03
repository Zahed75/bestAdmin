// inventory.model.ts

// Request Body Interface
export interface AddInventoryRequest {
  outletId: string;
  productId: string;
  quantity: number;
}

// Product in Inventory Interface
export interface ProductInInventory {
  _id: string;
  quantity: number;
}

// Inventory Interface
export interface Inventory {
  outletId: string;
  quantity: number;
  products: ProductInInventory[];
  _id: string;
}

// Response Interface
export interface AddInventoryResponse {
  message: string;
  inventory: Inventory;
}
