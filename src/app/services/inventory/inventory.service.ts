import {inject, Injectable} from '@angular/core';
import {environment} from '../../../enviornments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AddInventoryRequest, AddInventoryResponse} from '../../model/addInventory.model';
import {GetAllProductsResponse} from '../../model/product.model';
import {map} from 'rxjs/operators';
import {AuthService} from '../auth.service';
@Injectable({
  providedIn: 'root'
})
export class InventoryService {


  private addInventoryURL=`${environment.apiBaseUrl}/inventory/add-Inventory`;
  private getAllProductsURL = `${environment.apiBaseUrl}/product/getAllProducts`
  private getInventoryProductsByOutletId= `${environment.apiBaseUrl}/inventory/all-products-inventory`
  private deleteInventoryById = `${environment.apiBaseUrl}/inventory/delete-inventory`
  private updateInventoryByQuantity = `${environment.apiBaseUrl}/inventory/update-inventory`;



  private http = inject(HttpClient);
  private authService = inject(AuthService); // Inject AuthService

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }


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


  // inventory.service.ts
  deleteInventoryProduct(outletId: string, productId: string): Observable<any> {
    return this.http.delete(`${this.deleteInventoryById}/${outletId}/${productId}`);
  }


  // updateTheInventory
  updateInventory(outletId: string, productId: string, newQuantity: number): Observable<any> {
    const payload = {
      outletId: outletId,
      productId: productId,
      newQuantity: newQuantity
    };
    return this.http.put(this.updateInventoryByQuantity, payload);
  }






}
