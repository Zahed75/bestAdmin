import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseURL = 'https://app.bestelectronics.com.bd/api/v1/auth';

  private http = inject(HttpClient);

  signInAdmin(loginData: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseURL}/signInAdmin`, loginData);
  }

}
