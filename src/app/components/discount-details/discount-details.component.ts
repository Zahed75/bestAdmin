

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CouponService } from '../../services/coupon/coupon.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-discount-details',
    standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DatePipe
  ],
  templateUrl: './discount-details.component.html',
  styleUrls: ['./discount-details.component.css']
})
export class DiscountDetailsComponent implements OnInit {
  discountId: string = '';
  discountInfo: any = {
    general: {
      couponName: '',
      discountType: '',
      couponAmount: 0,
      allowFreeShipping: false,
      couponExpiry: ''
    },
    usageRestriction: {
      minimumSpend: null,
      maximumSpend: null,
      individualUseOnly: false,
      excludeSaleItems: false
    },
    usageLimit: {
      usageLimitPerCoupon: null,
      limitUsageToXItems: null,
      usageLimitPerUser: null
    }
  };

    // Tabs
  tabs = [
    { id: 'general', label: 'General' },
    { id: 'usageRestrictions', label: 'Usage Restrictions' },
    { id: 'usageLimits', label: 'Usage Limits' },
  ];
  activeTab = 'general';

    // Set active tab
  setActiveTab(tabId: string): void {
    this.activeTab = tabId;
  }

  constructor(
    private couponService: CouponService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.discountId = params.get('discountId') || '';
      console.log("Discount ID:", this.discountId); // Debugging statement
      if (this.discountId) {
        this.getDiscountById();
      } else {
        console.error("Discount ID is missing from the route.");
      }
    });
  }

  getDiscountById(): void {
    this.couponService.getDiscountById(this.discountId).subscribe(
      
      (response) => {
        this.discountInfo = {
          general: response.coupon.general,
          usageRestriction: response.coupon.usageRestriction,
          usageLimit: response.coupon.usageLimit
         
          
        };
        console.log("Discount Info:", this.discountInfo);
      },
      (error) => {
        console.log("Error getting Discount", error);
      }
    );
  }
  onDateChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.discountInfo.general.couponExpiry = target.value;
  }
  
  



}