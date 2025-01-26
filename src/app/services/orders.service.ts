import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../enviornments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private baseURL = `${environment.apiBaseUrl}/order/orders`;
  private outletURL = `${environment.apiBaseUrl}/outlet/getAllOutlet`;
  private promoCodeURL = `${environment.apiBaseUrl}/discount/getAllCoupon`;
  private filterURL = `${environment.apiBaseUrl}/admin/orders/filters`;
  private getOrderByIdURL = `${environment.apiBaseUrl}/order/getOrderById`;
  private deleteOrderByIdURL = `${environment.apiBaseUrl}/order/deleteOrder`;
  private updateOrderByIdURL = `${environment.apiBaseUrl}/order/updateOrder`;
  private updateOrderStatusURL = `${environment.apiBaseUrl}/order`;
  private http = inject(HttpClient);




  // Method to fetch all orders
  getOrders(): Observable<any[]> {
    return this.http.get<{ message: string; orders: any[] }>(this.baseURL).pipe(
      map((response) => response.orders) // Extract the orders array
    );
  }

  // Method to fetch filtered orders
  getFilteredOrders(filterParams: any): Observable<any[]> {
    const {outlet, orderStatus, promoCode, paymentMethod, startDate, endDate} = filterParams;

    // Prepare query parameters
    const queryParams = new URLSearchParams();
    if (outlet) queryParams.append('outlet', outlet);
    if (orderStatus) queryParams.append('orderStatus', orderStatus);
    if (promoCode) queryParams.append('promoCode', promoCode);
    if (paymentMethod) queryParams.append('paymentMethod', paymentMethod);
    if (startDate) queryParams.append('startDate', startDate);
    if (endDate) queryParams.append('endDate', endDate);


    return this.http
      .get<{ message: string; orders: any[] }>(`${this.filterURL}?${queryParams.toString()}`)
      .pipe(map((response) => response.orders));
  }


  // Method to fetch all outlets
  getAllOutlets(): Observable<any[]> {
    return this.http.get<{ message: string; outlet: any[] }>(this.outletURL).pipe(
      map((response) => response.outlet)
    );
  }


  getAllPromoCodes(): Observable<any[]> {
    return this.http.get<{ message: string, coupons: any[] }>(this.promoCodeURL).pipe(
      map((response) => response.coupons)
    );
  }


// getOrderByID

  getOrderById(orderId: string): Observable<any> {
    return this.http.get<any>(`${this.getOrderByIdURL}/${orderId}`);
  };


  // delete Order
  deleteOrderById(id: number): Observable<any> {
    return this.http.delete(`${this.deleteOrderByIdURL}/${id}`);
  }


  updateOrderById(id: string, orderData: any): Observable<any> {
    return this.http.put(`${this.updateOrderByIdURL}/${id}`, orderData);
  }


  updateOrderStatus(orderId: string, orderStatus: string): Observable<any> {
    const payload = {orderStatus}; // Payload as per your API
    return this.http.put(`${this.updateOrderStatusURL}/${orderId}`, payload);
  }


}









