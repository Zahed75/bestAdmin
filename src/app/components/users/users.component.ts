import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {UsersService} from '../../services/user/users.service';
import {OutletService} from '../../services/outlet.service';
import { User, CreateUserRequest, CreateUserResponse } from '../../model/user.model';
@Component({
  selector: 'app-users',
    imports: [
        FormsModule,
        RouterLink
    ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{



  constructor(
    private userService:UsersService,
    private outletService:OutletService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }


  ngOnInit() {

  }




}
