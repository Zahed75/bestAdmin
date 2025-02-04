import {inject, Injectable} from '@angular/core';
import {environment} from '../../../enviornments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AddInventoryRequest, AddInventoryResponse} from '../../model/addInventory.model';
import {GetAllProductsResponse} from '../../model/product.model';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class InventoryService {


  private addInventoryURL=`${environment.apiBaseUrl}/inventory/add-Inventory`;
  private getAllProductsURL = `${environment.apiBaseUrl}/product/getAllProducts`
  private getInventoryProductsByOutletId= `${environment.apiBaseUrl}/inventory/all-products-inventory`
  private http = inject(HttpClient);




  addInventory(requestBody: AddInventoryRequest): Observable<AddInventoryResponse> {
    return this.http.post<AddInventoryResponse>(this.addInventoryURL, requestBody);
  }

  getAllProducts():Observable<GetAllProductsResponse>{
    return this.http.get<GetAllProductsResponse>(this.getAllProductsURL).pipe(
      map((response)=>response)
    );
  }


  InventoryProductsByOutletId(outletId:string):Observable<any>{
    return this.http.get(`${this.getInventoryProductsByOutletId}/${outletId}`);
  }



}
