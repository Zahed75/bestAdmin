import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root', // Provides the service globally
})
export class DashboardService {
  tokenExpired$: Subject<boolean> = new Subject<boolean>();
}
