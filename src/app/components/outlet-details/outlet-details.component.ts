import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {OutletService} from '../../services/outlet.service';

@Component({
  selector: 'app-outlet-details',
  imports: [
    RouterLink,
    FormsModule,
  ],
  templateUrl: './outlet-details.component.html',
  styleUrl: './outlet-details.component.css'
})
export class OutletDetailsComponent implements OnInit {
  outlet: any = {};
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private outletService: OutletService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    const outletId = this.route.snapshot.paramMap.get('outletId');
    if (outletId) {
      this.fetchOutletDetails(outletId);
    }
  }


  fetchOutletDetails(outletId: string): void {
    this.isLoading = true;
    this.outletService.getOutletById(outletId).subscribe({
      next: (response) => {
        this.outlet = response.outlet;
        this.outlet.id= outletId;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching outlet details:', error);
        this.errorMessage = 'Failed to load outlet details. Please try again later.';
        this.isLoading = false;
      },
    });
  }

}
