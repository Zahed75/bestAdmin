import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CurrencyPipe, NgFor, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import { GetAllProductsResponse, Product } from '../../model/product.model'; // Import the interface
import { ProductsService } from '../../services/product/products.service';
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

  isInventoryModalOpen = false;
  products: Product[] = []; // Array to store products
  isLoading: boolean = true; // Loading state

  constructor(private productsService: ProductsService) {}


  // Sample data for outlets and stock
  outlets = [
    { name: 'BGR', address: 'Vandari Monjil, Borogola, Sadar, Bogura', stock: 25 },
    { name: 'BGR', address: 'Vandari Monjil, Borogola, Sadar, Bogura', stock: 500 },
    { name: 'BHL', address: 'Zaman Center, Ukil Para, Sadar Road, Bhola', stock: 500 }
  ];

  openInventoryModal() {
    this.isInventoryModalOpen = true;
  }

  closeInventoryModal() {
    this.isInventoryModalOpen = false;
  }

  updateStock(outlet: any) {
    // Add logic to update stock for the specific outlet
    console.log('Updated stock for', outlet.name, 'to', outlet.stock);
  }

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




}
