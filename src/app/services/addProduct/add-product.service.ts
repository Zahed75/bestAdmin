import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../enviornments/environment';
import {map} from 'rxjs/operators';
import {GetAllCategoriesResponse} from '../../model/category.model';
@Injectable({
  providedIn: 'root'
})
export class AddProductService {

  private getAllCategoriesURL = `${environment.apiBaseUrl}/category/getAllCat`;
  private http = inject(HttpClient);




  getAllCategories(): Observable<GetAllCategoriesResponse> {
    return this.http.get<GetAllCategoriesResponse>(this.getAllCategoriesURL, {
    });
  }

}
