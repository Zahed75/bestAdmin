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


}
