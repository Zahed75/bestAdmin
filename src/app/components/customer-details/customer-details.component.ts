import {Component, OnInit} from '@angular/core';
import {CustomersService} from '../../services/customer/customers.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-customer-details',
  imports: [],
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.css'
})


export class CustomerDetailsComponent implements OnInit{
  customerId: string = ''; // Initialize outletId


  constructor(
    private customersService:CustomersService,
    private route: ActivatedRoute,
  ) {

  }


  ngOnInit() {
    this.customerId=this.route.snapshot.paramMap.get('customerId') || '';
    if(this.customerId){

    }
  }

}
