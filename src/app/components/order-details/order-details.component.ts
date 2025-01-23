import {Component, OnInit} from '@angular/core';
import { RouterLink, RouterOutlet} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {OrdersService} from '../../services/orders.service';
import {DatePipe, NgFor, NgIf} from '@angular/common';

import { AuthService } from '../../services/auth.service';
import {FormsModule} from '@angular/forms';
@Component({
  selector: 'app-order-details',
  imports: [
    RouterOutlet,
    RouterLink,
    DatePipe,
    NgIf,
    NgFor,
    FormsModule
  ],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})

export class OrderDetailsComponent implements OnInit {


  order: any = {}; // To store order details
  isLoading = false; // To show a loader while fetching data
  canEditOrder = false;  // To show a loader while fetching data
  outlets: any[] = [];

  orderStatuses = [
    'Received',
    'Order Placed',
    'Order Confirmed',
    'Order Processing',
    'Ready for Delivery',
    'Order Dispatched',
    'Cancelled',
    'Order Delivered',
  ];

  deliveryType =[
    "Delivery",
    "Pickup",
    "Online"

  ]

  paymentMethods = ['Cash On Delivery', 'Online Payment'];

  filterParams = {
    outlet: '',
    orderStatus: '',
    promoCode: '',
    paymentMethod: '',
    startDate: '',
    endDate: '',
  };

  constructor(
    private route: ActivatedRoute,
    private ordersService: OrdersService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    // Get orderId from route parameters
    const orderId = this.route.snapshot.paramMap.get('orderId');
    if (orderId) {
      this.fetchOrderDetails(orderId);
    }
    this.checkUserPermissions();
  }

  fetchOrderDetails(orderId: string): void {
    this.isLoading = true;
    this.ordersService.getOrderById(orderId).subscribe({
      next: (response) => {
        this.order = response.order;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching order details:', error);
        this.isLoading = false;
      },
    });
  }

  // Check if the current user has "HQ" role
  checkUserPermissions(): void {
    const userRole = this.authService.getRole(); // Assuming this method returns the current user's role
    this.canEditOrder = userRole === 'HQ';
  }


  fetchOutlets(): void {
    this.ordersService.getAllOutlets().subscribe(
      (outlets) => {
        this.outlets = Array.isArray(outlets) ? outlets : [];
      },
      (error) => {
        console.error('Error fetching outlets:', error);
      }
    );
  }



  onEdit(id: number) {
    const result = confirm("Are you sure you want to edit this order?");
    if (result) {
      this.ordersService.updateOrderById(id).subscribe((res: any) => {
          alert("Order updated successfully");
          this.fetchOrderDetails
        }, error => {
          alert("Error updating order");
        }
      )
    }
  }


}




