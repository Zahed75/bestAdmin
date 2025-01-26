import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../enviornments/environment';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AddOutletService {

  private addOutletURL= `${environment.apiBaseUrl}/outlet/outletCreate`;
  private http = inject(HttpClient);



  addOutlet(outlet: any): Observable<any> {
    return this.http.post<{ message: string }>(this.addOutletURL, outlet).pipe(
      map((response) => response)
    );
  }



}
