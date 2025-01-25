import { Component } from '@angular/core';
import {NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-outlet-details',
  imports: [
    RouterLink,
    FormsModule,
  ],
  templateUrl: './outlet-details.component.html',
  styleUrl: './outlet-details.component.css'
})
export class OutletDetailsComponent {

}
