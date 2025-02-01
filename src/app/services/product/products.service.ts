import {inject, Injectable} from '@angular/core';
import {environment} from '../../../enviornments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { GetAllProductsResponse } from '../../model/product.model';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private getAllProductsURL = `${environment.apiBaseUrl}/product/getAllProducts`;
  private http = inject(HttpClient);


  getAllProducts():Observable<GetAllProductsResponse>{
    return this.http.get<GetAllProductsResponse>(this.getAllProductsURL).pipe(
      map((response)=>{
        return response
      })
    )
  }

}
