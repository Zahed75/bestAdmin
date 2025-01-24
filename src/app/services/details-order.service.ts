import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../enviornments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DetailsOrderService {

  private outletURL = `${environment.apiBaseUrl}/outlet/getAllOutlet`;
  private transferOrderURL = `${environment.apiBaseUrl}/outlet/transfer-order`;
  private http = inject(HttpClient);


  getAllOutlets(): Observable<any[]> {
    return this.http.get<{ message: string; outlet: any[] }>(this.outletURL).pipe(
      map((response) => {
        console.log('API response:', response); // Log the raw response
        return response?.outlet || []; // Return the 'outlet' array
      })
    );
  }


  transferOrder(payload: { orderId: string, outletId: string }): Observable<any> {
    console.log('Transfer Payload:', payload); // Log to confirm payload
    return this.http.post<{ message: string }>(this.transferOrderURL, payload);
  }




}
