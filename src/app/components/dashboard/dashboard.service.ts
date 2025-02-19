import {inject, Injectable} from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../enviornments/environment';
import { Coupon } from '../../model/coupon.model';
import { map } from 'rxjs/operators';
import {env} from 'ckeditor5';

@Injectable({
  providedIn: 'root', // Provides the service globally
})
export class DashboardService {

  private getReportsURL = `${environment.apiBaseUrl}/admin/orders/filters`;
  tokenExpired$: Subject<boolean> = new Subject<boolean>();
  private http = inject(HttpClient);


}
