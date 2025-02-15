// import {Component, OnInit} from '@angular/core';
// import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
// import {FormsModule} from '@angular/forms';
// import {NgFor, NgIf} from '@angular/common';
// import {RouterLink} from '@angular/router';
// import {CustomersService} from '../../services/customer/customers.service';

// @Component({
//   selector: 'app-customers',
//   imports: [
//     CKEditorModule,
//     FormsModule,
//     NgIf,
//     NgFor,
//     RouterLink
//   ],
//   templateUrl: './customers.component.html',
//   styleUrl: './customers.component.css'
// })


// export class CustomersComponent implements OnInit{

//   customers: any[] = [];
//   customerId:string=''
//   customerInfo: any;

//   constructor(
//     private customerService:CustomersService
//   ) { }



//   ngOnInit() {
//     this.getCustomers();
//     this.getCustomerInfo();
//   }


//   getCustomers():void{
//     this.customerService.getAllCustomers().subscribe({
//       next: (response: any) => {
//         this.customers = response.customer;
//         console.log('Customers:', this.customers); // Check if data is assigned
//       },
//       error: (error) => {
//         console.error('Error:', error);
//       }
//     });
//   }


//   getCustomerInfo() {
//     this.customerService.getCustomerInfoById(this.customerId).subscribe(
//       (response) => {
//         this.customerInfo = response;
//         console.log('Customer Info:', this.customerInfo);
//       },
//       (error) => {
//         console.error('Error fetching customer info:', error);
//       }
//     );
//   }

// }


import { Component, OnInit } from '@angular/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CustomersService } from '../../services/customer/customers.service';
import { City } from '../../model/city.model';

@Component({
  selector: 'app-customers',
  imports: [
    CKEditorModule,
    FormsModule,
    NgIf,
    NgFor,
    RouterLink
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit {
  customers: any[] = [];
  cities: City[] = []; // Add this line to store cities
  customerId: string = '';
  customerInfo: any;

  constructor(
    private customerService: CustomersService
  ) { }

  ngOnInit() {
    this.getCustomers();
    this.getCities(); // Fetch cities
  }

  getCustomers(): void {
    this.customerService.getAllCustomers().subscribe({
      next: (response: any) => {
        this.customers = response.customer;
        console.log('Customers:', this.customers);
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }

  getCities(): void {
    this.customerService.getAllCities().subscribe({
      next: (data: City[]) => {
        this.cities = data;
        console.log('Cities:', this.cities);
      },
      error: (err) => {
        console.error('Error fetching cities:', err);
      }
    });
  }

  // Helper function to get city name by city ID
  getCityName(cityId: string): string {
    const city = this.cities.find(c => c._id === cityId);
    return city ? city.cityName : 'Unknown City';
  }
}