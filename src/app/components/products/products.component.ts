import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CurrencyPipe, NgFor, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import { GetAllProductsResponse, Product } from '../../model/product.model'; // Import the interface
import { ProductsService } from '../../services/product/products.service';
import { GetQuantityResponse,OutletQuantity } from '../../model/inventory.model';
@Component({
  selector: 'app-products',
  imports: [
    FormsModule,
    NgIf,
    NgFor,
    RouterLink,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  products: any[] = []; // Replace with your product data type
  isLoading = false;
  isInventoryModalOpen = false;
  selectedProductId: string | null = null;
  outlets: OutletQuantity[] = [];

  constructor(private productsService: ProductsService) {}



  ngOnInit() {
    this.fetchAllProducts();
  }



  fetchAllProducts():void{
    this.productsService.getAllProducts().subscribe({
      next:(response:GetAllProductsResponse)=>{
        this.products=response.products;
        this.isLoading=false;
      },error:(error)=>{
        console.error('Error fetching products:', error);
        this.isLoading = false;
      },
    });
  }



  openInventoryModal(productId: string): void {
    this.selectedProductId = productId;
    this.isInventoryModalOpen = true;
    this.fetchProductQuantity(productId);
  }

  closeInventoryModal() {
    this.isInventoryModalOpen = false;
  }


  fetchProductQuantity(productId: string): void {
    this.productsService.getProductQuantityById(productId).subscribe({
      next: (response: GetQuantityResponse) => {
        const outletQuantities = response.data.data.outletQuantities;
        // Remove duplicates based on outletId
        this.outlets = this.removeDuplicates(outletQuantities, '_id');
        console.log('Outlets:', this.outlets); // Log the outlets array
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


  updateStock(outlet: OutletQuantity): void {
    if (!this.selectedProductId) {
      console.error('No product selected');
      return;
    }

    console.log('Outlet ID:', outlet._id);
    console.log('Product ID:', this.selectedProductId);
    console.log('New Quantity:', outlet.quantity);

    // Ensure the correct outletId is being used
    const correctOutletId = '6680d2eba284e2f968c08d65'; // Replace with the correct outletId
    this.productsService.updateInventory(correctOutletId, this.selectedProductId, outlet.quantity).subscribe({
      next: (response) => {
        console.log('Stock updated successfully:', response);
        alert('Stock updated successfully!');
      },
      error: (error) => {
        console.error('Error updating stock:', error);
        alert('Failed to update stock. Please try again.');
      }
    });
  }



}
