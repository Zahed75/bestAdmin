import {Component, OnInit} from '@angular/core';
import {DatePipe, NgFor, NgIf} from '@angular/common';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {CouponService} from '../../services/coupon/coupon.service';
import {ProductsService} from '../../services/product/products.service';
import {CategoryService} from '../../services/category/category.service';
import {GetAllProductsResponse} from '../../model/product.model';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-add-discount',
  imports: [
    NgIf,
    NgFor,
    RouterLink,
    DatePipe,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './add-discount.component.html',
  styleUrl: './add-discount.component.css'
})
export class AddDiscountComponent implements OnInit {
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
  constructor(
    private couponService: CouponService,
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private categoryService: CategoryService,
    private router: Router
  ) {
  }


  ngOnInit() {
    this.fetchAllProducts();
    this.onLoads();
  }

  // Set active tab
  setActiveTab(tabId: string): void {
    this.activeTab = tabId;
  }

  couponData = {
    general: {
      couponName: '',
      discountType: 'fixed', // default to 'fixed' or 'percentage'
      couponAmount: 0,
      allowFreeShipping: false,
      couponExpiry: '',
    },
    usageRestriction: {
      minimumSpend: 0,
      maximumSpend: 0,
      individualUseOnly: false,
      excludeSaleItems: false,
      products: [] as string[], // Explicitly define as string array
      excludeProducts: [] as string[], // Explicitly define as string array
      categories: [] as string[], // Explicitly define as string array
      excludeCategories: [] as string[], // Explicitly define as string array
    },
    usageLimit: {
      usageLimitPerCoupon: 0,
      usageLimitPerUser: 0,
      limitUsageToXItems: 0,
    },
  };

  couponTypes = ['Percentage', 'Fixed Amount'];


  createDiscount() {
    this.couponService.createDiscount(this.couponData).subscribe({
      next: (response) => {
        console.log('Discount Created:', response);
        alert('Discount created successfully!');
        this.router.navigateByUrl('/layout/discount');
      },
      error: (error) => {
        console.error('Error creating discount:', error);
        alert('Failed to create discount. Please try again.');
      }
    });
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

  onDateChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.couponData.general.couponExpiry = target.value;
  }

}


