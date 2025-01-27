import {Component, OnInit} from '@angular/core';
import {OrdersService} from '../../services/orders.service';
import {DatePipe, DecimalPipe, NgClass, NgFor, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, RouterLink, RouterOutlet} from '@angular/router';

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
    DatePipe,
    RouterLink,
  ],
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  paginatedOrders: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;
  isLoading: boolean = false;
  isFilterModalOpen = false;
  outlets: any[] = [];
  promoCodes: any[] = [];
  errorMessage: string = '';
  showModal: boolean = false;
  filteredOrders: any[] = []; // Orders to display based on search
 // Paginated data
  searchQuery: string = '';
  totalItems: number = 0; // Total number of items after filtering

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
    private ordersService: OrdersService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.fetchOrders();
    this.fetchOutlets();
    this.fetchPromoCodes();
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
        console.log('Fetched orders:', data); // Log the fetched data

        // Ensure the data is an array and assign it to both `orders` and `filteredOrders`
        this.orders = Array.isArray(data) ? data : [];
        this.filteredOrders = [...this.orders];

        // Update pagination variables
        this.totalItems = this.filteredOrders.length;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        this.currentPage = 1; // Reset to the first page

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
          name: promoCode.general.couponName,
          id: promoCode._id,
        }));
      },
      (error) => {
        console.error('Error fetching promo codes:', error);
      }
    );
  }



  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    // Update paginated data from filteredOrders
    this.paginatedOrders = this.filteredOrders.slice(startIndex, endIndex);
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


  onDelete(id: number) {
    const result = confirm('Are you sure you want to delete this order?');
    if (result) {
      this.ordersService.deleteOrderById(id).subscribe((res: any) => {
          alert("Order deleted successfully");
          this.fetchOrders()
        }, (error) => {
          alert("Error deleting order");
        }
      )
    }

  }



  // Search logic similar to the outlet search
  onSearchChange(): void {
    const query = this.searchQuery.trim().toLowerCase();

    if (query === '') {
      // Reset filteredOrders to original orders when search query is empty
      this.filteredOrders = [...this.orders];
    } else {
      // Filter orders based on the search query
      this.filteredOrders = this.orders.filter((order) =>
        (order.orderId && order.orderId.toString().toLowerCase().includes(query)) ||
        (order.status && order.status.toLowerCase().includes(query)) ||
        (order.customerName && order.customerName.toLowerCase().includes(query)) ||
        (order.customerPhone && order.customerPhone.includes(query)) || // Phone numbers are numeric
        (order.customerEmail && order.customerEmail.toLowerCase().includes(query)) ||
        (order.address && order.address.toLowerCase().includes(query)) ||
        (order.orderType && order.orderType.toLowerCase().includes(query))
      );
    }

    // Update pagination based on the filtered results
    this.totalItems = this.filteredOrders.length;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.currentPage = 1; // Reset to the first page
    this.updatePagination();
  }





}




