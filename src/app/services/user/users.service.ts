import {inject, Injectable} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../../enviornments/environment';
import { map } from 'rxjs/operators';
import { User, CreateUserRequest, CreateUserResponse } from '../../model/user.model';
@Injectable({
  providedIn: 'root'
})
export class UsersService {


  private userManageURL =`${environment.apiBaseUrl}/auth/userManage`;
  private getAllManagersURL=`${environment.apiBaseUrl}/auth/managers`;
  private http = inject(HttpClient);




  // Method to create a new user
  createUser(userData: CreateUserRequest): Observable<CreateUserResponse> {
    return this.http.post<CreateUserResponse>(`${this.userManageURL}`, userData).pipe(
      catchError(this.handleError)
    );
  }



  getAllManagers(): Observable<{ users: User[] }> {
    return this.http.get<{ users: User[] }>(this.getAllManagersURL).pipe(
      catchError(this.handleError)
    );
  }




  // Handle HTTP errors
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }


}
