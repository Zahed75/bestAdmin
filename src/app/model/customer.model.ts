export interface BillingInfo {
  firstName: string;
  lastName: string;
  district: string;
  zipCode: string;
  fullAddress: string;
  phoneNumber: string;
  email: string;
}

export interface ShippingInfo {
  firstName: string;
  lastName: string;
  district: string;
  zipCode: string;
  fullAddress: string;
  phoneNumber: string;
  email: string;
}

export interface Customer {
  _id: string;
  email?: string;
  profilePicture?: string;
  userName?: string;
  phoneNumber: string;
  isValid: boolean;
  password?: string;
  refreshToken: string[];
  wishList: any[];
  __v: number;
  isActive?: boolean;
  isVerified?: boolean;
  city?: string;
  firstName: string;
  lastName?: string;
  otp?: number;
  billingInfo?: BillingInfo;
  shippingInfo?: ShippingInfo;
}
