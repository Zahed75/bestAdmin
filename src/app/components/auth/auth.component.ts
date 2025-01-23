// import { Component, inject } from '@angular/core';
// import { Router, RouterOutlet } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { AuthService } from '../../services/auth.service';
// import {NgIf} from '@angular/common';
//
// @Component({
//   selector: 'app-auth',
//   imports: [
//     FormsModule,
//     RouterOutlet,
//     NgIf
//   ],
//   templateUrl: './auth.component.html',
//   styleUrls: ['./auth.component.css'],
//
// })
// export class AuthComponent {
//   loginData = {
//     email: '',
//     password: '',
//   };
//
//   authService = inject(AuthService);
//   router = inject(Router);
//
//   onLogin() {
//     this.authService.signInAdmin(this.loginData).subscribe(
//
//       (res: any) => {
//         if (res.user?.accessToken) {
//           localStorage.setItem('accessToken', res.user.accessToken);
//           localStorage.setItem('users', JSON.stringify(res.user));
//           this.router.navigateByUrl("layout/dashboard");
//         } else {
//           alert(res.message || 'Login failed.');
//         }
//       },
//       (err) => {
//         alert(err.error?.message || 'An error occurred. Please try again.');
//       }
//     );
//   }
//
//
// }

import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-auth',
  imports: [
    FormsModule,
    RouterOutlet,
    NgIf,
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  loginData = {
    email: '',
    password: '',
  };

  authService = inject(AuthService);
  router = inject(Router);

  userRole: string | null = null; // To store the user's role after login.

  onLogin() {
    this.authService.signInAdmin(this.loginData).subscribe(
      (res: any) => {
        if (res.user?.accessToken) {
          // Store token and user info
          localStorage.setItem('accessToken', res.user.accessToken);
          localStorage.setItem('users', JSON.stringify(res.user));

          // Extract role from user object
          this.userRole = res.user.role;
          localStorage.setItem('userRole', this.userRole || '');

          // Redirect based on role
          this.redirectUserBasedOnRole();
        } else {
          alert(res.message || 'Login failed.');
        }
      },
      (err) => {
        alert(err.error?.message || 'An error occurred. Please try again.');
      }
    );
  }

  redirectUserBasedOnRole() {
    switch (this.userRole) {
      case 'HQ':
        this.router.navigateByUrl('layout/dashboard'); // HQ has full access
        break;
      case 'BA':
        this.router.navigateByUrl('layout/customers'); // BA users redirected to Customers
        break;
      case 'MGR':
        this.router.navigateByUrl('layout/reporting'); // Managers redirected to Reporting
        break;
      case 'CUS':
        this.router.navigateByUrl('layout/order'); // Customers redirected to Orders
        break;
      default:
        this.router.navigateByUrl('login'); // Default case for invalid roles
        alert('Unauthorized role detected. Please contact support.');
    }
  }
}

