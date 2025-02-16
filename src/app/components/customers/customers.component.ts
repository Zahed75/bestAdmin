
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



  deleteCustomer(customerId: string): void {
    if(confirm('Are you sure you sure to delete this customer')){
      this.customerService.deleteCustomerById(customerId).subscribe({
       next:(response)=>{
        alert("Customer Deleted Successfully!")
        window.location.reload();
       },error:(error)=>{
        alert("Failed to delete customer,try again")
       }
      });
    };
  }


}