import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {OrdersService} from '../../services/orders.service';
import {DatePipe, DecimalPipe, NgFor, NgIf} from '@angular/common';
import {OrdersComponent} from '../orders/orders.component';

@Component({
  selector: 'app-product-details',
  imports: [
    RouterOutlet,
    RouterLink,
    DatePipe,
    NgIf,
    NgFor
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})

export class ProductDetailsComponent implements OnInit {


  order: any = {}; // To store order details
  isLoading = false; // To show a loader while fetching data
  outlets: any[] = [];
  promoCodes: any[] = [];
  errorMessage: string = '';
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
    private ordersService: OrdersService
  ) {
  }

  ngOnInit(): void {
    // Get orderId from route parameters
    const orderId = this.route.snapshot.paramMap.get('orderId');
    if (orderId) {
      this.fetchOrderDetails(orderId);
    }
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
