import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../enviornments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private baseURL = `${environment.apiBaseUrl}/order/orders`;

  private http = inject(HttpClient);

  // Define a method to fetch orders from API
  getOrders(): Observable<any> {
    return this.http.get(this.baseURL); // Sends a GET request to the URL
  }
}
