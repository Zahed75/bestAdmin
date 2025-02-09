import { Component, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GetAllProductsResponse } from '../../model/product.model';
import { ProductsService } from '../../services/product/products.service';
import { GetQuantityResponse, OutletQuantity } from '../../model/inventory.model';

@Component({
  selector: 'app-products',
  imports: [
    FormsModule,
    NgIf,
    NgFor,
    RouterLink,
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: any[] = []; // Replace with your product data type
  isLoading = false;
  isInventoryModalOpen = false;
  selectedProductId: string | null = null;
  outlets: OutletQuantity[] = [];

  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 8; // Default number of products per page
  totalItems: number = 0;

  selectedProductQuantity: any = null;

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.fetchAllProducts();
  }

  fetchAllProducts(): void {
    this.isLoading = true;
    this.productsService.getAllProducts().subscribe({
      next: (response: GetAllProductsResponse) => {
        this.products = response.products;
        this.totalItems = this.products.length; // Set totalItems to the length of the products array
        console.log('Total Items:', this.totalItems);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.isLoading = false;
      },
    });
  }





  fetchProductQuantity(productId: string): void {
    this.productsService.getProductQuantityById(productId).subscribe({
      next: (response: GetQuantityResponse) => {
        const outletQuantities = response.data.data.outletQuantities;
        // Remove duplicates based on outletId
        this.outlets = this.removeDuplicates(outletQuantities, '_id');
        console.log('Outlets:', this.outlets);
      },
      error: (error) => {
        console.error('Error fetching product quantity:', error);
      }
    });
  }

  // Helper function to remove duplicates
  removeDuplicates(array: any[], key: string): any[] {
    return array.filter((item, index, self) =>
      index === self.findIndex((t) => t[key] === item[key])
    );
  }










  // Get products for the current page
  get paginatedProducts(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.products.slice(startIndex, endIndex);
  }

  // Change page
  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
  }

  // Get total number of pages
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  // Generate a compact pagination array with ellipses when needed.
  get paginationNumbers(): (number | string)[] {
    const totalPages = this.totalPages;
    const currentPage = this.currentPage;
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      // If there are 7 or fewer pages, display all of them.
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        // Near the beginning: show pages 1-5, an ellipsis, and the last page.
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        // Near the end: show the first page, an ellipsis, and the last 5 pages.
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // In the middle: show first page, ellipsis, currentPage-1, currentPage, currentPage+1, ellipsis, last page.
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  }

  // Get the displayed range of products
  getDisplayedRange(): string {
    const start = (this.currentPage - 1) * this.itemsPerPage + 1;
    const end = Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
    return `${start}-${end}`;
  }





  openInventoryModal(productId: string): void {
    if (!productId) {
      console.error('Error: Product ID is missing.');
      alert('Error: Product ID is required.');
      return;
    }

    this.selectedProductId = productId; // Ensure the selected product ID is stored
    this.isInventoryModalOpen = true;
    this.selectedProductQuantity = null; // Reset previous data

    this.productsService.getProductQuantity(productId).subscribe(
      (response) => {
        if (response?.data) {
          this.selectedProductQuantity = response.data;
        } else {
          console.error('No inventory data found for this product');
          alert('No inventory found for this product.');
        }
      },
      (error) => {
        console.error('Error fetching product quantity:', error);
        alert('Error fetching product quantity.');
      }
    );
  }



  closeInventoryModal() {
    this.isInventoryModalOpen = false;
  }


  updateStock(outlet: OutletQuantity): void {
    if (!this.selectedProductId) {
      console.error('Missing product ID');
      alert('Error: Product ID is missing. Please select a product again.');
      return;
    }

    if (!outlet || !outlet._id) {
      console.error('Missing outlet ID');
      alert('Error: Outlet ID is missing.');
      return;
    }

    if (outlet.quantity === null || outlet.quantity === undefined) {
      console.error('Quantity is missing');
      alert('Error: Please enter a quantity.');
      return;
    }

    this.productsService.updateInventory(outlet._id, this.selectedProductId, outlet.quantity)
      .subscribe({
        next: (response) => {
          console.log('Stock updated successfully:', response);
          alert('Stock updated successfully!');
          // Update local data
          const updatedOutlet = this.selectedProductQuantity?.outletQuantities?.find((o: OutletQuantity) => o._id === outlet._id);
          if (updatedOutlet) {
            updatedOutlet.quantity = outlet.quantity;
          }
        },
        error: (error) => {
          console.error('Error updating stock:', error);
          alert(error?.error?.message || 'Failed to update stock. Please try again.');
        }
      });
  }


}

