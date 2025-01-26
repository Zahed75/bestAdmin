import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OutletService } from '../../services/outlet.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-outlet-details',
  imports: [FormsModule, NgFor, RouterLink],
  templateUrl: './outlet-details.component.html',
  styleUrl: './outlet-details.component.css',
})
export class OutletDetailsComponent implements OnInit {
  outlet: any = {};
  isLoading: boolean = false;
  errorMessage: string = '';
  managers: any[] = [];
  selectedManager: any = null; // To store the selected manager's details

  constructor(
    private outletService: OutletService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const outletId = this.route.snapshot.paramMap.get('outletId');
    if (outletId) {
      this.fetchOutletDetails(outletId);
      this.getAllManagers();
    }
  }

  fetchOutletDetails(outletId: string): void {
    this.isLoading = true;
    this.outletService.getOutletById(outletId).subscribe({
      next: (response) => {
        this.outlet = response.outlet;
        this.outlet.id = outletId;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching outlet details:', error);
        this.errorMessage = 'Failed to load outlet details. Please try again later.';
        this.isLoading = false;
      },
    });
  }

  getAllManagers(): void {
    this.isLoading = true;
    this.outletService.getAllManagers().subscribe({
      next: (managers: any[]) => {
        this.managers = managers;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching managers:', error);
        this.errorMessage = 'Failed to load managers. Please try again later.';
        this.isLoading = false;
      },
    });
  }

  // Handle manager selection
  onManagerSelect(event: Event): void {
    const selectElement = event.target as HTMLSelectElement; // Cast to HTMLSelectElement
    const managerId = selectElement.value; // Get the selected value

    if (managerId) {
      // Find the selected manager from the managers array
      this.selectedManager = this.managers.find((manager) => manager._id === managerId);

      // Update the outlet's manager phone and email
      if (this.selectedManager) {
        this.outlet.outletManagerPhone = this.selectedManager.phoneNumber; // Use phoneNumber
        this.outlet.outletManagerEmail = this.selectedManager.email; // Use email
      }
    } else {
      // Reset if no manager is selected
      this.selectedManager = null;
      this.outlet.outletManagerPhone = '';
      this.outlet.outletManagerEmail = '';
    }
  }


}
