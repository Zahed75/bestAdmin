import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {ReportsService} from '../../services/reports/reports.service';
import {NgFor} from '@angular/common';

@Component({
  selector: 'app-reporting',
  imports: [
    FormsModule,
  ],
  templateUrl: './reporting.component.html',
  styleUrl: './reporting.component.css'
})
export class ReportingComponent implements OnInit{

  isLoading=false;
  reports:any={}

  constructor(
    private reportService:ReportsService,
    private route:ActivatedRoute,
  ) {
  }


  ngOnInit() {

    this.loadsReport();
  }





  loadsReport(): void {
    this.isLoading = true;
    this.reportService.getReports().subscribe({
      next: (response: any) => {
        this.reports = response.totalSalesAndNet; // Correctly assigning the response data
        this.isLoading = false;
      },
      error: (error) => {
        console.error("Error Loading Reports", error);
        this.isLoading = false;
      }
    });
  }


}
