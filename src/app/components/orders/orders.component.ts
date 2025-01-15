import {Component, OnInit} from '@angular/core';
import {OrdersService} from '../../services/orders.service';
import {RouterOutlet} from '@angular/router';
import {DatePipe, DecimalPipe, NgClass, NgFor, NgIf} from '@angular/common';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  imports: [
    RouterOutlet,
    DatePipe,
    NgFor,
    DecimalPipe,
    NgClass,
    NgIf
  ],
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  paginatedOrders: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  isLoading: boolean = false; // Loader state
  filteredOrders: any[] = [];
  searchQuery: string = '';

  orderStatuses: string[] = [
    'All',
    'Received',
    'Order Placed',
    'Order Confirmed',
    'Order Processing',
    'Ready for Delivery',
    'Order Dispatched',
    'Cancelled',
    'Order Delivered'
  ];


  constructor(private ordersService: OrdersService) {
  }

  ngOnInit(): void {
    this.fetchOrders();
  }

  // Fetch orders with loader
  fetchOrders(): void {
    this.isLoading = true; // Show loader
    this.ordersService.getOrders().subscribe({
      next: (data) => {
        this.orders = data;
        this.updatePagination();
        this.isLoading = false; // Hide loader after data is loaded
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
        this.isLoading = false; // Hide loader even on error
      },
    });
  }

  // Pagination Start

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
      {length: endPage - startPage + 1},
      (_, i) => startPage + i
    );
  }

  // Pagination End

//   Filters start

  filterOrders() {
    this.filteredOrders = this.orders.filter((order) => {
      return order.orderId.toLowerCase().includes(this.searchQuery.toLowerCase());
    });
  }

  filterByStatus(status: string) {
    if (status === 'All') {
      this.filteredOrders = this.orders;
    } else {
      this.filteredOrders = this.orders.filter((order) => order.orderStatus === status);
    }
  }
}

