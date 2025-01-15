import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OrdersService } from '../../services/orders.service';
import {CurrencyPipe, DatePipe, DecimalPipe, NgFor, NgIf} from '@angular/common';

@Component({
  selector: 'app-orders',
  imports: [
    RouterOutlet,
    NgFor,
    DatePipe,
    DecimalPipe,


  ],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'] // Fixed typo: `styleUrl` to `styleUrls`
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  isLoading: boolean = true;

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.ordersService.getOrders().subscribe({
      next: (data) => {
        console.log('Fetched Orders:', data); // Debug log
        this.orders = data; // Assign the fetched orders
        this.isLoading = false; // Stop loading spinner
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
        this.isLoading = false; // Stop loading spinner in case of error
      }
    });
  }
}
