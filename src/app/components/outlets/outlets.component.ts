import { AfterViewInit, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { initFlowbite } from 'flowbite';
import { OutletService } from '../../services/outlet.service';
import {NgClass, NgFor, NgIf} from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-outlets',
  imports: [
    FormsModule,
    NgIf,
    NgFor,
    RouterLink,
    NgClass
  ],
  templateUrl: './outlets.component.html',
  styleUrl: './outlets.component.css'
})
export class OutletsComponent implements OnInit, AfterViewInit {

  outlets: any[] = [];
  managers: any[] = [];
  isLoading: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  paginatedOutlets: any[] = []; // Outlets to display on the current page
  totalItems: number = 0; // Total number of outlets
  totalPages: number = 0;
  filteredOutlets: any[] = []; // Filtered data for display
  searchQuery: string = ''; // Holds the search input

  router = inject(Router);
  userRole: string | null = null; // To store the user's role after login.

  constructor(
    private outletService: OutletService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.fetchManagersAndOutlets();
  }

  ngAfterViewInit(): void {
    initFlowbite();
  }


  fetchManagersAndOutlets() {
    this.isLoading = true;
    this.outletService.getAllManagers().subscribe(
      (managers: any[]) => {
        this.managers = managers;
        this.outletService.getAllOutlets().subscribe(
          (outlets: any[]) => {
            this.outlets = outlets.map((outlet) => {
              const manager = this.managers.find((manager) => manager.outlet === outlet.outletName);
              return {
                ...outlet,
                managerName: manager ? manager.userName : 'N/A',
              };
            });
            this.filteredOutlets = [...this.outlets]; // Initialize filteredOutlets
            this.totalItems = this.outlets.length;
            this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
            this.updatePaginatedOutlets();
            this.isLoading = false;
          },
          (error) => {
            console.error('Error fetching outlets:', error);
            alert('Error fetching outlets');
            this.isLoading = false;
          }
        );
      },
      (error) => {
        console.error('Error fetching managers:', error);
        alert('Error fetching managers');
        this.isLoading = false;
      }
    );
  }

  updatePaginatedOutlets() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedOutlets = this.filteredOutlets.slice(startIndex, endIndex);
  }


  onPageChange(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePaginatedOutlets();
  }

  getDisplayedRange(): string {
    const start = (this.currentPage - 1) * this.itemsPerPage + 1;
    const end = Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
    return `${start}-${end} of ${this.totalItems}`;
  }


  getPages(): number[] {
    const pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }
  onDeleteOutlet(id: number): void {
    const result = confirm('Are you sure you want to delete this outlet?');
    if (result) {
      this.isLoading = true;
      this.outletService.deleteOutletById(id).subscribe(
        (res: any) => {
          alert('Outlet deleted successfully');
          this.fetchManagersAndOutlets();
          this.isLoading = false;
        },
        (error) => {
          console.error('Error deleting outlet:', error);
          alert('Error deleting outlet');
          this.isLoading = false;
        }
      );
    }
  }


  onSearchChange() {
    if (this.searchQuery.trim() === '') {
      // If search is empty, reset to original outlets
      this.filteredOutlets = [...this.outlets];
    } else {
      // Convert search query to lowercase for case-insensitive comparison
      const query = this.searchQuery.toLowerCase();

      // Filter the table data based on search input
      this.filteredOutlets = this.outlets.filter((outlet) =>
        outlet.outletName.toLowerCase().includes(query) ||
        (outlet.managerName && outlet.managerName.toLowerCase().includes(query)) ||
        (outlet.cityName && outlet.cityName.toLowerCase().includes(query)) ||
        (outlet.areaName && outlet.areaName.toLowerCase().includes(query)) ||
        (outlet.outletManagerEmail && outlet.outletManagerEmail.toLowerCase().includes(query)) ||
        (outlet.outletManagerPhone && outlet.outletManagerPhone.includes(query)) // No need to lowercase for phone
      );
    }

    this.totalItems = this.filteredOutlets.length; // Update total items
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage); // Update total pages
    this.currentPage = 1; // Reset to first page
    this.updatePaginatedOutlets(); // Update paginated data
  }





}
