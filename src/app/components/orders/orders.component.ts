import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {OrdersService} from '../../services/orders.service';

@Component({
  selector: 'app-orders',
  imports: [
    RouterOutlet
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})

export class OrdersComponent implements OnInit {

  orders: any[] = [];
  isLoading: boolean = true;

  constructor(private ordersService: OrdersService) {
  }

  ngOnInit(): void {

    this.ordersService.getOrders().subscribe({
      next: (data) => {
        this.orders = data; // Assign the fetched orders to the orders array
        this.isLoading = false; // Set loading to false after fetching data
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
        this.isLoading = false; // Set loading to false in case of an error
      }
    });
  }
}
