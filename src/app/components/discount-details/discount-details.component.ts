import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CouponService} from '../../services/coupon/coupon.service';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ProductsService} from '../../services/product/products.service';
import {GetAllProductsResponse, Product} from '../../model/product.model';
import {CategoryService} from '../../services/category/category.service';
import {GetAllCategoriesResponse, SubCategory} from '../../model/category.model';
import {Category} from '../../model/category.model';
import {CategoryUI} from '../categories-list/categories-list.component';

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
    {id: 'general', label: 'General'},
    {id: 'usageRestrictions', label: 'Usage Restrictions'},
    {id: 'usageLimits', label: 'Usage Limits'},
  ];
  activeTab = 'general';

  isLoading = false;
  products: any[] = [];

  // Set active tab
  categories: any []=[]
  setActiveTab(tabId: string): void {
    this.activeTab = tabId;
  }

  constructor(
    private couponService: CouponService,
    private productsService: ProductsService,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.discountId = params.get('discountId') || '';
      if (this.discountId) {
        this.getDiscountById();
      }
      this.fetchAllProducts();
      this.onLoads();
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


  updateDiscount() {
    const updatedData = {
      general: {
        ...this.discountInfo.general
      },
      usageRestriction: {
        ...this.discountInfo.usageRestriction
      },
      usageLimit: {
        ...this.discountInfo.usageLimit
      }
    };

    this.couponService.updateDiscountById(this.discountId, updatedData).subscribe(
      (response) => {
        console.log('Update successful:', response);
        alert('Discount updated successfully!');
      },
      (error) => {
        console.error('Update failed:', error);
        alert('Failed to update discount.');
      }
    );
  }



  fetchAllProducts(): void {
    this.isLoading = true;
    this.productsService.getAllProducts().subscribe({
      next: (response: GetAllProductsResponse) => {
        this.products = response.products;

        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.isLoading = false;
      },
    });
  }


  onLoads():void{
    this.isLoading=true
    this.couponService.getProductCategories().subscribe({
      next:(response)=>{
        this.categories = response.categories
        this.isLoading=false;
      },
      error:(error)=>{
        console.error("Failed to fetched ProductCategories",error)
        this.isLoading=false;
      }
    })
  }


}
