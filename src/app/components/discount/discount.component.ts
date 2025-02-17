import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CouponService } from '../../services/coupon/coupon.service';
import { Coupon } from '../../model/coupon.model';
import { DatePipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-discount',
  imports: [FormsModule, RouterLink, NgFor, DatePipe, NgIf],
  templateUrl: './discount.component.html',
  styleUrl: './discount.component.css',
})
export class DiscountComponent implements OnInit {
  isLoading = false;
  coupons: Coupon[] = [];
  filteredCoupons: Coupon[] = []; // For search functionality
  searchTerm: string = ''; // For search input

  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 5; // Number of items per page
  totalItems: number = 0;

  constructor(
    private couponService: CouponService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadCoupons();
  }

  loadCoupons(): void {
    this.isLoading = true;
    this.couponService.getAllCoupon().subscribe({
      next: (response: any) => {
        this.coupons = response.coupons; // Accessing the coupons array inside the response object
        this.filteredCoupons = this.coupons; // Initialize filteredCoupons with all coupons
        this.totalItems = this.coupons.length; // Set total items for pagination
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading coupons:', error);
        this.isLoading = false;
      },
    });
  }

  // Search functionality
  applySearch(): void {
    if (this.searchTerm) {
      this.filteredCoupons = this.coupons.filter((coupon) =>
        coupon.general.couponName
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredCoupons = this.coupons; // Reset to all coupons if search term is empty
    }
    this.totalItems = this.filteredCoupons.length; // Update total items for pagination
    this.currentPage = 1; // Reset to the first page after search
  }

  // Pagination methods
  get paginatedCoupons(): Coupon[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredCoupons.slice(startIndex, endIndex);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  // Delete functionality
  onDelete(discountId: string): void {
    if (confirm('Are you sure you want to delete this discount?')) {
      this.couponService.deleteDiscoutById(discountId).subscribe({
        next: (response) => {
          alert('Discount Deleted Successfully!');
          this.loadCoupons(); // Reload coupons after deletion
        },
        error: (error) => {
          alert('Failed to delete coupon. Please try again.');
        },
      });
    }
  }
}
