// import {inject, Injectable} from '@angular/core';
// import {HttpClient} from '@angular/common/http';
// import {catchError, Observable, throwError} from 'rxjs';
// import {environment} from '../../../enviornments/environment';
// import {Coupon} from '../../model/coupon.model';
// import {map} from 'rxjs/operators'; // Adjust the path as needed
//
// @Injectable({
//   providedIn: 'root'
// })
//
// export class CouponService {
//
//   private getAllCouponURL = `${environment.apiBaseUrl}/discount/getAllCoupon`;
//   private deleteCouponByIdURL=`${environment.apiBaseUrl}/discount/deleteCouponById`;
//   private discountByIdURL=`${environment.apiBaseUrl}/discount/getCouponById`;
//   private UpdateDiscountByIdURL=`${environment.apiBaseUrl}/discount/updateCoupon`;
//   private getAllCategoryNameURL =`${environment.apiBaseUrl}/category/categories-name`;
//
//   private discountAddURL=`${environment.apiBaseUrl}/discount/createCoupon`;
//
//   private http=inject(HttpClient)
//
//
//
//   getAllCoupon(): Observable<Coupon[]> {
//     return this.http.get<Coupon[]>(this.getAllCouponURL);
//   }
//
//
//   deleteDiscoutById(discountId:string):Observable<any>{
//     return this.http.delete(`${this.deleteCouponByIdURL}/${discountId}`)
//   }
//
//   getDiscountById(id: string): Observable<any> {
//     return this.http.get(`${this.discountByIdURL}/${id}`);
//   }
//
//
//   updateDiscountById(discountId: string, updatedData: any): Observable<any> {
//     return this.http.put(`${this.UpdateDiscountByIdURL}/${discountId}`, updatedData);
//   }
//
//
//   getProductCategories():Observable<any>{
//     return this.http.get<any>(`${this.getAllCategoryNameURL}`);
//   }
//
//
//   createDiscount(couponData: any):Observable<any>{
//     return this.http.post<{message:string}>(this.discountAddURL,couponData).pipe(
//       map((response) => response)
//     )
//   }
//
//
// }


import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../enviornments/environment';
import { Coupon } from '../../model/coupon.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  private getAllCouponURL = `${environment.apiBaseUrl}/discount/getAllCoupon`;
  private deleteCouponByIdURL = `${environment.apiBaseUrl}/discount/deleteCouponById`;
  private discountByIdURL = `${environment.apiBaseUrl}/discount/getCouponById`;
  private updateDiscountByIdURL = `${environment.apiBaseUrl}/discount/updateCoupon`;
  private getAllCategoryNameURL = `${environment.apiBaseUrl}/category/categories-name`;
  private discountAddURL = `${environment.apiBaseUrl}/discount/createCoupon`;

  private http = inject(HttpClient);

  getAllCoupon(): Observable<Coupon[]> {
    return this.http.get<Coupon[]>(this.getAllCouponURL)
      .pipe(catchError(this.handleError));
  }

  deleteDiscoutById(discountId: string): Observable<any> {
    return this.http.delete(`${this.deleteCouponByIdURL}/${discountId}`)
      .pipe(catchError(this.handleError));
  }

  getDiscountById(id: string): Observable<any> {
    return this.http.get(`${this.discountByIdURL}/${id}`)
      .pipe(catchError(this.handleError));
  }

  updateDiscountById(discountId: string, updatedData: any): Observable<any> {
    return this.http.put(`${this.updateDiscountByIdURL}/${discountId}`, updatedData)
      .pipe(catchError(this.handleError));
  }

  getProductCategories(): Observable<any> {
    return this.http.get<any>(`${this.getAllCategoryNameURL}`)
      .pipe(catchError(this.handleError));
  }

  createDiscount(couponData: any): Observable<any> {
    return this.http.post<{ message: string }>(this.discountAddURL, couponData)
      .pipe(
        map((response) => response),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error occurred:', error);
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }
}
