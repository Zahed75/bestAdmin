import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { initFlowbite } from 'flowbite';
import { OutletService } from '../../services/outlet.service';
import {NgFor} from '@angular/common';
@Component({
  selector: 'app-outlets',
  imports: [
    FormsModule,
    NgFor
  ],
  templateUrl: './outlets.component.html',
  styleUrl: './outlets.component.css'
})
export class OutletsComponent  implements OnInit, AfterViewInit {

  outlets:any[]=[]
  managers:any[]=[]

  ngAfterViewInit(): void {
    initFlowbite();
  }


  constructor(
    private outletService: OutletService
  ) {
  }

  ngOnInit() {
    this.fetchManagersAndOutlets();
  }

  fetchManagersAndOutlets() {
    // Fetch managers and outlets together
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

            console.log('Outlets with managers:', this.outlets);
          },
          (error) => {
            console.error('Error fetching outlets:', error);
            alert('Error fetching outlets');
          }
        );
      },
      (error) => {
        console.error('Error fetching managers:', error);
        alert('Error fetching managers');
      }
    );
  }








}
