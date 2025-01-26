import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {OutletService} from '../../services/outlet.service';

@Component({
  selector: 'app-outlet-creation',
  imports: [
    FormsModule,
    NgForOf,
    RouterLink
  ],
  templateUrl: './outlet-creation.component.html',
  styleUrl: './outlet-creation.component.css'
})
export class OutletCreationComponent implements OnInit {

  outlet: any = {};
  isLoading: boolean = false;
  errorMessage: string = '';
  managers: any[] = [];
  selectedManager: any = null; // To store the selected manager's details

  constructor(
    private outletService: OutletService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.getAllManagers();

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


