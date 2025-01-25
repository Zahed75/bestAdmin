import {AfterViewInit, Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { initFlowbite } from 'flowbite';
@Component({
  selector: 'app-outlets',
  imports: [
    FormsModule,

  ],
  templateUrl: './outlets.component.html',
  styleUrl: './outlets.component.css'
})
export class OutletsComponent  implements AfterViewInit {

  ngAfterViewInit(): void {
    // Initialize Flowbite after the view is fully loaded
    initFlowbite();
  }



}
