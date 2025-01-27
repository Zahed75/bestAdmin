import {AfterViewInit, ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {initFlowbite} from 'flowbite';
import {OutletService} from '../../services/outlet.service';
import {NgFor, NgIf} from '@angular/common';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-outlets',
  imports: [
    FormsModule,
    NgIf,
    NgFor,
    RouterLink
  ],
  templateUrl: './outlets.component.html',
  styleUrl: './outlets.component.css'
})
export class OutletsComponent implements OnInit, AfterViewInit {

  outlets: any[] = []
  managers: any[] = []
  isLoading: boolean = false;

  ngAfterViewInit(): void {
    initFlowbite();
  }

  router = inject(Router);

  userRole: string | null = null; // To store the user's role after login.


  constructor(
    private outletService: OutletService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.fetchManagersAndOutlets();

  }

  fetchManagersAndOutlets() {
    // Fetch managers and outlets together
    this.isLoading = true;
    this.outletService.getAllManagers().subscribe(
      (managers: any[]) => {
        this.managers = managers; // Save all managers for later use
        console.log('Managers fetched successfully:', this.managers);

        // Fetch outlets after managers are fetched
        this.outletService.getAllOutlets().subscribe(
          (outlets: any[]) => {
            // Map outlets with their corresponding managers
            this.outlets = outlets.map((outlet) => {
              // Find the manager corresponding to this outlet
              const manager = this.managers.find(
                (manager) => manager.outlet === outlet.outletName
              );

              // Add the manager's userName to the outlet object
              return {
                ...outlet,
                managerName: manager ? manager.userName : 'N/A', // Use 'N/A' if no manager is found
              };
            });
            this.isLoading = false;

            console.log('Outlets with managers:', this.outlets);
          },
          (error) => {
            console.error('Error fetching outlets:', error);
            alert('Error fetching outlets');
            this.isLoading=false;
          }
        );
      },
      (error) => {
        console.error('Error fetching managers:', error);
        alert('Error fetching managers');
        this.isLoading=false;
      }
    );
  }



  onDeleteOutlet(id: number): void {
    const result = confirm('Are you sure you want to delete this outlet?');
    if (result) {
      this.isLoading = true; // Start loading
      this.outletService.deleteOutletById(id).subscribe(
        (res: any) => {
          alert('Outlet deleted successfully');
          this.fetchManagersAndOutlets();
          this.isLoading = false; // Stop loading after fetching updated data
        },
        (error) => {
          console.error('Error deleting outlet:', error);
          alert('Error deleting outlet');
          this.isLoading = false; // Stop loading in case of an error
        }
      );
    }
  }






}
