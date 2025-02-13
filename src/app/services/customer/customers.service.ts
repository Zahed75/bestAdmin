import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {environment} from '../../../enviornments/environment';
import {map} from 'rxjs/operators';
import { City } from '../../model/city.model';


@Injectable({
  providedIn: 'root'
})


export class CustomersService {

  private getAllCustomersURL=`${environment.apiBaseUrl}/customer/getCustomer`;
  private customerInfoByIdURL =`${environment.apiBaseUrl}/customer/info/`;
  private getAllCitiesURL = `${environment.apiBaseUrl}/city/getAllCities`;

  private http = inject(HttpClient);


  getAllCustomers():Observable<any>{
    return this.http.get<any>(this.getAllCustomersURL).pipe(
      map((response:any)=>{
        return response;
      })

    )
  }


  getCustomerInfoById(customerId:string):Observable<any>{
    return this.http.get(`${this.customerInfoByIdURL}${customerId}`);
  }




  getAllCities(): Observable<City[]> {
    return this.http.get<{ data: City[] }>(`${this.getAllCitiesURL}`).pipe(
      map((response) => response.data || []), // Adjust if your API wraps the data in a 'data' property
      catchError((error) => {
        console.error('Error fetching cities:', error);
        return throwError(() => new Error('Failed to load cities'));
      })
    );
  }





}
