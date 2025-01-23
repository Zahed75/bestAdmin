import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviornments/environment';
import { RolePermissions } from '../shared/constants/permissions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseURL = `${environment.apiBaseUrl}/auth`;

  private http = inject(HttpClient);

  // Admin Sign-In
  signInAdmin(loginData: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseURL}/signInAdmin`, loginData);
  }

  // Get the current user's role from localStorage
  getRole(): string | null {
    const user = localStorage.getItem('users');
    return user ? JSON.parse(user).role : null;
  }

  // Check if the user has permission for a specific action
  hasPermission(action: string): boolean {
    const role = this.getRole();

    if (!role || !(role in RolePermissions)) {
      return false; // No role or invalid role means no permission
    }

    const permissions = RolePermissions[role as keyof typeof RolePermissions];
    return permissions.includes(action);
  }


  // Check if the user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }
}
