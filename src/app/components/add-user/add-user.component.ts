import {Component, OnInit} from '@angular/core';
import {CreateUserRequest, User} from '../../model/user.model';
import {UsersService} from '../../services/user/users.service';
import {OutletService} from '../../services/outlet.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgFor, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-add-user',
  imports: [
    NgFor,
    FormsModule,
    NgIf
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent implements OnInit {


  users: User[] = [];

  newUser: CreateUserRequest = {
    userName: '',
    email: '',
    firstName: '',
    lastName: '',
    profilePicture: '',
    outletId: '',
    phoneNumber: '',
    password: '',
    role: ''
  };

  outlets: any[] = [];
  isLoading = false;
  constructor(
    private userService: UsersService,
    private outletService: OutletService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.onLoadsOutlets();
  }

  createUser(): void {
    this.isLoading=true
    this.userService.createUser(this.newUser).subscribe({
      next: (response) => {
        console.log('User created successfully:', response);
        this.router.navigateByUrl('/layout/users')
        this.isLoading=false
      },
      error: (err) => {
        console.error('Failed to create user:', err);
        this.isLoading=false
      }
    });
  }


  onLoadsOutlets(): void {
    this.isLoading = true;
    this.outletService.getAllOutlets().subscribe({
      next: (response: any) => {
        this.outlets = response; // Directly assign the response as it's already mapped
        this.isLoading = false;
      },
      error: (error) => {
        console.error("Error loading outlets:", error);
        this.isLoading = false;
      }
    });
  }


  ensureCountryCode() {
    if (!this.newUser.phoneNumber.startsWith('88')) {
      this.newUser.phoneNumber = '88' + this.newUser.phoneNumber;
    }
  }


}
