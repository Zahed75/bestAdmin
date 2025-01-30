import { Component } from '@angular/core';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-customers',
  imports: [
    CKEditorModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {

}
