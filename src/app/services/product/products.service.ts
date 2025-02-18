import { inject, Injectable } from '@angular/core';
import { environment } from '../../../enviornments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetAllProductsResponse } from '../../model/product.model';
import { GetQuantityResponse } from '../../model/inventory.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private getAllProductsURL = `${environment.apiBaseUrl}/product/getAllProducts`;
  private getQuantityByIdProductId = `${environment.apiBaseUrl}/product/quantity`;
  private updateInventoryByQuantity = `${environment.apiBaseUrl}/inventory/update-inventory`;
  private getQuantityByProductId= `${environment.apiBaseUrl}/product/check-quantity/`
  private deleteProductByIdURL = `${environment.apiBaseUrl}/product/deleteProduct`;
  private updateProductByIdURL =`${environment.apiBaseUrl}/product/updateProduct`
  private getProductByIdURL=`${environment.apiBaseUrl}/product/getProductById`;
  private http = inject(HttpClient);

  getAllProducts(): Observable<GetAllProductsResponse> {
    return this.http.get<GetAllProductsResponse>(this.getAllProductsURL).pipe(
      map((response) => response)
    );
  }

  // Fetch product quantity by product ID
  getProductQuantityById(productId: string): Observable<GetQuantityResponse> {
    const url = `${this.getQuantityByIdProductId}/${productId}`;
    return this.http.get<GetQuantityResponse>(url).pipe(
      map(response => response)
    );
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


  getProductQuantity(productId: string): Observable<any> {
    return this.http.get<any>(`${this.getQuantityByProductId}${productId}`);
  }


  // Delete product by ID
  deleteProduct(productId: string): Observable<any> {
    return this.http.delete(`${this.deleteProductByIdURL}/${productId}`)
  }


  updateProductById(productId:string,updateData:any):Observable<any>{
    return this.http.put(`${this.updateProductByIdURL}/${productId}`,updateData)
  }


  getProductById(productId:string):Observable<any>{
    return this.http.get(`${this.getProductByIdURL}/${productId}`);
  }





}

