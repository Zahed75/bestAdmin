import { Component,OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { CouponService } from '../../services/coupon/coupon.service';
import { Coupon } from '../../model/coupon.model';
import { DatePipe, NgFor, NgIf } from '@angular/common';
@Component({
  selector: 'app-discount',
  imports: [
    FormsModule,
    RouterLink,
    NgFor,
    DatePipe,
    NgIf
  ],
  templateUrl: './discount.component.html',
  styleUrl: './discount.component.css'
})
export class DiscountComponent implements OnInit  {

  isLoading = false;
  coupons: Coupon[] = [];


  constructor(
    private CouponService:CouponService,
    private route: ActivatedRoute,
  ){

  }

  ngOnInit(): void {
      this.loadCoupons();
  }


  loadCoupons(): void {
    this.isLoading=true
    this.CouponService.getAllCoupon().subscribe(
      (response: any) => {
        this.coupons = response.coupons;  // Accessing the coupons array inside the response object
        console.log('Coupons loaded:', this.coupons);
        this.isLoading=false
      }
    );
  }
  

  onDelete(discountId:string):void{
      if(confirm('Are you sure you sure to delete this discount')){
        this.CouponService.deleteDiscoutById(discountId).subscribe({
          next:(response)=>{
            alert("Discount Deleted Successfully!");
            window.location.reload();
          },
          error:(error)=>{
            alert("Failed to delete coupons,try again")
          }
        });
      }
  }

}
