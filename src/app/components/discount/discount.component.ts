import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-discount',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './discount.component.html',
  styleUrl: './discount.component.css'
})
export class DiscountComponent {

}
