import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgFor, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-products',
  imports: [
    FormsModule,
    NgIf,
    NgFor,
    RouterLink

  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  isInventoryModalOpen = false;

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



}
