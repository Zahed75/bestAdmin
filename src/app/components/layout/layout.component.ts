import {Component, inject} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {Router,NavigationEnd} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {DashboardService} from '../dashboard/dashboard.service';
import {environment} from '../../../enviornments/environment'; // Import environment

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'] // Fixed typo from 'styleUrl' to 'styleUrls'
})
export class LayoutComponent {
  router = inject(Router);
  dashService = inject(DashboardService); // Use injected service
  http = inject(HttpClient);
  sidebarOpen = false;  // Sidebar state
  constructor() {
    this.dashService.tokenExpired$.subscribe((Res: boolean) => {
      if (Res) {
        const loggedData = localStorage.getItem('token');
        if (loggedData) {
          const loggedUser = JSON.parse(localStorage.getItem('user') || '{}');
          const Obj = {
            email: loggedUser.email,
            token: loggedUser.accessToken,
            refreshToken: localStorage.getItem('refreshToken'),
          };
          this.http
            .post(
              `${environment.apiBaseUrl}/auth/refreshToken`, // Use environment.apiBaseUrl
              Obj
            )
            .subscribe((res: any) => {
              localStorage.setItem('user', JSON.stringify(res.user));
              localStorage.setItem('token', res.user.accessToken);
              localStorage.setItem('refreshToken', res.user.refreshToken);
            });
        }
      }
    });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.sidebarOpen = false; // Close sidebar on route change
      }
    });
  }

  logOut() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this.router.navigateByUrl('login');
  }


  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}

