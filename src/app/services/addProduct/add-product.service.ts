import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../enviornments/environment';
import {map} from 'rxjs/operators';
import {GetAllCategoriesResponse} from '../../model/category.model';
import {Brand,CreateBrandResponse, GetAllBrandsResponse} from '../../model/brand.model';
@Injectable({
  providedIn: 'root'
})

export class AddProductService {
  private getAllBrandsURL =`${environment.apiBaseUrl}/brand/getAll`
  private createBrandURL = `${environment.apiBaseUrl}/brand/create`
  private http = inject(HttpClient);



  getAllBrands():Observable<GetAllBrandsResponse>{
    return this.http.get<GetAllBrandsResponse>(this.getAllBrandsURL);
  }



  createBrand(brandData: { name: string; title: string; description: string }): Observable<CreateBrandResponse> {
    return this.http.post<CreateBrandResponse>(this.createBrandURL, brandData);
  }

}
