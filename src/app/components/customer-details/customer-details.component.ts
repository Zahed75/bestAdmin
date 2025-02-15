import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../../services/customer/customers.service';
import { ActivatedRoute } from '@angular/router';
import { City } from '../../model/city.model';
import { NgForOf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css'],
  standalone: true,
  imports: [
    NgForOf,
    CommonModule, // Import this for *ngFor and other common directives
    FormsModule,
  ],
})
export class CustomerDetailsComponent implements OnInit {
  customerId: string = '';
  customerInfo: any;
  cities: City[] = [];
  customers: any = {};
  constructor(
    private customersService: CustomersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.customerId = this.route.snapshot.paramMap.get('customerId') || '';
    if (this.customerId) {
      this.getCustomerInfo();
    }
    this.getAllCities();
  }

  getCustomerInfo() {
    this.customersService.getCustomerInfoById(this.customerId).subscribe(
      (response) => {
        this.customerInfo = response.customerInfo;
        console.log('Customer Info:', this.customerInfo);
      },
      (error) => {
        console.error('Error fetching customer info:', error);
      }
    );
  }

  getAllCities() {
    this.customersService.getAllCities().subscribe({
      next: (data) => {
        this.cities = data;
        console.log('Cities:', this.cities); // Check the data structure here
      },
      error: (err) => {
        console.error('Error fetching cities:', err);
      },
    });
  }

  updateCustomerById(): void {
    const updatedCustomerData = this.customerInfo; // Assuming this is the updated data
  
    this.customersService.updateCustomerById(this.customerId, updatedCustomerData).subscribe({
      next: (res: any) => {
        if (res.message === 'Customer Updated Successfully!') {
          alert('Customer Updated Successfully!');
          window.location.reload();
        } else {
          alert('Failed to update');
        }
      },
      error: (error) => {
        console.error('Update Error:', error);
        alert('An error occurred. Please try again.');
      }
    });
  }
  




}
