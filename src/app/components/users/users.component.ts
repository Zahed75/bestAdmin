import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {UsersService} from '../../services/user/users.service';
import {OutletService} from '../../services/outlet.service';
import {User, CreateUserRequest, CreateUserResponse} from '../../model/user.model';
import {NgClass, NgFor, NgIf} from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    NgIf,
    NgFor,
    NgClass,

  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

  isLoading = false;
  users: User [] = []
  filteredUsers: User[] = []; // Users after applying search filter
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 5; // Number of items per page
  totalUsers: number = 0;
  userRole: string | null = null; // To store the user's role after login.

  constructor(
    private userService: UsersService,
    private outletService: OutletService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }


  ngOnInit() {
    this.onLoadsManagers();
  }


  onLoadsManagers(): void {
    this.isLoading = true;
    this.userService.getAllManagers().subscribe({
      next: (response) => {
        this.users = response.users; // Assuming the API returns { users: User[] }
        this.totalUsers = this.users.length;
        this.applyFilter(); // Apply initial filter
        this.isLoading = false;
      },
      error: (error) => {
        console.error("Error fetching users", error);
        this.isLoading = false;
      }
    });
  }

  applyFilter(): void {
    if (this.searchTerm) {
      this.filteredUsers = this.users.filter(user =>
        user.userName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.phoneNumber.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredUsers = this.users; // No filter applied
    }
    this.currentPage = 1; // Reset to the first page after filtering
    this.totalUsers = this.filteredUsers.length; // Update total users count
  }

  onSearchTermChange(): void {
    this.applyFilter(); // Trigger filtering whenever the search term changes
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  getPaginatedUsers(): User[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredUsers.slice(startIndex, endIndex);
  }

  getPages(): number[] {
    const totalPages = Math.ceil(this.totalUsers / this.pageSize);
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // Expose Math.min to the template
  min(a: number, b: number): number {
    return Math.min(a, b);
  }


}
