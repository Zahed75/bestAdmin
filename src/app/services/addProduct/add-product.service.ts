import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {environment} from '../../../enviornments/environment';
import {map} from 'rxjs/operators';
import {GetAllCategoriesResponse} from '../../model/category.model';
import {Brand,CreateBrandResponse, GetAllBrandsResponse} from '../../model/brand.model';
import {env} from 'ckeditor5';
import {Product} from '../../model/product.model';
@Injectable({
  providedIn: 'root'
})

export class AddProductService {
  private getAllBrandsURL =`${environment.apiBaseUrl}/brand/getAll`;
  private createBrandURL = `${environment.apiBaseUrl}/brand/create`;
  private createProductURL = `${environment.apiBaseUrl}/product/addProduct`;

  private http = inject(HttpClient);



  getAllBrands():Observable<GetAllBrandsResponse>{
    return this.http.get<GetAllBrandsResponse>(this.getAllBrandsURL);
  }



  createBrand(brandData: { name: string; title: string; description: string }): Observable<CreateBrandResponse> {
    return this.http.post<CreateBrandResponse>(this.createBrandURL, brandData);
  }


  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.createProductURL, product).pipe(
      catchError(error => {
        console.error('Error creating product:', error);
        return throwError(() => new Error('Failed to create product'));
      })
    );
  }


}
