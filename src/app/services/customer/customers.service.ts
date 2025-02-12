import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../enviornments/environment';
import {map} from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})


export class CustomersService {

  private getAllCustomersURL=`${environment.apiBaseUrl}/customer/getCustomer`;
  private customerInfoByIdURL =`${environment.apiBaseUrl}/customer/info/`
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





}
