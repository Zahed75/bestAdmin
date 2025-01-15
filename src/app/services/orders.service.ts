import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Import `map` to transform the response
import { environment } from '../../enviornments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private baseURL = `${environment.apiBaseUrl}/order/orders`;
  private http = inject(HttpClient);

  // Define a method to fetch and extract orders
  getOrders(): Observable<any[]> {
    return this.http.get<{ message: string; orders: any[] }>(this.baseURL).pipe(
      map((response) => response.orders) // Extract the `orders` array
    );
  }
}
