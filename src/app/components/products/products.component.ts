import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CurrencyPipe, NgFor, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import { GetAllProductsResponse, Product } from '../../model/product.model'; // Import the interface
import { ProductsService } from '../../services/product/products.service';
import { GetQuantityResponse,OutletQuantity } from '../../model/inventory.mode';
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
        this.outlets = response.data.data.outletQuantities; // Access the nested outletQuantities array
      },
      error: (error) => {
        console.error('Error fetching product quantity:', error);
      }
    });
  }

  updateStock(outlet: OutletQuantity): void {
    if (!this.selectedProductId) {
      console.error('No product selected');
      return;
    }

    this.productsService.updateInventory(outlet._id, this.selectedProductId, outlet.quantity).subscribe({
      next: (response) => {
        console.log('Stock updated successfully:', response);
        // Optionally, refresh the data or show a success message
        alert('Stock updated successfully!');
      },
      error: (error) => {
        console.error('Error updating stock:', error);
        alert('Failed to update stock. Please try again.');
      }
    });
  }




}
