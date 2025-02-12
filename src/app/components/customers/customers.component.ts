import {Component, OnInit} from '@angular/core';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {CustomersService} from '../../services/customer/customers.service';

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


export class CustomersComponent implements OnInit{



  constructor(
    private customerService:CustomersService
  ) { }



  ngOnInit() {
  }

}
