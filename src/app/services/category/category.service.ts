import {inject, Injectable} from '@angular/core';
import {environment} from '../../../enviornments/environment';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetAllCategoriesResponse } from '../../model/category.model';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private getAllCategoriesURL=`${environment.apiBaseUrl}/category/getAllCat`;
  private http = inject(HttpClient);



  getAllCategories():Observable<GetAllCategoriesResponse>{
    return this.http.get<GetAllCategoriesResponse>(this.getAllCategoriesURL)
  }


}
