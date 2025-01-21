import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {OrdersService} from '../../services/orders.service';


@Component({
  selector: 'app-product-details',
  imports: [
    RouterOutlet
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})

export class ProductDetailsComponent implements OnInit {

  order: any = null; // To store order details
  isLoading = false; // To show a loader while fetching data

  constructor(
    private route: ActivatedRoute,
    private ordersService: OrdersService
  ) {}

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
}
