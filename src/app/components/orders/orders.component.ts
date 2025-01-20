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
  isFilterModalOpen = false;

  outlets: any[] = [];
  promoCodes: any[] = [];
  errorMessage: string = ''; // To display any errors during filtering
  showModal: boolean = false;
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

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.fetchOrders(); // Fetch all orders initially
    this.fetchOutlets();
    this.fetchPromoCodes(); // Fetch promo codes dynamically
  }

  // Close the filter modal
  closeFilterModal(): void {
    this.isFilterModalOpen = false;
  }

  // Clear all filters
  clearFilter(): void {
    this.filterParams = {
      outlet: '',
      orderStatus: '',
      promoCode: '',
      paymentMethod: '',
      startDate: '',
      endDate: '',
    };
    this.fetchOrders(); // Fetch all orders after clearing filters
  }

  // Apply filters and close the modal
  applyFilters() {
    this.isFilterModalOpen = false;
    console.log('Applying filters with params:', this.filterParams); // Debug log
    this.fetchFilteredOrders();
  }



  // Fetch filtered orders
  fetchFilteredOrders(): void {
    this.isLoading = true; // Show loader
    this.ordersService.getFilteredOrders(this.filterParams).subscribe({
      next: (data: any) => {
        if (data?.orders) {
          this.orders = data.orders;
          this.updatePagination();
        } else if (data?.message) {
          this.errorMessage = data.message; // Display error message if present
          this.orders = []; // Reset orders array
        }
        this.isLoading = false; // Hide loader
      },
      error: (error) => {
        console.error('Error fetching filtered orders:', error);
        this.errorMessage = 'An error occurred while applying filters.';
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
        this.outlets = Array.isArray(outlets) ? outlets : [];
      },
      (error) => {
        console.error('Error fetching outlets:', error);
      }
    );
  }

// fetch PromoCodes
  fetchPromoCodes(): void {
    this.ordersService.getAllPromoCodes().subscribe(
      (promoCodes) => {
        // Map promo codes to extract couponName
        this.promoCodes = promoCodes.map((promoCode: any) => ({
          name: promoCode.general.couponName, // Extract couponName
          id: promoCode._id, // You can also keep the ID if needed
        }));
      },
      (error) => {
        console.error('Error fetching promo codes:', error);
      }
    );
  }


  // Pagination logic
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
    return Array.from({length: endPage - startPage + 1}, (_, i) => startPage + i);
  }
}
