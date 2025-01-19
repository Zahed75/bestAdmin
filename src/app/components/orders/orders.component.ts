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
//
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
//   paymentMethods = ['Cash on Delivery','Online Payment'];
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
// }
//
//
//
//
//
//
//
//
//
//
//
//
//


import {Component, OnInit} from '@angular/core';
import {OrdersService} from '../../services/orders.service';
import {DatePipe, NgClass, NgFor, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  imports: [
    FormsModule,
    RouterOutlet,
    NgFor,
    NgIf,
    FormsModule,
    NgClass,
    DatePipe
  ],
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  paginatedOrders: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;
  isLoading: boolean = false; // Loader state
  showModal: boolean = false;
  isFilterModalOpen = false;

  outlets: any[] = [];
  promoCodes: any[] = [];

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
  paymentMethods = ['Cash on Delivery', 'Online Payment'];

  filterParams = {
    outlet: '',
    orderStatus: '',
    promoCode: '',
    paymentMethod: '',
    startDate: '',
    endDate: '',
  };

  constructor(private ordersService: OrdersService) {
  }

  ngOnInit(): void {
    console.log('ngOnInit fired');
    this.fetchOrders(); // Fetch all orders initially
    this.fetchOutlets();
    this.fetchPromoCodes(); // Fetch promo codes dynamically
  }

  closeFilterModal() {
    this.isFilterModalOpen = false;
  }

  applyFilters() {
    this.isFilterModalOpen = false;
    this.fetchFilteredOrders();
  }

  // Fetch filtered orders with loader
  fetchFilteredOrders(): void {
    this.isLoading = true; // Show loader
    this.ordersService.getFilteredOrders(this.filterParams).subscribe({
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

  // Fetch all orders initially
  fetchOrders(): void {
    this.isLoading = true;
    this.ordersService.getOrders().subscribe({
      next: (data) => {
        console.log('Fetched orders:', data);  // Log data here
        this.orders = Array.isArray(data) ? data : [];  // Ensure it's an array
        this.updatePagination();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
        this.isLoading = false;
      },
    });
  }


  // Fetch all outlets from the service

  fetchOutlets(): void {
    this.ordersService.getAllOutlets().subscribe(
      (outlets) => {
        console.log('Fetched outlets:', outlets);
        this.outlets = outlets;
      },
      (error) => {
        console.error('Error fetching outlets:', error);
      }
    );
  }


  // Fetch all promo codes from the service

  fetchPromoCodes(): void {
    this.ordersService.getAllPromoCodes().subscribe(
      (promoCodes) => {
        this.promoCodes = promoCodes;
        console.log('Fetched PromoCode:', promoCodes);
      },
      (error) => {
        console.error("Error Fetching PromoCodes:", error);
      }
    );
  }


  // Pagination Start

  updatePagination(): void {
    if (Array.isArray(this.orders)) {
      this.totalPages = Math.ceil(this.orders.length / this.itemsPerPage);
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      this.paginatedOrders = this.orders.slice(startIndex, startIndex + this.itemsPerPage);
    } else {
      console.error('Orders is not an array:', this.orders);
    }
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
    return Array.from({length: endPage - startPage + 1}, (_, i) => startPage + i);
  }

  // Pagination End
}

