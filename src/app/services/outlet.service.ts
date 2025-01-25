import {inject, Injectable} from '@angular/core';
import {environment} from '../../enviornments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OutletService {

  private outletURL = `${environment.apiBaseUrl}/outlet/getAllOutlet`;
  private allManagerURL = `${environment.apiBaseUrl}/auth/managers`;
  private http = inject(HttpClient);


  getAllOutlets(): Observable<any[]> {
    return this.http.get<{ message: string; outlet: any[] }>(this.outletURL).pipe(
      map((response) => response.outlet)
    );
  }

  getAllManagers(): Observable<any[]> {
    return this.http.get<{message:string;users:any[]}>(this.allManagerURL).pipe(
      map((response) => response.users)
    )
  }


}
