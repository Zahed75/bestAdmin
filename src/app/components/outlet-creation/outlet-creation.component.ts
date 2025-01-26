// import {Component, inject, OnInit} from '@angular/core';
// import {FormsModule} from '@angular/forms';
// import {NgForOf} from '@angular/common';
// import {ActivatedRoute, Router, RouterLink} from '@angular/router';
// import {OutletService} from '../../services/outlet.service';
// import { AddOutletService } from '../../services/add-outlet.service';
//
// @Component({
//   selector: 'app-outlet-creation',
//   imports: [
//     FormsModule,
//     NgForOf,
//     RouterLink
//   ],
//   templateUrl: './outlet-creation.component.html',
//   styleUrl: './outlet-creation.component.css'
// })
// export class OutletCreationComponent implements OnInit {
//
//   outlet: any = {};
//   isLoading: boolean = false;
//   errorMessage: string = '';
//   managers: any[] = [];
//   selectedManager: any = null; // To store the selected manager's details
//   outlets: any={};
//   constructor(
//     private outletService: OutletService,
//     private addOutletService: AddOutletService,
//     private route: ActivatedRoute
//   ) {
//   }
//   router = inject(Router);
//
//   ngOnInit() {
//     this.getAllManagers();
//
//   }
//
//
//   getAllManagers(): void {
//     this.isLoading = true;
//     this.outletService.getAllManagers().subscribe({
//       next: (managers: any[]) => {
//         this.managers = managers;
//         this.isLoading = false;
//       },
//       error: (error) => {
//         console.error('Error fetching managers:', error);
//         this.errorMessage = 'Failed to load managers. Please try again later.';
//         this.isLoading = false;
//       },
//     });
//   }
//
// // Handle manager selection
//   onManagerSelect(event: Event): void {
//     const selectElement = event.target as HTMLSelectElement; // Cast to HTMLSelectElement
//     const managerId = selectElement.value; // Get the selected value
//
//     if (managerId) {
//       // Find the selected manager from the managers array
//       this.selectedManager = this.managers.find((manager) => manager._id === managerId);
//
//       // Update the outlet's manager phone and email
//       if (this.selectedManager) {
//         this.outlet.outletManagerPhone = this.selectedManager.phoneNumber; // Use phoneNumber
//         this.outlet.outletManagerEmail = this.selectedManager.email; // Use email
//       }
//     } else {
//       // Reset if no manager is selected
//       this.selectedManager = null;
//       this.outlet.outletManagerPhone = '';
//       this.outlet.outletManagerEmail = '';
//     }
//   }
//
//
//   saveOutlet(): void {
//     // Ensure the outlet object has the required fields
//     const payload = {
//       outletName: this.outlet.outletName,
//       outletLocation: this.outlet.outletLocation,
//       outletManager: this.selectedManager?._id, // Include the manager's ID
//     };
//
//     this.addOutletService.addOutlet(payload).subscribe({
//       next: (res: any) => {
//         if (res.message === 'Outlet created successfully') {
//           alert('Outlet Created Successfully');
//           this.router.navigateByUrl('/layouts/outlet');
//         } else {
//           alert('Failed to create outlet: ' + res.message);
//         }
//       },
//       error: (error) => {
//         console.error('Error creating outlet:', error);
//         alert('Failed to create outlet. Please try again.');
//       },
//     });
//   }
//
//
// }
//
//


import {Component, inject, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {OutletService} from '../../services/outlet.service';
import {AddOutletService} from '../../services/add-outlet.service';

@Component({
  selector: 'app-outlet-creation',
  imports: [FormsModule, NgForOf, RouterLink],
  templateUrl: './outlet-creation.component.html',
  styleUrl: './outlet-creation.component.css',
})
export class OutletCreationComponent implements OnInit {
  outlet: any = {};
  isLoading: boolean = false;
  errorMessage: string = '';
  managers: any[] = [];
  selectedManager: any = null; // To store the selected manager's details

  constructor(
    private outletService: OutletService,
    private addOutletService: AddOutletService,
    private route: ActivatedRoute
  ) {
  }

  router = inject(Router);

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
        this.outlet.outletManager = this.selectedManager._id; // Store the manager's ID
      }
    } else {
      // Reset if no manager is selected
      this.selectedManager = null;
      this.outlet.outletManagerPhone = '';
      this.outlet.outletManagerEmail = '';
      this.outlet.outletManager = ''; // Clear the manager's ID
    }
  }


  saveOutlet(): void {
    // Ensure the outlet object has the required fields
    const payload = {
      outletName: this.outlet.outletName,
      outletLocation: this.outlet.outletLocation,
      outletManager: this.selectedManager?._id, // Include the manager's ID
      outletManagerEmail: this.outlet.outletManagerEmail, // Include the manager's email
      outletManagerPhone: this.outlet.outletManagerPhone, // Include the manager's phone number
    };

    this.addOutletService.addOutlet(payload).subscribe({
      next: (res: any) => {
        console.log('API Response:', res); // Log the response for debugging
        if (res.message === 'Outlet created Successfully') {
          alert('Outlet Created Successfully');
          this.router.navigateByUrl('/layout/outlets'); // Ensure the route is correct
        } else {
          alert('Failed to create outlet: ' + res.message);
        }
      },
      error: (error) => {
        console.error('Error creating outlet:', error);
        alert('Failed to create outlet. Please try again.');
      },
    });
  }

}
