import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit {

  userId!: string
  user!: User

  constructor(private activated: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit(): void {

    this.activated.queryParams.subscribe(
      params => {
        this.userId = params['id']
        console.log( this.userId)
      })

    this.userService.getUserById(+this.userId)
      .subscribe(user => this.user = user)

  }

}
