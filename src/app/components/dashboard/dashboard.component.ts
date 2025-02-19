import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink, RouterOutlet} from '@angular/router';
import {OrdersService} from '../../services/orders.service';
import {CurrencyPipe, DatePipe, NgClass, NgFor, NgForOf} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    RouterOutlet,
    NgFor,
    CurrencyPipe,
    DatePipe,
    NgClass,
    RouterLink
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{


  constructor(
    private OrderService:OrdersService,
    private route:ActivatedRoute,
  ) {
  }

  orders: any[] = [];
  isLoading=false;

  ngOnInit() {
  this.loadOrders();
  }

  loadOrders(): void {
    this.isLoading = true;
    this.OrderService.getOrders().subscribe({
      next: (orders: any[]) => {
        this.orders = orders
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) // Sort by newest first
          .slice(0, 10); // Get only 15 most recent orders
        console.log('Recent Orders:', this.orders);
        this.isLoading = false;
      },
      error: (error) => {
        console.error("Error Loading Orders", error);
        this.isLoading = false;
      }
    });
  }




}



