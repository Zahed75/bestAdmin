import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {OutletService} from '../../services/outlet.service';
import {NgFor} from '@angular/common';

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
  managerList:any={}
  outletObj: any = {

    outletName: '',
    outletLocation: '',
    outletImage: '',
    outletManager: '',
    cityName: '',
    outletManagerEmail: '',
    outletManagerPhone: '',
    areaName: ''

  }
  router = inject(Router);

  constructor(
    private outletService: OutletService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    const outletId = this.route.snapshot.paramMap.get('outletId');
    if (outletId) {
      this.fetchOutletDetails(outletId);
      this.getAllManagers();
      this.fetchOutletDetailsAndManagers(outletId);
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


  fetchOutletDetailsAndManagers(outletId: string): void {
    this.isLoading = true;

    // Fetch outlet details and managers simultaneously
    Promise.all([
      this.outletService.getOutletById(outletId).toPromise(),
      this.outletService.getAllManagers().toPromise()
    ])
      .then(([outletResponse, managers]) => {
        // Set outlet data
        this.outlet = outletResponse.outlet;
        this.outlet.id = outletId;

        // Set managers list
        this.managerList = managers;

        // Set default manager details based on `outlet.outletManager`
        const selectedManager = this.managers.find(
          (manager) => manager._id === this.outlet.outletManager
        );

        if (selectedManager) {
          this.outlet.outletManagerPhone = selectedManager.phoneNumber;
          this.outlet.outletManagerEmail = selectedManager.email;
        }

        this.isLoading = false;
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        this.errorMessage = 'Failed to load outlet details and managers.';
        this.isLoading = false;
      });
  }


  UpdateOutletById(outletId: string): void {
    this.outletService.updateOutletById(outletId, this.outlet).subscribe({
      next: (res: any) => {
        if(res.message==="Outlet Updated successfully"){
          alert('Outlet Updated Successfully');
          this.router.navigateByUrl('/layout/outlets')
        }else{
          alert("Failed to Update")
        }
      },
      error: (error) => {
        alert('An error occurred. Please try again.');
      },
    });
  }




}


