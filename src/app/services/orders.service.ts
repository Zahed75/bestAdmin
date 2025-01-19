// import { inject, Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { environment } from '../../enviornments/environment'; // Fixed the typo in the import path
//
// @Injectable({
//   providedIn: 'root'
// })
// export class OrdersService {
//   private baseURL = `${environment.apiBaseUrl}/order/orders`; // Base URL for orders
//   private http = inject(HttpClient);
//
//   // Define a method to fetch all orders
//   getOrders(): Observable<any[]> {
//     return this.http.get<{ message: string; orders: any[] }>(this.baseURL).pipe(
//       map((response) => response.orders) // Extract the `orders` array from the response
//     );
//   }
//
// }



import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviornments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private baseURL = `${environment.apiBaseUrl}/order/orders`;
  private outletURL = `${environment.apiBaseUrl}/outlet/getAllOutlet`;
  private promoCodeURL = `${environment.apiBaseUrl}/discount/getAllCoupon`;
  private filterURL = `${environment.apiBaseUrl}/admin/orders/filters`;  // New endpoint for filtering
  private http = inject(HttpClient);

  // Method to fetch all orders
  getOrders(): Observable<any[]> {
    return this.http.get<{ message: string; orders: any[] }>(this.baseURL).pipe(
      map((response) => response.orders) // Extract the orders array
    );
  }

  // Method to fetch filtered orders
  getFilteredOrders(filterParams: any): Observable<any[]> {
    const { outlet, orderStatus, promoCode, paymentMethod, startDate, endDate } = filterParams;

    // Prepare query parameters
    const queryParams = new URLSearchParams();
    if (outlet) queryParams.append('outlet', outlet);
    if (orderStatus) queryParams.append('orderStatus', orderStatus);
    if (promoCode) queryParams.append('promoCode', promoCode);
    if (paymentMethod) queryParams.append('paymentMethod', paymentMethod);
    if (startDate) queryParams.append('startDate', startDate);
    if (endDate) queryParams.append('endDate', endDate);

    // Send the request with dynamic query parameters
    return this.http
      .get<{ message: string; orders: any[] }>(`${this.filterURL}?${queryParams.toString()}`)
      .pipe(map((response) => response.orders));
  }

  // Method to fetch all outlets
  getAllOutlets(): Observable<any[]> {
    return this.http.get<{ message: string; outlet: any[] }>(this.outletURL).pipe(
      map((response) => response.outlet) // Extract the 'outlet' array from the response
    );
  }




  // Method to fetch all promo codes
  getAllPromoCodes(): Observable<any[]> {
    return this.http.get<{ message: string; data: any[] }>(this.promoCodeURL).pipe(
      map((response) => response.data) // Extract the promo codes array
    );
  }
}
