import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { DashboardService } from '../components/dashboard/dashboard.service'; // Correct path



export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const dashService = inject(DashboardService); // Inject service

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        const isContinue = confirm(
          'Your session has expired. Do you want to login again?'
        );
        if (isContinue) {
          dashService.tokenExpired$.next(true);
        }
      }
      return throwError(() => error);
    })
  );
};
