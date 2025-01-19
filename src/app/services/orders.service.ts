// import { inject, Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators'; // Import `map` to transform the response
// import { environment } from '../../enviornments/environment';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class OrdersService {
//   private baseURL = `${environment.apiBaseUrl}/order/orders`;
//   private http = inject(HttpClient);
//
//   // Define a method to fetch and extract orders
//   getOrders(): Observable<any[]> {
//     return this.http.get<{ message: string; orders: any[] }>(this.baseURL).pipe(
//       map((response) => response.orders) // Extract the `orders` array
//     );
//   }
// }


import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../enviornments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private ordersURL = `${environment.apiBaseUrl}/order/orders`;
  private outletsURL = `${environment.apiBaseUrl}/outlet/getAllOutlet`;
  private discountsURL = `${environment.apiBaseUrl}/discount/getAllCoupon`;
  private http = inject(HttpClient);

  // Fetch orders with optional filters
  getOrders(filters: any = {}): Observable<any[]> {
    return this.http.get<{ message: string; orders: any[] }>(this.ordersURL, { params: filters }).pipe(
      map((response) => response.orders)
    );
  }

  // Fetch all outlets
  getOutlets(): Observable<any[]> {
    return this.http.get<{ message: string; outlets: any[] }>(this.outletsURL).pipe(
      map((response) => response.outlets)
    );
  }

  // Fetch all discounts
  getDiscounts(): Observable<any[]> {
    return this.http.get<{ message: string; discounts: any[] }>(this.discountsURL).pipe(
      map((response) => response.discounts)
    );
  }
}
