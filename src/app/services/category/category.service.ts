import { inject, Injectable } from '@angular/core';
import { environment } from '../../../enviornments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetAllCategoriesResponse, Category } from '../../model/category.model';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private getAllCategoriesURL = `${environment.apiBaseUrl}/category/getAllCat`;
  private updateCategoryURL = `${environment.apiBaseUrl}/category/updateCategory/`;
  private addCategoryURL = `${environment.apiBaseUrl}/category/addCategory`;
  private deleteCategoryURL = `${environment.apiBaseUrl}/category/deleteCategory/`;
  private getCategoryByIdURL = `${environment.apiBaseUrl}/category/getCategoryById/`;
  private updateSubCategoryURL = `${environment.apiBaseUrl}/category/updateSubCategory/`;
  private deleteSubCategoryURL = `${environment.apiBaseUrl}/category/deleteSubCategory/`;

  private http = inject(HttpClient);

  private authService = inject(AuthService); // Inject AuthService


  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }


  getAllCategories(): Observable<GetAllCategoriesResponse> {
    return this.http.get<GetAllCategoriesResponse>(this.getAllCategoriesURL, {
      headers: this.getHeaders()
    });
  }




  addCategory(category: Category): Observable<Category> {
    const headers = this.getHeaders();
    return this.http.post<Category>(`${this.addCategoryURL}`, category, { headers });
  }


  updateCategory(category: Category): Observable<any> {
    return this.http.put(`${this.updateCategoryURL}${category._id}`, category, {
      headers: this.getHeaders()
    });
  }


}
