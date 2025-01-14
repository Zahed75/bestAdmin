import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  imports: [FormsModule],
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

  onLogin() {
    this.authService.signInAdmin(this.loginData).subscribe(
      (res: any) => {
        if (res.user?.accessToken) {
          localStorage.setItem('accessToken', res.user.accessToken);
          localStorage.setItem('refreshToken', res.user.refreshToken);
          localStorage.setItem('userId', res.user.userId);
          localStorage.setItem('email', res.user.email);
          localStorage.setItem('role', res.user.role);
          localStorage.setItem('users', JSON.stringify(res.user));
          this.router.navigateByUrl('/layout/dashboard');
        } else {
          alert(res.message || 'Login failed.');
        }
      },
      (err) => {
        alert(err.error?.message || 'An error occurred. Please try again.');
      }
    );
  }
}
