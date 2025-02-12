import {Component, OnInit} from '@angular/core';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {FormsModule} from '@angular/forms';
import {NgFor, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {CustomersService} from '../../services/customer/customers.service';

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


export class CustomersComponent implements OnInit{
  customers: any[] = [];
  customerId:string=''
  customerInfo: any;

  constructor(
    private customerService:CustomersService
  ) { }



  ngOnInit() {
    this.getCustomers();
    this.getCustomerInfo();
  }


  getCustomers():void{
    this.customerService.getAllCustomers().subscribe({
      next: (response: any) => {
        this.customers = response.customer;
        console.log('Customers:', this.customers); // Check if data is assigned
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }


  getCustomerInfo() {
    this.customerService.getCustomerInfoById(this.customerId).subscribe(
      (response) => {
        this.customerInfo = response;
        console.log('Customer Info:', this.customerInfo);
      },
      (error) => {
        console.error('Error fetching customer info:', error);
      }
    );
  }

}
