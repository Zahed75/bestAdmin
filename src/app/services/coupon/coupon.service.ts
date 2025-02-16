import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {environment} from '../../../enviornments/environment';
import {Coupon} from '../../model/coupon.model'; // Adjust the path as needed

@Injectable({
  providedIn: 'root'
})

export class CouponService {

  private getAllCouponURL = `${environment.apiBaseUrl}/discount/getAllCoupon`;
  private deleteCouponByIdURL=`${environment.apiBaseUrl}/discount/deleteCouponById`;
  private discountByIdURL=`${environment.apiBaseUrl}/discount/getCouponById`;
  private UpdateDiscountByIdURL=`${environment.apiBaseUrl}/discount/updateCoupon`;

  private http=inject(HttpClient)



  getAllCoupon(): Observable<Coupon[]> {
    return this.http.get<Coupon[]>(this.getAllCouponURL);
  }


  deleteDiscoutById(discountId:string):Observable<any>{
    return this.http.delete(`${this.deleteCouponByIdURL}/${discountId}`)
  }

  getDiscountById(id: string): Observable<any> {
    return this.http.get(`${this.discountByIdURL}/${id}`);
  }


  updateDiscountById(discountId: string, updatedData: any): Observable<any> {
    return this.http.put(`${this.UpdateDiscountByIdURL}/${discountId}`, updatedData);
  }




}
