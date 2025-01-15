// import { Component, OnInit } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { OrdersService } from '../../services/orders.service';
// import {CurrencyPipe, DatePipe, DecimalPipe, NgFor, NgIf} from '@angular/common';
//
// @Component({
//   selector: 'app-orders',
//   imports: [
//     RouterOutlet,
//     NgFor,
//     DatePipe,
//     DecimalPipe,
//
//
//   ],
//   templateUrl: './orders.component.html',
//   styleUrls: ['./orders.component.css'] // Fixed typo: `styleUrl` to `styleUrls`
// })
// export class OrdersComponent implements OnInit {
//   orders: any[] = [];
//   isLoading: boolean = true;
//
//   constructor(private ordersService: OrdersService) {}
//
//   ngOnInit(): void {
//     this.ordersService.getOrders().subscribe({
//       next: (data) => {
//         console.log('Fetched Orders:', data); // Debug log
//         this.orders = data; // Assign the fetched orders
//         this.isLoading = false; // Stop loading spinner
//       },
//       error: (error) => {
//         console.error('Error fetching orders:', error);
//         this.isLoading = false; // Stop loading spinner in case of error
//       }
//     });
//   }
// }



import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import {RouterOutlet} from '@angular/router';
import {DatePipe, DecimalPipe, NgClass, NgFor} from '@angular/common';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  imports: [
    RouterOutlet,
    DatePipe,
    NgFor,
    DecimalPipe,
    NgClass
  ]
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  paginatedOrders: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.ordersService.getOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.updatePagination();
      },
      error: (error) => console.error('Error fetching orders:', error),
    });
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.orders.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedOrders = this.orders.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePagination();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  get paginationPages(): number[] {
    const startPage = Math.max(1, this.currentPage - 2);
    const endPage = Math.min(this.totalPages, startPage + 4);
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }
}
