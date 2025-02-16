export interface Coupon {
    general: General;
    usageRestriction: UsageRestriction;
    usageLimit: UsageLimit;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
  export interface General {
    couponName: string;
    discountType: 'fixed' | 'percentage';
    couponAmount: number;
    allowFreeShipping: boolean;
    couponExpiry: string;
  }
  
  export interface UsageRestriction {
    minimumSpend: number | null;
    maximumSpend: number | null;
    individualUseOnly: boolean;
    excludeSaleItems: boolean;
    products: string[];
    excludeProducts: string[];
    categories: string[];
    excludeCategories: string[];
    blockedAccounts: string[];
  }


  interface DiscountInfo {
    general: {
      couponName: string;
      discountType: string;
      couponAmount: number;
      allowFreeShipping: boolean;
      couponExpiry: string;
    };
    usageRestriction: {
      minimumSpend: number | null;
      maximumSpend: number | null;
      individualUseOnly: boolean;
      excludeSaleItems: boolean;
    };
    usageLimit: {
      usageLimitPerCoupon: number | null;
      limitUsageToXItems: number | null;
      usageLimitPerUser: number | null;
    };
  }
  
  export interface UsageLimit {
    usageLimitPerCoupon: number | null;
    limitUsageToXItems: number | null;
    usageLimitPerUser: number | null;
  }
  