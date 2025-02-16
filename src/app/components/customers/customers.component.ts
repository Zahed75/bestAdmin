import { Component, OnInit } from '@angular/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CustomersService } from '../../services/customer/customers.service';
import { City } from '../../model/city.model';

@Component({
  selector: 'app-customers',
  imports: [
    CKEditorModule,
    FormsModule,
    NgIf,
    NgFor,
    RouterLink
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit {
  customers: any[] = [];
  cities: City[] = []; // Add this line to store cities
  customerId: string = '';
  customerInfo: any;
  isLoading: boolean = false;
  paginatedCustomers: any[] = []; // Add this line to declare the property
  currentPage: number = 1;
  itemsPerPage: number = 2;
  totalItems: number = this.customers.length;
  totalPages: number = Math.ceil(this.totalItems / this.itemsPerPage);
  searchTerm: string = ''; // Added for search functionality

  constructor(
    private customerService: CustomersService,
    
  ) { }

  ngOnInit() {
    this.getCustomers();
    this.getCities(); // Fetch cities
  }

 
  getMinValue(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
  }
  getCustomers(): void {
    this.isLoading = true; // Show loading state
    this.customerService.getAllCustomers().subscribe({
      next: (response: any) => {
        this.customers = response.customer;
        this.totalItems = this.customers.length; // Set total number of customers
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage); // Calculate total pages
        this.updatePaginatedCustomers(); // Update paginated customers
        this.isLoading = false; // Hide loading state
        console.log('Customers:', this.customers);
      },
      error: (error) => {
        console.error('Error:', error);
        this.isLoading = false; // Hide loading state
      }
    });
  }

  getCities(): void {
    this.customerService.getAllCities().subscribe({
      next: (data: City[]) => {
        this.cities = data;
        console.log('Cities:', this.cities);
      },
      error: (err) => {
        console.error('Error fetching cities:', err);
      }
    });
  }

  // Helper function to get city name by city ID
  getCityName(cityId: string): string {
    const city = this.cities.find(c => c._id === cityId);
    return city ? city.cityName : 'Unknown City';
  }

  deleteCustomer(customerId: string): void {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customerService.deleteCustomerById(customerId).subscribe({
        next: (response) => {
          alert('Customer Deleted Successfully!');
          window.location.reload(); // Reload the page to reflect changes
        },
        error: (error) => {
          alert('Failed to delete customer, try again');
        }
      });
    }
  }

  // Pagination methods
  updatePaginatedCustomers(): void {
    // Filter by search term (case insensitive)
    const filteredCustomers = this.customers.filter(customer =>
      Object.values(customer).some(value => {
        // Ensure value is a string or number before using toString()
        if (typeof value === 'string' || typeof value === 'number') {
          return value.toString().toLowerCase().includes(this.searchTerm.toLowerCase());
        }
        return false;
      })
    );
  
    // Update totalItems and totalPages based on filtered results
    this.totalItems = filteredCustomers.length;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  
    // Paginate the filtered customers
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = this.currentPage * this.itemsPerPage;
    this.paginatedCustomers = filteredCustomers.slice(startIndex, endIndex);
  }
  

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedCustomers();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedCustomers();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedCustomers();
    }
  }



  onSearchChange(): void {
    this.currentPage = 1; // Reset to the first page on search
    this.updatePaginatedCustomers();
  }

  
}