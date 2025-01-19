//
// import {Component, OnInit} from '@angular/core';
// import {OrdersService} from '../../services/orders.service';
// import {RouterOutlet} from '@angular/router';
// import {DatePipe, DecimalPipe, NgClass, NgFor, NgIf} from '@angular/common';
// import {FormsModule, NgModel} from '@angular/forms';
//
// @Component({
//   selector: 'app-orders',
//   templateUrl: './orders.component.html',
//   styleUrls: ['./orders.component.css'],
//   imports: [
//     RouterOutlet,
//     NgFor,
//     NgClass,
//     DatePipe,
//     NgIf,
//     FormsModule,
//   ],
// })
// export class OrdersComponent implements OnInit {
//   orders: any[] = [];
//   paginatedOrders: any[] = [];
//   currentPage: number = 1;
//   itemsPerPage: number = 10;
//   totalPages: number = 0;
//   isLoading: boolean = false; // Loader state
//   showModal: boolean = false;
//   isFilterModalOpen = false;
//   outlets = ['Outlet 1', 'Outlet 2', 'Outlet 3'];
//   orderStatuses = [
//     'Received',
//     'Order Placed',
//     'Order Confirmed',
//     'Order Processing',
//     'Ready for Delivery',
//     'Order Dispatched',
//     'Cancelled',
//     'Order Delivered',
//   ];
//   promoCodes = ['PROMO1', 'PROMO2', 'PROMO3'];
//   paymentMethods = ['Credit Card', 'PayPal', 'Cash on Delivery'];
//
//
//
//   constructor(private ordersService: OrdersService) {
//   }
//
//   ngOnInit(): void {
//     this.fetchOrders();
//   }
//
//   filterDates = {
//     from: '',
//     to: '',
//   };
//
//
//   closeFilterModal() {
//     this.isFilterModalOpen = false;
//   }
//
//   applyFilters() {
//     // Logic to apply filters
//     this.isFilterModalOpen = false;
//   }
//
//
//
//   // Fetch orders with loader
//   fetchOrders(): void {
//     this.isLoading = true; // Show loader
//     this.ordersService.getOrders().subscribe({
//       next: (data) => {
//         this.orders = data;
//         this.updatePagination();
//         this.isLoading = false; // Hide loader after data is loaded
//       },
//       error: (error) => {
//         console.error('Error fetching orders:', error);
//         this.isLoading = false; // Hide loader even on error
//       },
//     });
//   }
//
//   // Pagination Start
//
//   updatePagination(): void {
//     this.totalPages = Math.ceil(this.orders.length / this.itemsPerPage);
//     const startIndex = (this.currentPage - 1) * this.itemsPerPage;
//     this.paginatedOrders = this.orders.slice(
//       startIndex,
//       startIndex + this.itemsPerPage
//     );
//   }
//
//   goToPage(page: number): void {
//     this.currentPage = page;
//     this.updatePagination();
//   }
//
//   nextPage(): void {
//     if (this.currentPage < this.totalPages) {
//       this.currentPage++;
//       this.updatePagination();
//     }
//   }
//
//   previousPage(): void {
//     if (this.currentPage > 1) {
//       this.currentPage--;
//       this.updatePagination();
//     }
//   }
//
//   get paginationPages(): number[] {
//     const startPage = Math.max(1, this.currentPage - 2);
//     const endPage = Math.min(this.totalPages, startPage + 4);
//     return Array.from(
//       {length: endPage - startPage + 1},
//       (_, i) => startPage + i
//     );
//   }
//
//   // Pagination End
//
//
//
// }
//
//
//

import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { RouterOutlet } from '@angular/router';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-orders',
  standalone: true, // Mark this as a standalone component
  imports: [
    RouterOutlet,
    NgFor,
    NgClass,
    DatePipe,
    NgIf,
    FormsModule, // Include FormsModule for template-driven forms
  ],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  paginatedOrders: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  isLoading: boolean = false;
  showModal: boolean = false;
  isFilterModalOpen = false;

  filterDates = {
    from: '', // Start date
    to: '',   // End date
  };
  // Filter options
  outlets: string[] = [];
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
  promoCodes: string[] = [];
  paymentMethods = ['Cash on Delivery', 'Online Payment'];

  // Selected filters
  selectedFilters = {
    outlet: '',
    orderStatus: '',
    paymentMethod: '',
    promoCode: '',
    dateFrom: '',
    dateTo: '',
  };

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.fetchFilters();
    this.fetchOrders();
  }

  fetchFilters(): void {
    this.ordersService.getOutlets().subscribe({
      next: (data) => {
        this.outlets = data.map((outlet: any) => outlet.name);
      },
      error: (error) => {
        console.error('Error fetching outlets:', error);
      },
    });

    this.ordersService.getDiscounts().subscribe({
      next: (data) => {
        this.promoCodes = data.map((discount: any) => discount.code);
      },
      error: (error) => {
        console.error('Error fetching promo codes:', error);
      },
    });
  }

  fetchOrders(): void {
    this.isLoading = true;
    const filters: any = {};
    if (this.selectedFilters.outlet) filters.outlet = this.selectedFilters.outlet;
    if (this.selectedFilters.orderStatus) filters.orderStatus = this.selectedFilters.orderStatus;
    if (this.selectedFilters.paymentMethod) filters.paymentMethod = this.selectedFilters.paymentMethod;
    if (this.selectedFilters.promoCode) filters.promoCode = this.selectedFilters.promoCode;
    if (this.selectedFilters.dateFrom) filters.dateFrom = this.selectedFilters.dateFrom;
    if (this.selectedFilters.dateTo) filters.dateTo = this.selectedFilters.dateTo;

    this.ordersService.getOrders(filters).subscribe({
      next: (data) => {
        this.orders = data;
        this.updatePagination();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
        this.isLoading = false;
      },
    });
  }

  applyFilters(): void {
    this.fetchOrders();
    this.isFilterModalOpen = false;
  }

  closeFilterModal(): void {
    this.isFilterModalOpen = false;
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.orders.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedOrders = this.orders.slice(startIndex, startIndex + this.itemsPerPage);
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
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }
}
