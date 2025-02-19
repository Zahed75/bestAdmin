import {inject, Injectable} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../enviornments/environment';
import { Coupon } from '../../model/coupon.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private getReportsURL=`${environment.apiBaseUrl}/reports/totalSales`
  private http = inject(HttpClient);





  getReports():Observable<any>{
    return this.http.get<any>(`${this.getReportsURL}`).pipe
    (catchError(this.handleError))
  }



  private handleError(error: HttpErrorResponse) {
    console.error('Error occurred:', error);
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }

}
